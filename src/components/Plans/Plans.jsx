import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { motion } from 'framer-motion'
import Container from '../Shared/Container'
import LoadingSpinner from '../Shared/LoadingSpinner'
import PlanCard from '../PlanCard/PlanCard'

const SERIF = { fontFamily: "'Newsreader', Georgia, 'Times New Roman', serif" }

const fetchPlans = async () => {
  const res = await axios.get(`${import.meta.env.VITE_API_URL}/plans`)
  if (Array.isArray(res.data)) return res.data
  if (Array.isArray(res.data.plans)) return res.data.plans
  if (Array.isArray(res.data.data)) return res.data.data

  return []
}

const PlansPage = () => {
  const {
    data: plans,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['plans'],
    queryFn: fetchPlans,
  })

  if (isLoading) return <LoadingSpinner />

  if (isError) {
    return (
      <div className="bg-black px-4 py-32 text-center text-sm text-red-400">
        Failed to load plans: {error.message}
      </div>
    )
  }

  return (
    <div className="relative isolate overflow-hidden bg-black px-4 pb-24 pt-32 text-white sm:px-6">

      <Container>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="mx-auto max-w-2xl text-center"
        >
          <span className="inline-block rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-neutral-300">
            Pricing
          </span>
          <h1 className="mt-5 text-4xl leading-tight tracking-tight text-neutral-50 sm:text-5xl" style={SERIF}>
            Plans that grow with your team
          </h1>
          <p className="mt-5 text-sm leading-relaxed text-neutral-400 sm:text-[15px]">
            From small teams to enterprises, AssetVerse gives you the tools to track, manage and secure your assets.
          </p>
        </motion.div>

        {plans.length === 0 ? (
          <p className="mt-16 text-center text-sm text-neutral-500">No plans available.</p>
        ) : (
          <div className="mx-auto mt-14 grid max-w-5xl gap-4 md:grid-cols-2 lg:grid-cols-3">
            {plans.map((plan, i) => (
              <PlanCard key={plan._id} plan={plan} index={i} />
            ))}
          </div>
        )}
      </Container>
    </div>
  )
}

export default PlansPage