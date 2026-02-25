import { useState } from 'react'
import { motion } from 'framer-motion'

const SECTIONS = [
    { id: 'general', label: 'General', icon: '⚙️' },
    { id: 'display', label: 'Display', icon: '🖥️' },
    { id: 'sound', label: 'Sound', icon: '🔊' },
    { id: 'network', label: 'Network', icon: '📡' },
    { id: 'about', label: 'About', icon: 'ℹ️' },
]

function Toggle({ checked, onChange }) {
    return (
        <button onClick={() => onChange(!checked)}
            className={`w-9 h-5 rounded-full relative transition-colors duration-200
                ${checked ? 'bg-teal-500' : 'bg-white/15'}`}>
            <motion.div
                className="w-4 h-4 rounded-full bg-white absolute top-0.5 shadow-sm"
                animate={{ left: checked ? 18 : 2 }}
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            />
        </button>
    )
}

function Slider({ value, onChange, label }) {
    return (
        <div className="flex items-center gap-3">
            <span className="text-xs text-white/40 w-20">{label}</span>
            <input type="range" min="0" max="100" value={value} onChange={e => onChange(+e.target.value)}
                className="flex-1 h-1 accent-teal-400" />
            <span className="text-xs text-white/30 w-8 text-right">{value}%</span>
        </div>
    )
}

export default function Settings() {
    const [section, setSection] = useState('general')
    const [darkMode, setDarkMode] = useState(true)
    const [notifications, setNotifications] = useState(true)
    const [animations, setAnimations] = useState(true)
    const [autoUpdate, setAutoUpdate] = useState(false)
    const [volume, setVolume] = useState(75)
    const [brightness, setBrightness] = useState(100)
    const [soundEffects, setSoundEffects] = useState(true)
    const [wifi, setWifi] = useState(true)
    const [bluetooth, setBluetooth] = useState(false)

    const renderSection = () => {
        switch (section) {
            case 'general':
                return (
                    <div className="space-y-4">
                        <h3 className="text-sm font-medium text-white/70">General Settings</h3>
                        <SettingRow label="Dark Mode" desc="Use dark theme across the OS">
                            <Toggle checked={darkMode} onChange={setDarkMode} />
                        </SettingRow>
                        <SettingRow label="Notifications" desc="Show desktop notifications">
                            <Toggle checked={notifications} onChange={setNotifications} />
                        </SettingRow>
                        <SettingRow label="Animations" desc="Enable UI animations and transitions">
                            <Toggle checked={animations} onChange={setAnimations} />
                        </SettingRow>
                        <SettingRow label="Auto Update" desc="Automatically install system updates">
                            <Toggle checked={autoUpdate} onChange={setAutoUpdate} />
                        </SettingRow>
                    </div>
                )
            case 'display':
                return (
                    <div className="space-y-4">
                        <h3 className="text-sm font-medium text-white/70">Display</h3>
                        <Slider label="Brightness" value={brightness} onChange={setBrightness} />
                        <SettingRow label="Resolution" desc="Current display resolution">
                            <span className="text-xs text-white/40">{window.innerWidth} × {window.innerHeight}</span>
                        </SettingRow>
                        <SettingRow label="Wallpaper" desc="Ghibli Landscape">
                            <div className="w-12 h-8 rounded bg-teal-800/30 border border-white/10" />
                        </SettingRow>
                    </div>
                )
            case 'sound':
                return (
                    <div className="space-y-4">
                        <h3 className="text-sm font-medium text-white/70">Sound</h3>
                        <Slider label="Volume" value={volume} onChange={setVolume} />
                        <SettingRow label="Sound Effects" desc="Play sounds for UI interactions">
                            <Toggle checked={soundEffects} onChange={setSoundEffects} />
                        </SettingRow>
                        <SettingRow label="Startup Sound" desc="Play sound on boot">
                            <Toggle checked={true} onChange={() => { }} />
                        </SettingRow>
                    </div>
                )
            case 'network':
                return (
                    <div className="space-y-4">
                        <h3 className="text-sm font-medium text-white/70">Network</h3>
                        <SettingRow label="Wi-Fi" desc={wifi ? 'Connected to AyazNet' : 'Disconnected'}>
                            <Toggle checked={wifi} onChange={setWifi} />
                        </SettingRow>
                        <SettingRow label="Bluetooth" desc={bluetooth ? 'Available' : 'Off'}>
                            <Toggle checked={bluetooth} onChange={setBluetooth} />
                        </SettingRow>
                        <SettingRow label="IP Address" desc="Local network address">
                            <span className="text-xs text-white/40 font-mono">192.168.1.42</span>
                        </SettingRow>
                    </div>
                )
            case 'about':
                return (
                    <div className="space-y-4">
                        <h3 className="text-sm font-medium text-white/70">About ayaz.OS</h3>
                        <div className="text-center py-4">
                            <div className="text-3xl font-bold mb-1">
                                <span className="text-white">ayaz</span>
                                <span className="text-teal-400">OS</span>
                            </div>
                            <p className="text-xs text-white/25">Version 1.0.0</p>
                        </div>
                        <InfoRow label="OS" value="ayaz.OS v1.0.0" />
                        <InfoRow label="Framework" value="React 19 + Vite 8" />
                        <InfoRow label="Styling" value="Tailwind CSS v4" />
                        <InfoRow label="Animation" value="Framer Motion" />
                        <InfoRow label="Built by" value="Ayaz Mirza" />
                        <InfoRow label="License" value="MIT" />
                    </div>
                )
            default:
                return null
        }
    }

    return (
        <div className="flex h-full -m-5">
            {/* Sidebar */}
            <div className="w-40 border-r border-white/5 py-3 px-2 space-y-0.5">
                {SECTIONS.map(s => (
                    <button key={s.id} onClick={() => setSection(s.id)}
                        className={`w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs text-left transition-colors
                            ${section === s.id ? 'bg-white/8 text-white/70' : 'text-white/30 hover:bg-white/5 hover:text-white/50'}`}>
                        <span>{s.icon}</span>
                        {s.label}
                    </button>
                ))}
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-5">
                {renderSection()}
            </div>
        </div>
    )
}

function SettingRow({ label, desc, children }) {
    return (
        <div className="flex items-center justify-between py-2 border-b border-white/5">
            <div>
                <p className="text-xs text-white/60">{label}</p>
                {desc && <p className="text-[10px] text-white/20">{desc}</p>}
            </div>
            {children}
        </div>
    )
}

function InfoRow({ label, value }) {
    return (
        <div className="flex items-center justify-between py-1.5 border-b border-white/5">
            <span className="text-xs text-white/35">{label}</span>
            <span className="text-xs text-white/55">{value}</span>
        </div>
    )
}
