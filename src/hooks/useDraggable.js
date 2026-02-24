import { useState, useCallback, useEffect, useRef } from 'react'

/**
 * useDraggable — custom drag hook using raw mouse events.
 *
 * Returns the current position and a mousedown handler
 * to attach to the draggable element (e.g. a window title bar).
 *
 * @param {Object} initialPosition - { x, y }
 * @param {Function} onDragEnd - callback with final { x, y }
 */
export function useDraggable(initialPosition = { x: 100, y: 100 }, onDragEnd) {
    const [position, setPosition] = useState(initialPosition)
    const isDragging = useRef(false)
    const dragOffset = useRef({ x: 0, y: 0 })

    // Sync position if the parent updates it externally
    useEffect(() => {
        setPosition(initialPosition)
    }, [initialPosition.x, initialPosition.y])

    const onMouseDown = useCallback((e) => {
        // Only left mouse button
        if (e.button !== 0) return
        e.preventDefault()

        isDragging.current = true
        dragOffset.current = {
            x: e.clientX - position.x,
            y: e.clientY - position.y,
        }

        const onMouseMove = (moveEvent) => {
            if (!isDragging.current) return
            const newX = moveEvent.clientX - dragOffset.current.x
            const newY = moveEvent.clientY - dragOffset.current.y
            setPosition({ x: newX, y: Math.max(0, newY) }) // prevent dragging above viewport
        }

        const onMouseUp = () => {
            isDragging.current = false
            document.removeEventListener('mousemove', onMouseMove)
            document.removeEventListener('mouseup', onMouseUp)
            // Report final position
            if (onDragEnd) {
                setPosition(prev => {
                    onDragEnd(prev)
                    return prev
                })
            }
        }

        document.addEventListener('mousemove', onMouseMove)
        document.addEventListener('mouseup', onMouseUp)
    }, [position.x, position.y, onDragEnd])

    return { position, onMouseDown }
}
