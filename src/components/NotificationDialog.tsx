import { useEffect, useRef } from 'react'

interface Notification {
  id: string
  title: string
  message: string
  timestamp: Date
  read?: boolean
}

interface NotificationMenuProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  notifications?: Notification[]
}

export function NotificationMenu({
  open,
  onOpenChange,
  notifications = [],
}: NotificationMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null)

  // Default notifications if none provided
  const defaultNotifications: Notification[] = [
    {
      id: '1',
      title: 'Welcome to Rewards Hub!',
      message: 'Start earning points by completing daily tasks and referring friends.',
      timestamp: new Date(),
      read: false,
    },
  ]

  const displayNotifications = notifications.length > 0 ? notifications : defaultNotifications

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onOpenChange(false)
      }
    }

    if (open) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [open, onOpenChange])

  if (!open) return null

  return (
    <div
      ref={menuRef}
      className="absolute top-full right-0 mt-2 w-80 bg-white border border-rewards-primary rounded-lg shadow-lg z-50 max-h-[500px] overflow-y-auto"
    >
      <div className="p-4 border-b border-gray-200 flex justify-between items-center w-full">
        <h3 className="text-lg font-semibold text-black">Notifications</h3>
        <button className="text-xs text-gray-600 mt-1">
          Mark all as Read
        </button>
      </div>

      <div className="p-3 space-y-2">
        {displayNotifications.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <p className="text-sm">No notifications yet</p>
          </div>
        ) : (
          displayNotifications.map((notification) => (
            <div
              key={notification.id}
              className={`p-3 rounded-lg  cursor-pointer transition-colors ${
                !notification.read
                  ? 'bg-rewards-primary/5 border-rewards-primary/20'
                  : 'bg-gray-50 border-gray-200'
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1">
                  <h3 className="font-semibold text-sm text-black mb-1">
                    {notification.title}
                  </h3>
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {notification.message}
                  </p>
                  <p className="text-xs text-gray-400 mt-2">
                    {notification.timestamp.toLocaleDateString()}
                  </p>
                </div>
                {!notification.read && (
                  <div className="w-2 h-2 rounded-full bg-rewards-primary flex-shrink-0 mt-1" />
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

