import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import logoImage from '../assets/images/image.png'

export function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implement Supabase authentication
    console.log('Login:', { email, password })
    // For now, just navigate to rewards
    navigate('/rewards')
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
          <h1 className="text-3xl font-bold text-black">Welcome Back</h1>
          <p className="mt-2 text-gray-600">
            Sign in to your FlowvaHub account
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

          <Button 
            type="submit" 
            className="w-full bg-rewards-primary hover:bg-[#7a0fe0] text-white font-semibold py-6 rounded-lg transition-all duration-200"
          >
            Sign In
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

