import { useState, useCallback } from 'react'
import { motion } from 'framer-motion'

const BOOKMARKS = [
    { title: 'GitHub', url: 'https://github.com', icon: '🐙', color: '#333', desc: 'Code hosting and collaboration platform' },
    { title: 'Google', url: 'https://google.com', icon: '🔍', color: '#4285f4', desc: 'The world\'s most popular search engine' },
    { title: 'Stack Overflow', url: 'https://stackoverflow.com', icon: '📚', color: '#f48024', desc: 'Q&A for programmers' },
    { title: 'YouTube', url: 'https://youtube.com', icon: '▶️', color: '#ff0000', desc: 'Video sharing platform' },
    { title: 'MDN Docs', url: 'https://developer.mozilla.org', icon: '📖', color: '#83d0f2', desc: 'Web technology documentation' },
    { title: 'Vercel', url: 'https://vercel.com', icon: '▲', color: '#000', desc: 'Cloud deployment platform' },
    { title: 'Dribbble', url: 'https://dribbble.com', icon: '🏀', color: '#ea4c89', desc: 'Design inspiration community' },
    { title: 'Twitter / X', url: 'https://x.com', icon: '𝕏', color: '#1da1f2', desc: 'Social media and news' },
]

const SEARCH_RESULTS = [
    { title: 'React Documentation', url: 'react.dev', desc: 'The library for web and native user interfaces. React lets you build UI from individual pieces called components.' },
    { title: 'MDN Web Docs', url: 'developer.mozilla.org', desc: 'Resources for developers, by developers. Documentation for HTML, CSS, JavaScript, and Web APIs.' },
    { title: 'Stack Overflow', url: 'stackoverflow.com', desc: 'Where Developers Learn, Share, & Build Careers. The largest developer community.' },
    { title: 'GitHub', url: 'github.com', desc: 'Where the world builds software. Millions of developers collaborate on projects.' },
    { title: 'npm', url: 'npmjs.com', desc: 'The world\'s largest software registry. Over 2 million packages available.' },
]

export default function Browser() {
    const [url, setUrl] = useState('')
    const [page, setPage] = useState('home') // 'home' | 'search' | 'site'
    const [siteInfo, setSiteInfo] = useState(null)
    const [searchQuery, setSearchQuery] = useState('')
    const [history, setHistory] = useState([])
    const [histIdx, setHistIdx] = useState(-1)

    const navigate = useCallback((targetUrl) => {
        const finalUrl = targetUrl || url
        if (!finalUrl.trim()) return

        // Check if it's a bookmark
        const bookmark = BOOKMARKS.find(b => b.url === finalUrl)
        if (bookmark) {
            setSiteInfo(bookmark)
            setUrl(finalUrl)
            setPage('site')
            setHistory(prev => [...prev.slice(0, histIdx + 1 || undefined), { type: 'site', data: bookmark, url: finalUrl }])
            setHistIdx(prev => prev + 1)
            return
        }

        // Treat as search if no dots
        if (!finalUrl.includes('.')) {
            setSearchQuery(finalUrl)
            setUrl(finalUrl)
            setPage('search')
            setHistory(prev => [...prev.slice(0, histIdx + 1 || undefined), { type: 'search', data: finalUrl, url: finalUrl }])
            setHistIdx(prev => prev + 1)
            return
        }

        // Navigate to site
        const full = finalUrl.startsWith('http') ? finalUrl : 'https://' + finalUrl
        const hostname = full.replace(/^https?:\/\//, '').split('/')[0]
        setSiteInfo({ title: hostname, url: full, icon: '🌐', color: '#0d9488', desc: `Visiting ${hostname}` })
        setUrl(full)
        setPage('site')
        setHistory(prev => [...prev.slice(0, histIdx + 1 || undefined), { type: 'site', data: { title: hostname, url: full, icon: '🌐', color: '#0d9488', desc: `Visiting ${hostname}` }, url: full }])
        setHistIdx(prev => prev + 1)
    }, [url, histIdx])

    const goHome = () => { setPage('home'); setUrl('') }

    const goBack = () => {
        if (histIdx > 0) {
            const prev = history[histIdx - 1]
            setHistIdx(histIdx - 1)
            setUrl(prev.url)
            if (prev.type === 'site') { setSiteInfo(prev.data); setPage('site') }
            else if (prev.type === 'search') { setSearchQuery(prev.data); setPage('search') }
            else setPage('home')
        } else { goHome() }
    }

    const goForward = () => {
        if (histIdx < history.length - 1) {
            const next = history[histIdx + 1]
            setHistIdx(histIdx + 1)
            setUrl(next.url)
            if (next.type === 'site') { setSiteInfo(next.data); setPage('site') }
            else if (next.type === 'search') { setSearchQuery(next.data); setPage('search') }
        }
    }

    return (
        <div className="flex flex-col h-full -m-5">
            {/* Tab bar */}
            <div className="flex items-center gap-0.5 px-2 pt-2 bg-white/3">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-t-lg bg-white/8 text-xs text-white/60 max-w-[180px]">
                    <span className="truncate">
                        {page === 'home' ? 'New Tab' : page === 'search' ? `Search: ${searchQuery}` : siteInfo?.title}
                    </span>
                </div>
                <button className="w-5 h-5 flex items-center justify-center text-white/20 hover:text-white/40 text-xs">+</button>
            </div>

            {/* URL bar */}
            <div className="flex items-center gap-2 px-3 py-2 bg-white/5 border-b border-white/5">
                <div className="flex items-center gap-1">
                    <button onClick={goHome}
                        className="w-6 h-6 flex items-center justify-center rounded text-white/30 hover:text-white/60 hover:bg-white/8 text-xs">⌂</button>
                    <button onClick={goBack}
                        className="w-6 h-6 flex items-center justify-center rounded text-white/30 hover:text-white/60 hover:bg-white/8 text-xs">←</button>
                    <button onClick={goForward}
                        className="w-6 h-6 flex items-center justify-center rounded text-white/30 hover:text-white/60 hover:bg-white/8 text-xs">→</button>
                </div>
                <div className="flex-1 flex items-center bg-white/8 rounded-lg px-3 py-1.5 border border-white/8">
                    <span className="text-green-400/50 text-xs mr-1">🔒</span>
                    <input
                        type="text" value={url} onChange={e => setUrl(e.target.value)}
                        onKeyDown={e => e.key === 'Enter' && navigate()}
                        placeholder="Search or enter URL..."
                        className="flex-1 bg-transparent text-xs text-white/70 outline-none placeholder-white/20"
                    />
                </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto">
                {page === 'home' && <HomePage url={url} setUrl={setUrl} navigate={navigate} />}
                {page === 'search' && <SearchPage query={searchQuery} navigate={navigate} />}
                {page === 'site' && siteInfo && <SitePage site={siteInfo} navigate={navigate} />}
            </div>
        </div>
    )
}

function HomePage({ url, setUrl, navigate }) {
    return (
        <div className="h-full p-6">
            <div className="text-center mb-8 mt-6">
                <h2 className="text-2xl font-bold text-white/80 mb-1">
                    <span className="text-white">ayaz</span><span className="text-teal-400">Browse</span>
                </h2>
                <p className="text-xs text-white/25">The internet, inside your OS</p>
            </div>

            <div className="max-w-sm mx-auto mb-8">
                <div className="flex items-center bg-white/8 rounded-full px-4 py-2.5 border border-white/10 focus-within:border-teal-500/30 transition-colors">
                    <span className="text-white/25 mr-2">🔍</span>
                    <input type="text" value={url} onChange={e => setUrl(e.target.value)}
                        onKeyDown={e => e.key === 'Enter' && navigate()}
                        placeholder="Search the web..."
                        className="flex-1 bg-transparent text-sm text-white/70 outline-none placeholder-white/20" />
                </div>
            </div>

            <div className="grid grid-cols-4 gap-3 max-w-sm mx-auto">
                {BOOKMARKS.map((bm) => (
                    <motion.button key={bm.title} onClick={() => navigate(bm.url)}
                        className="flex flex-col items-center gap-1.5 p-3 rounded-xl hover:bg-white/5 transition-colors"
                        whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center text-lg"
                            style={{ background: `${bm.color}20` }}>{bm.icon}</div>
                        <span className="text-[10px] text-white/40 truncate w-full text-center">{bm.title}</span>
                    </motion.button>
                ))}
            </div>
        </div>
    )
}

function SearchPage({ query, navigate }) {
    return (
        <div className="p-5">
            <p className="text-[10px] text-white/20 mb-4">About {Math.floor(Math.random() * 900 + 100)},000,000 results</p>
            <div className="space-y-4">
                {SEARCH_RESULTS.filter(r =>
                    r.title.toLowerCase().includes(query.toLowerCase()) ||
                    r.desc.toLowerCase().includes(query.toLowerCase()) ||
                    true
                ).map(result => (
                    <div key={result.url} className="group">
                        <p className="text-[10px] text-white/20 mb-0.5">{result.url}</p>
                        <button onClick={() => navigate('https://' + result.url)}
                            className="text-sm text-teal-400 hover:underline font-medium text-left">
                            {result.title}
                        </button>
                        <p className="text-xs text-white/35 mt-0.5 leading-relaxed">{result.desc}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

function SitePage({ site }) {
    return (
        <div className="h-full flex flex-col items-center justify-center p-8">
            <motion.div
                className="text-center"
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
            >
                <div className="w-20 h-20 rounded-2xl flex items-center justify-center text-4xl mx-auto mb-4 shadow-lg"
                    style={{ background: `${site.color}20` }}>
                    {site.icon}
                </div>
                <h2 className="text-xl font-bold text-white/80 mb-1">{site.title}</h2>
                <p className="text-sm text-white/30 mb-4 max-w-xs">{site.desc}</p>
                <a href={site.url} target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-teal-500/20 text-teal-400 text-sm font-medium
                             hover:bg-teal-500/30 transition-colors">
                    Open in real browser ↗
                </a>
                <p className="text-[9px] text-white/15 mt-3">
                    External sites can't be embedded due to security policies.<br />
                    Click above to open in your real browser.
                </p>
            </motion.div>
        </div>
    )
}
