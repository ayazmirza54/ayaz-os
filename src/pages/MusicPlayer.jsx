import { useState, useRef, useCallback, useEffect } from 'react'
import { motion } from 'framer-motion'

/* ───────── Procedural music engine using Web Audio API ───────── */

// Musical notes in Hz for different tracks
const SCALES = {
    chill: [261.63, 293.66, 329.63, 349.23, 392.00, 440.00, 493.88, 523.25],     // C major
    dream: [293.66, 329.63, 369.99, 415.30, 466.16, 523.25, 587.33, 659.26],     // D major
    night: [246.94, 277.18, 311.13, 329.63, 369.99, 415.30, 466.16, 493.88],     // B minor
    ocean: [261.63, 311.13, 349.23, 392.00, 466.16, 523.25, 622.25, 698.46],     // C minor pentatonic
    star: [329.63, 369.99, 415.30, 493.88, 554.37, 659.26, 739.99, 830.61],      // E major
    synth: [220.00, 261.63, 293.66, 329.63, 392.00, 440.00, 523.25, 587.33],     // A minor
    jazz: [261.63, 293.66, 311.13, 349.23, 392.00, 440.00, 466.16, 523.25],      // C blues
}

const TRACKS = [
    { id: 1, title: 'Midnight Drive', artist: 'Neon Waves', duration: 30, color: '#0d9488', scale: 'chill', waveform: 'sine' },
    { id: 2, title: 'Sunset Boulevard', artist: 'Dream Coast', duration: 30, color: '#f59e0b', scale: 'dream', waveform: 'triangle' },
    { id: 3, title: 'Digital Rain', artist: 'Cyber Echo', duration: 30, color: '#8b5cf6', scale: 'night', waveform: 'sawtooth' },
    { id: 4, title: 'Ocean Breeze', artist: 'Calm Waters', duration: 30, color: '#3b82f6', scale: 'ocean', waveform: 'sine' },
    { id: 5, title: 'Starlight', artist: 'Aurora', duration: 30, color: '#ec4899', scale: 'star', waveform: 'triangle' },
    { id: 6, title: 'Electric Dreams', artist: 'Synthwave', duration: 30, color: '#10b981', scale: 'synth', waveform: 'sawtooth' },
    { id: 7, title: 'Paper Moon', artist: 'Jazz Cats', duration: 30, color: '#f97316', scale: 'jazz', waveform: 'sine' },
]

function formatTime(seconds) {
    const m = Math.floor(seconds / 60)
    const s = Math.floor(seconds % 60)
    return `${m}:${s.toString().padStart(2, '0')}`
}

/** Creates a procedurally generated melody loop using Web Audio API */
class MusicEngine {
    constructor() {
        this.ctx = null
        this.playing = false
        this.intervalId = null
        this.gainNode = null
        this.volume = 0.3
        this.noteIndex = 0
    }

    init() {
        if (!this.ctx) {
            this.ctx = new (window.AudioContext || window.webkitAudioContext)()
            this.gainNode = this.ctx.createGain()
            this.gainNode.connect(this.ctx.destination)
            this.gainNode.gain.value = this.volume
        }
        if (this.ctx.state === 'suspended') this.ctx.resume()
    }

    playNote(freq, waveform, duration = 0.4) {
        if (!this.ctx) return
        const osc = this.ctx.createOscillator()
        const noteGain = this.ctx.createGain()

        osc.type = waveform
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime)

        noteGain.gain.setValueAtTime(0, this.ctx.currentTime)
        noteGain.gain.linearRampToValueAtTime(this.volume * 0.5, this.ctx.currentTime + 0.05)
        noteGain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + duration)

        osc.connect(noteGain).connect(this.gainNode)
        osc.start(this.ctx.currentTime)
        osc.stop(this.ctx.currentTime + duration + 0.05)
    }

    start(scale, waveform) {
        this.init()
        this.stop()
        this.playing = true
        this.noteIndex = 0

        const notes = SCALES[scale] || SCALES.chill
        const tempo = 300 // ms between notes

        // Play a melodic pattern
        this.intervalId = setInterval(() => {
            if (!this.playing) return

            // Create a simple melody pattern (not just sequential)
            const patterns = [0, 2, 4, 5, 4, 2, 3, 1]
            const idx = patterns[this.noteIndex % patterns.length]
            const note = notes[idx % notes.length]

            // Occasional octave variation
            const octaveShift = this.noteIndex % 16 < 8 ? 1 : 2
            this.playNote(note * octaveShift, waveform, 0.35)

            // Add a subtle harmony on every 4th note
            if (this.noteIndex % 4 === 0) {
                const harmonyIdx = (idx + 2) % notes.length
                this.playNote(notes[harmonyIdx] * 0.5, 'sine', 0.6)
            }

            this.noteIndex++
        }, tempo)
    }

    stop() {
        this.playing = false
        if (this.intervalId) {
            clearInterval(this.intervalId)
            this.intervalId = null
        }
    }

    setVolume(v) {
        this.volume = v
        if (this.gainNode) this.gainNode.gain.value = v
    }

    destroy() {
        this.stop()
        if (this.ctx) {
            this.ctx.close().catch(() => { })
            this.ctx = null
        }
    }
}

export default function MusicPlayer() {
    const [currentTrack, setCurrentTrack] = useState(0)
    const [playing, setPlaying] = useState(false)
    const [progress, setProgress] = useState(0)
    const [volume, setVolume] = useState(60)
    const engineRef = useRef(null)
    const progressRef = useRef(null)
    const startTimeRef = useRef(0)

    const track = TRACKS[currentTrack]

    // Init engine
    useEffect(() => {
        engineRef.current = new MusicEngine()
        return () => engineRef.current?.destroy()
    }, [])

    // Handle play/pause
    useEffect(() => {
        if (playing) {
            engineRef.current?.start(track.scale, track.waveform)
            startTimeRef.current = Date.now() - (progress / 100) * track.duration * 1000

            progressRef.current = setInterval(() => {
                const elapsed = (Date.now() - startTimeRef.current) / 1000
                const pct = (elapsed / track.duration) * 100
                if (pct >= 100) {
                    handleNext()
                } else {
                    setProgress(pct)
                }
            }, 100)
        } else {
            engineRef.current?.stop()
            clearInterval(progressRef.current)
        }
        return () => clearInterval(progressRef.current)
    }, [playing, currentTrack])

    // Volume sync
    useEffect(() => {
        engineRef.current?.setVolume(volume / 100 * 0.4)
    }, [volume])

    const handlePrev = useCallback(() => {
        setCurrentTrack(i => (i > 0 ? i - 1 : TRACKS.length - 1))
        setProgress(0)
        startTimeRef.current = Date.now()
    }, [])

    const handleNext = useCallback(() => {
        setCurrentTrack(i => (i < TRACKS.length - 1 ? i + 1 : 0))
        setProgress(0)
        startTimeRef.current = Date.now()
    }, [])

    const togglePlay = useCallback(() => setPlaying(p => !p), [])

    const elapsed = (progress / 100) * track.duration

    return (
        <div className="flex flex-col h-full -m-5">
            {/* iPod-style player */}
            <div className="flex flex-col items-center pt-4 pb-3 px-5"
                style={{ background: `linear-gradient(135deg, ${track.color}15, ${track.color}05)` }}>

                {/* Album art */}
                <motion.div
                    className="w-28 h-28 rounded-2xl shadow-xl flex items-center justify-center mb-3 relative overflow-hidden"
                    style={{ background: `linear-gradient(135deg, ${track.color}40, ${track.color}80)` }}
                    animate={{ rotate: playing ? 360 : 0 }}
                    transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                    key={playing ? 'spin' : 'stop'}
                >
                    <div className="w-10 h-10 rounded-full bg-black/30 border-2 border-white/20" />
                    <div className="absolute inset-0 rounded-2xl ring-4 ring-white/5" />
                </motion.div>

                {/* Track info */}
                <h3 className="text-base font-semibold text-white/90 truncate max-w-[200px]">{track.title}</h3>
                <p className="text-xs text-white/40 mb-2">{track.artist}</p>

                {/* Progress bar */}
                <div className="w-full max-w-[220px] h-1 rounded-full bg-white/10 mb-1 cursor-pointer"
                    onClick={(e) => {
                        const rect = e.currentTarget.getBoundingClientRect()
                        const pct = (e.clientX - rect.left) / rect.width * 100
                        setProgress(pct)
                        startTimeRef.current = Date.now() - (pct / 100) * track.duration * 1000
                    }}>
                    <motion.div className="h-full rounded-full"
                        style={{ width: `${progress}%`, background: track.color }} />
                </div>
                <div className="flex justify-between w-full max-w-[220px] text-[10px] text-white/25">
                    <span>{formatTime(elapsed)}</span>
                    <span>{formatTime(track.duration)}</span>
                </div>

                {/* Controls — iPod click wheel style */}
                <div className="relative w-36 h-36 mt-2 mb-1">
                    <div className="absolute inset-0 rounded-full bg-white/5 border border-white/10 shadow-inner" />

                    <button onClick={handlePrev}
                        className="absolute left-1 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center
                                   text-white/50 hover:text-white/80 transition-colors text-sm">⏮</button>
                    <button onClick={handleNext}
                        className="absolute right-1 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center
                                   text-white/50 hover:text-white/80 transition-colors text-sm">⏭</button>
                    <button className="absolute top-1 left-1/2 -translate-x-1/2 w-9 h-9 flex items-center justify-center
                                   text-white/50 hover:text-white/80 transition-colors text-[10px] font-medium">MENU</button>

                    <motion.button onClick={togglePlay}
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                                   w-14 h-14 rounded-full bg-white/8 border border-white/15
                                   flex items-center justify-center text-white/70 hover:text-white
                                   hover:bg-white/12 transition-all text-lg"
                        whileTap={{ scale: 0.92 }}>
                        {playing ? '⏸' : '▶'}
                    </motion.button>

                    <div className="absolute bottom-1 left-1/2 -translate-x-1/2 flex items-center gap-1">
                        <input type="range" min="0" max="100" value={volume}
                            onChange={e => setVolume(+e.target.value)}
                            className="w-16 h-0.5 accent-teal-400 opacity-40 hover:opacity-70 transition-opacity" />
                    </div>
                </div>
            </div>

            <div className="h-px bg-white/5" />

            {/* Track list */}
            <div className="flex-1 overflow-y-auto">
                {TRACKS.map((t, i) => (
                    <motion.button key={t.id}
                        onClick={() => { setCurrentTrack(i); setProgress(0); startTimeRef.current = Date.now(); setPlaying(true) }}
                        className={`w-full flex items-center gap-3 px-5 py-2.5 text-left transition-colors
                            ${i === currentTrack ? 'bg-white/8' : 'hover:bg-white/4'}`}
                        whileTap={{ scale: 0.98 }}>
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center text-xs shrink-0"
                            style={{ background: `${t.color}25`, color: t.color }}>
                            {i === currentTrack && playing ? '♫' : i + 1}
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className={`text-sm truncate ${i === currentTrack ? 'text-teal-400 font-medium' : 'text-white/70'}`}>
                                {t.title}
                            </p>
                            <p className="text-[11px] text-white/30 truncate">{t.artist}</p>
                        </div>
                        <span className="text-[11px] text-white/25 shrink-0">{formatTime(t.duration)}</span>
                    </motion.button>
                ))}
            </div>
        </div>
    )
}
