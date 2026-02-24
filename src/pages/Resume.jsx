import { motion } from 'framer-motion'

/**
 * Resume page — real work experience, tech stack, and education.
 */
export default function Resume() {
    const techStack = {
        Languages: ['JavaScript', 'HTML5', 'CSS3', 'Shell Script', 'C++', 'C', 'Markdown'],
        'Frameworks & Libraries': ['React', 'React Router', 'Express.js', 'Node.js', 'TailwindCSS', 'Bootstrap'],
        Databases: ['MySQL', 'PostgreSQL'],
        'Tools & Platforms': ['Ab Initio ETL', 'Power BI', 'Grafana', 'Ansible', 'Git', 'Figma', 'Canva', 'Notion', 'Gemini AI', 'Claude AI'],
    }

    const experience = [
        {
            role: 'Senior Consultant',
            company: 'Wipro Limited',
            period: 'Nov 2019 — Present',
            location: 'Greater Noida, India',
            status: 'Current',
            highlights: [
                'Worked on Ab Initio ETL tool to process client side information and provide valuable insights',
                'Extensive experience in designing graphs, scheduling jobs through Control Centre',
                'Proficiently scripting Unix shell commands for ETL optimization',
                'Monitoring ETL job execution and addressing issues to minimize delays',
                'Created shell scripts to automate monitoring of critical server metrics',
                'Appointed as L2, providing guidance to L1 teammates',
            ],
        },
        {
            role: 'Frontend Web Developer',
            company: 'Cosmo Infosolutions Pvt Ltd',
            period: 'June 2019 — Oct 2019',
            location: 'Lucknow, India',
            status: 'Completed',
            highlights: [
                'Front-end developer skilled in HTML, CSS, JavaScript, and ReactJS',
                'Designed responsive landing pages for desktop and mobile',
                'Focus on layout, color, and typography for polished appearance',
            ],
        },
    ]

    return (
        <div className="space-y-6 py-2">
            {/* Header */}
            <div className="flex items-start justify-between">
                <div>
                    <h2 className="text-lg font-bold text-white">Resume</h2>
                    <p className="text-sm text-white/40 mt-1">Ayaz Mirza — Senior Consultant</p>
                </div>
                <motion.a
                    href="/AyazMirzaResume.pdf"
                    download="Ayaz_Resume.pdf"
                    className="flex items-center gap-2 px-4 py-2 rounded-xl
                     bg-gradient-to-r from-teal-500 to-emerald-500
                     text-xs font-semibold text-white shadow-lg shadow-teal-500/20
                     hover:shadow-teal-500/30 transition-shadow"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                >
                    <span>⬇️</span>
                    Download PDF
                </motion.a>
            </div>

            {/* Tech Stack */}
            <motion.div
                className="space-y-3"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
            >
                <h3 className="text-sm font-semibold text-white/70">Tech Stack</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {Object.entries(techStack).map(([category, items]) => (
                        <div key={category} className="p-3 rounded-xl glass-light">
                            <h4 className="text-xs font-semibold text-teal-400 mb-2">{category}</h4>
                            <div className="flex flex-wrap gap-1.5">
                                {items.map(item => (
                                    <span
                                        key={item}
                                        className="px-2 py-0.5 text-[10px] font-medium rounded-md
                             bg-white/5 text-white/50 border border-white/5"
                                    >
                                        {item}
                                    </span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </motion.div>

            {/* Experience */}
            <motion.div
                className="space-y-3"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
            >
                <h3 className="text-sm font-semibold text-white/70">Experience</h3>
                <div className="space-y-3">
                    {experience.map(exp => (
                        <div key={exp.role + exp.company} className="p-4 rounded-xl glass-light">
                            <div className="flex items-start justify-between mb-2">
                                <div>
                                    <div className="flex items-center gap-2">
                                        <h4 className="text-sm font-semibold text-white">{exp.role}</h4>
                                        {exp.status === 'Current' && (
                                            <span className="px-1.5 py-0.5 text-[9px] font-semibold rounded-md bg-teal-500/20 text-teal-400 border border-teal-500/20">
                                                Current
                                            </span>
                                        )}
                                    </div>
                                    <p className="text-xs text-teal-400/70">{exp.company}</p>
                                    <p className="text-[10px] text-white/30 mt-0.5">{exp.location}</p>
                                </div>
                                <span className="text-[10px] text-white/30 font-medium whitespace-nowrap">{exp.period}</span>
                            </div>
                            <ul className="space-y-1">
                                {exp.highlights.map(h => (
                                    <li key={h} className="text-xs text-white/45 flex items-start gap-2">
                                        <span className="text-teal-400/50 mt-0.5">▸</span>
                                        {h}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </motion.div>
        </div>
    )
}
