import { useState } from 'react'
import { Link } from 'react-router'
import { motion, AnimatePresence } from 'framer-motion'
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai'
import THANKS from '../Thanks/thanks'

const SERIF = { fontFamily: "'Newsreader', Georgia, 'Times New Roman', serif" }

const steps = [
  { title: 'Register', desc: 'Employees and HR managers sign up and create their profiles.' },
  { title: 'Manage assets', desc: 'HR adds assets, approves requests and assigns them to employees.' },
  { title: 'Track and return', desc: 'Employees track their assigned assets and return them if applicable.' },
]

const faqData = [
  {
    question: 'Can employees belong to multiple companies?',
    answer: 'Yes, employees can request assets from multiple companies and be affiliated with them simultaneously.',
  },
  {
    question: 'How do I upgrade my subscription package?',
    answer: 'HR managers can upgrade their package from the dashboard using Stripe payment integration.',
  },
  {
    question: 'Are assets returnable?',
    answer:
      'Some assets are returnable and can be tracked when returned; non-returnable items stay assigned to employees permanently.',
  },
  {
    question: 'Is the system secure?',
    answer: 'Yes, AssetVerse uses role-based authentication and JWT tokens to ensure secure access and transparency.',
  },
]

const Tag = ({ children }) => (
  <span className="inline-block rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-neutral-300">
    {children}
  </span>
)

const Questions = ({ ctaTo = '/login' }) => {
  const [open, setOpen] = useState(0)

  return (
    <section className="bg-black px-4 pt-20 text-white sm:px-6 sm:pt-24">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
          {/* How it works */}
          <div>
            <Tag>How it works</Tag>
            <h2 className="mt-5 text-4xl leading-tight tracking-tight text-neutral-50 sm:text-5xl" style={SERIF}>
              Up and running in three steps
            </h2>
            <ol className="mt-10 space-y-7">
              {steps.map(({ title, desc }, i) => (
                <li key={title} className="flex gap-5">
                  <span className="w-8 shrink-0 text-3xl leading-none text-neutral-600" style={SERIF}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <h3 className="text-base font-medium text-white">{title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-neutral-500">{desc}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          {/* FAQ */}
          <div>
            <Tag>FAQ</Tag>
            <h2 className="mt-5 text-4xl leading-tight tracking-tight text-neutral-50 sm:text-5xl" style={SERIF}>
              Common questions
            </h2>
            <div className="mt-10 divide-y divide-white/10 border-y border-white/10">
              {faqData.map(({ question, answer }, idx) => {
                const isOpen = open === idx
                return (
                  <div key={question}>
                    <button
                      type="button"
                      onClick={() => setOpen(isOpen ? null : idx)}
                      aria-expanded={isOpen}
                      className="flex w-full items-center justify-between gap-4 py-4 text-left text-[15px] font-medium text-neutral-100 transition-colors hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
                    >
                      {question}
                      {isOpen ? (
                        <AiOutlineMinus size={14} className="shrink-0 text-neutral-400" aria-hidden="true" />
                      ) : (
                        <AiOutlinePlus size={14} className="shrink-0 text-neutral-400" aria-hidden="true" />
                      )}
                    </button>
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden"
                        >
                          <p className="pb-4 pr-8 text-sm leading-relaxed text-neutral-400">{answer}</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-20 flex flex-col items-start justify-between gap-6 rounded-3xl border border-white/10 bg-white/[0.03] p-8 sm:p-10 md:flex-row md:items-center">
          <div className="max-w-xl">
            <h2 className="text-3xl leading-tight tracking-tight text-neutral-50 sm:text-4xl" style={SERIF}>
              Get started with AssetVerse today
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-neutral-400">
              Join companies already managing their assets efficiently and start tracking your resources in minutes.
            </p>
          </div>
          <Link
            to={ctaTo}
            className="inline-flex shrink-0 items-center rounded-full bg-white px-6 py-3 text-sm font-medium text-neutral-950 transition-colors hover:bg-neutral-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black"
          >
            Get started
          </Link>
        </div>
      </div>

      <div className="mt-16">
        {/* <THANKS /> */}
      </div>
    </section>
  )
}

export default Questions