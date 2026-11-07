import { AiOutlineMenu, AiOutlineClose, AiOutlineDown } from 'react-icons/ai'
import { useState, useEffect, useRef } from 'react'
import { Link, NavLink, useNavigate } from 'react-router'
import { motion, AnimatePresence } from 'framer-motion'
import useAuth from '../../../hooks/useAuth'
import useRole from '../../../hooks/useRole'
import avatarImg from '../../../assets/images/placeholder.jpg'
import './nav.css'

const ROLE_LABEL = { hr: 'HR Manager', employee: 'Employee' }

const AUDIENCE = [
  { to: '/hr-join', title: 'HR managers', desc: 'Add assets and approve requests' },
  { to: '/join', title: 'Employees', desc: 'Request and return assets' },
]

const LogoMark = () => (
  <svg width="28" height="28" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" aria-hidden="true">
    <circle cx="16" cy="16" r="13" />
    <path d="M16 8 8.5 12v0L16 16l7.5-4L16 8Z" />
    <path d="m8.5 16 7.5 4 7.5-4" />
    <path d="m8.5 20 7.5 4 7.5-4" />
  </svg>
)

/* Dark dropdown: closes on outside click / Esc */
const Dropdown = ({ trigger, children, position = 'right', width = 'w-64' }) => {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    if (!open) return
    const onClick = (e) => ref.current && !ref.current.contains(e.target) && setOpen(false)
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('mousedown', onClick)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onClick)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  const pos = position === 'center' ? 'left-1/2 -translate-x-1/2' : position === 'left' ? 'left-0' : 'right-0'

  return (
    <div className="relative" ref={ref}>
      {trigger({ open, toggle: () => setOpen((v) => !v) })}
      <div className={`absolute top-full z-10 pt-3 ${pos} ${width}`}>
        <AnimatePresence>
          {open && (
            <motion.div
              role="menu"
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.15 }}
              className="overflow-hidden rounded-2xl border border-white/10 bg-neutral-900/95 p-1.5 shadow-2xl backdrop-blur-xl"
            >
              {children(() => setOpen(false))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

const linkBase =
  'rounded-full px-3 py-2 text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60'
const menuItem =
  'block w-full rounded-xl px-3 py-2.5 text-left text-sm text-neutral-200 transition-colors hover:bg-white/5'
const pill =
  'inline-flex items-center rounded-full bg-neutral-800 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-neutral-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60'

const Navbar = () => {
  const { user, logOut } = useAuth()
  const [role] = useRole()
  const navigate = useNavigate()
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleLogout = () => {
    logOut()
    setIsOpen(false)
    navigate('/')
  }

  const roleLabel = ROLE_LABEL[role]
  const activeCls = ({ isActive }) =>
    `${linkBase} ${isActive ? 'text-white' : 'text-neutral-300 hover:text-white'}`

  return (
    <header className="fixed inset-x-0 top-3 z-50 px-3 md:px-6">
      {/* The pill only appears after scrolling; content never shifts */}
      <nav
        aria-label="Main"
        className={`relative mx-auto flex h-[60px] max-w-[1480px] items-center justify-between rounded-full border px-4 transition-all duration-300 md:px-4 ${
          scrolled
            ? 'border-white/10 bg-neutral-950/70 shadow-lg shadow-black/30 backdrop-blur-xl'
            : 'border-transparent bg-transparent'
        }`}
      >
        {/* Logo */}
        <Link
          to="/"
          aria-label="AssetVerse home"
          className="flex items-center gap-2 rounded-full pl-1 text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
        >
          <LogoMark />
          <span
            className="text-[26px] leading-none tracking-tight"
            style={{ fontFamily: "'Newsreader', Georgia, 'Times New Roman', serif" }}
          >
            assetverse
          </span>
        </Link>

        {/* Centered links */}
        <ul className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-1 lg:flex">
          <li>
            <NavLink to="/" end className={activeCls}>
              Home
            </NavLink>
          </li>
          <li>
            <Dropdown
              position="center"
              width="w-72"
              trigger={({ open, toggle }) => (
                <button
                  type="button"
                  onClick={toggle}
                  aria-haspopup="menu"
                  aria-expanded={open}
                  className={`${linkBase} flex items-center gap-1 ${open ? 'text-white' : 'text-neutral-300 hover:text-white'}`}
                >
                  Who&rsquo;s it for
                  <AiOutlineDown size={10} className={`transition-transform ${open ? 'rotate-180' : ''}`} />
                </button>
              )}
            >
              {(close) =>
                AUDIENCE.map((a) => (
                  <Link key={a.to} to={a.to} role="menuitem" onClick={close} className={menuItem}>
                    <span className="block font-medium text-white">{a.title}</span>
                    <span className="block text-xs text-neutral-400">{a.desc}</span>
                  </Link>
                ))
              }
            </Dropdown>
          </li>
          {user && (
            <li>
              <NavLink to="/dashboard" className={activeCls}>
                Dashboard
              </NavLink>
            </li>
          )}
          <li>
            <NavLink to="/legal" className={activeCls}>
              Legal
            </NavLink>
          </li>
        </ul>

        {/* Right */}
        <div className="flex items-center gap-2">
          {!user && (
            <Link to="/login" className={`${pill} hidden md:inline-flex`}>
              Get started
            </Link>
          )}

          {user && (
            <div className="hidden md:block">
              <Dropdown
                width="w-64"
                trigger={({ open, toggle }) => (
                  <button
                    type="button"
                    onClick={toggle}
                    aria-haspopup="menu"
                    aria-expanded={open}
                    className="flex items-center gap-2 rounded-full bg-neutral-800 py-1 pl-1 pr-3 transition-colors hover:bg-neutral-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
                  >
                    <img
                      className="h-8 w-8 rounded-full object-cover"
                      src={user?.photoURL || avatarImg}
                      alt=""
                      referrerPolicy="no-referrer"
                    />
                    <span className="max-w-[110px] truncate text-sm font-medium text-white">
                      {user?.displayName || 'Account'}
                    </span>
                    <AiOutlineDown size={10} className={`text-neutral-400 transition-transform ${open ? 'rotate-180' : ''}`} />
                  </button>
                )}
              >
                {(close) => (
                  <>
                    <div className="border-b border-white/10 px-3 pb-3 pt-2">
                      <p className="truncate text-sm font-semibold text-white">{user?.displayName || 'Signed in'}</p>
                      {user?.email && <p className="truncate text-xs text-neutral-400">{user.email}</p>}
                      {roleLabel && (
                        <span className="mt-2 inline-block rounded-full bg-white/10 px-2.5 py-0.5 text-xs font-medium text-neutral-200">
                          {roleLabel}
                        </span>
                      )}
                    </div>
                    <div className="pt-1.5">
                      <Link to="/dashboard" role="menuitem" onClick={close} className={menuItem}>
                        Dashboard
                      </Link>
                      {!roleLabel && (
                        <>
                          <Link to="/hr-join" role="menuitem" onClick={close} className={menuItem}>
                            Join as HR
                          </Link>
                          <Link to="/join" role="menuitem" onClick={close} className={menuItem}>
                            Join as Employee
                          </Link>
                        </>
                      )}
                      <button
                        type="button"
                        role="menuitem"
                        onClick={() => {
                          close()
                          handleLogout()
                        }}
                        className={`${menuItem} text-red-400 hover:bg-red-500/10`}
                      >
                        Log out
                      </button>
                    </div>
                  </>
                )}
              </Dropdown>
            </div>
          )}

          <button
            type="button"
            onClick={() => setIsOpen((v) => !v)}
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isOpen}
            className="rounded-full bg-neutral-800 p-2.5 text-white transition-colors hover:bg-neutral-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60 lg:hidden"
          >
            {isOpen ? <AiOutlineClose size={18} /> : <AiOutlineMenu size={18} />}
          </button>
        </div>
      </nav>

      {/* Mobile panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
            className="mx-auto mt-2 max-w-[1480px] rounded-3xl border border-white/10 bg-neutral-950/95 p-3 shadow-2xl backdrop-blur-xl lg:hidden"
          >
            <div className="flex flex-col gap-1">
              {[
                { to: '/', label: 'Home', end: true },
                ...AUDIENCE.map((a) => ({ to: a.to, label: `For ${a.title.toLowerCase()}` })),
                ...(user ? [{ to: '/dashboard', label: 'Dashboard' }] : []),
                { to: '/legal', label: 'Legal' },
              ].map(({ to, label, end }) => (
                <NavLink
                  key={to + label}
                  to={to}
                  end={end}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    `rounded-xl px-3 py-2.5 text-[15px] font-medium transition-colors ${
                      isActive ? 'bg-white/10 text-white' : 'text-neutral-300 hover:bg-white/5 hover:text-white'
                    }`
                  }
                >
                  {label}
                </NavLink>
              ))}
            </div>

            <div className="my-3 border-t border-white/10" />

            {user ? (
              <div className="flex flex-col gap-1">
                <div className="px-3 pb-2">
                  <p className="truncate text-sm font-semibold text-white">{user?.displayName || 'Signed in'}</p>
                  {user?.email && <p className="truncate text-xs text-neutral-400">{user.email}</p>}
                  {roleLabel && (
                    <span className="mt-2 inline-block rounded-full bg-white/10 px-2.5 py-0.5 text-xs font-medium text-neutral-200">
                      {roleLabel}
                    </span>
                  )}
                </div>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="rounded-xl px-3 py-2.5 text-left text-sm font-medium text-red-400 hover:bg-red-500/10"
                >
                  Log out
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                onClick={() => setIsOpen(false)}
                className="block rounded-full bg-white px-4 py-2.5 text-center text-sm font-medium text-neutral-950"
              >
                Get started
              </Link>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

export default Navbar