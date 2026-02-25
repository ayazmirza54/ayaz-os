import { motion } from 'framer-motion'

const CURRENT = {
    city: 'San Francisco',
    temp: 22,
    feelsLike: 20,
    condition: 'Partly Cloudy',
    icon: '⛅',
    humidity: 65,
    wind: 12,
    uv: 5,
    visibility: 16,
    pressure: 1013,
}

const FORECAST = [
    { day: 'Mon', icon: '☀️', high: 24, low: 16 },
    { day: 'Tue', icon: '⛅', high: 22, low: 15 },
    { day: 'Wed', icon: '🌧️', high: 18, low: 13 },
    { day: 'Thu', icon: '🌤️', high: 20, low: 14 },
    { day: 'Fri', icon: '☀️', high: 25, low: 17 },
    { day: 'Sat', icon: '⛅', high: 23, low: 16 },
    { day: 'Sun', icon: '☀️', high: 26, low: 18 },
]

const HOURLY = [
    { time: 'Now', icon: '⛅', temp: 22 },
    { time: '1PM', icon: '☀️', temp: 23 },
    { time: '2PM', icon: '☀️', temp: 24 },
    { time: '3PM', icon: '🌤️', temp: 23 },
    { time: '4PM', icon: '⛅', temp: 22 },
    { time: '5PM', icon: '🌤️', temp: 21 },
    { time: '6PM', icon: '🌅', temp: 19 },
    { time: '7PM', icon: '🌙', temp: 17 },
]

export default function Weather() {
    return (
        <div className="h-full overflow-y-auto -m-5">
            {/* Hero — current weather */}
            <div className="px-5 pt-6 pb-4 text-center"
                style={{ background: 'linear-gradient(180deg, rgba(56,189,248,0.08) 0%, transparent 100%)' }}>
                <p className="text-xs text-white/30 mb-1">📍 {CURRENT.city}</p>
                <div className="text-6xl mb-1">{CURRENT.icon}</div>
                <div className="text-4xl font-light text-white/90 mb-0.5">{CURRENT.temp}°</div>
                <p className="text-sm text-white/40">{CURRENT.condition}</p>
                <p className="text-[10px] text-white/20 mt-1">Feels like {CURRENT.feelsLike}°</p>
            </div>

            {/* Hourly */}
            <div className="px-4 py-3">
                <h3 className="text-[10px] uppercase text-white/20 font-medium mb-2 px-1">Hourly Forecast</h3>
                <div className="flex gap-1 overflow-x-auto no-scrollbar pb-1">
                    {HOURLY.map((h, i) => (
                        <motion.div key={h.time}
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
                    {FORECAST.map((day, i) => (
                        <motion.div key={day.day}
                            className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/4 transition-colors"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.05 }}
                        >
                            <span className="text-xs text-white/40 w-8">{day.day}</span>
                            <span className="text-lg">{day.icon}</span>
                            <div className="flex-1 flex items-center gap-1.5">
                                <span className="text-xs text-white/25 w-6 text-right">{day.low}°</span>
                                <div className="flex-1 h-1 rounded-full bg-white/5 overflow-hidden">
                                    <div className="h-full rounded-full"
                                        style={{
                                            width: `${((day.high - day.low) / 15) * 100}%`,
                                            marginLeft: `${((day.low - 10) / 20) * 100}%`,
                                            background: `linear-gradient(90deg, #38bdf8 0%, #f59e0b 100%)`,
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
                <DetailCard icon="💧" label="Humidity" value={`${CURRENT.humidity}%`} />
                <DetailCard icon="💨" label="Wind" value={`${CURRENT.wind} km/h`} />
                <DetailCard icon="☀️" label="UV Index" value={CURRENT.uv} status={CURRENT.uv <= 3 ? 'Low' : 'Moderate'} />
                <DetailCard icon="👁️" label="Visibility" value={`${CURRENT.visibility} km`} />
                <DetailCard icon="🌡️" label="Pressure" value={`${CURRENT.pressure} hPa`} />
                <DetailCard icon="🌅" label="Sunset" value="7:24 PM" />
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
