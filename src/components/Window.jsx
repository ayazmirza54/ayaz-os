import { motion, AnimatePresence } from 'framer-motion'
import { useDraggable } from '../hooks/useDraggable'
import { useResizable } from '../hooks/useResizable'
import { useCallback } from 'react'

/**
 * Window — a draggable, resizable, frosted-glass window.
 *
 * Props:
 *   id, title, icon, position, size, zIndex, isActive,
 *   onClose, onMinimize, onFocus, onUpdatePosition, onUpdateSize,
 *   children (the page content)
 */
export default function Window({
    id,
    title,
    icon,
    position: initialPosition,
    size: initialSize,
    zIndex,
    isActive,
    onClose,
    onMinimize,
    onFocus,
    onUpdatePosition,
    onUpdateSize,
    children,
}) {
    // Drag: attach to title bar
    const handleDragEnd = useCallback((pos) => {
        onUpdatePosition(id, pos)
    }, [id, onUpdatePosition])

    const { position, onMouseDown: onDragMouseDown } = useDraggable(
        initialPosition,
        handleDragEnd
    )

    // Resize: attach to bottom-right handle
    const handleResizeEnd = useCallback((s) => {
        onUpdateSize(id, s)
    }, [id, onUpdateSize])

    const { size, onResizeMouseDown } = useResizable(
        initialSize,
        { width: 360, height: 280 },
        handleResizeEnd
    )

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0, scale: 0.92, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.92, y: 20 }}
                transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                className="absolute rounded-2xl overflow-hidden glass shadow-2xl"
                style={{
                    left: position.x,
                    top: position.y,
                    width: size.width,
                    height: size.height,
                    zIndex,
                }}
                onMouseDown={() => onFocus(id)}
            >
                {/* ===== Title Bar ===== */}
                <div
                    className="flex items-center justify-between px-4 py-3 select-none cursor-grab active:cursor-grabbing"
                    onMouseDown={onDragMouseDown}
                >
                    {/* Traffic light buttons */}
                    <div className="flex items-center gap-2">
                        <button
                            onClick={(e) => { e.stopPropagation(); onClose(id) }}
                            className="window-btn bg-red-500/80 hover:bg-red-400"
                            title="Close"
                        />
                        <button
                            onClick={(e) => { e.stopPropagation(); onMinimize(id) }}
                            className="window-btn bg-yellow-500/80 hover:bg-yellow-400"
                            title="Minimize"
                        />
                        <div className="window-btn bg-green-500/80" />
                    </div>

                    {/* Title */}
                    <div className="flex items-center gap-2 text-sm font-medium text-white/70">
                        <img src={icon} alt={title} className="w-4 h-4 object-contain" />
                        <span>{title}</span>
                    </div>

                    {/* Spacer to center the title */}
                    <div className="w-[52px]" />
                </div>

                {/* ===== Divider ===== */}
                <div className="h-px bg-white/5" />

                {/* ===== Content Area ===== */}
                <div
                    className="overflow-y-auto p-5"
                    style={{ height: `calc(100% - 49px)` }}
                >
                    {children}
                </div>

                {/* ===== Resize Handle ===== */}
                <div
                    className="resize-handle"
                    onMouseDown={onResizeMouseDown}
                />

                {/* ===== Active window ring ===== */}
                {isActive && (
                    <div className="absolute inset-0 rounded-2xl ring-1 ring-teal-500/25 pointer-events-none" />
                )}
            </motion.div>
        </AnimatePresence>
    )
}
