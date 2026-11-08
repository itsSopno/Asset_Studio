import { Link } from 'react-router'
import { FaFacebookF, FaLinkedinIn, FaTwitter } from 'react-icons/fa'
import SinnersLogo from './sinnersLogo'

const SERIF = { fontFamily: "'Newsreader', Georgia, 'Times New Roman', serif" }

/* Add your real profile links. Icons without a link are hidden. */
const SOCIALS = [
  { label: 'Facebook', icon: FaFacebookF, href: '' },
  { label: 'LinkedIn', icon: FaLinkedinIn, href: '' },
  { label: 'Twitter', icon: FaTwitter, href: '' },
]

const COLUMNS = [
  {
    title: 'Product',
    links: [
      { to: '/', label: 'Home' },
      { to: '/how-it-works', label: 'How it works' },
      { to: '/packages', label: 'Packages' },
      { to: '/about', label: 'About' },
    ],
  },
  {
    title: 'Get started',
    links: [
      { to: '/login', label: 'Log in' },
      { to: '/hr-join', label: 'Join as HR' },
      { to: '/join', label: 'Join as Employee' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { to: '/terms', label: 'Terms of use' },
      { to: '/privacy', label: 'Privacy policy' },
      { to: '/cookies', label: 'Cookie policy' },
    ],
  },
]

const linkCls =
  'text-sm text-neutral-400 transition-colors hover:text-white focus:outline-none focus-visible:text-white'

const Footer = () => {
  const socials = SOCIALS.filter((s) => s.href)

  return (
    <footer className="border-t border-white/10 bg-black px-4 pt-16 text-white sm:px-6">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1fr_1.3fr]">
          {/* Brand */}
          <div className="md:col-span-2 lg:col-span-1">
            <Link to="/" className="text-2xl tracking-tight text-white" style={SERIF}>
              assetverse
            </Link>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-neutral-500">
              Corporate asset and HR management to track, assign and manage company resources with full transparency.
            </p>

            {socials.length > 0 && (
              <div className="mt-5 flex gap-2">
                {socials.map(({ label, icon: Icon, href }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-neutral-400 transition-colors hover:bg-white/5 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
                  >
                    <Icon size={14} />
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Link columns */}
          {COLUMNS.map(({ title, links }) => (
            <nav key={title} aria-label={title}>
              <h2 className="text-sm font-medium text-white">{title}</h2>
              <ul className="mt-4 space-y-3">
                {links.map(({ to, label }) => (
                  <li key={to}>
                    <Link to={to} className={linkCls}>
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          {/* Contact */}
          <div>
            <h2 className="text-sm font-medium text-white">Contact</h2>
            <ul className="mt-4 space-y-3">
              <li>
                <a href="mailto:sopno263@gmail.com" className={linkCls}>
                  sopno263@gmail.com
                </a>
              </li>
              <li>
                <a href="tel:01779616662" className={linkCls}>
                  01779616662
                </a>
              </li>
              <li className="text-sm text-neutral-400">Dhaka, Bangladesh</li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/10 py-6 sm:flex-row">
          <p className="text-xs text-neutral-500">
            &copy; {new Date().getFullYear()} AssetVerse. All rights reserved.
          </p>
          <p className="flex items-center gap-2 text-xs text-neutral-500">
            Made by
            <SinnersLogo className="h-5 w-5 text-neutral-300" cut="#000000" />
            <span className="font-medium text-neutral-300">Studio Sinner</span>
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer