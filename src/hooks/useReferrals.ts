import { useState, useEffect } from 'react'
import { supabase } from '../supabaseClient'
import type { Session } from '@supabase/supabase-js'

interface UseReferralsReturn {
  referralCount: number
  pointsEarned: number
  loading: boolean
  refetch: () => Promise<void>
}

export function useReferrals(session: Session | null): UseReferralsReturn {
  const [referralCount, setReferralCount] = useState(0)
  const [pointsEarned, setPointsEarned] = useState(0)
  const [loading, setLoading] = useState(true)

  const fetchReferrals = async () => {
    if (!session?.user) {
      setReferralCount(0)
      setPointsEarned(0)
      setLoading(false)
      return
    }

    try {
      const { data, error } = await supabase
        .from('referrals')
        .select('points_awarded')
        .eq('referrer_id', session.user.id)

      if (error) {
        console.error('Error fetching referrals:', error)
        setReferralCount(0)
        setPointsEarned(0)
      } else {
        setReferralCount(data?.length || 0)
        const totalPoints = data?.reduce((sum, ref) => sum + (ref.points_awarded || 0), 0) || 0
        setPointsEarned(totalPoints)
      }
    } catch (error) {
      console.error('Error fetching referrals:', error)
      setReferralCount(0)
      setPointsEarned(0)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchReferrals()
  }, [session])

  return {
    referralCount,
    pointsEarned,
    loading,
    refetch: fetchReferrals,
  }
}

