import { motion, useReducedMotion } from 'framer-motion'

const SERIF = { fontFamily: "'Newsreader', Georgia, 'Times New Roman', serif" }

const LogoMark = () => (
  <svg
    width="44"
    height="44"
    viewBox="0 0 32 32"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <circle cx="16" cy="16" r="13" />
    <path d="M16 8 8.5 12v0L16 16l7.5-4L16 8Z" />
    <path d="m8.5 16 7.5 4 7.5-4" />
    <path d="m8.5 20 7.5 4 7.5-4" />
  </svg>
)

const AssetVerseProfessionalLoader = () => {
  const reduceMotion = useReducedMotion()

  return (
    <section
      role="status"
      aria-live="polite"
      className="relative isolate flex min-h-screen w-full items-center justify-center overflow-hidden bg-black px-4"
    >
      {/* Soft warm glow, same as the rest of the site */}
      <div className="absolute left-1/2 top-1/2 -z-10 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-orange-900/20 blur-[140px]" />

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="flex flex-col items-center gap-6 text-white"
      >
        <motion.div
          animate={reduceMotion ? undefined : { opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <LogoMark />
        </motion.div>

        <h1 className="text-4xl tracking-tight text-neutral-50 sm:text-5xl" style={SERIF}>
          assetverse
        </h1>

        {/* Thin progress line */}
        <div className="relative h-px w-40 overflow-hidden bg-white/10">
          <motion.span
            className="absolute inset-y-0 left-0 w-1/3 bg-white"
            animate={reduceMotion ? { x: '100%' } : { x: ['-100%', '300%'] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>

        <span className="sr-only">Loading</span>
      </motion.div>
    </section>
  )
}

export default AssetVerseProfessionalLoader