import { useEffect, useCallback, useState } from 'react'
import Icon from './Icon'
import Window from './Window'
import Dock from './Dock'

// Page content components
import About from '../pages/About'
import Projects from '../pages/Projects'
import Blog from '../pages/Blog'
import Contact from '../pages/Contact'
import Resume from '../pages/Resume'

// Import icon assets
import iconAbout from '../assets/icons8-user-male-96.png'
import iconProjects from '../assets/icons8-projects-96.png'
import iconBlog from '../assets/icons8-typewriter-with-paper-96.png'
import iconContact from '../assets/icons8-contact-96.png'
import iconResume from '../assets/icons8-resume-website-96.png'

/** App registry — each desktop app with its ID, title, and icon */
const APPS = [
    { id: 'about', title: 'About', icon: iconAbout },
    { id: 'projects', title: 'Projects', icon: iconProjects },
    { id: 'blog', title: 'Blog', icon: iconBlog },
    { id: 'contact', title: 'Contact', icon: iconContact },
    { id: 'resume', title: 'Resume', icon: iconResume },
]

/** Map app IDs to their page components */
const PAGE_MAP = {
    about: <About />,
    projects: <Projects />,
    blog: <Blog />,
    contact: <Contact />,
    resume: <Resume />,
}

/**
 * Desktop — the main desktop layout.
 *
 * Renders the background, icon grid, open windows, and dock.
 * Handles the ESC keyboard shortcut to close the active window.
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
            {/* ===== Desktop Icons Grid ===== */}
            <div className="absolute top-6 left-6 flex flex-col gap-2">
                {APPS.map((app) => (
                    <Icon
                        key={app.id}
                        id={app.id}
                        label={app.title}
                        icon={app.icon}
                        onOpen={handleIconOpen}
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
                    >
                        {PAGE_MAP[w.id]}
                    </Window>
                ))}

            {/* ===== Dock ===== */}
            <Dock
                apps={APPS}
                openWindowIds={windows.map(w => w.id)}
                onToggle={toggleWindow}
            />

            {/* ===== Status Bar Clock ===== */}
            <StatusClock />
        </div>
    )
}

/** Top-right clock, like a real OS status bar */
function StatusClock() {
    const [now, setNow] = useState(new Date())

    useEffect(() => {
        const interval = setInterval(() => setNow(new Date()), 30000)
        return () => clearInterval(interval)
    }, [])

    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    const dateStr = now.toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric' })

    return (
        <div className="fixed top-3 right-5 z-[9998] text-right">
            <div className="text-xs font-medium text-white/50">{timeStr}</div>
            <div className="text-[10px] text-white/30">{dateStr}</div>
        </div>
    )
}
