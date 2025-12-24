import { useState, useEffect } from 'react'
import { supabase } from '../supabaseClient'
import type { Session } from '@supabase/supabase-js'

interface UseUserPointsReturn {
  totalPoints: number
  streakDays: number
  isLoading: boolean
  refetch: () => Promise<void>
}

export function useUserPoints(session: Session | null): UseUserPointsReturn {
  const [totalPoints, setTotalPoints] = useState(0)
  const [streakDays, setStreakDays] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  const fetchUserData = async () => {
    if (!session?.user) {
      setTotalPoints(0)
      setStreakDays(0)
      setIsLoading(false)
      return
    }

    try {
      setIsLoading(true)

      // Fetch total reward points
      const { data: pointsData, error: pointsError } = await supabase
        .from('daily_activity')
        .select('reward_points')
        .eq('user_id', session.user.id)

      if (pointsError) {
        console.error('Error fetching points:', pointsError)
      } else {
        const total = pointsData?.reduce((sum, activity) => sum + (activity.reward_points || 0), 0) || 0
        setTotalPoints(total)
      }

      // Calculate streak (consecutive days with activities)
      const { data: activitiesData, error: streakError } = await supabase
        .from('daily_activity')
        .select('activity_date')
        .eq('user_id', session.user.id)
        .order('activity_date', { ascending: false })

      if (streakError) {
        console.error('Error fetching streak:', streakError)
        setStreakDays(0)
      } else if (activitiesData && activitiesData.length > 0) {
        const streak = calculateStreak(activitiesData)
        setStreakDays(streak)
      } else {
        setStreakDays(0)
      }
    } catch (error) {
      console.error('Error fetching user data:', error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchUserData()
  }, [session?.user?.id])

  return {
    totalPoints,
    streakDays,
    isLoading,
    refetch: fetchUserData,
  }
}

function calculateStreak(activitiesData: { activity_date: string }[]): number {
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const mostRecentDate = new Date(activitiesData[0].activity_date + 'T00:00:00')
  mostRecentDate.setHours(0, 0, 0, 0)

  const yesterday = new Date(today)
  yesterday.setDate(today.getDate() - 1)

  let startDate = mostRecentDate
  if (mostRecentDate.getTime() === today.getTime()) {
    startDate = today
  } else if (mostRecentDate.getTime() === yesterday.getTime()) {
    startDate = yesterday
  } else {
    return 0
  }

  let streak = 0
  for (let i = 0; i < activitiesData.length; i++) {
    const activityDate = new Date(activitiesData[i].activity_date + 'T00:00:00')
    activityDate.setHours(0, 0, 0, 0)

    const expectedDate = new Date(startDate)
    expectedDate.setDate(startDate.getDate() - i)
    expectedDate.setHours(0, 0, 0, 0)

    if (activityDate.getTime() === expectedDate.getTime()) {
      streak++
    } else {
      break
    }
  }

  return streak
}

