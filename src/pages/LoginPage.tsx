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
      <div className='flex justify-center w-full max-w-[420px] '>
      <div className="w-full shadow-[0_4px_6px_rgba(0,0,0,0.1)] py-[30px] px-[20px] lg:p-[40px] bg-white rounded-[10px] animate-fadeIn h-fit space-y-6">
        <div className="text-center">
          <h1 className="text-2xl text-[#6D28D9] font-semibold  mb-[8px] text-center w-full">Log in to flowva</h1>
          <p className="text-sm text-[#6B7280] text-center w-full ">
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

          <Button 
            type="submit" 
            disabled={loading}
            className="w-full h-[55px] gap-2 flex justify-center text-base items-center p-[11px] text-center bg-[#9013FE] text-white  font-medium border-none transition-colors ease-linear duration-[.2s] rounded-[100px] hover:bg-[#6D28D9]"
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
    </div>
  )
}

