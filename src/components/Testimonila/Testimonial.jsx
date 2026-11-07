import { motion } from 'framer-motion'
import { FaUsers, FaBuilding, FaStar } from 'react-icons/fa'

const SERIF = { fontFamily: "'Newsreader', Georgia, 'Times New Roman', serif" }

const testimonialsData = [
  {
    name: 'TechNova Ltd',
    position: 'HR Manager',
    testimonial:
      "AssetVerse has completely transformed how we manage office assets. It's intuitive and reliable.",
  },
  {
    name: 'InnovaTech',
    position: 'Operations Lead',
    testimonial: 'The multi-company support and automated workflow are exactly what we needed.',
  },
  {
    name: 'SoftSolutions',
    position: 'CEO',
    testimonial:
      'Tracking assets and employee requests has never been easier. Highly recommend AssetVerse!',
  },
]

const statsData = [
  { icon: FaUsers, value: '500+', label: 'Active employees' },
  { icon: FaBuilding, value: '100+', label: 'Companies trust us' },
  { icon: FaStar, value: '4.8/5', label: 'Average rating' },
]

const container = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } }
const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}

const initials = (name) =>
  name
    .split(' ')
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()

const TestimonialsStats = () => (
  <section className="relative bg-black px-4 py-24 text-white sm:px-6 sm:py-32">
    <div className="mx-auto max-w-6xl">
      {/* Heading */}
      <div className="mx-auto max-w-2xl text-center">
        <span className="inline-block rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-neutral-300">
          Testimonials
        </span>
        <h2 className="mt-5 text-4xl leading-tight tracking-tight text-neutral-50 sm:text-5xl" style={SERIF}>
          Trusted by teams that manage assets
        </h2>
        <p className="mt-5 text-sm leading-relaxed text-neutral-400 sm:text-[15px]">
          Companies across industries rely on AssetVerse for efficient asset and employee management.
        </p>
      </div>

      {/* Stats strip */}
      <motion.dl
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        className="mt-16 grid divide-y divide-white/10 overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] md:grid-cols-3 md:divide-x md:divide-y-0"
      >
        {statsData.map(({ icon: Icon, value, label }) => (
          <motion.div key={label} variants={item} className="flex flex-col items-center px-6 py-10 text-center">
            <Icon className="text-lg text-neutral-500" aria-hidden="true" />
            <dt className="order-2 mt-2 text-sm text-neutral-400">{label}</dt>
            <dd className="order-1 mt-4 text-5xl tracking-tight text-neutral-50" style={SERIF}>
              {value}
            </dd>
          </motion.div>
        ))}
      </motion.dl>

      {/* Testimonials */}
      <motion.ul
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="mt-4 grid gap-4 md:grid-cols-3"
      >
        {testimonialsData.map(({ name, position, testimonial }) => (
          <motion.li
            key={name}
            variants={item}
            className="flex flex-col justify-between rounded-3xl border border-white/10 bg-white/[0.03] p-7 transition-colors hover:border-white/20 hover:bg-white/[0.05]"
          >
            <blockquote>
              <span className="block text-5xl leading-none text-neutral-600" style={SERIF} aria-hidden="true">
                &ldquo;
              </span>
              <p className="mt-2 text-[17px] leading-relaxed text-neutral-200" style={SERIF}>
                {testimonial}
              </p>
            </blockquote>

            <figcaption className="mt-8 flex items-center gap-3 border-t border-white/10 pt-5">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-xs font-semibold text-neutral-200">
                {initials(name)}
              </span>
              <span>
                <span className="block text-sm font-medium text-white">{name}</span>
                <span className="block text-xs text-neutral-500">{position}</span>
              </span>
            </figcaption>
          </motion.li>
        ))}
      </motion.ul>
    </div>
  </section>
)

export default TestimonialsStats