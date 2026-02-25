import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const CATEGORIES = ['All', 'Productivity', 'Social', 'Dev Tools', 'Games', 'Media', 'Utilities']

const APPS_DATA = [
    { name: 'VS Code', category: 'Dev Tools', icon: '💻', color: '#007acc', rating: 4.9, downloads: '12M', desc: 'Code editor by Microsoft', featured: true },
    { name: 'Spotify', category: 'Media', icon: '🎵', color: '#1db954', rating: 4.7, downloads: '50M', desc: 'Stream unlimited music' },
    { name: 'Slack', category: 'Productivity', icon: '💬', color: '#4a154b', rating: 4.5, downloads: '8M', desc: 'Team communication' },
    { name: 'Figma', category: 'Dev Tools', icon: '🎨', color: '#f24e1e', rating: 4.8, downloads: '5M', desc: 'Collaborative design tool', featured: true },
    { name: 'Discord', category: 'Social', icon: '🎮', color: '#5865f2', rating: 4.6, downloads: '25M', desc: 'Voice, video & text chat' },
    { name: 'Notion', category: 'Productivity', icon: '📝', color: '#000000', rating: 4.7, downloads: '10M', desc: 'All-in-one workspace' },
    { name: 'Docker', category: 'Dev Tools', icon: '🐳', color: '#2496ed', rating: 4.4, downloads: '3M', desc: 'Container platform' },
    { name: 'ChatGPT', category: 'Utilities', icon: '🤖', color: '#10a37f', rating: 4.8, downloads: '30M', desc: 'AI assistant', featured: true },
    { name: 'Tetris', category: 'Games', icon: '🧱', color: '#e74c3c', rating: 4.3, downloads: '15M', desc: 'Classic block puzzle' },
    { name: 'Postman', category: 'Dev Tools', icon: '📮', color: '#ff6c37', rating: 4.5, downloads: '6M', desc: 'API development tool' },
    { name: 'Obsidian', category: 'Productivity', icon: '💎', color: '#7c3aed', rating: 4.6, downloads: '4M', desc: 'Knowledge management' },
    { name: 'VLC', category: 'Media', icon: '🎬', color: '#ff5722', rating: 4.4, downloads: '20M', desc: 'Universal media player' },
    { name: 'Todoist', category: 'Productivity', icon: '✅', color: '#e44332', rating: 4.5, downloads: '7M', desc: 'Task management' },
    { name: 'Blender', category: 'Media', icon: '🖌️', color: '#f5792a', rating: 4.7, downloads: '2M', desc: '3D creation suite' },
    { name: 'WhatsApp', category: 'Social', icon: '📱', color: '#25d366', rating: 4.3, downloads: '60M', desc: 'Messaging app' },
    { name: '2048', category: 'Games', icon: '🔢', color: '#edc22e', rating: 4.2, downloads: '9M', desc: 'Number puzzle game' },
]

function StarRating({ rating }) {
    return (
        <div className="flex items-center gap-0.5">
            {[1, 2, 3, 4, 5].map(n => (
                <span key={n} className={`text-[8px] ${n <= rating ? 'text-yellow-400' : 'text-white/10'}`}>★</span>
            ))}
            <span className="text-[9px] text-white/25 ml-0.5">{rating}</span>
        </div>
    )
}

export default function AppStore() {
    const [category, setCategory] = useState('All')
    const [search, setSearch] = useState('')
    const [installed, setInstalled] = useState({}) // { appName: 'installed' | 'installing' }
    const [detail, setDetail] = useState(null)     // app object for detail view

    const featured = APPS_DATA.filter(a => a.featured)
    const filtered = APPS_DATA.filter(a =>
        (category === 'All' || a.category === category) &&
        (a.name.toLowerCase().includes(search.toLowerCase()) || a.desc.toLowerCase().includes(search.toLowerCase()))
    )

    const handleInstall = (appName) => {
        setInstalled(prev => ({ ...prev, [appName]: 'installing' }))
        // Simulate install after 1.5s
        setTimeout(() => {
            setInstalled(prev => ({ ...prev, [appName]: 'installed' }))
        }, 1500)
    }

    const handleUninstall = (appName) => {
        setInstalled(prev => {
            const next = { ...prev }
            delete next[appName]
            return next
        })
    }

    const InstallButton = ({ app, size = 'sm' }) => {
        const status = installed[app.name]
        if (status === 'installing') {
            return (
                <button disabled className={`${size === 'lg' ? 'px-5 py-2 text-xs' : 'px-3 py-1 text-[10px]'} rounded-full bg-white/8 text-white/30 font-medium flex items-center gap-1.5`}>
                    <motion.span
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                        className="inline-block"
                    >⏳</motion.span>
                    Installing…
                </button>
            )
        }
        if (status === 'installed') {
            return (
                <button onClick={(e) => { e.stopPropagation(); handleUninstall(app.name) }}
                    className={`${size === 'lg' ? 'px-5 py-2 text-xs' : 'px-3 py-1 text-[10px]'} rounded-full bg-white/8 text-white/40 font-medium
                    hover:bg-red-500/15 hover:text-red-400 transition-colors`}>
                    OPEN
                </button>
            )
        }
        return (
            <motion.button
                onClick={(e) => { e.stopPropagation(); handleInstall(app.name) }}
                className={`${size === 'lg' ? 'px-5 py-2 text-xs' : 'px-3 py-1 text-[10px]'} rounded-full font-medium transition-colors
                    ${size === 'lg' ? 'bg-teal-500/25 text-teal-400 hover:bg-teal-500/40' : 'bg-white/8 text-white/40 hover:bg-teal-500/20 hover:text-teal-400'}`}
                whileTap={{ scale: 0.92 }}
            >
                GET
            </motion.button>
        )
    }

    return (
        <div className="flex flex-col h-full -m-5">
            {/* Detail view overlay */}
            <AnimatePresence>
                {detail && (
                    <motion.div
                        className="absolute inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        onClick={() => setDetail(null)}
                    >
                        <motion.div
                            className="w-full max-w-xs rounded-2xl border border-white/10 p-5 overflow-hidden"
                            style={{ background: 'rgba(15,30,20,0.95)' }}
                            initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
                            onClick={e => e.stopPropagation()}
                        >
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shrink-0"
                                    style={{ background: `${detail.color}25` }}>{detail.icon}</div>
                                <div className="flex-1">
                                    <h3 className="text-sm font-bold text-white/80">{detail.name}</h3>
                                    <p className="text-[10px] text-white/30">{detail.category}</p>
                                    <StarRating rating={detail.rating} />
                                </div>
                            </div>
                            <p className="text-xs text-white/50 mb-4 leading-relaxed">{detail.desc}</p>
                            <div className="flex items-center justify-between mb-4">
                                <span className="text-[10px] text-white/20">{detail.downloads} downloads</span>
                                <InstallButton app={detail} size="lg" />
                            </div>
                            <button onClick={() => setDetail(null)}
                                className="w-full py-2 rounded-xl bg-white/5 text-white/30 text-xs hover:bg-white/10 transition-colors">
                                Close
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Header */}
            <div className="px-5 pt-4 pb-3">
                <div className="flex items-center justify-between mb-3">
                    <div>
                        <h2 className="text-lg font-bold text-white/80">App Store</h2>
                        <p className="text-[10px] text-white/25">
                            {Object.values(installed).filter(v => v === 'installed').length} apps installed
                        </p>
                    </div>
                </div>

                {/* Search */}
                <div className="flex items-center bg-white/8 rounded-lg px-3 py-2 border border-white/8 mb-3">
                    <span className="text-white/20 mr-2 text-xs">🔍</span>
                    <input
                        type="text" value={search} onChange={e => setSearch(e.target.value)}
                        placeholder="Search apps..."
                        className="flex-1 bg-transparent text-xs text-white/70 outline-none placeholder-white/20"
                    />
                    {search && (
                        <button onClick={() => setSearch('')} className="text-white/20 hover:text-white/40 text-xs ml-1">✕</button>
                    )}
                </div>

                {/* Categories */}
                <div className="flex gap-1.5 overflow-x-auto pb-1 no-scrollbar">
                    {CATEGORIES.map(cat => (
                        <button key={cat} onClick={() => setCategory(cat)}
                            className={`px-3 py-1 rounded-full text-[10px] font-medium whitespace-nowrap transition-colors
                                ${category === cat ? 'bg-teal-500/20 text-teal-400' : 'bg-white/5 text-white/30 hover:text-white/50'}`}>
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            <div className="h-px bg-white/5" />

            <div className="flex-1 overflow-y-auto">
                {/* Featured section */}
                {category === 'All' && !search && (
                    <div className="px-5 pt-4 pb-2">
                        <h3 className="text-xs font-medium text-white/40 mb-2">✨ Featured</h3>
                        <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
                            {featured.map(app => (
                                <motion.div key={app.name}
                                    className="min-w-[200px] rounded-xl p-3 border border-white/8 shrink-0 cursor-pointer"
                                    style={{ background: `linear-gradient(135deg, ${app.color}15, transparent)` }}
                                    whileHover={{ scale: 1.02 }}
                                    onClick={() => setDetail(app)}
                                >
                                    <div className="flex items-center gap-2 mb-2">
                                        <div className="w-10 h-10 rounded-xl flex items-center justify-center text-lg"
                                            style={{ background: `${app.color}25` }}>{app.icon}</div>
                                        <div>
                                            <p className="text-xs font-medium text-white/80">{app.name}</p>
                                            <p className="text-[9px] text-white/30">{app.desc}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <StarRating rating={app.rating} />
                                        <InstallButton app={app} />
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                )}

                {/* App list */}
                <div className="px-5 pt-3 pb-4">
                    <h3 className="text-xs font-medium text-white/40 mb-2">
                        {category === 'All' ? 'All Apps' : category}
                    </h3>
                    {filtered.length === 0 ? (
                        <div className="text-center py-8 text-white/15 text-xs">No apps found</div>
                    ) : (
                        <div className="space-y-1">
                            {filtered.map((app, i) => (
                                <motion.div key={app.name}
                                    className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-white/5 transition-colors cursor-pointer"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.03 }}
                                    onClick={() => setDetail(app)}
                                >
                                    <div className="w-10 h-10 rounded-xl flex items-center justify-center text-lg shrink-0"
                                        style={{ background: `${app.color}20` }}>{app.icon}</div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-xs font-medium text-white/70">{app.name}</p>
                                        <p className="text-[10px] text-white/25 truncate">{app.desc}</p>
                                        <StarRating rating={app.rating} />
                                    </div>
                                    <div className="text-right shrink-0">
                                        <InstallButton app={app} />
                                        <p className="text-[8px] text-white/15 mt-0.5">{app.downloads}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
