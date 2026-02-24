import { motion } from 'framer-motion'

/** All real projects from constants.jsx */
const PROJECTS = [
    {
        title: 'Text to Content AI',
        description: 'AI-powered tool that converts text into content using the Gemini API.',
        tags: ['Gemini API', 'React', 'AI'],
        url: 'https://texttocontent.vercel.app/',
        github: 'https://github.com/ayazmirza54/text-to-content-ai/',
        color: 'from-teal-500/20 to-emerald-500/20',
    },
    {
        title: 'IntelliSketch',
        description: 'AI-powered drawing app using Google Gemini to interpret and solve mathematical sketches in real-time.',
        tags: ['Gemini API', 'Canvas', 'AI'],
        url: 'https://intellisketch.vercel.app/',
        github: 'https://github.com/ayazmirza54/intellisketch/',
        color: 'from-cyan-500/20 to-blue-500/20',
    },
    {
        title: 'Text/Code Utils.AI',
        description: 'AI-enhanced tool offering streamlined text analysis and code generation powered by Google Gemini.',
        tags: ['OpenAI', 'React', 'Utilities'],
        url: 'https://text-code-util-aiprod.vercel.app/',
        github: 'https://github.com/ayazmirza54/text-code-util.aiprod/',
        color: 'from-violet-500/20 to-purple-500/20',
    },
    {
        title: 'Chat2PDF with Gemini',
        description: 'Conversational PDF interaction app using Gemini and LangChain.',
        tags: ['Python', 'Streamlit', 'LangChain'],
        url: 'https://chat2pdf-using-gemini.streamlit.app/',
        github: 'https://github.com/ayazmirza54/chat2pdf-using-gemini',
        color: 'from-amber-500/20 to-orange-500/20',
    },
    {
        title: 'UnixBot',
        description: 'Chatbot for Unix commands using the Gemini API to generate responses.',
        tags: ['Python', 'Streamlit', 'Gemini'],
        url: 'https://unix-bot.streamlit.app/',
        github: 'https://github.com/ayazmirza54/unixbot',
        color: 'from-emerald-500/20 to-green-500/20',
    },
    {
        title: 'QuerySmith',
        description: 'Chatbot that generates SQL queries using the Gemini API.',
        tags: ['Python', 'SQL', 'Gemini'],
        url: 'https://query-smith.streamlit.app/',
        github: 'https://github.com/ayazmirza54/chat-with-db',
        color: 'from-pink-500/20 to-rose-500/20',
    },
    {
        title: 'StudySensei',
        description: 'Quiz Generator using Gemini AI API.',
        tags: ['React', 'TailwindCSS', 'Gemini'],
        url: 'https://studysensei.vercel.app/',
        github: 'https://github.com/ayazmirza54/studysensei/',
        color: 'from-sky-500/20 to-indigo-500/20',
    },
    {
        title: 'EC2 Manager TUI',
        description: 'CLI tool to manage EC2 instances using AWS SDK for Python.',
        tags: ['Python', 'AWS', 'CLI'],
        url: null,
        github: 'https://github.com/ayazmirza54/ec2-manager-tui',
        color: 'from-yellow-500/20 to-amber-500/20',
    },
]

const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
        opacity: 1,
        y: 0,
        transition: { delay: i * 0.06, duration: 0.4, ease: [0.22, 1, 0.36, 1] },
    }),
}

/**
 * Projects page — real project data.
 */
export default function Projects() {
    return (
        <div className="space-y-5">
            <div>
                <h2 className="text-lg font-bold text-white">Projects</h2>
                <p className="text-sm text-white/40 mt-1">Things I&apos;ve built</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {PROJECTS.map((project, i) => (
                    <motion.div
                        key={project.title}
                        className={`
              p-4 rounded-2xl glass-light card-glow
              bg-gradient-to-br ${project.color}
              transition-all duration-300
              hover:translate-y-[-2px]
              group
            `}
                        variants={cardVariants}
                        initial="hidden"
                        animate="visible"
                        custom={i}
                    >
                        {/* Title */}
                        <h3 className="text-sm font-semibold text-white group-hover:text-teal-300 transition-colors">
                            {project.title}
                        </h3>

                        {/* Description */}
                        <p className="text-xs text-white/50 mt-1.5 leading-relaxed line-clamp-2">
                            {project.description}
                        </p>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-1.5 mt-3">
                            {project.tags.map(tag => (
                                <span
                                    key={tag}
                                    className="px-2 py-0.5 text-[10px] font-medium rounded-md
                           bg-white/5 text-white/50 border border-white/5"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>

                        {/* Links */}
                        <div className="flex gap-2 mt-3">
                            {project.url && (
                                <a
                                    href={project.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-[10px] font-medium text-teal-400/70 hover:text-teal-300 transition-colors"
                                >
                                    Live ↗
                                </a>
                            )}
                            {project.github && (
                                <a
                                    href={project.github}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-[10px] font-medium text-white/40 hover:text-white/70 transition-colors"
                                >
                                    GitHub ↗
                                </a>
                            )}
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    )
}
