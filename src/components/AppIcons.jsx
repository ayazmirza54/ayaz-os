/**
 * AppIcons — SVG icon components for all new OS apps.
 * Each returns a styled SVG that matches the existing icon size (96×96 area, rendered at 24-32px).
 */

export function MusicIcon({ className = "w-8 h-8" }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round"
                d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM21 16c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2z" />
        </svg>
    )
}

export function BrowserIcon({ className = "w-8 h-8" }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
            <circle cx="12" cy="12" r="10" />
            <path strokeLinecap="round" d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
        </svg>
    )
}

export function CalculatorIcon({ className = "w-8 h-8" }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
            <rect x="4" y="2" width="16" height="20" rx="2" />
            <rect x="6" y="4" width="12" height="5" rx="1" fill="currentColor" opacity="0.15" />
            <circle cx="8" cy="13" r="0.8" fill="currentColor" />
            <circle cx="12" cy="13" r="0.8" fill="currentColor" />
            <circle cx="16" cy="13" r="0.8" fill="currentColor" />
            <circle cx="8" cy="17" r="0.8" fill="currentColor" />
            <circle cx="12" cy="17" r="0.8" fill="currentColor" />
            <circle cx="16" cy="17" r="0.8" fill="currentColor" />
        </svg>
    )
}

export function FileManagerIcon({ className = "w-8 h-8" }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round"
                d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
        </svg>
    )
}

export function AppStoreIcon({ className = "w-8 h-8" }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round"
                d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z" />
            <line x1="7" y1="7" x2="7.01" y2="7" strokeWidth={2} strokeLinecap="round" />
        </svg>
    )
}

export function TerminalIcon({ className = "w-8 h-8" }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
            <rect x="2" y="3" width="20" height="18" rx="2" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M7 8l4 4-4 4" />
            <line x1="13" y1="16" x2="17" y2="16" strokeLinecap="round" />
        </svg>
    )
}

export function SettingsIcon({ className = "w-8 h-8" }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round"
                d="M12.22 2h-.44a2 2 0 00-2 2v.18a2 2 0 01-1 1.73l-.43.25a2 2 0 01-2 0l-.15-.08a2 2 0 00-2.73.73l-.22.38a2 2 0 00.73 2.73l.15.1a2 2 0 011 1.72v.51a2 2 0 01-1 1.74l-.15.09a2 2 0 00-.73 2.73l.22.38a2 2 0 002.73.73l.15-.08a2 2 0 012 0l.43.25a2 2 0 011 1.73V20a2 2 0 002 2h.44a2 2 0 002-2v-.18a2 2 0 011-1.73l.43-.25a2 2 0 012 0l.15.08a2 2 0 002.73-.73l.22-.39a2 2 0 00-.73-2.73l-.15-.08a2 2 0 01-1-1.74v-.5a2 2 0 011-1.74l.15-.09a2 2 0 00.73-2.73l-.22-.38a2 2 0 00-2.73-.73l-.15.08a2 2 0 01-2 0l-.43-.25a2 2 0 01-1-1.73V4a2 2 0 00-2-2z" />
            <circle cx="12" cy="12" r="3" />
        </svg>
    )
}

export function NotesIcon({ className = "w-8 h-8" }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round"
                d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M14 2v6h6" />
            <line x1="8" y1="13" x2="16" y2="13" strokeLinecap="round" />
            <line x1="8" y1="17" x2="12" y2="17" strokeLinecap="round" />
        </svg>
    )
}

export function WeatherIcon({ className = "w-8 h-8" }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round"
                d="M12 2v1m0 18v1m9-10h1M2 12h1m15.07-6.07l.71-.71M4.22 19.78l.71-.71M19.78 19.78l-.71-.71M4.93 4.93l-.71-.71" />
            <circle cx="12" cy="12" r="4" />
            <path d="M17.5 17a4.5 4.5 0 00-8.9-.5A3.5 3.5 0 006 20h11a3 3 0 001.5-5.6z" fill="currentColor" opacity="0.1" />
        </svg>
    )
}
