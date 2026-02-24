import { useState, useCallback } from 'react'
import BootScreen from './components/BootScreen'
import Desktop from './components/Desktop'
import { useWindowManager } from './hooks/useWindowManager'

/**
 * App — root component.
 *
 * Shows the boot animation first, then renders the desktop.
 * The window manager hook lives here so state is centralized.
 */
export default function App() {
  const [booted, setBooted] = useState(false)
  const wm = useWindowManager()

  const handleBootComplete = useCallback(() => {
    setBooted(true)
  }, [])

  return (
    <>
      {/* Boot animation — shown until complete */}
      {!booted && <BootScreen onComplete={handleBootComplete} />}

      {/* Desktop — always mounted (hidden behind boot screen initially) */}
      {booted && (
        <Desktop
          windows={wm.windows}
          activeWindowId={wm.activeWindowId}
          openWindow={wm.openWindow}
          closeWindow={wm.closeWindow}
          minimizeWindow={wm.minimizeWindow}
          focusWindow={wm.focusWindow}
          toggleWindow={wm.toggleWindow}
          updatePosition={wm.updatePosition}
          updateSize={wm.updateSize}
          closeActiveWindow={wm.closeActiveWindow}
        />
      )}
    </>
  )
}
