import { Link, useLocation, useNavigate } from 'react-router'
import { FcGoogle } from 'react-icons/fc'
import useAuth from '../../hooks/useAuth'
import { toast } from 'react-hot-toast'
import { TbFidgetSpinner } from 'react-icons/tb'
import { useForm } from 'react-hook-form'
import { motion } from 'framer-motion'
import { imageUpload, saveOrUpdateUser } from '../../utils'

const SERIF = { fontFamily: "'Newsreader', Georgia, 'Times New Roman', serif" }

const inputCls =
  'w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-neutral-600 transition-colors focus:border-white/30 focus:bg-white/[0.07] focus:outline-none focus-visible:ring-2 focus-visible:ring-white/20 aria-[invalid=true]:border-red-400/60'
const labelCls = 'mb-1.5 block text-sm font-medium text-neutral-300'

const FieldError = ({ id, error }) =>
  error ? (
    <p id={id} role="alert" className="mt-1.5 text-xs text-red-400">
      {error.message}
    </p>
  ) : null

const SignUp = () => {
  const { createUser, updateUserProfile, signInWithGoogle, loading } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state || '/'

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const onSubmit = async (data) => {
    const { name, image, email, password } = data
    const imageFile = image[0]

    try {
      const imageURL = await imageUpload(imageFile)
      await createUser(email, password)
      await saveOrUpdateUser({ name, email, image: imageURL })
      await updateUserProfile(name, imageURL)

      navigate(from, { replace: true })
      toast.success('Signup Successful')
    } catch (err) {
      toast.error(err?.message || 'Signup failed')
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
      toast.success('Signup Successful')
    } catch (err) {
      toast.error(err?.message)
    }
  }

  return (
    <div className="relative isolate flex min-h-screen items-center justify-center overflow-hidden bg-black px-4 py-24">
      {/* Soft warm glow, same as the hero */}
      <div className="absolute -right-40 top-1/4 -z-10 h-[500px] w-[500px] rounded-full bg-orange-900/20 blur-[140px]" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="w-full max-w-lg rounded-3xl border border-white/10 bg-white/[0.03] p-8 text-white backdrop-blur-xl sm:p-10"
      >
        <div className="mb-8 text-center">
          <h1 className="text-4xl tracking-tight text-neutral-50" style={SERIF}>
            Create your account
          </h1>
          <p className="mt-2 text-sm text-neutral-400">Join AssetVerse and start managing assets</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
          <div>
            <label htmlFor="name" className={labelCls}>
              Full name
            </label>
            <input
              id="name"
              type="text"
              autoComplete="name"
              placeholder="Your name"
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? 'name-error' : undefined}
              className={inputCls}
              {...register('name', { required: 'Name is required' })}
            />
            <FieldError id="name-error" error={errors.name} />
          </div>

          <div>
            <label htmlFor="image" className={labelCls}>
              Profile image
            </label>
            <input
              id="image"
              type="file"
              accept="image/*"
              aria-invalid={!!errors.image}
              aria-describedby={errors.image ? 'image-error' : undefined}
              className={`${inputCls} cursor-pointer p-2 text-neutral-400 file:mr-4 file:cursor-pointer file:rounded-full file:border-none file:bg-white file:px-4 file:py-1.5 file:text-xs file:font-medium file:text-neutral-950 hover:file:bg-neutral-200`}
              {...register('image', { required: 'Image is required' })}
            />
            <FieldError id="image-error" error={errors.image} />
          </div>

          <div>
            <label htmlFor="email" className={labelCls}>
              Email address
            </label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              placeholder="you@company.com"
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? 'email-error' : undefined}
              className={inputCls}
              {...register('email', {
                required: 'Email is required',
                pattern: { value: /^\S+@\S+$/i, message: 'Invalid email' },
              })}
            />
            <FieldError id="email-error" error={errors.email} />
          </div>

          <div>
            <label htmlFor="password" className={labelCls}>
              Password
            </label>
            <input
              id="password"
              type="password"
              autoComplete="new-password"
              placeholder="At least 6 characters"
              aria-invalid={!!errors.password}
              aria-describedby={errors.password ? 'password-error' : undefined}
              className={inputCls}
              {...register('password', {
                required: 'Password is required',
                minLength: { value: 6, message: 'Minimum 6 characters' },
              })}
            />
            <FieldError id="password-error" error={errors.password} />
          </div>

          <button
            disabled={loading}
            type="submit"
            className="flex w-full items-center justify-center rounded-full bg-white py-3 text-sm font-medium text-neutral-950 transition-colors hover:bg-neutral-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? <TbFidgetSpinner className="animate-spin" size={20} /> : 'Create account'}
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
          disabled={loading}
          className="flex w-full items-center justify-center gap-3 rounded-full border border-white/10 bg-white/5 py-3 text-sm font-medium text-neutral-100 transition-colors hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <FcGoogle size={20} />
          Continue with Google
        </button>

        <p className="mt-8 text-center text-sm text-neutral-400">
          Already have an account?{' '}
          <Link
            to="/login"
            state={from}
            className="font-medium text-white underline-offset-4 transition-colors hover:underline"
          >
            Log in
          </Link>
        </p>
      </motion.div>
    </div>
  )
}

export default SignUp