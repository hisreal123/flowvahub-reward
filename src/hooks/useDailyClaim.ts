import { useState, useEffect } from 'react'
import { supabase } from '../supabaseClient'
import { toast } from 'sonner'
import type { Session } from '@supabase/supabase-js'

interface UseDailyClaimReturn {
  isClaimed: boolean
  isLoading: boolean
  claimDailyReward: () => Promise<void>
}

const COOLDOWN_MINUTES = 5
const REWARD_POINTS = 5

export function useDailyClaim(session: Session | null, onClaimSuccess?: () => void): UseDailyClaimReturn {
  const [isClaimed, setIsClaimed] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (!session?.user) {
      setIsClaimed(false)
      return
    }

    checkTodayClaim()
  }, [session?.user?.id])

  const checkTodayClaim = async () => {
    if (!session?.user) return

    try {
      const today = new Date().toISOString().slice(0, 10)
      const { data: existingActivity, error } = await supabase
        .from('daily_activity')
        .select('id')
        .eq('user_id', session.user.id)
        .eq('activity_date', today)
        .single()

      if (error && error.code !== 'PGRST116') {
        console.error('Error checking daily claim:', error)
        return
      }

      if (existingActivity) {
        setIsClaimed(true)
      } else {
        checkCooldown()
      }
    } catch (error) {
      console.error('Error checking daily claim:', error)
    }
  }

  const checkCooldown = () => {
    const lastClaimTime = localStorage.getItem('lastDailyClaimTime')
    if (!lastClaimTime) return

    const timeDiff = Date.now() - parseInt(lastClaimTime, 10)
    const cooldownMs = COOLDOWN_MINUTES * 60 * 1000

    if (timeDiff < cooldownMs) {
      setIsClaimed(true)
      const remainingTime = cooldownMs - timeDiff
      setTimeout(() => {
        checkTodayClaim()
      }, remainingTime)
    } else {
      localStorage.removeItem('lastDailyClaimTime')
    }
  }

  const claimDailyReward = async () => {
    if (!session?.user) {
      toast.error('Please sign in to claim daily rewards')
      return
    }

    if (isClaimed || isLoading) return

    try {
      setIsLoading(true)
      const today = new Date().toISOString().slice(0, 10)

      // Check if today's activity already exists
      const { data: existingActivity, error: checkError } = await supabase
        .from('daily_activity')
        .select('id')
        .eq('user_id', session.user.id)
        .eq('activity_date', today)
        .single()

      if (checkError && checkError.code !== 'PGRST116') {
        throw checkError
      }

      if (existingActivity) {
        toast.info('You have already claimed today\'s reward')
        setIsClaimed(true)
        return
      }

      // Insert today's activity
      const { error } = await supabase.from('daily_activity').insert({
        user_id: session.user.id,
        activity_date: today,
        stress_points: 0,
        reward_points: REWARD_POINTS,
      })

      if (error) {
        throw error
      }

      setIsClaimed(true)
      localStorage.setItem('lastDailyClaimTime', Date.now().toString())
      
      toast.success(`Daily check-in claimed! +${REWARD_POINTS} points earned`)
      
      // Refresh user data
      onClaimSuccess?.()

      // Auto-enable after cooldown
      setTimeout(() => {
        checkTodayClaim()
      }, COOLDOWN_MINUTES * 60 * 1000)
    } catch (error) {
      console.error('Failed to claim daily reward:', error)
      toast.error((error as Error).message || 'Failed to claim daily reward')
    } finally {
      setIsLoading(false)
    }
  }

  return {
    isClaimed,
    isLoading,
    claimDailyReward,
  }
}

