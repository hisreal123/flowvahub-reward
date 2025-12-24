import { Outlet } from 'react-router-dom'

export function DashboardLayout() {
  return (
    <div className="flex h-screen bg-background">
      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <div className="container mx-auto p-6">
          <Outlet />
        </div>
      </main>
    </div>
  )
}

