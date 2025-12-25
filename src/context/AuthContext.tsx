import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'
import { supabase } from '../supabaseClient'
import { toast } from 'sonner'
import type { Session } from '@supabase/supabase-js'

interface SignUpData {
  firstName: string
  lastName: string
  gender?: string
  referralCode?: string
}

interface AuthContextType {
  session: Session | null
  loading: boolean
  signUp: (email: string, password: string, userData: SignUpData) => Promise<void>
  signIn: (email: string, password: string) => Promise<void>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

interface AuthContextProviderProps {
  children: ReactNode
}

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)

  const signUp = async (email: string, password: string, userData: SignUpData) => {
    const { data, error } = await supabase.auth.signUp({ email, password })
    if (error) {
      throw error
    }

    if (!data.user) {
      throw new Error('Failed to create user account')
    }

    if (data.session) {
      setSession(data.session)
    }

    // Generate referral code: emailPrefix-4digitcode
    // Extract email prefix (before @) and sanitize it
    const emailPrefix = data.user.email?.split('@')[0] || 'user'
    const sanitized = emailPrefix.toLowerCase().replace(/[^a-z0-9]/g, '')
    const randomCode = Math.floor(1000 + Math.random() * 9000) // 4-digit code (1000-9999)
    
    const generateReferralCode = (): string => {
      return `${sanitized}-${randomCode}`
    }

    let referralCode = generateReferralCode()
    
    // Ensure uniqueness - retry if code exists
    let attempts = 0
    while (attempts < 10) {
      const { data: existing, error: checkError } = await supabase
        .from('user_profiles')
        .select('referral_code')
        .eq('referral_code', referralCode)
        .maybeSingle()
      
      // If no row found (PGRST116) or error, code is available
      if (checkError?.code === 'PGRST116' || !existing) {
        break // Code is unique
      }
      // Regenerate with new random code
      const newRandomCode = Math.floor(1000 + Math.random() * 9000)
      referralCode = `${sanitized}-${newRandomCode}`
      attempts++
    }

    // Create user profile with auto-generated referral code
    const profileData: {
      user_id: string
      first_name: string
      last_name: string
      gender: string | null
      referral_code?: string
    } = {
      user_id: data.user.id,
      first_name: userData.firstName,
      last_name: userData.lastName,
      gender: userData.gender || null,
    }

    // Only add referral_code if column exists (migration might not be run)
    // Try with referral_code first
    const { error: profileError } = await supabase.from('user_profiles').insert({
      ...profileData,
      referral_code: referralCode,
    })

    if (profileError) {
      console.error('Profile creation error:', profileError)
      
      // If error is about missing column, try without referral_code
      if (profileError.message?.includes('column') && profileError.message?.includes('referral_code')) {
        console.warn('referral_code column not found, creating profile without it')
        const { error: retryError } = await supabase.from('user_profiles').insert(profileData)
        if (retryError) {
          throw new Error(`Failed to create user profile: ${retryError.message}`)
        }
      } else {
        throw new Error(`Failed to create user profile: ${profileError.message || 'Unknown error'}`)
      }
    }

    // Handle referral if code is provided
    if (userData.referralCode && data.user) {
      try {
        console.log('Processing referral with code:', userData.referralCode)
        
        // Look up referrer by referral_code
        const { data: referrerProfile, error: referrerError } = await supabase
          .from('user_profiles')
          .select('user_id')
          .eq('referral_code', userData.referralCode)
          .maybeSingle()

        console.log('Referrer lookup result:', { referrerProfile, referrerError })

        if (referrerError) {
          console.error('Error looking up referrer:', referrerError)
        } else if (!referrerProfile) {
          console.warn('Referrer not found for code:', userData.referralCode)
        } else if (referrerProfile.user_id === data.user.id) {
          console.warn('Self-referral detected, skipping')
        } else {
          console.log('Creating referral record:', {
            referrer_id: referrerProfile.user_id,
            referred_id: data.user.id,
            referral_code: userData.referralCode,
          })

          const { data: referralData, error: referralError } = await supabase
            .from('referrals')
            .insert({
              referrer_id: referrerProfile.user_id,
              referred_id: data.user.id,
              referral_code: userData.referralCode,
              points_awarded: 25,
            })
            .select()

          if (referralError) {
            console.error('Referral creation error:', referralError)
            console.error('Error details:', JSON.stringify(referralError, null, 2))
          } else {
            console.log('Referral created successfully:', referralData)
          }
        }
      } catch (refError) {
        console.error('Referral processing error:', refError)
      }
    } else {
      console.log('No referral code provided or no user data')
    }

    // Ensure session is set - try multiple methods
    if (data.session) {
      setSession(data.session)
    } else {
      // Get session explicitly if not in response
      const { data: { session: newSession } } = await supabase.auth.getSession()
      if (newSession) {
        setSession(newSession)
      }
    }

    // Wait a moment for state to update
    await new Promise(resolve => setTimeout(resolve, 100))

    toast.success('Sign up successful!')
  }
  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) {
      throw error
    }
    toast.success('Sign in successful')
  }

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      setLoading(false)
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
      setLoading(false)
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  const signOut = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) {
      throw error
    }
    setSession(null) // Clear session state immediately
    toast.success('Sign out successful')
  }

  return (
    <AuthContext.Provider value={{ session, loading, signUp, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthContextProvider')
  }
  return context
}