import { useState, useEffect } from 'react'
import { supabase } from '../supabaseClient'
import type { Session } from '@supabase/supabase-js'

interface UserProfile {
  id: string
  user_id: string
  first_name: string
  last_name: string
  username: string | null
  gender: string | null
  referral_code: string
}

interface UseUserProfileReturn {
  profile: UserProfile | null
  loading: boolean
  refetch: () => Promise<void>
}

export function useUserProfile(session: Session | null): UseUserProfileReturn {
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)

  const fetchProfile = async () => {
    if (!session?.user) {
      setProfile(null)
      setLoading(false)
      return
    }

    try {
      const { data, error } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('user_id', session.user.id)
        .maybeSingle()

      if (error) {
        console.error('Error fetching profile:', error)
        setProfile(null)
      } else {
        setProfile(data)
      }
    } catch (error) {
      console.error('Error fetching profile:', error)
      setProfile(null)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProfile()
  }, [session])

  return {
    profile,
    loading,
    refetch: fetchProfile,
  }
}

