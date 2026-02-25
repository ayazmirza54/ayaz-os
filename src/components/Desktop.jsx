import { useEffect, useCallback, useState } from 'react'
import { motion } from 'framer-motion'
import Icon from './Icon'
import Window from './Window'
import Dock from './Dock'

// Page content components
import About from '../pages/About'
import Projects from '../pages/Projects'
import Blog from '../pages/Blog'
import Contact from '../pages/Contact'
import Resume from '../pages/Resume'
import MusicPlayer from '../pages/MusicPlayer'
import Browser from '../pages/Browser'
import Calculator from '../pages/Calculator'
import FileManager from '../pages/FileManager'
import AppStore from '../pages/AppStore'
import Terminal from '../pages/Terminal'
import Settings from '../pages/Settings'
import Notes from '../pages/Notes'
import Weather from '../pages/Weather'

// Import icon assets (existing PNG icons)
import iconAbout from '../assets/icons8-user-male-96.png'
import iconProjects from '../assets/icons8-projects-96.png'
import iconBlog from '../assets/icons8-typewriter-with-paper-96.png'
import iconContact from '../assets/icons8-contact-96.png'
import iconResume from '../assets/icons8-resume-website-96.png'

// Import icon assets (new PNG icons)
import iconTerminal from '../assets/icons8-terminal-96.png'
import iconBrowser from '../assets/icons8-browser-96.png'
import iconFiles from '../assets/icons8-file-96.png'
import iconCalculator from '../assets/icons8-calculator-96.png'
import iconMusic from '../assets/icons8-music-96.png'
import iconNotes from '../assets/icons8-notes-96.png'
import iconWeather from '../assets/icons8-partly-cloudy-day-96.png'
import iconAppStore from '../assets/icons8-app-store-96.png'
import iconSettings from '../assets/icons8-settings-96.png'

/** App registry — each desktop app with its ID, title, and icon */
const APPS = [
    // Portfolio apps
    { id: 'about', title: 'About Me', icon: iconAbout },
    { id: 'projects', title: 'Projects', icon: iconProjects },
    { id: 'blog', title: 'Blog', icon: iconBlog },
    { id: 'contact', title: 'Contact', icon: iconContact },
    { id: 'resume', title: 'Resume', icon: iconResume },
    // OS apps
    { id: 'terminal', title: 'Terminal', icon: iconTerminal },
    { id: 'browser', title: 'Browser', icon: iconBrowser },
    { id: 'files', title: 'Files', icon: iconFiles },
    { id: 'calculator', title: 'Calculator', icon: iconCalculator },
    { id: 'music', title: 'Music', icon: iconMusic },
    { id: 'notes', title: 'Notes', icon: iconNotes },
    { id: 'weather', title: 'Weather', icon: iconWeather },
    { id: 'appstore', title: 'App Store', icon: iconAppStore },
    { id: 'settings', title: 'Settings', icon: iconSettings },
]

/** Map app IDs to their page components */
const PAGE_MAP = {
    about: <About />,
    projects: <Projects />,
    blog: <Blog />,
    contact: <Contact />,
    resume: <Resume />,
    terminal: <Terminal />,
    browser: <Browser />,
    files: <FileManager />,
    calculator: <Calculator />,
    music: <MusicPlayer />,
    notes: <Notes />,
    weather: <Weather />,
    appstore: <AppStore />,
    settings: <Settings />,
}

/**
 * Desktop — the main desktop layout.
 *
 * Renders the background, welcome widget, icon grid, open windows, dock, and status bar.
 */
export default function Desktop({
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
    sounds,
    muted,
    toggleMute,
}) {
    // ===== ESC shortcut =====
    const handleKeyDown = useCallback((e) => {
        if (e.key === 'Escape') closeActiveWindow()
    }, [closeActiveWindow])

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [handleKeyDown])

    // ===== Open handler for desktop icons =====
    const handleIconOpen = useCallback((id) => {
        const app = APPS.find(a => a.id === id)
        if (app) openWindow(app.id, app.title, app.icon)
    }, [openWindow])

    return (
        <div className="desktop-bg fixed inset-0 overflow-hidden select-none">
            {/* ===== Welcome Widget (centered) ===== */}
            <WelcomeWidget />

            {/* ===== Desktop Icons Grid ===== */}
            <div className="absolute top-6 left-6 grid grid-cols-2 gap-1 max-h-[calc(100vh-120px)] overflow-hidden">
                {APPS.map((app) => (
                    <Icon
                        key={app.id}
                        id={app.id}
                        label={app.title}
                        icon={app.icon}
                        onOpen={handleIconOpen}
                        sounds={sounds}
                    />
                ))}
            </div>

            {/* ===== Open Windows ===== */}
            {windows
                .filter(w => !w.minimized)
                .map(w => (
                    <Window
                        key={w.id}
                        id={w.id}
                        title={w.title}
                        icon={w.icon}
                        position={w.position}
                        size={w.size}
                        zIndex={w.zIndex}
                        isActive={w.id === activeWindowId}
                        onClose={closeWindow}
                        onMinimize={minimizeWindow}
                        onFocus={focusWindow}
                        onUpdatePosition={updatePosition}
                        onUpdateSize={updateSize}
                        sounds={sounds}
                    >
                        {PAGE_MAP[w.id]}
                    </Window>
                ))}

            {/* ===== Dock ===== */}
            <Dock
                apps={APPS}
                openWindowIds={windows.map(w => w.id)}
                onToggle={toggleWindow}
                sounds={sounds}
            />

            {/* ===== Status Bar (Clock + Volume) ===== */}
            <StatusBar muted={muted} toggleMute={toggleMute} />
        </div>
    )
}

/** Centered welcome widget with greeting and live clock */
function WelcomeWidget() {
    const [now, setNow] = useState(new Date())

    useEffect(() => {
        const interval = setInterval(() => setNow(new Date()), 1000)
        return () => clearInterval(interval)
    }, [])

    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
    const dateStr = now.toLocaleDateString([], { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })

    return (
        <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[1]
                       flex flex-col items-center pointer-events-none"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
        >
            <p className="text-sm text-white/20 font-light tracking-[0.3em] uppercase mb-2">
                Welcome to
            </p>
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-4"
                style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.7) 0%, rgba(45,212,191,0.7) 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                ayaz.OS
            </h1>
            <div className="text-4xl md:text-5xl font-light text-white/50 tabular-nums tracking-wider mb-2">
                {timeStr}
            </div>
            <p className="text-sm text-white/25 font-light">
                {dateStr}
            </p>
        </motion.div>
    )
}

/** Top-right status bar with clock and volume toggle */
function StatusBar({ muted, toggleMute }) {
    const [now, setNow] = useState(new Date())

    useEffect(() => {
        const interval = setInterval(() => setNow(new Date()), 30000)
        return () => clearInterval(interval)
    }, [])

    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    const dateStr = now.toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric' })

    return (
        <div className="fixed top-3 right-5 z-[9998] flex items-center gap-4">
            {/* Volume toggle */}
            <button
                onClick={toggleMute}
                className="volume-btn group relative flex items-center justify-center w-7 h-7 rounded-lg
                         hover:bg-white/8 transition-all duration-200"
                title={muted ? 'Unmute sounds' : 'Mute sounds'}
            >
                <svg
                    className={`w-3.5 h-3.5 transition-colors duration-200 ${muted ? 'text-white/25' : 'text-white/50 group-hover:text-white/70'}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                >
                    {muted ? (
                        <path strokeLinecap="round" strokeLinejoin="round"
                            d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15zm11.414-4l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
                    ) : (
                        <path strokeLinecap="round" strokeLinejoin="round"
                            d="M15.536 8.464a5 5 0 010 7.072M17.95 6.05a8 8 0 010 11.9M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                    )}
                </svg>
            </button>

            {/* Clock */}
            <div className="text-right">
                <div className="text-xs font-medium text-white/50">{timeStr}</div>
                <div className="text-[10px] text-white/30">{dateStr}</div>
            </div>
        </div>
    )
}

