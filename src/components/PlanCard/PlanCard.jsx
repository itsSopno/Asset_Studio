import { useState } from 'react'
import { motion } from 'framer-motion'
import { AiOutlineCheck } from 'react-icons/ai'
import PurchaseModal from '../Modal/PurchaseModal'
import useAuth from '../../hooks/useAuth'
import useRole from '../../hooks/useRole'

const SERIF = { fontFamily: "'Newsreader', Georgia, 'Times New Roman', serif" }

const TAGLINES = {
  Basic: 'Perfect for small teams starting their asset journey.',
  Standard: 'Ideal for growing teams needing advanced management.',
  Premium: 'Full-suite solution for enterprises with priority support.',
}

const PlanCard = ({ plan, index = 0 }) => {
  const [purchaseOpen, setPurchaseOpen] = useState(false)
  const { user, loading } = useAuth()
  const [role] = useRole()

  const userLimit = user?.packageLimit
  const planLimit = plan?.employeeLimit
  const featured = plan.name === 'Standard'

  /* ---- button state (same rules as before) ---- */
  let buttonText = 'Activate plan'
  let disabled = false
  let isCurrent = false

  if (loading) {
    buttonText = 'Loading…'
    disabled = true
  } else if (role !== 'hr') {
    buttonText = 'Only HR can purchase'
    disabled = true
  } else if (userLimit === planLimit) {
    buttonText = 'Current plan'
    disabled = true
    isCurrent = true
  } else if (userLimit > planLimit) {
    buttonText = 'Downgrade not allowed'
    disabled = true
  } else {
    buttonText = 'Upgrade plan'
  }

  const buttonCls = disabled
    ? isCurrent
      ? 'border border-emerald-400/30 bg-emerald-500/10 text-emerald-300 cursor-default'
      : 'border border-white/10 bg-white/5 text-neutral-500 cursor-not-allowed'
    : featured
    ? 'bg-white text-neutral-950 hover:bg-neutral-200'
    : 'border border-white/15 bg-white/5 text-white hover:bg-white/10'

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: 'easeOut' }}
      className={`relative flex flex-col rounded-3xl border p-7 ${
        featured ? 'border-white/30 bg-white/[0.06]' : 'border-white/10 bg-white/[0.03]'
      }`}
    >
      {featured && (
        <span className="absolute right-6 top-6 rounded-full bg-white px-2.5 py-0.5 text-xs font-medium text-neutral-950">
          Popular
        </span>
      )}

      <div>
        <h2 className="text-lg font-medium text-white">{plan.name}</h2>
        <p className="mt-2 min-h-[40px] text-sm leading-relaxed text-neutral-400">
          {TAGLINES[plan.name] || TAGLINES.Basic}
        </p>

        <p className="mt-6 flex items-baseline gap-1">
          <span className="text-5xl tracking-tight text-neutral-50" style={SERIF}>
            ${plan.price}
          </span>
          <span className="text-sm text-neutral-500">/ month</span>
        </p>

        <ul className="mt-7 space-y-3 border-t border-white/10 pt-7">
          {plan.features?.map((feature, i) => (
            <li key={i} className="flex items-start gap-3 text-sm text-neutral-300">
              <AiOutlineCheck size={16} className="mt-0.5 shrink-0 text-neutral-500" aria-hidden="true" />
              {feature}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-auto pt-8">
        <button
          type="button"
          disabled={disabled}
          onClick={!disabled ? () => setPurchaseOpen(true) : undefined}
          className={`w-full rounded-full py-3 text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60 ${buttonCls}`}
        >
          {buttonText}
        </button>
      </div>

      <PurchaseModal plan={plan} isOpen={purchaseOpen} closeModal={() => setPurchaseOpen(false)} />
    </motion.div>
  )
}

export default PlanCard