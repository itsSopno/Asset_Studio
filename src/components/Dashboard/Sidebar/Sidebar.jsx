import { useNavigate } from 'react-router'
import { useState } from 'react'
import useAuth from '../../../hooks/useAuth'
import useRole from '../../../hooks/useRole'

// Icons
import { AiOutlineMenu, AiOutlineClose, AiOutlineAppstore } from 'react-icons/ai'
import { GrLogout } from 'react-icons/gr'
import { FiSettings } from 'react-icons/fi'
import { MdHome } from 'react-icons/md'

import MenuItem from './Menu/MenuItem'
import AdminMenu from './Menu/AdminMenu'
import CustomerMenu from './Menu/CustomerMenu'
import EmployeeMenu from './Menu/SellerMenu'
import LoadingSpinner from '../../Shared/LoadingSpinner'

const SERIF = { fontFamily: "'Newsreader', Georgia, 'Times New Roman', serif" }

const LogoMark = ({ size = 24 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 32 32"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <circle cx="16" cy="16" r="13" />
    <path d="M16 8 8.5 12v0L16 16l7.5-4L16 8Z" />
    <path d="m8.5 16 7.5 4 7.5-4" />
    <path d="m8.5 20 7.5 4 7.5-4" />
  </svg>
)

const Brand = () => (
  <span className="flex items-center gap-2 text-white">
    <LogoMark />
    <span className="text-[24px] leading-none tracking-tight" style={SERIF}>
      assetverse
    </span>
  </span>
)

const footerBtn =
  'flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-neutral-400 transition-colors hover:bg-white/5 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40'

const Sidebar = () => {
  const { logOut } = useAuth()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [role, isRoleLoading] = useRole()
  const navigate = useNavigate()

  if (isRoleLoading) return <LoadingSpinner />

  const backhome = () => navigate('/')

  return (
    <>
      {/* MOBILE HEADER */}
      <div className="flex items-center justify-between border-b border-white/10 bg-black px-5 py-3.5 md:hidden">
        <Brand />
        <button
          type="button"
          onClick={() => setMobileOpen(true)}
          aria-label="Open menu"
          aria-expanded={mobileOpen}
          className="rounded-full bg-neutral-800 p-2.5 text-white transition-colors hover:bg-neutral-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
        >
          <AiOutlineMenu size={18} />
        </button>
      </div>

      {/* MOBILE BACKDROP */}
      {mobileOpen && (
        <button
          type="button"
          aria-label="Close menu"
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 z-30 bg-black/60 backdrop-blur-sm md:hidden"
        />
      )}

      {/* SIDEBAR */}
      <aside
        aria-label="Dashboard sidebar"
        className={`fixed left-0 top-0 z-40 flex h-screen w-72 flex-col justify-between border-r border-white/10 bg-neutral-950 px-4 py-6 transition-transform duration-300 md:translate-x-0 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* TOP */}
        <div className="flex min-h-0 flex-1 flex-col">
          <div className="mb-8 flex items-center justify-between px-2">
            <Brand />
            <button
              type="button"
              onClick={() => setMobileOpen(false)}
              aria-label="Close menu"
              className="rounded-full p-2 text-neutral-400 transition-colors hover:bg-white/5 hover:text-white md:hidden"
            >
              <AiOutlineClose size={18} />
            </button>
          </div>

          {/* MENU */}
          <nav
            aria-label="Dashboard"
            className="flex-1 space-y-6 overflow-y-auto"
            onClick={() => setMobileOpen(false)}
          >
            <div>
              <h2 className="mb-2 px-3 text-xs font-medium text-neutral-500">Main</h2>
              <MenuItem icon={AiOutlineAppstore} label="Assets list" address="/dashboard/plantsi" />
            </div>

            <div className="flex flex-col gap-1">
              {role === 'customer' && <CustomerMenu />}
              {role === 'hr' && <AdminMenu />}
              {role === 'employee' && <EmployeeMenu />}
            </div>
          </nav>
        </div>

        {/* BOTTOM */}
        <div className="mt-6 space-y-1 border-t border-white/10 pt-4">
          <div onClick={() => setMobileOpen(false)}>
            <MenuItem icon={FiSettings} label="Profile settings" address="/dashboard/profile" />
          </div>
          <button type="button" onClick={backhome} className={footerBtn}>
            <MdHome size={18} aria-hidden="true" />
            Home
          </button>
          <button
            type="button"
            onClick={logOut}
            className={`${footerBtn} hover:bg-red-500/10 hover:text-red-400`}
          >
            <GrLogout size={16} aria-hidden="true" />
            Log out
          </button>
        </div>
      </aside>
    </>
  )
}

export default Sidebar