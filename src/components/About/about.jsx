import { useState } from 'react'
import { motion } from 'framer-motion'
import { FaBuilding, FaUsersCog, FaShieldAlt, FaChartLine, FaDesktop } from 'react-icons/fa'

const SERIF = { fontFamily: "'Newsreader', Georgia, 'Times New Roman', serif" }

const benefits = [
  {
    title: 'Centralized asset control',
    desc: 'One dashboard with real-time availability and tracking.',
    icon: FaBuilding,
  },
  {
    title: 'Smart employee management',
    desc: 'Affiliate employees across companies with package-based limits.',
    icon: FaUsersCog,
  },
  {
    title: 'Secure and transparent',
    desc: 'Role-based approvals keep every action accountable.',
    icon: FaShieldAlt,
  },
  {
    title: 'Built to scale',
    desc: 'Flexible plans with integrated payments and analytics.',
    icon: FaChartLine,
  },
]

/*
  Put your images in: public/images/about/
  Each tile takes a list of sources and tries them in order.
  If all fail, a neutral placeholder keeps the layout intact.
*/
const ImageTile = ({ sources, fallbackIcon: Icon, className = '' }) => {
  const [index, setIndex] = useState(0)
  const failed = index >= sources.length

  return (
    <div className={`overflow-hidden rounded-3xl border border-white/10 bg-neutral-900 ${className}`}>
      {failed ? (
        <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-neutral-800 to-neutral-950 text-neutral-600">
          <Icon size={40} aria-hidden="true" />
        </div>
      ) : (
        <img
          key={sources[index]}
          src={sources[index]}
          alt=""
          loading="lazy"
          referrerPolicy="no-referrer"
          onError={() => setIndex((i) => i + 1)}
          className="h-full w-full object-cover"
        />
      )}
    </div>
  )
}

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
}

const AboutAssetVerse = () => (
  <section id="about" className="relative bg-black px-4 py-20 text-white sm:px-6 sm:py-24">
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2 lg:gap-16"
    >
      {/* Text */}
      <div>
        <span className="inline-block rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-neutral-300">
          About
        </span>
        <h2 className="mt-5 text-4xl leading-tight tracking-tight text-neutral-50 sm:text-5xl" style={SERIF}>
          Smart asset control for smarter businesses
        </h2>
        <p className="mt-5 max-w-lg text-sm leading-relaxed text-neutral-400 sm:text-[15px]">
          AssetVerse is a cloud-based asset and HR management platform. HR managers handle inventory, assignments,
          approvals and subscriptions, while employees request and track assets across organizations from one place.
        </p>

        <ul className="mt-10 grid gap-x-8 gap-y-7 sm:grid-cols-2">
          {benefits.map(({ title, desc, icon: Icon }) => (
            <li key={title} className="flex gap-4">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/10 text-neutral-200">
                <Icon size={16} aria-hidden="true" />
              </span>
              <div>
                <h3 className="text-sm font-medium text-white">{title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-neutral-500">{desc}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Images */}
      <div className="relative pb-12 sm:pb-16">
        <ImageTile
          sources={['https://i.pinimg.com/736x/0a/47/ff/0a47ffa8e05de1e794a7412ae14752b2.jpg']}
          fallbackIcon={FaDesktop}
          className="ml-auto aspect-[4/3] w-[88%]"
        />
        <ImageTile
          sources={['https://i.pinimg.com/736x/70/ea/21/70ea215059f2b17a065a887fd911bff9.jpg']}
          fallbackIcon={FaBuilding}
          className="absolute bottom-0 left-0 aspect-[4/3] w-[52%] border-4 border-black shadow-2xl shadow-black/60"
        />
      </div>
    </motion.div>
  </section>
)

export default AboutAssetVerse