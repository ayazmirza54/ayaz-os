import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

/**
 * BootScreen — fake boot animation with progress bar.
 *
 * Shows a logo, tagline, and animated progress bar.
 * After ~2.5s, fades out and calls onComplete.
 *
 * Props:
 *   onComplete — callback when boot finishes
 */
export default function BootScreen({ onComplete }) {
    const [done, setDone] = useState(false)

    useEffect(() => {
        const timer = setTimeout(() => {
            setDone(true)
            setTimeout(onComplete, 500) // wait for fade-out
        }, 2500)
        return () => clearTimeout(timer)
    }, [onComplete])

    return (
        <motion.div
            className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-[#0a1a10]"
            animate={{ opacity: done ? 0 : 1 }}
            transition={{ duration: 0.5 }}
        >
            {/* Logo */}
            <motion.div
                className="text-5xl font-bold tracking-tight mb-3"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
            >
                <span className="text-white">ayaz</span>
                <span className="text-teal-400">OS</span>
            </motion.div>

            {/* Tagline */}
            <motion.p
                className="text-white/30 text-sm mb-8 boot-pulse"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
            >
                Loading workspace...
            </motion.p>

            {/* Progress bar */}
            <div className="w-48 h-1 rounded-full bg-white/10 overflow-hidden">
                <div className="h-full rounded-full bg-gradient-to-r from-teal-500 to-emerald-400 progress-fill" />
            </div>

            {/* Subtle bottom text */}
            <motion.p
                className="absolute bottom-8 text-white/15 text-xs"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
            >
                v1.0.0 · built with ❤️
            </motion.p>
        </motion.div>
    )
}
