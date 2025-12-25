import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { useAuth } from '../context/AuthContext.tsx'
import { toast } from 'sonner'
import { Loader2Icon } from 'lucide-react'

export function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const { signIn } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      setLoading(true)
      try {
        await signIn(email, password)
        navigate('/rewards')
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

          <Button 
            type="submit" 
            disabled={loading}
            className="w-full bg-rewards-primary hover:bg-[#7a0fe0] text-white font-semibold py-6 rounded-xl transition-all duration-200"
          >
            {loading ? <Loader2Icon className="size-4 animate-spin" /> : 'Sign In'}
          </Button>
        </form>

        <div className="text-center text-sm">
          <span className="text-gray-600">Don't have an account? </span>
          <Link
            to="/signup"
            className="font-medium text-rewards-primary hover:text-[#7a0fe0] hover:underline transition-colors"
          >
            Sign up
          </Link>
        </div>
      </div>
    </div>
  )
}

