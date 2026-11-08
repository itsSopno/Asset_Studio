import { useState } from 'react'
import { Link } from 'react-router'
import { motion } from 'framer-motion'
import { FaDesktop } from 'react-icons/fa'

const SERIF = { fontFamily: "'Newsreader', Georgia, 'Times New Roman', serif" }

const HR_STEPS = [
  { title: 'Register your company', desc: 'Create an HR account and add your company name and logo.' },
  { title: 'Choose a package', desc: 'Pick a plan that fits your team size and upgrade any time.' },
  { title: 'Add and manage assets', desc: 'List laptops, devices and equipment with quantity and type.' },
  { title: 'Approve and assign', desc: 'Review employee requests, approve them and assign assets.' },
]

const EMPLOYEE_STEPS = [
  { title: 'Create your account', desc: 'Sign up and join as an employee with your basic details.' },
  { title: 'Request an asset', desc: 'Browse available assets and send a request to your company.' },
  { title: 'Get approved', desc: 'HR reviews your request and assigns the asset to you.' },
  { title: 'Track and return', desc: 'See everything assigned to you and return items when needed.' },
]

/*
  Put your image at: public/images/how-it-works.jpg  (about 1400x600)
  A second source can be added as a backup. If all fail, a placeholder shows.
*/
const IMAGE_SOURCES = ['https://i.pinimg.com/1200x/f0/8e/35/f08e35de6d2615759c255a7e34bcba23.jpg']

const HeroImage = ({ sources = IMAGE_SOURCES }) => {
  const [index, setIndex] = useState(0)
  const failed = index >= sources.length

  return (
    <div className="aspect-[21/9] w-full overflow-hidden rounded-3xl border border-white/10 bg-neutral-900">
      {failed ? (
        <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-neutral-800 to-neutral-950 text-neutral-600">
          <FaDesktop size={40} aria-hidden="true" />
        </div>
      ) : (
        <img
          key={sources[index]}
          src={sources[index]}
          alt="AssetVerse dashboard overview"
          width="1400"
          height="600"
          decoding="async"
          referrerPolicy="no-referrer"
          onError={() => setIndex((i) => i + 1)}
          className="h-full w-full object-cover"
        />
      )}
    </div>
  )
}

const StepList = ({ label, title, steps, cta }) => (
  <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-7 sm:p-8">
    <span className="inline-block rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-neutral-300">
      {label}
    </span>
    <h2 className="mt-4 text-3xl tracking-tight text-neutral-50" style={SERIF}>
      {title}
    </h2>

    <ol className="mt-7 space-y-6">
      {steps.map(({ title: t, desc }, i) => (
        <li key={t} className="flex gap-4">
          <span className="w-7 shrink-0 text-2xl leading-none text-neutral-600" style={SERIF}>
            {String(i + 1).padStart(2, '0')}
          </span>
          <div>
            <h3 className="text-[15px] font-medium text-white">{t}</h3>
            <p className="mt-1 text-sm leading-relaxed text-neutral-500">{desc}</p>
          </div>
        </li>
      ))}
    </ol>

    <Link
      to={cta.to}
      className="mt-8 inline-flex items-center rounded-full border border-white/15 bg-white/5 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
    >
      {cta.label}
    </Link>
  </div>
)

const HowItWorks = () => (
  <div className="relative isolate overflow-hidden bg-black px-4 pb-20 pt-32 text-white sm:px-6 sm:pb-24">
    <div className="absolute -left-40 top-20 -z-10 h-[500px] w-[500px] rounded-full bg-orange-900/20 blur-[140px]" />

    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="mx-auto max-w-6xl"
    >
      <div className="mx-auto max-w-2xl text-center">
        <span className="inline-block rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-neutral-300">
          How it works
        </span>
        <h1 className="mt-5 text-4xl leading-tight tracking-tight text-neutral-50 sm:text-5xl" style={SERIF}>
          One platform, two roles
        </h1>
        <p className="mt-5 text-sm leading-relaxed text-neutral-400 sm:text-[15px]">
          HR managers control the inventory and approvals. Employees request and track what they need. Here is how
          each side works.
        </p>
      </div>

      <div className="mt-12">
        <HeroImage />
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <StepList
          label="For HR managers"
          title="Manage assets with control"
          steps={HR_STEPS}
          cta={{ to: '/hr-join', label: 'Join as HR' }}
        />
        <StepList
          label="For employees"
          title="Request assets with ease"
          steps={EMPLOYEE_STEPS}
          cta={{ to: '/join', label: 'Join as Employee' }}
        />
      </div>
    </motion.div>
  </div>
)

export default HowItWorks