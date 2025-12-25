import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { Loader2Icon } from 'lucide-react'

interface PublicRouteProps {
  children: React.ReactNode
}

export function PublicRoute({ children }: PublicRouteProps) {
  const { session, loading } = useAuth()

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <Loader2Icon className="w-8 h-8 animate-spin text-rewards-primary" />
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  if (session) {
    return <Navigate to="/rewards" replace />
  }

  return <>{children}</>
}

