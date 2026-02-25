import { motion } from 'framer-motion'

/**
 * Dock — macOS-style bottom dock with hover sounds and click feedback.
 *
 * Shows all registered apps with open-state dot indicators.
 * Click toggles the window (open / minimize / restore).
 *
 * Props:
 *   apps — array of { id, title, icon }
 *   openWindowIds — Set or array of currently open window IDs
 *   onToggle — (id, title, icon) => void
 *   sounds — sound effects object from useSoundEffects
 */
export default function Dock({ apps, openWindowIds, onToggle, sounds }) {
    const openSet = new Set(openWindowIds)

    return (
        <motion.div
            className="fixed bottom-4 left-1/2 -translate-x-1/2 z-[9999]"
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
            <div className="flex items-end gap-1.5 px-3 py-2 rounded-2xl glass shadow-2xl">
                {apps.map((app) => (
                    <motion.button
                        key={app.id}
                        onClick={() => {
                            sounds?.buttonDown?.()
                            onToggle(app.id, app.title, app.icon)
                        }}
                        onHoverStart={() => sounds?.hover?.()}
                        className="dock-item relative flex flex-col items-center gap-1 p-1.5 rounded-xl
                       hover:bg-white/5 transition-colors duration-150 group"
                        whileHover={{ scale: 1.25, y: -8 }}
                        whileTap={{ scale: 0.9, y: 0 }}
                        transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                        title={app.title}
                    >
                        {/* Icon */}
                        <div className="w-11 h-11 rounded-xl glass-light flex items-center justify-center text-xl shadow-md
                            group-hover:shadow-teal-500/20 group-hover:border-teal-500/15 transition-shadow duration-200">
                            {typeof app.icon === 'string' ? (
                                <img src={app.icon} alt={app.title} className="w-6 h-6 object-contain" />
                            ) : (
                                <div className="w-6 h-6 text-teal-400">{app.icon}</div>
                            )}
                        </div>

                        {/* Hover glow */}
                        <motion.div
                            className="absolute inset-0 rounded-xl bg-teal-400/0 group-hover:bg-teal-400/5 transition-colors duration-200 pointer-events-none"
                        />

                        {/* Open indicator dot */}
                        {openSet.has(app.id) && (
                            <motion.div
                                layoutId={`dock-dot-${app.id}`}
                                className="w-1 h-1 rounded-full bg-white/60"
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ type: 'spring', stiffness: 500 }}
                            />
                        )}
                    </motion.button>
                ))}
            </div>
        </motion.div>
    )
}
