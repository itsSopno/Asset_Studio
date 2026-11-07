import { Link, Navigate, useLocation, useNavigate } from 'react-router'
import toast from 'react-hot-toast'
import LoadingSpinner from '../../components/Shared/LoadingSpinner'
import useAuth from '../../hooks/useAuth'
import { FcGoogle } from 'react-icons/fc'
import { TbFidgetSpinner } from 'react-icons/tb'
import { saveOrUpdateUser } from '../../utils'
import { motion } from 'framer-motion'

const SERIF = { fontFamily: "'Newsreader', Georgia, 'Times New Roman', serif" }

const inputCls =
  'w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-neutral-600 transition-colors focus:border-white/30 focus:bg-white/[0.07] focus:outline-none focus-visible:ring-2 focus-visible:ring-white/20'

const Login = () => {
  const { signIn, signInWithGoogle, loading, user, setLoading } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const from = location.state || '/'

  if (loading) return <LoadingSpinner />
  if (user) return <Navigate to={from} replace={true} />

  const handleSubmit = async (e) => {
    e.preventDefault()
    const email = e.target.email.value
    const password = e.target.password.value

    try {
      const { user } = await signIn(email, password)

      await saveOrUpdateUser({
        name: user?.displayName,
        email: user?.email,
        image: user?.photoURL,
      })

      navigate(from, { replace: true })
      toast.success('Login Successful')
    } catch (err) {
      toast.error(err?.message)
    }
  }

  const handleGoogleSignIn = async () => {
    try {
      const { user } = await signInWithGoogle()

      await saveOrUpdateUser({
        name: user?.displayName,
        email: user?.email,
        image: user?.photoURL,
      })

      navigate(from, { replace: true })
      toast.success('Login Successful')
    } catch (err) {
      setLoading(false)
      toast.error(err?.message)
    }
  }

  return (
    <div className="relative isolate flex min-h-screen items-center justify-center overflow-hidden bg-black px-4 py-24">
      {/* Soft warm glow, same as the hero */}
      <div className="absolute -left-40 top-1/4 -z-10 h-[500px] w-[500px] rounded-full bg-orange-900/20 blur-[140px]" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="w-full max-w-md rounded-3xl border border-white/10 bg-white/[0.03] p-8 text-white backdrop-blur-xl sm:p-10"
      >
        <div className="mb-8 text-center">
          <h1 className="text-4xl tracking-tight text-neutral-50" style={SERIF}>
            Welcome back
          </h1>
          <p className="mt-2 text-sm text-neutral-400">Sign in to your account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-neutral-300">
              Email address
            </label>
            <input
              id="email"
              type="email"
              name="email"
              autoComplete="email"
              required
              placeholder="you@company.com"
              className={inputCls}
            />
          </div>

          <div>
            <label htmlFor="password" className="mb-1.5 block text-sm font-medium text-neutral-300">
              Password
            </label>
            <input
              id="password"
              type="password"
              name="password"
              autoComplete="current-password"
              required
              placeholder="••••••••"
              className={inputCls}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="flex w-full items-center justify-center rounded-full bg-white py-3 text-sm font-medium text-neutral-950 transition-colors hover:bg-neutral-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? <TbFidgetSpinner className="animate-spin" size={20} /> : 'Continue'}
          </button>
        </form>

        <div className="my-6 flex items-center gap-3">
          <div className="h-px flex-1 bg-white/10" />
          <span className="text-xs text-neutral-500">or</span>
          <div className="h-px flex-1 bg-white/10" />
        </div>

        <button
          type="button"
          onClick={handleGoogleSignIn}
          className="flex w-full items-center justify-center gap-3 rounded-full border border-white/10 bg-white/5 py-3 text-sm font-medium text-neutral-100 transition-colors hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
        >
          <FcGoogle size={20} />
          Continue with Google
        </button>

        <p className="mt-8 text-center text-sm text-neutral-400">
          Don&rsquo;t have an account?{' '}
          <Link
            to="/signup"
            state={from}
            className="font-medium text-white underline-offset-4 transition-colors hover:underline"
          >
            Sign up
          </Link>
        </p>
      </motion.div>
    </div>
  )
}

export default Login