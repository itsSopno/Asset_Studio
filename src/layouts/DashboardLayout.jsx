import { Outlet } from 'react-router'
import Sidebar from '../components/Dashboard/Sidebar/Sidebar'

const DashboardLayout = () => {
  return (
    <div className="min-h-screen bg-black text-white md:flex">
      {/* Left side: sidebar (fixed, w-72 on desktop) */}
      <Sidebar />

      {/* Right side: dashboard content */}
      <main className="min-w-0 flex-1 md:ml-72">
        <div className="mx-auto w-full max-w-7xl p-4 sm:p-6 lg:p-8">
          <Outlet />
        </div>
      </main>
    </div>
  )
}

export default DashboardLayout
