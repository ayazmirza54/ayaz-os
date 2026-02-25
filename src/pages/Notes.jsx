import { useState, useCallback } from 'react'
import { motion } from 'framer-motion'

const DEFAULT_NOTES = [
    { id: 1, title: 'Welcome', content: 'Welcome to Notes! ✨\n\nThis is your personal notepad inside ayaz.OS.\nCreate, edit, and organize your thoughts here.', updated: Date.now() - 3600000 },
    { id: 2, title: 'Todo List', content: '- [ ] Build portfolio\n- [x] Set up ayaz.OS\n- [ ] Deploy to Vercel\n- [ ] Add more apps', updated: Date.now() - 7200000 },
    { id: 3, title: 'Ideas', content: 'Project ideas:\n• AI-powered code reviewer\n• Real-time markdown editor\n• Interactive resume builder', updated: Date.now() - 86400000 },
]

export default function Notes() {
    const [notes, setNotes] = useState(DEFAULT_NOTES)
    const [activeId, setActiveId] = useState(1)
    const [search, setSearch] = useState('')

    const activeNote = notes.find(n => n.id === activeId)

    const filtered = notes.filter(n =>
        n.title.toLowerCase().includes(search.toLowerCase()) ||
        n.content.toLowerCase().includes(search.toLowerCase())
    ).sort((a, b) => b.updated - a.updated)

    const updateNote = useCallback((field, value) => {
        setNotes(prev => prev.map(n =>
            n.id === activeId ? { ...n, [field]: value, updated: Date.now() } : n
        ))
    }, [activeId])

    const createNote = useCallback(() => {
        const newNote = {
            id: Date.now(),
            title: 'Untitled Note',
            content: '',
            updated: Date.now(),
        }
        setNotes(prev => [newNote, ...prev])
        setActiveId(newNote.id)
    }, [])

    const deleteNote = useCallback(() => {
        if (notes.length <= 1) return
        setNotes(prev => prev.filter(n => n.id !== activeId))
        setActiveId(notes.find(n => n.id !== activeId)?.id || null)
    }, [activeId, notes])

    const formatTime = (ts) => {
        const d = new Date(ts)
        const diff = Date.now() - ts
        if (diff < 60000) return 'Just now'
        if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`
        if (diff < 86400000) return `${Math.floor(diff / 3600000)}h ago`
        return d.toLocaleDateString([], { month: 'short', day: 'numeric' })
    }

    return (
        <div className="flex h-full -m-5">
            {/* Sidebar */}
            <div className="w-48 border-r border-white/5 flex flex-col">
                {/* Toolbar */}
                <div className="flex items-center gap-1 px-2 py-2 border-b border-white/5">
                    <motion.button onClick={createNote}
                        className="flex-1 flex items-center justify-center gap-1 py-1.5 rounded-lg bg-teal-500/15 text-teal-400 text-[10px] font-medium
                                 hover:bg-teal-500/25 transition-colors"
                        whileTap={{ scale: 0.95 }}>
                        + New
                    </motion.button>
                    <button onClick={deleteNote}
                        className="w-8 h-7 flex items-center justify-center rounded-lg text-white/20 hover:text-red-400 hover:bg-red-500/10 text-xs transition-colors"
                        title="Delete note">
                        🗑
                    </button>
                </div>

                {/* Search */}
                <div className="px-2 py-1.5">
                    <input type="text" value={search} onChange={e => setSearch(e.target.value)}
                        placeholder="Search notes..."
                        className="w-full bg-white/5 rounded-lg px-2.5 py-1.5 text-[10px] text-white/60 outline-none
                                 placeholder-white/15 border border-white/5 focus:border-teal-500/30" />
                </div>

                {/* Note list */}
                <div className="flex-1 overflow-y-auto px-1 space-y-0.5">
                    {filtered.map(note => (
                        <button key={note.id}
                            onClick={() => setActiveId(note.id)}
                            className={`w-full text-left px-2.5 py-2 rounded-lg transition-colors
                                ${note.id === activeId ? 'bg-white/8' : 'hover:bg-white/4'}`}>
                            <p className={`text-xs truncate ${note.id === activeId ? 'text-white/70 font-medium' : 'text-white/45'}`}>
                                {note.title}
                            </p>
                            <p className="text-[9px] text-white/20 truncate mt-0.5">
                                {formatTime(note.updated)} · {note.content.slice(0, 30)}...
                            </p>
                        </button>
                    ))}
                </div>

                <div className="px-3 py-1.5 border-t border-white/5 text-[9px] text-white/15">
                    {notes.length} notes
                </div>
            </div>

            {/* Editor */}
            <div className="flex-1 flex flex-col">
                {activeNote ? (
                    <>
                        {/* Title */}
                        <input
                            type="text"
                            value={activeNote.title}
                            onChange={e => updateNote('title', e.target.value)}
                            className="px-5 pt-4 pb-1 bg-transparent text-base font-semibold text-white/80 outline-none placeholder-white/20"
                            placeholder="Note title..."
                        />
                        <p className="px-5 text-[9px] text-white/15 mb-2">{formatTime(activeNote.updated)}</p>

                        <div className="h-px bg-white/5 mx-5" />

                        {/* Content */}
                        <textarea
                            value={activeNote.content}
                            onChange={e => updateNote('content', e.target.value)}
                            className="flex-1 px-5 py-3 bg-transparent text-sm text-white/60 outline-none resize-none
                                     placeholder-white/15 leading-relaxed"
                            placeholder="Start writing..."
                        />
                    </>
                ) : (
                    <div className="flex-1 flex items-center justify-center text-white/15 text-sm">
                        Select a note or create a new one
                    </div>
                )}
            </div>
        </div>
    )
}
