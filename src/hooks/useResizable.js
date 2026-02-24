import { useState, useCallback, useRef, useEffect } from 'react'

/**
 * useResizable — custom resize hook using raw mouse events.
 *
 * Attach the returned `onResizeMouseDown` to a resize handle element.
 * Returns current { width, height }.
 *
 * @param {Object} initialSize - { width, height }
 * @param {Object} minSize - { width, height } minimum dimensions
 * @param {Function} onResizeEnd - callback with final { width, height }
 */
export function useResizable(
    initialSize = { width: 680, height: 480 },
    minSize = { width: 360, height: 280 },
    onResizeEnd
) {
    const [size, setSize] = useState(initialSize)
    const isResizing = useRef(false)
    const startPos = useRef({ x: 0, y: 0 })
    const startSize = useRef({ width: 0, height: 0 })

    // Sync if parent updates size externally
    useEffect(() => {
        setSize(initialSize)
    }, [initialSize.width, initialSize.height])

    const onResizeMouseDown = useCallback((e) => {
        if (e.button !== 0) return
        e.preventDefault()
        e.stopPropagation()

        isResizing.current = true
        startPos.current = { x: e.clientX, y: e.clientY }
        startSize.current = { ...size }

        const onMouseMove = (moveEvent) => {
            if (!isResizing.current) return
            const deltaX = moveEvent.clientX - startPos.current.x
            const deltaY = moveEvent.clientY - startPos.current.y
            setSize({
                width: Math.max(minSize.width, startSize.current.width + deltaX),
                height: Math.max(minSize.height, startSize.current.height + deltaY),
            })
        }

        const onMouseUp = () => {
            isResizing.current = false
            document.removeEventListener('mousemove', onMouseMove)
            document.removeEventListener('mouseup', onMouseUp)
            if (onResizeEnd) {
                setSize(prev => {
                    onResizeEnd(prev)
                    return prev
                })
            }
        }

        document.addEventListener('mousemove', onMouseMove)
        document.addEventListener('mouseup', onMouseUp)
    }, [size, minSize.width, minSize.height, onResizeEnd])

    return { size, onResizeMouseDown }
}
