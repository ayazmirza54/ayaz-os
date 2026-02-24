import { motion } from 'framer-motion'

/** Real blog posts from constants.jsx */
const POSTS = [
    {
        title: 'Intellisketch : AI powered drawing tool 🖌️',
        preview: 'IntelliSketch: Building an AI-Powered Mathematical Sketching App',
        date: 'Oct 12, 2024',
        readTime: '5 min read',
        link: 'https://dev.to/ayazmirza54/intellisketch-ai-powered-drawing-tool-3i8e',
        platform: 'Dev.to',
    },
    {
        title: 'Migrating my app from chatgpt API to Gemini AI API',
        preview: 'Migrating my app from chatgpt API to Gemini AI API',
        date: 'Sept 14, 2024',
        readTime: '4 min read',
        link: 'https://dev.to/ayazmirza54/migrating-my-app-from-chatgpt-api-to-gemini-ai-api-557o',
        platform: 'Dev.to',
    },
    {
        title: '🤖 chatGPT on loop➰ using babyAGI and AutoGPT',
        preview: 'Using babyAGI and AutoGPT to interact with chatGPT on loop',
        date: 'Apr 13, 2023',
        readTime: '6 min read',
        link: 'https://dev.to/ayazmirza54/chatgpt-on-loop-using-babyagi-and-autogpt-29c8',
        platform: 'Dev.to',
    },
    {
        title: 'Text and Code Utilities App using OpenAI API',
        preview: 'Building a Text and Code Utilities App using OpenAI API',
        date: 'Jan 28, 2023',
        readTime: '7 min read',
        link: 'https://dev.to/ayazmirza54/text-and-code-utilities-app-using-openai-api-4m13',
        platform: 'Dev.to',
    },
]

/**
 * Blog page — real blog posts with links.
 */
export default function Blog() {
    return (
        <div className="space-y-5">
            <div>
                <h2 className="text-lg font-bold text-white">Blog</h2>
                <p className="text-sm text-white/40 mt-1">Articles on Dev.to</p>
            </div>

            <div className="space-y-3">
                {POSTS.map((post, i) => (
                    <motion.a
                        key={post.title}
                        href={post.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block p-4 rounded-2xl glass-light hover:bg-white/[0.07] transition-colors
                       cursor-pointer group"
                        initial={{ opacity: 0, x: -15 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.07, duration: 0.4 }}
                    >
                        {/* Date & Read time */}
                        <div className="flex items-center gap-3 mb-1.5">
                            <span className="text-[10px] font-medium text-teal-400/70">{post.date}</span>
                            <span className="text-[10px] text-white/25">·</span>
                            <span className="text-[10px] text-white/30">{post.readTime}</span>
                            <span className="text-[10px] text-white/25">·</span>
                            <span className="text-[10px] text-white/30">{post.platform}</span>
                        </div>

                        {/* Title */}
                        <h3 className="text-sm font-semibold text-white/80 group-hover:text-white transition-colors">
                            {post.title}
                        </h3>

                        {/* Preview */}
                        <p className="text-xs text-white/40 mt-1 leading-relaxed">
                            {post.preview}
                        </p>

                        {/* Read more */}
                        <span className="text-[10px] text-teal-400/60 mt-2 inline-block group-hover:text-teal-300 transition-colors">
                            Read on {post.platform} ↗
                        </span>
                    </motion.a>
                ))}
            </div>
        </div>
    )
}
