import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const FILE_SYSTEM = {
    'Home': {
        type: 'folder',
        children: {
            'Documents': {
                type: 'folder',
                children: {
                    'resume.pdf': { type: 'file', ext: 'pdf', size: '245 KB', content: '📄 Ayaz Mirza — Software Developer\n\nExperience: React, Node.js, Python\nPortfolio: ayaz.os\nEmail: contact@ayaz.dev' },
                    'cover-letter.docx': { type: 'file', ext: 'doc', size: '38 KB', content: 'Dear Hiring Manager,\n\nI am writing to express my interest in the Software Developer position...\n\nThank you for your consideration.\n— Ayaz Mirza' },
                    'notes.txt': { type: 'file', ext: 'txt', size: '2 KB', content: 'Meeting Notes — Feb 2026\n\n• Finalize ayaz.OS design\n• Deploy to Vercel\n• Add more interactive apps\n• Fix responsive layout' },
                },
            },
            'Downloads': {
                type: 'folder',
                children: {
                    'project-starter.zip': { type: 'file', ext: 'zip', size: '12 MB', content: null },
                    'design-mockup.fig': { type: 'file', ext: 'fig', size: '8 MB', content: null },
                    'package.json': { type: 'file', ext: 'json', size: '1 KB', content: '{\n  "name": "ayaz-os",\n  "version": "1.0.0",\n  "type": "module",\n  "scripts": {\n    "dev": "vite",\n    "build": "vite build"\n  }\n}' },
                },
            },
            'Pictures': {
                type: 'folder',
                children: {
                    'avatar.png': { type: 'file', ext: 'img', size: '156 KB', content: null },
                    'wallpaper.jpg': { type: 'file', ext: 'img', size: '2.1 MB', content: null },
                    'screenshot.png': { type: 'file', ext: 'img', size: '890 KB', content: null },
                },
            },
            'Projects': {
                type: 'folder',
                children: {
                    'ayaz-os': {
                        type: 'folder', children: {
                            'src': { type: 'folder', children: { 'App.jsx': { type: 'file', ext: 'js', size: '2 KB', content: 'import Desktop from "./components/Desktop"\n\nexport default function App() {\n  return <Desktop />\n}' } } },
                            'package.json': { type: 'file', ext: 'json', size: '1 KB', content: '{\n  "name": "ayaz-os",\n  "private": true,\n  "version": "1.0.0"\n}' },
                        }
                    },
                    'buysense': { type: 'folder', children: { 'index.js': { type: 'file', ext: 'js', size: '4 KB', content: 'const express = require("express")\nconst app = express()\n\napp.get("/analyze", async (req, res) => {\n  // Product analysis logic\n  res.json({ score: 85 })\n})\n\napp.listen(3000)' } } },
                    'hashnote': { type: 'folder', children: { 'app.py': { type: 'file', ext: 'py', size: '6 KB', content: 'from flask import Flask, request\n\napp = Flask(__name__)\n\n@app.route("/note/<hash>")\ndef get_note(hash):\n    # Retrieve note by hash\n    return render_template("note.html")' } } },
                },
            },
            'Music': {
                type: 'folder',
                children: {
                    'playlist.m3u': { type: 'file', ext: 'music', size: '1 KB', content: '#EXTM3U\n#EXTINF:240,Midnight Drive\nmidnight-drive.mp3\n#EXTINF:195,Neon Skyline\nneon-skyline.mp3' },
                    'midnight-drive.mp3': { type: 'file', ext: 'music', size: '4.2 MB', content: null },
                },
            },
        },
    },
}

const FILE_ICONS = {
    folder: '📁', pdf: '📕', doc: '📄', txt: '📝', zip: '📦',
    fig: '🎨', json: '{ }', img: '🖼️', js: '⚡', py: '🐍', music: '🎵', default: '📄',
}

function getNode(path) {
    let node = FILE_SYSTEM
    for (const part of path) {
        node = node[part]?.children || node[part]
        if (!node) return null
    }
    return node
}

export default function FileManager() {
    const [path, setPath] = useState(['Home'])
    const [selected, setSelected] = useState(null)
    const [viewMode, setViewMode] = useState('grid') // 'grid' | 'list'
    const [preview, setPreview] = useState(null)       // { name, item } for file preview

    const currentNode = path.length === 0 ? FILE_SYSTEM : getNode(path)
    const items = currentNode?.children || currentNode || {}

    const navigateTo = useCallback((name) => {
        const item = items[name]
        if (item?.type === 'folder') {
            setPath(prev => [...prev, name])
            setSelected(null)
            setPreview(null)
        } else if (item?.type === 'file') {
            setPreview({ name, item })
        }
    }, [items])

    const goUp = () => {
        if (path.length > 1) {
            setPath(path.slice(0, -1))
            setSelected(null)
            setPreview(null)
        }
    }

    const goTo = (idx) => {
        setPath(path.slice(0, idx + 1))
        setSelected(null)
        setPreview(null)
    }

    const handleClick = (name) => {
        setSelected(name)
    }

    const handleDoubleClick = (name) => {
        navigateTo(name)
    }

    return (
        <div className="flex flex-col h-full -m-5">
            {/* Toolbar */}
            <div className="flex items-center gap-2 px-4 py-2 border-b border-white/5">
                <button onClick={goUp}
                    className={`w-7 h-7 flex items-center justify-center rounded-lg text-sm transition-colors
                        ${path.length <= 1 ? 'text-white/10 cursor-not-allowed' : 'text-white/30 hover:text-white/60 hover:bg-white/8'}`}
                    disabled={path.length <= 1}>
                    ←
                </button>

                {/* Breadcrumb */}
                <div className="flex items-center gap-1 flex-1 min-w-0">
                    {path.map((p, i) => (
                        <span key={i} className="flex items-center gap-1">
                            {i > 0 && <span className="text-white/15 text-xs">/</span>}
                            <button onClick={() => goTo(i)}
                                className={`text-xs px-1.5 py-0.5 rounded hover:bg-white/8 transition-colors truncate
                                    ${i === path.length - 1 ? 'text-white/60 font-medium' : 'text-white/30'}`}>
                                {p}
                            </button>
                        </span>
                    ))}
                </div>

                {/* View toggle */}
                <div className="flex items-center gap-0.5 bg-white/5 rounded-lg p-0.5">
                    <button onClick={() => setViewMode('grid')}
                        className={`px-2 py-1 rounded text-[10px] transition-colors ${viewMode === 'grid' ? 'bg-white/10 text-white/60' : 'text-white/25'}`}>
                        ⊞
                    </button>
                    <button onClick={() => setViewMode('list')}
                        className={`px-2 py-1 rounded text-[10px] transition-colors ${viewMode === 'list' ? 'bg-white/10 text-white/60' : 'text-white/25'}`}>
                        ☰
                    </button>
                </div>
            </div>

            <div className="flex flex-1 overflow-hidden">
                {/* Sidebar */}
                <div className="w-36 border-r border-white/5 py-2 px-2 space-y-0.5 overflow-y-auto shrink-0">
                    <p className="text-[9px] uppercase text-white/20 font-medium px-2 mb-1">Favorites</p>
                    {Object.keys(FILE_SYSTEM.Home.children).map(name => (
                        <button key={name}
                            onClick={() => { setPath(['Home', name]); setSelected(null); setPreview(null) }}
                            className={`w-full flex items-center gap-2 px-2 py-1.5 rounded-lg text-xs text-left transition-colors
                                ${path[1] === name ? 'bg-white/8 text-white/70' : 'text-white/35 hover:bg-white/5 hover:text-white/50'}`}>
                            <span className="text-sm">{FILE_ICONS.folder}</span>
                            {name}
                        </button>
                    ))}
                </div>

                {/* File area */}
                <div className="flex-1 overflow-y-auto p-3">
                    {Object.keys(items).length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full text-white/15">
                            <span className="text-3xl mb-2">📂</span>
                            <span className="text-xs">This folder is empty</span>
                        </div>
                    ) : viewMode === 'grid' ? (
                        <div className="grid grid-cols-4 gap-2">
                            {Object.entries(items).map(([name, item]) => (
                                <motion.button
                                    key={name}
                                    onClick={() => handleClick(name)}
                                    onDoubleClick={() => handleDoubleClick(name)}
                                    className={`flex flex-col items-center gap-1 p-3 rounded-xl transition-colors
                                        ${selected === name ? 'bg-teal-500/15 ring-1 ring-teal-500/30' : 'hover:bg-white/5'}`}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <span className="text-2xl">
                                        {item.type === 'folder' ? FILE_ICONS.folder : (FILE_ICONS[item.ext] || FILE_ICONS.default)}
                                    </span>
                                    <span className="text-[10px] text-white/50 truncate w-full text-center">{name}</span>
                                </motion.button>
                            ))}
                        </div>
                    ) : (
                        <div className="space-y-px">
                            {Object.entries(items).map(([name, item]) => (
                                <motion.button
                                    key={name}
                                    onClick={() => handleClick(name)}
                                    onDoubleClick={() => handleDoubleClick(name)}
                                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors text-left
                                        ${selected === name ? 'bg-teal-500/15 ring-1 ring-teal-500/30' : 'hover:bg-white/5'}`}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    <span className="text-base">
                                        {item.type === 'folder' ? FILE_ICONS.folder : (FILE_ICONS[item.ext] || FILE_ICONS.default)}
                                    </span>
                                    <span className="flex-1 text-xs text-white/60 truncate">{name}</span>
                                    <span className="text-[10px] text-white/20">{item.size || '--'}</span>
                                </motion.button>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* File preview overlay */}
            <AnimatePresence>
                {preview && (
                    <motion.div
                        className="absolute inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        onClick={() => setPreview(null)}
                    >
                        <motion.div
                            className="w-full max-w-md max-h-[80%] rounded-2xl border border-white/10 overflow-hidden flex flex-col"
                            style={{ background: 'rgba(15,30,20,0.95)' }}
                            initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
                            onClick={e => e.stopPropagation()}
                        >
                            {/* Preview header */}
                            <div className="flex items-center justify-between px-4 py-3 border-b border-white/8">
                                <div className="flex items-center gap-2">
                                    <span className="text-lg">
                                        {FILE_ICONS[preview.item.ext] || FILE_ICONS.default}
                                    </span>
                                    <div>
                                        <p className="text-xs font-medium text-white/70">{preview.name}</p>
                                        <p className="text-[9px] text-white/25">{preview.item.size}</p>
                                    </div>
                                </div>
                                <button onClick={() => setPreview(null)}
                                    className="w-6 h-6 flex items-center justify-center rounded-lg text-white/25 hover:text-white/50 hover:bg-white/8 text-xs">
                                    ✕
                                </button>
                            </div>

                            {/* Preview content */}
                            <div className="flex-1 overflow-y-auto p-4">
                                {preview.item.content ? (
                                    <pre className="text-xs text-white/50 whitespace-pre-wrap font-mono leading-relaxed">
                                        {preview.item.content}
                                    </pre>
                                ) : preview.item.ext === 'img' ? (
                                    <div className="flex flex-col items-center justify-center py-8 text-white/20">
                                        <span className="text-5xl mb-3">🖼️</span>
                                        <p className="text-xs">Image preview</p>
                                        <p className="text-[10px] text-white/15 mt-1">{preview.name} • {preview.item.size}</p>
                                    </div>
                                ) : preview.item.ext === 'music' ? (
                                    <div className="flex flex-col items-center justify-center py-8 text-white/20">
                                        <span className="text-5xl mb-3">🎵</span>
                                        <p className="text-xs">Audio file</p>
                                        <p className="text-[10px] text-white/15 mt-1">{preview.name} • {preview.item.size}</p>
                                    </div>
                                ) : (
                                    <div className="flex flex-col items-center justify-center py-8 text-white/20">
                                        <span className="text-5xl mb-3">📦</span>
                                        <p className="text-xs">No preview available</p>
                                        <p className="text-[10px] text-white/15 mt-1">{preview.name} • {preview.item.size}</p>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Status bar */}
            <div className="flex items-center justify-between px-4 py-1.5 border-t border-white/5 text-[10px] text-white/20">
                <span>{Object.keys(items).length} items</span>
                <span>
                    {selected && `${selected}`}
                    {selected && items[selected]?.type === 'file' && ' — Double-click to open'}
                    {selected && items[selected]?.type === 'folder' && ' — Double-click to enter'}
                </span>
            </div>
        </div>
    )
}
