import { Link } from 'react-router'
import { motion } from 'framer-motion'
import heroBackground from './hero.jpg'
import {
  AiOutlineHome,
  AiOutlineTeam,
  AiOutlineInbox,
  AiOutlineAppstore,
  AiOutlineSearch,
  AiOutlineArrowLeft,
  AiOutlineArrowRight,
  AiOutlineLeft,
  AiOutlineRight,
  AiOutlinePlus,
  AiOutlineEllipsis,
  AiOutlineClockCircle,
  AiOutlineCheckCircle,
  AiOutlineSetting,
} from 'react-icons/ai'

const SERIF = { fontFamily: "'Newsreader', Georgia, 'Times New Roman', serif" }

const RETURNS = [
  { time: '09:00', title: 'MacBook Pro 14" returned', meta: 'Sophie Carter · Design', strong: true },
  { time: '10:30', title: 'Projector handover', meta: 'Conference room B' },
  { time: '12:00', title: 'Laptop batch audit', meta: '12 devices', dim: true },
  { time: '13:30', title: 'Monitor return due', meta: 'Daniel Okonkwo', dim: true },
]

const TASKS = [
  { icon: AiOutlineClockCircle, text: 'Approve 3 pending asset requests', open: true },
  { icon: AiOutlineCheckCircle, text: 'Reassign 2 returned keyboards' },
  { icon: AiOutlineInbox, text: 'Stock check: wireless mice below limit' },
  { icon: AiOutlineTeam, text: 'Onboarding kit for 4 new joiners' },
]

/* ---------- Dashboard mockup (decorative) ---------- */
const DashboardMockup = () => (
  <div
    aria-hidden="true"
    className="relative mx-auto w-full max-w-[1120px] overflow-hidden rounded-t-3xl border border-white/10 bg-neutral-900/70 shadow-2xl shadow-black/60 backdrop-blur-md"
  >
    {/* Window chrome */}
    <div className="flex items-center gap-4 px-4 py-3 text-neutral-500">
      <div className="flex gap-2">
        <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
        <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
        <span className="h-3 w-3 rounded-full bg-[#28c840]" />
      </div>
      <AiOutlineSearch size={16} className="ml-6 hidden sm:block" />
      <AiOutlineArrowLeft size={16} className="hidden sm:block" />
      <AiOutlineArrowRight size={16} className="hidden text-neutral-700 sm:block" />
      <div className="ml-auto hidden items-center gap-2 text-xs text-neutral-400 sm:flex">
        <AiOutlineSetting size={14} /> Customise
      </div>
    </div>

    <div className="flex gap-4 px-4 pb-0 sm:px-4">
      {/* Sidebar */}
      <div className="hidden w-14 shrink-0 flex-col items-center gap-3 rounded-2xl border border-white/5 bg-white/[0.03] py-3 sm:flex">
        <span className="mb-1 flex h-9 w-9 items-center justify-center rounded-lg bg-black text-white">
          <AiOutlineAppstore size={18} />
        </span>
        {[AiOutlineHome, AiOutlineTeam, AiOutlineInbox, AiOutlineAppstore].map((Icon, i) => (
          <span
            key={i}
            className={`flex h-9 w-9 items-center justify-center rounded-lg ${i === 0 ? 'bg-white/10 text-white' : 'text-neutral-500'}`}
          >
            <Icon size={18} />
          </span>
        ))}
      </div>

      {/* Main */}
      <div className="min-w-0 flex-1 px-1 pb-8 sm:px-4">
        <div className="mb-6 flex items-center justify-between gap-4 pt-2">
          <h3 className="text-2xl text-neutral-100 sm:text-3xl" style={SERIF}>
            Welcome back, Sophie
          </h3>
          <span className="hidden items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-neutral-100 sm:inline-flex">
            <AiOutlinePlus size={14} /> Add asset
          </span>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {/* Today */}
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
            <div className="mb-4 flex items-center justify-between text-neutral-400">
              <span className="text-sm font-medium text-neutral-200">Today</span>
              <span className="flex items-center gap-3">
                <AiOutlineLeft size={14} />
                <AiOutlineRight size={14} />
                <AiOutlinePlus size={14} />
              </span>
            </div>
            <ul className="space-y-3">
              {RETURNS.map((r) => (
                <li key={r.time} className="flex items-start gap-4">
                  <span className="w-11 pt-3 text-xs text-neutral-600">{r.time}</span>
                  <div className={`flex-1 rounded-lg bg-white/[0.05] px-4 py-3 ${r.dim ? 'opacity-50' : ''}`}>
                    <p className={`text-sm ${r.strong ? 'text-neutral-100' : 'text-neutral-300'}`}>{r.title}</p>
                    <p className="text-xs text-neutral-500">{r.meta}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Summary */}
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
            <div className="mb-4 flex items-center justify-between text-neutral-400">
              <span className="text-sm font-medium text-neutral-200">Daily summary</span>
              <AiOutlineEllipsis size={18} />
            </div>
            <ul className="space-y-1">
              {TASKS.map(({ icon: Icon, text, open }) => (
                <li
                  key={text}
                  className={`flex items-center gap-3 rounded-lg px-3 py-3 text-sm ${
                    open ? 'bg-white/[0.06] text-neutral-100' : 'text-neutral-400'
                  }`}
                >
                  <Icon size={16} className="shrink-0" />
                  {text}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>

    {/* Bottom fade into page */}
    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black to-transparent" />
  </div>
)

/* ---------- Hero ---------- */
/**
 * bgImage: your background image (the dark rocks one). Falls back to a dark gradient.
 * ctaTo:   where the main button goes.
 */
const Hero = ({
  bgImage = heroBackground,
  ctaTo = '/login',
  ctaLabel = 'Get started',
  title = 'The all-in-one platform for company assets',
  subtitle = 'Track, assign and return every asset across your team. HR approves, employees request, and nothing gets lost.',
}) => {
  return (
    <section className="relative isolate overflow-hidden bg-black pt-36 text-white sm:pt-44">
      {/* Background image + overlays */}
      {bgImage && (
        <img
          src={bgImage}
          alt=""
          className="absolute inset-0 -z-20 h-full w-full object-cover object-bottom"
        />
      )}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black via-black/70 to-black/20" />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="mx-auto flex max-w-5xl flex-col items-center px-4 text-center"
      >
        <h1
          className="text-[2.6rem] leading-[1.08] tracking-tight text-neutral-50 sm:text-6xl md:text-7xl"
          style={SERIF}
        >
          {title}
        </h1>
        <p className="mt-7 max-w-md text-sm leading-relaxed text-neutral-300 sm:text-[15px]">{subtitle}</p>
        <Link
          to={ctaTo}
          className="mt-8 inline-flex items-center rounded-full bg-white px-6 py-3 text-sm font-medium text-neutral-950 transition-colors hover:bg-neutral-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black"
        >
          {ctaLabel}
        </Link>
      </motion.div>

      <div className="mt-20 px-3 sm:mt-24 sm:px-6">
        <DashboardMockup />
      </div>
    </section>
  )
}

export default Hero