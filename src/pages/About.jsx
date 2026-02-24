import { motion } from 'framer-motion'

/**
 * About page — real profile data for Ayaz Mirza.
 */
export default function About() {
    return (
        <div className="flex flex-col items-center gap-6 py-4">
            {/* Avatar */}
            <motion.div
                className="w-28 h-28 rounded-full bg-gradient-to-br from-teal-500 to-emerald-600
                   flex items-center justify-center text-4xl font-bold shadow-xl shadow-teal-500/20"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: 'spring', stiffness: 300 }}
            >
                AM
            </motion.div>

            {/* Name & Title */}
            <motion.div
                className="text-center"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
            >
                <h1 className="text-2xl font-bold text-white">Ayaz Mirza</h1>
                <p className="text-sm text-teal-400 font-medium mt-1">Senior Consultant @ Wipro</p>
                <p className="text-xs text-white/40 mt-0.5">📍 Lucknow, India</p>
            </motion.div>

            {/* Bio */}
            <motion.div
                className="max-w-md text-center space-y-3"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
            >
                <p className="text-sm text-white/60 leading-relaxed">
                    Data Engineer with 6+ years of experience in designing, building, and optimizing
                    high-volume ETL pipelines using Ab Initio and SQL. Skilled in automation with
                    Shell scripting and Ansible, data visualization with Power BI, and leveraging
                    GCP &amp; AWS for scalable cloud-based solutions.
                </p>
                <p className="text-sm text-white/60 leading-relaxed">
                    Strong background in troubleshooting performance issues, ensuring data quality,
                    and delivering efficient, reliable data workflows.
                </p>
            </motion.div>

            {/* Social Links */}
            <motion.div
                className="flex flex-wrap justify-center gap-2 mt-2"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
            >
                {[
                    { label: 'GitHub', url: 'https://github.com/ayazmirza54' },
                    { label: 'LinkedIn', url: 'https://www.linkedin.com/in/ayazmirza54' },
                    { label: 'Twitter', url: 'https://twitter.com/ayazmirza54' },
                    { label: 'Dev.to', url: 'https://dev.to/ayazmirza54' },
                ].map(link => (
                    <a
                        key={link.label}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 rounded-xl glass-light
                       text-xs font-medium text-white/60 hover:text-white/90
                       hover:bg-white/10 transition-all duration-200"
                    >
                        {link.label}
                    </a>
                ))}
            </motion.div>

            {/* Stats */}
            <motion.div
                className="grid grid-cols-4 gap-3 mt-4 w-full max-w-md"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
            >
                {[
                    { label: 'Years Exp', value: '6+' },
                    { label: 'Projects', value: '13+' },
                    { label: 'Technologies', value: '15+' },
                    { label: 'Clients', value: '2+' },
                ].map(stat => (
                    <div key={stat.label} className="text-center p-3 rounded-xl glass-light">
                        <div className="text-lg font-bold text-white">{stat.value}</div>
                        <div className="text-[10px] text-white/40 mt-0.5">{stat.label}</div>
                    </div>
                ))}
            </motion.div>
        </div>
    )
}
