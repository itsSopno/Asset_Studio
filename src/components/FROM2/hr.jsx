import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'
import axios from 'axios'
import { TbFidgetSpinner } from 'react-icons/tb'
import useAxiosSecure from '../../hooks/useAxiosSecure'
import useAuth from '../../hooks/useAuth'

const SERIF = { fontFamily: "'Newsreader', Georgia, 'Times New Roman', serif" }

const inputCls =
  'w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-neutral-600 transition-colors focus:border-white/30 focus:bg-white/[0.07] focus:outline-none focus-visible:ring-2 focus-visible:ring-white/20 [color-scheme:dark]'
const labelCls = 'mb-1.5 block text-sm font-medium text-neutral-300'

const HRForm = () => {
  const { user } = useAuth()
  const axiosSecure = useAxiosSecure()
  const [form, setForm] = useState({
    name: '',
    companyName: '',
    companyLogo: '',
    password: '',
    dateOfBirth: '',
  })
  const [loading, setLoading] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    if (user?.email) {
      setForm((prev) => ({ ...prev, email: user.email }))
    }
  }, [user])

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleImageUpload = async (e) => {
    const file = e.target.files[0]
    if (!file) return
    const formData = new FormData()
    formData.append('image', file)

    setLoading(true)
    try {
      const res = await axios.post(
        `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`,
        formData
      )
      setForm((prev) => ({ ...prev, companyLogo: res.data.data.url }))
      toast.success('Logo uploaded successfully!')
    } catch (err) {
      toast.error('Failed to upload image')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.companyLogo) return toast.error('Please upload a company logo first')

    setSubmitting(true)
    try {
      if (!user) {
        toast.error('You must be logged in to register as HR')
        return
      }

      const token = await user.getIdToken()
      const res = await axiosSecure.post(
        '/join-hr',
        { ...form, email: user.email },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      toast.success(res.data.message)
      setForm({ name: '', companyName: '', companyLogo: '', password: '', dateOfBirth: '' })
    } catch (err) {
      console.error(err)
      toast.error(err.response?.data?.message || 'Unauthorized or Error')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="relative isolate flex min-h-screen items-center justify-center overflow-hidden bg-black px-4 py-24">
      <div className="absolute -right-40 top-1/4 -z-10 h-[500px] w-[500px] rounded-full bg-orange-900/20 blur-[140px]" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="w-full max-w-lg rounded-3xl border border-white/10 bg-white/[0.03] p-8 text-white backdrop-blur-xl sm:p-10"
      >
        <div className="mb-8 text-center">
          <h1 className="text-4xl tracking-tight text-neutral-50" style={SERIF}>
            Join as HR
          </h1>
          <p className="mt-2 text-sm leading-relaxed text-neutral-400">
            Create your HR account to manage employees and company assets.
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
            <label htmlFor="companyName" className={labelCls}>
              Company name
            </label>
            <input
              id="companyName"
              type="text"
              name="companyName"
              value={form.companyName}
              onChange={handleChange}
              autoComplete="organization"
              required
              placeholder="Your company"
              className={inputCls}
            />
          </div>

          <div>
            <label htmlFor="companyLogo" className={labelCls}>
              Company logo
            </label>
            <input
              id="companyLogo"
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className={`${inputCls} cursor-pointer p-2 text-neutral-400 file:mr-4 file:cursor-pointer file:rounded-full file:border-none file:bg-white file:px-4 file:py-1.5 file:text-xs file:font-medium file:text-neutral-950 hover:file:bg-neutral-200`}
            />
            {loading && (
              <p className="mt-2 flex items-center gap-2 text-xs text-neutral-500">
                <TbFidgetSpinner className="animate-spin" size={14} /> Uploading…
              </p>
            )}
            {form.companyLogo && (
              <img
                src={form.companyLogo}
                alt="Company logo preview"
                className="mt-3 h-16 w-16 rounded-xl border border-white/10 object-cover"
              />
            )}
          </div>

          <div>
            <label htmlFor="email" className={labelCls}>
              Email address
            </label>
            <input
              id="email"
              type="email"
              name="email"
              value={user?.email || ''}
              readOnly
              className={`${inputCls} cursor-not-allowed text-neutral-500`}
            />
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="password" className={labelCls}>
                Password
              </label>
              <input
                id="password"
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                autoComplete="new-password"
                required
                minLength={6}
                placeholder="Min 6 characters"
                className={inputCls}
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
          </div>

          <button
            type="submit"
            disabled={loading || submitting}
            className="flex w-full items-center justify-center rounded-full bg-white py-3 text-sm font-medium text-neutral-950 transition-colors hover:bg-neutral-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black disabled:cursor-not-allowed disabled:opacity-60"
          >
            {submitting ? <TbFidgetSpinner className="animate-spin" size={20} /> : 'Register'}
          </button>
        </form>
      </motion.div>
    </div>
  )
}

export default HRForm