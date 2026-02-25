import { useState, useRef, useEffect, useCallback } from 'react'

const HOSTNAME = 'ayaz@os'
const PROMPT = `${HOSTNAME}:~$ `

const NEOFETCH = `
  ╭─────────────╮
  │   ayaz.OS   │    OS: ayaz.OS v1.0.0
  │  ┌───────┐  │    Host: Web Browser
  │  │ ◉   ◉ │  │    Kernel: React 19
  │  │   ▽   │  │    Shell: ayazsh 1.0
  │  │ ╰───╯ │  │    Resolution: ${window.innerWidth}x${window.innerHeight}
  │  └───────┘  │    Theme: Ghibli Teal
  ╰─────────────╯    Framework: Vite 8
                     Uptime: since you clicked boot
`.trim()

const HELP_TEXT = `Available commands:
  help          Show this help message
  whoami        Display current user
  ls            List files in current directory
  cat <file>    Read a file
  echo <text>   Print text to terminal
  date          Show current date and time
  clear         Clear the terminal
  neofetch      System information
  skills        List technical skills
  contact       Show contact information
  projects      List projects
  uname -a      Show system info
  history       Show command history
`

const FILES = {
    'readme.txt': 'Welcome to ayaz.OS — a web-based desktop portfolio experience.',
    'about.txt': 'Hi! I\'m Ayaz — a developer who loves building creative web experiences.',
    'skills.json': '{ "frontend": ["React", "TypeScript", "CSS"], "tools": ["Git", "Vite", "Figma"] }',
    'secret.txt': '🎉 You found the secret file! You\'re clearly a terminal person.',
}

const SKILLS = `
  Frontend    │ React, Vue, HTML, CSS, TypeScript, JavaScript
  Backend     │ Node.js, Express, Python, REST APIs
  Tools       │ Git, Docker, Vite, Webpack, Figma
  Cloud       │ AWS, Vercel, Netlify
  Other       │ Agile, CI/CD, Linux, Shell scripting
`

export default function Terminal() {
    const [lines, setLines] = useState([
        { type: 'output', text: 'ayaz.OS Terminal v1.0.0' },
        { type: 'output', text: 'Type "help" for available commands.\n' },
    ])
    const [input, setInput] = useState('')
    const [history, setHistory] = useState([])
    const [histIdx, setHistIdx] = useState(-1)
    const bottomRef = useRef(null)
    const inputRef = useRef(null)

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [lines])

    useEffect(() => {
        inputRef.current?.focus()
    }, [])

    const runCommand = useCallback((cmd) => {
        const trimmed = cmd.trim()
        const parts = trimmed.split(/\s+/)
        const command = parts[0]?.toLowerCase()
        const args = parts.slice(1).join(' ')

        const newLines = [{ type: 'input', text: PROMPT + trimmed }]

        switch (command) {
            case '':
                break
            case 'help':
                newLines.push({ type: 'output', text: HELP_TEXT })
                break
            case 'whoami':
                newLines.push({ type: 'output', text: 'ayaz' })
                break
            case 'ls':
                newLines.push({ type: 'output', text: Object.keys(FILES).join('  ') })
                break
            case 'cat':
                if (FILES[args]) {
                    newLines.push({ type: 'output', text: FILES[args] })
                } else {
                    newLines.push({ type: 'error', text: `cat: ${args}: No such file` })
                }
                break
            case 'echo':
                newLines.push({ type: 'output', text: args || '' })
                break
            case 'date':
                newLines.push({ type: 'output', text: new Date().toString() })
                break
            case 'clear':
                setLines([])
                setInput('')
                return
            case 'neofetch':
                newLines.push({ type: 'output', text: NEOFETCH })
                break
            case 'skills':
                newLines.push({ type: 'output', text: SKILLS })
                break
            case 'contact':
                newLines.push({ type: 'output', text: '📧 Email: contact@ayaz.dev\n🐙 GitHub: github.com/ayaz\n💼 LinkedIn: linkedin.com/in/ayaz' })
                break
            case 'projects':
                newLines.push({ type: 'output', text: '1. ayaz.OS — Web-based desktop portfolio\n2. BuySense — AI product analysis\n3. HashNote — Encrypted notes app' })
                break
            case 'uname':
                newLines.push({ type: 'output', text: 'ayazOS 1.0.0 React19 x86_64 Vite/8.0' })
                break
            case 'history':
                newLines.push({ type: 'output', text: history.map((h, i) => `  ${i + 1}  ${h}`).join('\n') || '(empty)' })
                break
            case 'sudo':
                newLines.push({ type: 'error', text: 'Nice try 😏 — sudo is disabled in this OS.' })
                break
            case 'rm':
                newLines.push({ type: 'error', text: '🛑 Permission denied. This is a portfolio, not a playground!' })
                break
            case 'exit':
                newLines.push({ type: 'output', text: 'Goodbye! (But you can\'t really exit a web terminal 😄)' })
                break
            default:
                newLines.push({ type: 'error', text: `command not found: ${command}. Type "help" for available commands.` })
        }

        setLines(prev => [...prev, ...newLines])
        if (trimmed) {
            setHistory(prev => [...prev, trimmed])
        }
        setHistIdx(-1)
        setInput('')
    }, [history])

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            runCommand(input)
        } else if (e.key === 'ArrowUp') {
            e.preventDefault()
            if (history.length > 0) {
                const idx = histIdx < 0 ? history.length - 1 : Math.max(0, histIdx - 1)
                setHistIdx(idx)
                setInput(history[idx])
            }
        } else if (e.key === 'ArrowDown') {
            e.preventDefault()
            if (histIdx >= 0) {
                const idx = histIdx + 1
                if (idx >= history.length) {
                    setHistIdx(-1)
                    setInput('')
                } else {
                    setHistIdx(idx)
                    setInput(history[idx])
                }
            }
        } else if (e.key === 'l' && e.ctrlKey) {
            e.preventDefault()
            setLines([])
        }
    }

    return (
        <div className="flex flex-col h-full -m-5 bg-[#0c0c0c] font-mono text-sm"
            onClick={() => inputRef.current?.focus()}>
            <div className="flex-1 overflow-y-auto p-4 space-y-0.5">
                {lines.map((line, i) => (
                    <div key={i} className={`whitespace-pre-wrap leading-relaxed ${line.type === 'input' ? 'text-teal-400' :
                        line.type === 'error' ? 'text-red-400/80' :
                            'text-green-300/70'
                        }`}>
                        {line.text}
                    </div>
                ))}

                {/* Input line */}
                <div className="flex items-center">
                    <span className="text-teal-400 shrink-0">{PROMPT}</span>
                    <input
                        ref={inputRef}
                        type="text"
                        value={input}
                        onChange={e => setInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        className="flex-1 bg-transparent text-green-300/90 outline-none caret-teal-400 ml-0"
                        spellCheck={false}
                        autoComplete="off"
                    />
                </div>
                <div ref={bottomRef} />
            </div>
        </div>
    )
}
