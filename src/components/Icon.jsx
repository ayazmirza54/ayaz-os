import { useState, useRef, useCallback } from 'react'
import { motion } from 'framer-motion'

/**
 * Icon — a desktop icon with single-click select, double-click open,
 * click sound, and ripple micro-interaction.
 *
 * Props:
 *   id, label, icon (image src), onOpen, sounds
 */
export default function Icon({ id, label, icon, onOpen, sounds }) {
    const [selected, setSelected] = useState(false)
    const [ripple, setRipple] = useState(null)
    const rippleTimeout = useRef(null)

    const triggerRipple = useCallback((e) => {
        const rect = e.currentTarget.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top
        setRipple({ x, y, key: Date.now() })
        clearTimeout(rippleTimeout.current)
        rippleTimeout.current = setTimeout(() => setRipple(null), 500)
    }, [])

    const handleClick = (e) => {
        setSelected(true)
        sounds?.click?.()
        triggerRipple(e)
        // Deselect after a short delay if not double-clicked
        setTimeout(() => setSelected(false), 2000)
    }

    const handleDoubleClick = () => {
        setSelected(false)
        sounds?.open?.()
        onOpen(id)
    }

    return (
        <motion.div
            className={`
        relative flex flex-col items-center gap-1 md:gap-2 p-2 md:p-3 rounded-xl cursor-pointer
        select-none transition-colors duration-150 overflow-hidden
        ${selected ? 'icon-selected icon-glow' : 'hover:bg-white/5'}
      `}
            onClick={handleClick}
            onDoubleClick={handleDoubleClick}
            whileTap={{ scale: 0.92 }}
            title={`Open ${label}`}
        >
            {/* Click ripple */}
            {ripple && (
                <span
                    key={ripple.key}
                    className="click-ripple"
                    style={{ left: ripple.x, top: ripple.y }}
                />
            )}

            {/* Icon */}
            <motion.div
                className="w-11 h-11 md:w-14 md:h-14 rounded-2xl glass-light flex items-center justify-center shadow-lg"
                whileHover={{ scale: 1.08, rotate: 2 }}
                transition={{ type: 'spring', stiffness: 400, damping: 17 }}
            >
                {typeof icon === 'string' ? (
                    <img src={icon} alt={label} className="w-6 h-6 md:w-8 md:h-8 object-contain" />
                ) : (
                    <div className="w-6 h-6 md:w-8 md:h-8 text-teal-400">{icon}</div>
                )}
            </motion.div>

            {/* Label */}
            <span className="text-[10px] md:text-xs font-medium text-white/70 text-center leading-tight max-w-[60px] md:max-w-[72px] truncate">
                {label}
            </span>
        </motion.div>
    )
}
