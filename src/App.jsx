import { useState, useCallback } from 'react'
import BootScreen from './components/BootScreen'
import Desktop from './components/Desktop'
import { useWindowManager } from './hooks/useWindowManager'
import { useSoundEffects } from './hooks/useSoundEffects'

/**
 * App — root component.
 *
 * Shows the boot animation first, then renders the desktop.
 * The window manager hook lives here so state is centralized.
 * Sound effects are also centralized here and passed down.
 */
export default function App() {
  const [booted, setBooted] = useState(false)
  const wm = useWindowManager()
  const sfx = useSoundEffects()

  const handleBootComplete = useCallback(() => {
    setBooted(true)
  }, [])

  return (
    <>
      {/* Boot animation — shown until complete */}
      {!booted && <BootScreen onComplete={handleBootComplete} sounds={sfx.sounds} />}

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
          sounds={sfx.sounds}
          muted={sfx.muted}
          toggleMute={sfx.toggleMute}
        />
      )}
    </>
  )
}
