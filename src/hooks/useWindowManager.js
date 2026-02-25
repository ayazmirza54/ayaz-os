import { useState, useCallback } from 'react'

/**
 * useWindowManager — central state manager for all desktop windows.
 *
 * Tracks which windows are open, which is active (focused),
 * which are minimized, and manages z-index stacking order.
 */
export function useWindowManager() {
    // Each open window: { id, title, icon, position, size, zIndex, minimized }
    const [windows, setWindows] = useState([])
    const [zCounter, setZCounter] = useState(10)

    // Default window sizes & positions (responsive)
    const getDefaults = useCallback((id, index) => {
        const vw = window.innerWidth
        const vh = window.innerHeight
        const isMobile = vw < 768

        if (isMobile) {
            return {
                position: { x: 0, y: 0 },
                size: { width: vw, height: vh - 70 }, // leave room for dock
            }
        }

        const offset = (index % 5) * 30
        return {
            position: { x: 120 + offset, y: 60 + offset },
            size: { width: Math.min(680, vw - 40), height: Math.min(480, vh - 120) },
        }
    }, [])

    /** Open a window (or focus it if already open) */
    const openWindow = useCallback((id, title, icon) => {
        setWindows(prev => {
            const existing = prev.find(w => w.id === id)
            if (existing) {
                // If minimized, restore it; either way, bring to front
                setZCounter(z => z + 1)
                return prev.map(w =>
                    w.id === id
                        ? { ...w, minimized: false, zIndex: zCounter + 1 }
                        : w
                )
            }
            // Create new window
            const defaults = getDefaults(id, prev.length)
            setZCounter(z => z + 1)
            return [
                ...prev,
                {
                    id,
                    title,
                    icon,
                    ...defaults,
                    zIndex: zCounter + 1,
                    minimized: false,
                },
            ]
        })
    }, [zCounter, getDefaults])

    /** Close a window */
    const closeWindow = useCallback((id) => {
        setWindows(prev => prev.filter(w => w.id !== id))
    }, [])

    /** Minimize a window (hide but keep in state) */
    const minimizeWindow = useCallback((id) => {
        setWindows(prev =>
            prev.map(w => (w.id === id ? { ...w, minimized: true } : w))
        )
    }, [])

    /** Bring a window to front */
    const focusWindow = useCallback((id) => {
        setZCounter(z => z + 1)
        setWindows(prev =>
            prev.map(w =>
                w.id === id ? { ...w, zIndex: zCounter + 1, minimized: false } : w
            )
        )
    }, [zCounter])

    /** Toggle window: if open & visible → minimize, if minimized → restore, if closed → open */
    const toggleWindow = useCallback((id, title, icon) => {
        setWindows(prev => {
            const existing = prev.find(w => w.id === id)
            if (!existing) {
                // Open it
                const defaults = getDefaults(id, prev.length)
                setZCounter(z => z + 1)
                return [
                    ...prev,
                    { id, title, icon, ...defaults, zIndex: zCounter + 1, minimized: false },
                ]
            }
            if (existing.minimized) {
                // Restore it
                setZCounter(z => z + 1)
                return prev.map(w =>
                    w.id === id ? { ...w, minimized: false, zIndex: zCounter + 1 } : w
                )
            }
            // Check if it's the top window — if so, minimize; otherwise focus
            const topZ = Math.max(...prev.map(w => w.zIndex))
            if (existing.zIndex === topZ) {
                return prev.map(w => (w.id === id ? { ...w, minimized: true } : w))
            }
            setZCounter(z => z + 1)
            return prev.map(w =>
                w.id === id ? { ...w, zIndex: zCounter + 1 } : w
            )
        })
    }, [zCounter, getDefaults])

    /** Update window position (used by drag) */
    const updatePosition = useCallback((id, position) => {
        setWindows(prev =>
            prev.map(w => (w.id === id ? { ...w, position } : w))
        )
    }, [])

    /** Update window size (used by resize) */
    const updateSize = useCallback((id, size) => {
        setWindows(prev =>
            prev.map(w => (w.id === id ? { ...w, size } : w))
        )
    }, [])

    /** Get the currently active (top-most, non-minimized) window */
    const activeWindowId = windows
        .filter(w => !w.minimized)
        .sort((a, b) => b.zIndex - a.zIndex)[0]?.id || null

    /** Close the currently active window (for ESC shortcut) */
    const closeActiveWindow = useCallback(() => {
        if (activeWindowId) {
            closeWindow(activeWindowId)
        }
    }, [activeWindowId, closeWindow])

    return {
        windows,
        activeWindowId,
        openWindow,
        closeWindow,
        minimizeWindow,
        focusWindow,
        toggleWindow,
        updatePosition,
        updateSize,
        closeActiveWindow,
    }
}
