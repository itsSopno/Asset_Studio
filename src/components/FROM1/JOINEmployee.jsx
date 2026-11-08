import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'
import { TbFidgetSpinner } from 'react-icons/tb'
import useAuth from '../../hooks/useAuth'
import useAxiosSecure from '../../hooks/useAxiosSecure'

const SERIF = { fontFamily: "'Newsreader', Georgia, 'Times New Roman', serif" }

const inputCls =
  'w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-neutral-600 transition-colors focus:border-white/30 focus:bg-white/[0.07] focus:outline-none focus-visible:ring-2 focus-visible:ring-white/20 [color-scheme:dark]'
const labelCls = 'mb-1.5 block text-sm font-medium text-neutral-300'

const EmployeeForm = () => {
  const { user } = useAuth()
  const axiosSecure = useAxiosSecure()
  const [submitting, setSubmitting] = useState(false)

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    dateOfBirth: '',
  })

  useEffect(() => {
    if (user?.email) {
      setForm((prev) => ({
        ...prev,
        email: user.email,
        password: 'default123',
      }))
    }
  }, [user])

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!form.name || !form.dateOfBirth) {
      return toast.error('Please fill in all fields!')
    }

    setSubmitting(true)
    try {
      if (!user) {
        toast.error('You must be logged in to register as employee')
        return
      }

      const res = await axiosSecure.post('/join-employee', {
        ...form,
        role: 'employee',
        status: 'pending',
        image: user?.photoURL,
      })

      if (res.data.insertedId) {
        toast.success('Registration Successful!')
        setForm({ name: '', email: user.email, password: 'default123', dateOfBirth: '' })
      }
    } catch (err) {
      console.log(err)
      toast.error(err.response?.data?.message || 'Error occurred')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="relative isolate flex min-h-screen items-center justify-center overflow-hidden bg-black px-4 py-24">
      <div className="absolute -left-40 top-1/4 -z-10 h-[500px] w-[500px] rounded-full bg-orange-900/20 blur-[140px]" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="w-full max-w-md rounded-3xl border border-white/10 bg-white/[0.03] p-8 text-white backdrop-blur-xl sm:p-10"
      >
        <div className="mb-8 text-center">
          <h1 className="text-4xl tracking-tight text-neutral-50" style={SERIF}>
            Join as Employee
          </h1>
          <p className="mt-2 text-sm leading-relaxed text-neutral-400">
            Register to request and track assets from your company.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="name" className={labelCls}>
              Full name
            </label>
            <input
              id="name"
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              autoComplete="name"
              required
              placeholder="Your name"
              className={inputCls}
            />
          </div>

          <div>
            <label htmlFor="email" className={labelCls}>
              Email address
            </label>
            <input
              id="email"
              type="email"
              name="email"
              value={form.email}
              readOnly
              className={`${inputCls} cursor-not-allowed text-neutral-500`}
            />
          </div>

          <div>
            <label htmlFor="dateOfBirth" className={labelCls}>
              Date of birth
            </label>
            <input
              id="dateOfBirth"
              type="date"
              name="dateOfBirth"
              value={form.dateOfBirth}
              onChange={handleChange}
              required
              className={inputCls}
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="flex w-full items-center justify-center rounded-full bg-white py-3 text-sm font-medium text-neutral-950 transition-colors hover:bg-neutral-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black disabled:cursor-not-allowed disabled:opacity-60"
          >
            {submitting ? <TbFidgetSpinner className="animate-spin" size={20} /> : 'Register'}
          </button>
        </form>
      </motion.div>
    </div>
  )
}

export default EmployeeForm