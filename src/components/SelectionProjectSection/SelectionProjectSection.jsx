import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  AiOutlineInbox,
  AiOutlineCheckCircle,
  AiOutlineTeam,
  AiOutlineClockCircle,
  AiOutlineBarChart,
  AiOutlineSafetyCertificate,
} from 'react-icons/ai'

const SERIF = { fontFamily: "'Newsreader', Georgia, 'Times New Roman', serif" }

/*
  Put your images in: public/images/features/
  Each card takes a list of sources. If the first fails to load,
  the next one is tried. If all fail, the card shows without an image.
*/
const FEATURES = [
  {
    icon: AiOutlineInbox,
    title: 'One inventory for everything',
    desc: 'Laptops, monitors, keyboards and more, all listed in one place with quantity, type and availability.',
    images: ['https://i.pinimg.com/1200x/b8/36/0d/b8360d27e65d3ed943fe6d1a6bb95273.jpg'],
    wide: true,
  },
  {
    icon: AiOutlineCheckCircle,
    title: 'Request and approve',
    desc: 'Employees request an asset, HR approves or rejects. Every decision is recorded.',
    images: ['/images/features/approve.jpg'],
  },
  {
    icon: AiOutlineTeam,
    title: 'Team directory',
    desc: 'See who is on your team and exactly which assets each person holds.',
    images: ['/images/features/team.jpg'],
  },
  {
    icon: AiOutlineClockCircle,
    title: 'Returns that don\u2019t slip',
    desc: 'Track returnable items and know what is due back before it goes missing.',
    images: ['/images/features/returns.jpg'],
  },
  {
    icon: AiOutlineBarChart,
    title: 'Clear reports',
    desc: 'Understand stock levels and most requested items at a glance.',
    images: ['/images/features/reports.jpg'],
    wide: true,
  },
  {
    icon: AiOutlineSafetyCertificate,
    title: 'Role-based access',
    desc: 'HR managers and employees each see only what they need.',
    images: ['/images/features/access.jpg'],
  },
]

/* Tries each source in order; renders nothing if all fail */
const FeatureImage = ({ sources, tall }) => {
  const [index, setIndex] = useState(0)
  if (!sources?.length || index >= sources.length) return null

  return (
    <div className={`relative mb-6 overflow-hidden rounded-2xl bg-white/5 ${tall ? 'h-56' : 'h-44'}`}>
      <img
        key={sources[index]}
        src={sources[index]}
        alt=""
        loading="lazy"
        referrerPolicy="no-referrer"
        onError={() => setIndex((i) => i + 1)}
        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
    </div>
  )
}

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
}
const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}

const Features = () => (
  <section id="features" className="relative bg-black px-4 py-24 text-white sm:px-6 sm:py-32">
    <div className="mx-auto max-w-6xl">
      <div className="mx-auto max-w-2xl text-center">
        <span className="inline-block rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-neutral-300">
          Features
        </span>
        <h2 className="mt-5 text-4xl leading-tight tracking-tight text-neutral-50 sm:text-5xl" style={SERIF}>
          Everything you need to manage assets
        </h2>
        <p className="mt-5 text-sm leading-relaxed text-neutral-400 sm:text-[15px]">
          From the first request to the final return, AssetVerse keeps HR and employees on the same page.
        </p>
      </div>

      <motion.ul
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="mt-16 grid gap-4 md:grid-cols-3"
      >
        {FEATURES.map(({ icon: Icon, title, desc, images, wide }) => (
          <motion.li
            key={title}
            variants={item}
            className={`group rounded-3xl border border-white/10 bg-white/[0.03] p-4 transition-colors hover:border-white/20 hover:bg-white/[0.05] ${
              wide ? 'md:col-span-2' : ''
            }`}
          >
            <FeatureImage sources={images} tall={wide} />
            <div className="px-3 pb-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-neutral-100">
                <Icon size={20} />
              </span>
              <h3 className="mt-5 text-2xl text-neutral-50" style={SERIF}>
                {title}
              </h3>
              <p className="mt-3 max-w-md text-sm leading-relaxed text-neutral-400">{desc}</p>
            </div>
          </motion.li>
        ))}
      </motion.ul>
    </div>
  </section>
)

export default Features