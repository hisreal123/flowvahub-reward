import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { toast } from 'sonner'
import logoImage from '../assets/images/image.png'
import { useAuth } from '../context/AuthContext.tsx'
import { Loader2Icon } from 'lucide-react'

export function SignupPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const { signUp } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (password !== confirmPassword) {
      toast.error('Passwords do not match')
      return
    }

    try {
      setLoading(true)
      try {
        await signUp(email, password)
        navigate('/login')
      } catch (error: unknown) {
        toast.error((error as Error).message)
        return
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <div className="w-full max-w-md space-y-8 rounded-[16px] border border-[#f3f4f6] bg-card p-8 shadow-[0_5px_15px_rgba(0,_0,_0,_0.05)]">
        {/* Logo */}
        <div className="flex justify-center">
          <img 
            src={logoImage} 
            alt="FlowvaHub Logo" 
            className="w-32 h-32 object-contain"
          />
        </div>

        <div className="text-center">
          <h1 className="text-3xl font-bold text-black">Create Account</h1>
          <p className="mt-2 text-gray-600">
            Sign up for FlowvaHub and start earning rewards
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
              placeholder="you@example.com"
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
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border-gray-200 focus:border-rewards-primary focus:ring-rewards-primary"
              required
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700">
              Confirm Password
            </label>
            <Input
              id="confirmPassword"
              type="password"
              placeholder="••••••••"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="border-gray-200 focus:border-rewards-primary focus:ring-rewards-primary"
              required
            />
          </div>

          <Button 
            type="submit" 
            disabled={loading}
            className="w-full bg-rewards-primary hover:bg-[#7a0fe0] text-white font-semibold py-6 rounded-lg transition-all duration-200"
          >
            {loading ? <Loader2Icon className="size-4 animate-spin" /> : 'Sign Up'}
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

