import { useCallback, useRef, useState } from 'react'

// Audio files
import startupSfx from '../assets/universfield-smooth-gadget-activation-sound-250072.mp3'
import clickSfx from '../assets/Click.mp3'
import buttonDownSfx from '../assets/ButtonClickDown.mp3'
import buttonUpSfx from '../assets/ButtonClickUp.mp3'
import windowOpenSfx from '../assets/WindowOpen.mp3'
import windowCloseSfx from '../assets/WindowClose.mp3'
import windowCollapseSfx from '../assets/WindowCollapse.mp3'

/**
 * useSoundEffects — plays MP3 sound effects for UI interactions.
 *
 * The hook exposes individual play functions and a global mute toggle.
 */
export function useSoundEffects() {
    const [muted, setMuted] = useState(false)

    // Refs for lazy-init Audio elements
    const startupAudio = useRef(null)
    const clickAudioRef = useRef(null)
    const buttonDownAudio = useRef(null)
    const buttonUpAudio = useRef(null)
    const windowOpenAudio = useRef(null)
    const windowCloseAudio = useRef(null)
    const windowCollapseAudio = useRef(null)

    /** Play an Audio element (clone so overlapping plays work) */
    const playAudio = useCallback((audioRef, src, volume = 0.5) => {
        if (muted) return
        if (!audioRef.current) {
            audioRef.current = new Audio(src)
            audioRef.current.volume = volume
        }
        const clone = audioRef.current.cloneNode()
        clone.volume = audioRef.current.volume
        clone.play().catch(() => { })
    }, [muted])

    /* ───── individual sounds ───── */

    /** Startup chime */
    const bootChime = useCallback(() => {
        playAudio(startupAudio, startupSfx, 0.6)
    }, [playAudio])

    /** General UI click — icon select, general taps */
    const click = useCallback(() => {
        playAudio(clickAudioRef, clickSfx, 0.5)
    }, [playAudio])

    /** Button press — dock click, window traffic-light buttons */
    const buttonDown = useCallback(() => {
        playAudio(buttonDownAudio, buttonDownSfx, 0.4)
    }, [playAudio])

    /** Button release — hover tick feedback */
    const hover = useCallback(() => {
        playAudio(buttonUpAudio, buttonUpSfx, 0.25)
    }, [playAudio])

    /** Window opens */
    const open = useCallback(() => {
        playAudio(windowOpenAudio, windowOpenSfx, 0.5)
    }, [playAudio])

    /** Window closes */
    const close = useCallback(() => {
        playAudio(windowCloseAudio, windowCloseSfx, 0.5)
    }, [playAudio])

    /** Window minimizes / collapses */
    const minimize = useCallback(() => {
        playAudio(windowCollapseAudio, windowCollapseSfx, 0.45)
    }, [playAudio])

    /** Toggle global mute */
    const toggleMute = useCallback(() => setMuted(m => !m), [])

    return {
        muted,
        toggleMute,
        sounds: {
            bootChime,
            click,
            buttonDown,
            open,
            close,
            minimize,
            hover,
        },
    }
}

