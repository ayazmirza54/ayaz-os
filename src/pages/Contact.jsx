import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

/**
 * Contact page — pre-filled with Ayaz's real contact info.
 */
export default function Contact() {
    const [form, setForm] = useState({ name: '', email: '', message: '' })
    const [errors, setErrors] = useState({})
    const [submitted, setSubmitted] = useState(false)

    const validate = () => {
        const errs = {}
        if (!form.name.trim()) errs.name = 'Name is required'
        if (!form.email.trim()) {
            errs.email = 'Email is required'
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
            errs.email = 'Invalid email format'
        }
        if (!form.message.trim()) errs.message = 'Message is required'
        return errs
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const errs = validate()
        setErrors(errs)
        if (Object.keys(errs).length === 0) {
            setSubmitted(true)
            setTimeout(() => {
                setSubmitted(false)
                setForm({ name: '', email: '', message: '' })
            }, 3000)
        }
    }

    const handleChange = (field) => (e) => {
        setForm(prev => ({ ...prev, [field]: e.target.value }))
        if (errors[field]) setErrors(prev => ({ ...prev, [field]: '' }))
    }

    return (
        <div className="max-w-md mx-auto space-y-5 py-2">
            <div>
                <h2 className="text-lg font-bold text-white">Get in Touch</h2>
                <p className="text-sm text-white/40 mt-1">I&apos;d love to hear from you</p>
            </div>

            {/* Contact Info */}
            <div className="flex flex-wrap gap-3">
                <div className="flex items-center gap-2 px-3 py-2 rounded-xl glass-light text-xs text-white/50">
                    <span>📧</span> ayazmirza54@gmail.com
                </div>
                <div className="flex items-center gap-2 px-3 py-2 rounded-xl glass-light text-xs text-white/50">
                    <span>📱</span> +91 9889017774
                </div>
                <div className="flex items-center gap-2 px-3 py-2 rounded-xl glass-light text-xs text-white/50">
                    <span>📍</span> Lucknow, India
                </div>
            </div>

            <AnimatePresence mode="wait">
                {submitted ? (
                    <motion.div
                        key="success"
                        className="flex flex-col items-center gap-3 py-12 text-center"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                    >
                        <div className="text-4xl">✅</div>
                        <h3 className="text-base font-semibold text-white">Message Sent!</h3>
                        <p className="text-sm text-white/40">Thanks for reaching out. I&apos;ll get back to you soon.</p>
                    </motion.div>
                ) : (
                    <motion.form
                        key="form"
                        onSubmit={handleSubmit}
                        className="space-y-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <div>
                            <label className="text-xs font-medium text-white/50 mb-1.5 block">Name</label>
                            <input
                                type="text"
                                value={form.name}
                                onChange={handleChange('name')}
                                className={`form-input ${errors.name ? 'border-red-500/50' : ''}`}
                                placeholder="Your name"
                            />
                            {errors.name && <p className="text-[11px] text-red-400 mt-1">{errors.name}</p>}
                        </div>

                        <div>
                            <label className="text-xs font-medium text-white/50 mb-1.5 block">Email</label>
                            <input
                                type="email"
                                value={form.email}
                                onChange={handleChange('email')}
                                className={`form-input ${errors.email ? 'border-red-500/50' : ''}`}
                                placeholder="you@example.com"
                            />
                            {errors.email && <p className="text-[11px] text-red-400 mt-1">{errors.email}</p>}
                        </div>

                        <div>
                            <label className="text-xs font-medium text-white/50 mb-1.5 block">Message</label>
                            <textarea
                                value={form.message}
                                onChange={handleChange('message')}
                                rows={4}
                                className={`form-input resize-none ${errors.message ? 'border-red-500/50' : ''}`}
                                placeholder="What's on your mind?"
                            />
                            {errors.message && <p className="text-[11px] text-red-400 mt-1">{errors.message}</p>}
                        </div>

                        <motion.button
                            type="submit"
                            className="w-full py-2.5 rounded-xl bg-gradient-to-r from-teal-500 to-emerald-500
                         text-sm font-semibold text-white shadow-lg shadow-teal-500/20
                         hover:shadow-teal-500/30 transition-shadow"
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            Send Message
                        </motion.button>
                    </motion.form>
                )}
            </AnimatePresence>
        </div>
    )
}
