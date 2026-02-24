import { useState } from 'react'
import { motion } from 'framer-motion'

/**
 * Icon — a desktop icon with single-click select and double-click open.
 *
 * Props:
 *   id, label, icon (emoji), onOpen
 */
export default function Icon({ id, label, icon, onOpen }) {
    const [selected, setSelected] = useState(false)

    const handleClick = () => {
        setSelected(true)
        // Deselect after a short delay if not double-clicked
        setTimeout(() => setSelected(false), 2000)
    }

    const handleDoubleClick = () => {
        setSelected(false)
        onOpen(id)
    }

    return (
        <motion.div
            className={`
        flex flex-col items-center gap-2 p-3 rounded-xl cursor-pointer
        select-none transition-colors duration-150
        ${selected ? 'icon-selected' : 'hover:bg-white/5'}
      `}
            onClick={handleClick}
            onDoubleClick={handleDoubleClick}
            whileTap={{ scale: 0.92 }}
            title={`Open ${label}`}
        >
            {/* Icon */}
            <motion.div
                className="w-14 h-14 rounded-2xl glass-light flex items-center justify-center shadow-lg"
                whileHover={{ scale: 1.08, rotate: 2 }}
                transition={{ type: 'spring', stiffness: 400, damping: 17 }}
            >
                <img src={icon} alt={label} className="w-8 h-8 object-contain" />
            </motion.div>

            {/* Label */}
            <span className="text-xs font-medium text-white/70 text-center leading-tight max-w-[72px] truncate">
                {label}
            </span>
        </motion.div>
    )
}
