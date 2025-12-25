import { useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { toast } from 'sonner'
import { useAuth } from '../context/AuthContext.tsx'
import { Loader2Icon } from 'lucide-react'

export function SignupPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const { signUp } = useAuth()
  const referralCode = searchParams.get('ref') || undefined

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Frontend validation: passwords must match
    if (password !== confirmPassword) {
      toast.error('Passwords do not match')
      return
    }

    // Extract name from email for backend requirements
    const emailUsername = email.split('@')[0] || 'User'
    const firstName = emailUsername.charAt(0).toUpperCase() + emailUsername.slice(1)
    const lastName = 'User' // Default last name

    try {
      setLoading(true)
      try {
        await signUp(email, password, {
          firstName,
          lastName,
          gender: undefined,
          referralCode,
        })
        
        await new Promise(resolve => setTimeout(resolve, 300))
        navigate('/rewards', { replace: true })
      } catch (error: unknown) {
        toast.error((error as Error).message)
        return
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-rewards-primary p-4">
      <div className="w-full max-w-md space-y-6 rounded-[16px] bg-white p-8 shadow-lg">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-black">Log in to flowva</h1>
          <p className="mt-2 text-gray-600">
            Log in to receive personalized recommendations
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium text-gray-700">
              Email
            </label>
            <Input
              id="email"
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border-gray-200 focus:border-rewards-primary focus:ring-rewards-primary"
              required
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="password" className="text-sm font-medium text-gray-700">
              Password
            </label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border-gray-200 focus:border-rewards-primary focus:ring-rewards-primary pr-20"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors text-sm font-medium"
              >
                {showPassword ? 'hide' : 'show'}
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700">
              Confirm Password
            </label>
            <div className="relative">
              <Input
                id="confirmPassword"
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="border-gray-200 focus:border-rewards-primary focus:ring-rewards-primary pr-20"
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors text-sm font-medium"
              >
                {showConfirmPassword ? 'hide' : 'show'}
              </button>
            </div>
          </div>

          <Button 
            type="submit" 
            disabled={loading}
            className="w-full bg-rewards-primary hover:bg-[#7a0fe0] text-white font-semibold py-6 rounded-xl transition-all duration-200"
          >
            {loading ? <Loader2Icon className="size-4 animate-spin" /> : 'Sign up Account'}
          </Button>
        </form>

        <div className="text-center text-sm">
          <span className="text-gray-600">Already have an account? </span>
          <Link
            to="/login"
            className="font-medium text-rewards-primary hover:text-[#7a0fe0] hover:underline transition-colors"
          >
            Sign in
          </Link>
        </div>
      </div>
    </div>
  )
}

