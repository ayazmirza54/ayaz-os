import { motion } from 'framer-motion'
import { useState, useEffect, useCallback } from 'react'

/**
 * BootScreen — fake boot animation with progress bar and startup chime.
 *
 * Shows a "click to boot" prompt first (so the browser unlocks audio),
 * then runs the animation with logo, tagline, progress bar, and chime.
 *
 * Props:
 *   onComplete — callback when boot finishes
 *   sounds    — sound effects object from useSoundEffects
 */
export default function BootScreen({ onComplete, sounds }) {
    const [started, setStarted] = useState(false)
    const [done, setDone] = useState(false)
    const [flash, setFlash] = useState(false)

    const handleStart = useCallback(() => {
        setStarted(true)
    }, [])

    useEffect(() => {
        if (!started) return
        const timer = setTimeout(() => {
            // Play the startup chime (user already clicked — audio is unlocked)
            sounds?.bootChime?.()
            // Trigger the screen flash
            setFlash(true)
            setTimeout(() => setFlash(false), 400)
            // Start fade-out
            setDone(true)
            setTimeout(onComplete, 600)
        }, 2500)
        return () => clearTimeout(timer)
    }, [started, onComplete, sounds])

    return (
        <motion.div
            className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-[#0a1a10]"
            animate={{ opacity: done ? 0 : 1 }}
            transition={{ duration: 0.5 }}
        >
            {/* Boot flash overlay */}
            <motion.div
                className="absolute inset-0 bg-teal-400/10 pointer-events-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: flash ? 1 : 0 }}
                transition={{ duration: 0.15 }}
            />

            {!started ? (
                /* ===== Click to boot prompt ===== */
                <motion.button
                    onClick={handleStart}
                    className="flex flex-col items-center gap-6 cursor-pointer group"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    {/* Power icon */}
                    <motion.div
                        className="w-20 h-20 rounded-full border-2 border-teal-400/40 flex items-center justify-center
                                   group-hover:border-teal-400/70 group-hover:shadow-[0_0_30px_rgba(45,212,191,0.15)]
                                   transition-all duration-300"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <svg className="w-8 h-8 text-teal-400/60 group-hover:text-teal-400 transition-colors duration-300"
                            fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round"
                                d="M5.636 5.636a9 9 0 1013.728 0M12 3v9" />
                        </svg>
                    </motion.div>

                    {/* Label */}
                    <div>
                        <div className="text-lg font-bold tracking-tight">
                            <span className="text-white">ayaz</span>
                            <span className="text-teal-400">OS</span>
                        </div>
                        <p className="text-white/25 text-xs mt-1 boot-pulse">click to boot</p>
                    </div>
                </motion.button>
            ) : (
                /* ===== Boot animation ===== */
                <>
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
                </>
            )}
        </motion.div>
    )
}
