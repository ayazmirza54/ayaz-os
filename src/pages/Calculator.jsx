import { useState, useCallback, useEffect } from 'react'
import { motion } from 'framer-motion'

const BUTTONS = [
    ['C', '±', '%', '÷'],
    ['7', '8', '9', '×'],
    ['4', '5', '6', '−'],
    ['1', '2', '3', '+'],
    ['0', '.', '⌫', '='],
]

const OP_MAP = { '÷': '/', '×': '*', '−': '-', '+': '+' }

export default function Calculator() {
    const [display, setDisplay] = useState('0')
    const [prev, setPrev] = useState(null)
    const [op, setOp] = useState(null)
    const [fresh, setFresh] = useState(true)

    const handleInput = useCallback((btn) => {
        if (btn >= '0' && btn <= '9') {
            setDisplay(d => fresh ? btn : d === '0' ? btn : d + btn)
            setFresh(false)
        } else if (btn === '.') {
            if (!display.includes('.')) {
                setDisplay(d => d + '.')
                setFresh(false)
            }
        } else if (btn === 'C') {
            setDisplay('0'); setPrev(null); setOp(null); setFresh(true)
        } else if (btn === '±') {
            setDisplay(d => d.startsWith('-') ? d.slice(1) : '-' + d)
        } else if (btn === '%') {
            setDisplay(d => String(parseFloat(d) / 100))
        } else if (btn === '⌫') {
            setDisplay(d => d.length > 1 ? d.slice(0, -1) : '0')
        } else if (btn in OP_MAP) {
            if (prev !== null && op && !fresh) {
                const result = calc(prev, parseFloat(display), op)
                setDisplay(String(result))
                setPrev(result)
            } else {
                setPrev(parseFloat(display))
            }
            setOp(OP_MAP[btn])
            setFresh(true)
        } else if (btn === '=') {
            if (prev !== null && op) {
                const result = calc(prev, parseFloat(display), op)
                setDisplay(String(result))
                setPrev(null)
                setOp(null)
                setFresh(true)
            }
        }
    }, [display, prev, op, fresh])

    // Keyboard support
    useEffect(() => {
        const handler = (e) => {
            const key = e.key
            if (key >= '0' && key <= '9') handleInput(key)
            else if (key === '.') handleInput('.')
            else if (key === '+') handleInput('+')
            else if (key === '-') handleInput('−')
            else if (key === '*') handleInput('×')
            else if (key === '/') { e.preventDefault(); handleInput('÷') }
            else if (key === 'Enter' || key === '=') handleInput('=')
            else if (key === 'Escape') handleInput('C')
            else if (key === 'Backspace') handleInput('⌫')
            else if (key === '%') handleInput('%')
        }
        window.addEventListener('keydown', handler)
        return () => window.removeEventListener('keydown', handler)
    }, [handleInput])

    const isOp = (btn) => btn in OP_MAP
    const isAction = (btn) => ['C', '±', '%', '⌫'].includes(btn)

    return (
        <div className="flex flex-col h-full -m-5">
            {/* Display */}
            <div className="px-5 pt-4 pb-3 text-right">
                {prev !== null && op && (
                    <div className="text-xs text-white/25 mb-0.5">
                        {prev} {Object.entries(OP_MAP).find(([k, v]) => v === op)?.[0]}
                    </div>
                )}
                <div className="text-3xl font-light text-white/90 tracking-tight truncate font-mono">
                    {formatNumber(display)}
                </div>
            </div>

            <div className="h-px bg-white/5" />

            {/* Button grid */}
            <div className="flex-1 grid grid-rows-5 gap-px p-2">
                {BUTTONS.map((row, ri) => (
                    <div key={ri} className="grid grid-cols-4 gap-1.5">
                        {row.map((btn) => (
                            <motion.button
                                key={btn}
                                onClick={() => handleInput(btn)}
                                className={`calc-btn rounded-xl text-base font-medium flex items-center justify-center
                                    transition-colors duration-100
                                    ${btn === '=' ? 'bg-teal-500/80 text-white hover:bg-teal-400/80' :
                                        isOp(btn) ? 'bg-white/10 text-teal-400 hover:bg-white/15' :
                                            isAction(btn) ? 'bg-white/8 text-white/60 hover:bg-white/12' :
                                                'bg-white/5 text-white/80 hover:bg-white/10'}`}
                                whileTap={{ scale: 0.92 }}
                            >
                                {btn}
                            </motion.button>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    )
}

function calc(a, b, op) {
    switch (op) {
        case '+': return a + b
        case '-': return a - b
        case '*': return a * b
        case '/': return b !== 0 ? a / b : 'Error'
        default: return b
    }
}

function formatNumber(str) {
    if (str === 'Error' || str.endsWith('.')) return str
    const num = parseFloat(str)
    if (isNaN(num)) return str
    if (Number.isInteger(num) && !str.includes('.')) {
        return num.toLocaleString()
    }
    return str
}
