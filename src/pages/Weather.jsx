import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

// Lucknow coordinates
const LAT = 26.8467
const LON = 80.9462
const CITY = 'Lucknow'

// WMO weather code → emoji + description
const WMO = {
    0: ['☀️', 'Clear Sky'], 1: ['🌤️', 'Mainly Clear'], 2: ['⛅', 'Partly Cloudy'], 3: ['☁️', 'Overcast'],
    45: ['🌫️', 'Foggy'], 48: ['🌫️', 'Rime Fog'],
    51: ['🌦️', 'Light Drizzle'], 53: ['🌦️', 'Drizzle'], 55: ['🌧️', 'Dense Drizzle'],
    61: ['🌧️', 'Light Rain'], 63: ['🌧️', 'Rain'], 65: ['🌧️', 'Heavy Rain'],
    71: ['🌨️', 'Light Snow'], 73: ['🌨️', 'Snow'], 75: ['❄️', 'Heavy Snow'],
    80: ['🌧️', 'Rain Showers'], 81: ['�️', 'Moderate Showers'], 82: ['⛈️', 'Heavy Showers'],
    95: ['⛈️', 'Thunderstorm'], 96: ['⛈️', 'Thunderstorm + Hail'], 99: ['⛈️', 'Severe Thunderstorm'],
}

function wmo(code) { return WMO[code] || ['🌡️', 'Unknown'] }

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

export default function Weather() {
    const [current, setCurrent] = useState(null)
    const [hourly, setHourly] = useState([])
    const [daily, setDaily] = useState([])
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${LAT}&longitude=${LON}`
            + `&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m,surface_pressure`
            + `&hourly=temperature_2m,weather_code`
            + `&daily=weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset,uv_index_max`
            + `&timezone=Asia%2FKolkata&forecast_days=7`

        fetch(url)
            .then(r => { if (!r.ok) throw new Error('API error'); return r.json() })
            .then(data => {
                // Current
                const c = data.current
                setCurrent({
                    temp: Math.round(c.temperature_2m),
                    feelsLike: Math.round(c.apparent_temperature),
                    humidity: c.relative_humidity_2m,
                    wind: Math.round(c.wind_speed_10m),
                    pressure: Math.round(c.surface_pressure),
                    ...wmoObj(c.weather_code),
                })

                // Hourly — next 8 hours from now
                const nowHour = new Date().getHours()
                const hSlice = []
                for (let i = 0; i < data.hourly.time.length && hSlice.length < 8; i++) {
                    const h = new Date(data.hourly.time[i]).getHours()
                    const d = new Date(data.hourly.time[i])
                    if (d >= new Date(Date.now() - 3600000)) { // within the last hour or future
                        hSlice.push({
                            time: hSlice.length === 0 ? 'Now' : formatHour(h),
                            temp: Math.round(data.hourly.temperature_2m[i]),
                            icon: wmo(data.hourly.weather_code[i])[0],
                        })
                    }
                }
                setHourly(hSlice)

                // Daily
                setDaily(data.daily.time.map((t, i) => ({
                    day: DAYS[new Date(t).getDay()],
                    icon: wmo(data.daily.weather_code[i])[0],
                    high: Math.round(data.daily.temperature_2m_max[i]),
                    low: Math.round(data.daily.temperature_2m_min[i]),
                    uv: data.daily.uv_index_max[i],
                    sunset: formatSunTime(data.daily.sunset[i]),
                })))

                setLoading(false)
            })
            .catch(err => { setError(err.message); setLoading(false) })
    }, [])

    if (loading) return (
        <div className="h-full flex items-center justify-center">
            <div className="text-white/30 text-sm animate-pulse">Loading weather…</div>
        </div>
    )

    if (error) return (
        <div className="h-full flex items-center justify-center">
            <div className="text-red-400/60 text-sm">⚠️ {error}</div>
        </div>
    )

    const sunset = daily[0]?.sunset || '—'
    const uvMax = daily[0]?.uv || 0

    return (
        <div className="h-full overflow-y-auto -m-5">
            {/* Hero — current weather */}
            <div className="px-5 pt-6 pb-4 text-center"
                style={{ background: 'linear-gradient(180deg, rgba(56,189,248,0.08) 0%, transparent 100%)' }}>
                <p className="text-xs text-white/30 mb-1">📍 {CITY}</p>
                <div className="text-6xl mb-1">{current.icon}</div>
                <div className="text-4xl font-light text-white/90 mb-0.5">{current.temp}°</div>
                <p className="text-sm text-white/40">{current.condition}</p>
                <p className="text-[10px] text-white/20 mt-1">Feels like {current.feelsLike}°</p>
            </div>

            {/* Hourly */}
            <div className="px-4 py-3">
                <h3 className="text-[10px] uppercase text-white/20 font-medium mb-2 px-1">Hourly Forecast</h3>
                <div className="flex gap-1 overflow-x-auto no-scrollbar pb-1">
                    {hourly.map((h, i) => (
                        <motion.div key={h.time + i}
                            className="flex flex-col items-center gap-1 px-3 py-2 rounded-xl bg-white/5 min-w-[52px] shrink-0"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.05 }}
                        >
                            <span className="text-[9px] text-white/25">{h.time}</span>
                            <span className="text-base">{h.icon}</span>
                            <span className="text-xs text-white/60 font-medium">{h.temp}°</span>
                        </motion.div>
                    ))}
                </div>
            </div>

            <div className="h-px bg-white/5 mx-4" />

            {/* 7-day forecast */}
            <div className="px-4 py-3">
                <h3 className="text-[10px] uppercase text-white/20 font-medium mb-2 px-1">7-Day Forecast</h3>
                <div className="space-y-1">
                    {daily.map((day, i) => (
                        <motion.div key={day.day + i}
                            className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/4 transition-colors"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.05 }}
                        >
                            <span className="text-xs text-white/40 w-8">{i === 0 ? 'Today' : day.day}</span>
                            <span className="text-lg">{day.icon}</span>
                            <div className="flex-1 flex items-center gap-1.5">
                                <span className="text-xs text-white/25 w-6 text-right">{day.low}°</span>
                                <div className="flex-1 h-1 rounded-full bg-white/5 overflow-hidden">
                                    <div className="h-full rounded-full"
                                        style={{
                                            width: `${((day.high - day.low) / 20) * 100}%`,
                                            marginLeft: `${((day.low - 10) / 30) * 100}%`,
                                            background: 'linear-gradient(90deg, #38bdf8 0%, #f59e0b 100%)',
                                        }} />
                                </div>
                                <span className="text-xs text-white/50 w-6">{day.high}°</span>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            <div className="h-px bg-white/5 mx-4" />

            {/* Details grid */}
            <div className="grid grid-cols-2 gap-2 px-4 py-3">
                <DetailCard icon="💧" label="Humidity" value={`${current.humidity}%`} />
                <DetailCard icon="💨" label="Wind" value={`${current.wind} km/h`} />
                <DetailCard icon="☀️" label="UV Index" value={uvMax} status={uvMax <= 3 ? 'Low' : uvMax <= 6 ? 'Moderate' : 'High'} />
                <DetailCard icon="🌡️" label="Pressure" value={`${current.pressure} hPa`} />
                <DetailCard icon="�" label="Sunset" value={sunset} />
                <DetailCard icon="�️" label="Feels Like" value={`${current.feelsLike}°`} />
            </div>
        </div>
    )
}

function DetailCard({ icon, label, value, status }) {
    return (
        <div className="bg-white/5 rounded-xl p-3 border border-white/5">
            <div className="flex items-center gap-1.5 mb-1">
                <span className="text-xs">{icon}</span>
                <span className="text-[9px] uppercase text-white/20">{label}</span>
            </div>
            <p className="text-sm font-medium text-white/60">{value}</p>
            {status && <p className="text-[9px] text-white/20">{status}</p>}
        </div>
    )
}

function wmoObj(code) {
    const [icon, condition] = wmo(code)
    return { icon, condition }
}

function formatHour(h) {
    const ampm = h >= 12 ? 'PM' : 'AM'
    const hr = h % 12 || 12
    return `${hr}${ampm}`
}

function formatSunTime(iso) {
    if (!iso) return '—'
    const d = new Date(iso)
    return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}
