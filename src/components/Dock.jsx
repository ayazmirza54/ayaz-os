import { motion } from 'framer-motion'

/**
 * Dock — macOS-style bottom dock.
 *
 * Shows all registered apps with open-state dot indicators.
 * Click toggles the window (open / minimize / restore).
 *
 * Props:
 *   apps — array of { id, title, icon }
 *   openWindowIds — Set or array of currently open window IDs
 *   onToggle — (id, title, icon) => void
 */
export default function Dock({ apps, openWindowIds, onToggle }) {
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
                        onClick={() => onToggle(app.id, app.title, app.icon)}
                        className="dock-item relative flex flex-col items-center gap-1 p-1.5 rounded-xl
                       hover:bg-white/5 transition-colors duration-150 group"
                        whileHover={{ scale: 1.25, y: -8 }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                        title={app.title}
                    >
                        {/* Icon */}
                        <div className="w-11 h-11 rounded-xl glass-light flex items-center justify-center text-xl shadow-md
                            group-hover:shadow-teal-500/10 transition-shadow">
                            <img src={app.icon} alt={app.title} className="w-6 h-6 object-contain" />
                        </div>

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
