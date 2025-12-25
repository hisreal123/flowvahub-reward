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
          <h1 className="text-2xl text-[#6D28D9] font-semibold  mb-[8px] text-center w-full  ">Create Your Account</h1>
          <p className="text-sm text-[#6B7280] text-center w-full ">
            Sign up to manage your tools
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
              className="h-12 peer w-full border text-base py-[10px] px-[14px]  border-[#EDE9FE] transition-all ease-linear duration-[.2s] rounded-md outline-none focus:border-[#9013fe]"
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
                className="h-12 peer w-full border text-base py-[10px] px-[14px]  border-[#EDE9FE] transition-all ease-linear duration-[.2s] rounded-md outline-none focus:border-[#9013fe]"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 border-none text-[#A78BFA] h-fit font-medium text-xs top-0 bottom-0 m-auto"
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
                className="h-12 peer w-full border text-base py-[10px] px-[14px]  border-[#EDE9FE] transition-all ease-linear duration-[.2s] rounded-md outline-none focus:border-[#9013fe]"
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 border-none text-[#A78BFA] h-fit font-medium text-xs top-0 bottom-0 m-auto"
              >
                {showConfirmPassword ? 'hide' : 'show'}
              </button>
            </div>
          </div>

          <Button 
            type="submit" 
            disabled={loading}
            className="w-full text-base h-[55px]  flex justify-center gap-2 items-center p-[11px] text-center bg-[#9013FE] text-white  font-medium border-none transition-colors ease-linear duration-[.2s] rounded-[100px] hover:bg-[#6D28D9]"
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

