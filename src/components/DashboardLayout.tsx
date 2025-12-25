import { useState, useEffect, useRef } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { Menu, X, Loader2Icon } from 'lucide-react'
import logoImage from '../assets/images/image.png'
import { useAuth } from '../context/AuthContext'
import { useUserProfile } from '../hooks/useUserProfile'
import { FeedbackModal } from './FeedbackModal'
import { LogoutConfirmationModal } from './LogoutConfirmationModal'

export function DashboardLayout() {
  const navigate = useNavigate()
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false)
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false)
  const [isLoggingOut, setIsLoggingOut] = useState(false)
  const { signOut, session } = useAuth()
  const { profile, loading: profileLoading } = useUserProfile(session)
  const userMenuRef = useRef<HTMLDivElement>(null)

  const handleLogout = async () => {
    setIsLoggingOut(true)
    try {
      await signOut()
      navigate('/login')
      setIsUserMenuOpen(false)
      setIsLogoutModalOpen(false)
    } catch (error) {
      console.error('Logout error:', error)
    } finally {
      setIsLoggingOut(false)
    }
  }

  const getUserInitials = () => {
    if (profile?.first_name && profile?.last_name) {
      return `${profile.first_name[0]}${profile.last_name[0]}`.toUpperCase()
    }
    if (session?.user?.email) {
      return session.user.email[0].toUpperCase()
    }
    return 'U'
  }

  const getUserName = () => {
    if (profile?.first_name?.trim() && profile?.last_name?.trim()) {
      return `${profile.first_name} ${profile.last_name}`
    }
    if (session?.user?.email) {
      const emailPrefix = session.user.email.split('@')[0]
      return emailPrefix.charAt(0).toUpperCase() + emailPrefix.slice(1)
    }
    return 'User'
  }

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  const closeSidebar = () => {
    setIsSidebarOpen(false)
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false)
      }
    }

    if (isUserMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isUserMenuOpen])

  // Show loading state while retrieving user profile data
  if (profileLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <Loader2Icon className="w-8 h-8 animate-spin text-rewards-primary" />
          <p className="text-gray-600">Retrieving your account...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex h-screen bg-background">
      {/* Backdrop Overlay */}
      {isSidebarOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/50 z-40 transition-opacity"
          onClick={closeSidebar}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed md:static inset-y-0 left-0 z-50
          w-64 bg-card border-r border-border flex flex-col
          transform transition-transform duration-300 ease-in-out
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        `}
      >
        {/* Logo with Close Button */}
        <div className="flex justify-center relative">
          <div className=" h-[70%] flex items-center justify-center w-full">
            <img 
              src={logoImage} 
              alt="FlowvaHub Logo" 
              className="w-40 h-40 object-contain object-center mx-auto"
            />
          </div>
          <button
            onClick={closeSidebar}
            className="md:hidden absolute top-4 right-4 p-1 rounded-lg hover:bg-accent transition-colors"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 overflow-y-auto translate-y-[-50px]">
          <ul className="space-y-2">
            <li>
              <a
                href="/rewards"
                onClick={closeSidebar}
                className="
                flex items-center gap-3 px-4 p-[0.75rem] mb-[0.5rem] rounded-[8px] cursor-pointer  duration-200 transition-all
                text-black hover:bg-[rgba(144,_19,_254,_0.1)] hover:text-[#9013FE]
              "
              >
                <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="gem" className="svg-inline--fa fa-gem w-5 h-5" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M116.7 33.8c4.5-6.1 11.7-9.8 19.3-9.8l240 0c7.6 0 14.8 3.6 19.3 9.8l112 152c6.8 9.2 6.1 21.9-1.5 30.4l-232 256c-4.5 5-11 7.9-17.8 7.9s-13.2-2.9-17.8-7.9l-232-256c-7.7-8.5-8.3-21.2-1.5-30.4l112-152zm38.5 39.8c-3.3 2.5-4.2 7-2.1 10.5l57.4 95.6L63.3 192c-4.1 .3-7.3 3.8-7.3 8s3.2 7.6 7.3 8l192 16c.4 0 .9 0 1.3 0l192-16c4.1-.3 7.3-3.8 7.3-8s-3.2-7.6-7.3-8L301.5 179.8l57.4-95.6c2.1-3.5 1.2-8.1-2.1-10.5s-7.9-2-10.7 1L256 172.2 165.9 74.6c-2.8-3-7.4-3.4-10.7-1z"></path></svg>
                <span>Rewards Hub</span>
              </a>
            </li>
          </ul>
        </nav>

          <div className="border-t border-[0.3px] border-border border-gray-300 w-[90%] mx-auto" />

        {/* User Profile Section */}
        <div className="p-4  relative" ref={userMenuRef}>
          <button
            onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-foreground hover:bg-accent transition-colors"
          >
            <div className="w-10 h-10 rounded-full bg-rewards-primary text-white flex items-center justify-center font-semibold text-sm flex-shrink-0">
              {getUserInitials()}
            </div>
            <div className="flex-1 text-left min-w-0">
              <p className="text-sm font-medium text-foreground truncate">{getUserName()}</p>
              <p className="text-xs text-muted-foreground truncate">{session?.user?.email}</p>
            </div>
          </button>

          {/* User Menu Dropdown */}
          {isUserMenuOpen && (
            <div className="absolute bottom-20 left-6 w-56 bg-white border-[#9013FE] border text-black rounded-lg shadow-lg p-2">
              <button
                onClick={() => {
                  setIsUserMenuOpen(false)
                  setIsLogoutModalOpen(true)
                }}
                className="w-full flex items-center gap-3 px-4 py-1 text-left text-foreground hover:bg-accent transition-colors"
              >
                <span className="text-sm">Log Out</span>
              </button>
            </div>
          )}
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        {/* Mobile Header with Menu Button */}
        <div className="md:hidden sticky top-0 z-30 bg-background border-b border-border p-4 flex items-center gap-3">
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-lg bg-card text-foreground hover:bg-accent transition-colors"
            aria-label="Toggle menu"
          >
            <Menu className="w-5 h-5" />
          </button>
          <h1 className="text-lg font-semibold text-foreground">Rewards Hub</h1>
        </div>
        <div className="p-6">
          <Outlet />
        </div>
      </main>

      {/* Feedback Modal */}
      <FeedbackModal
        open={isFeedbackModalOpen}
        onOpenChange={setIsFeedbackModalOpen}
        userName={getUserName()}
      />

      {/* Logout Confirmation Modal */}
      <LogoutConfirmationModal
        open={isLogoutModalOpen}
        onOpenChange={setIsLogoutModalOpen}
        onConfirm={handleLogout}
        isLoading={isLoggingOut}
      />
    </div>
  )
}
