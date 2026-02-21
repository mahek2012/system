import React from 'react'
import { motion } from 'framer-motion'
import {
    Zap,
    ArrowRight,
    Brain,
    TrendingUp,
    Bot,
    ChevronRight,
    Search,
    BookOpen,
    Target
} from 'lucide-react'
import { useLMSStore } from '../store/useLMSStore'

export default function Home() {
    const { darkMode, setActivePage } = useLMSStore()

    return (
        <div className="w-full">
            {/* Hero Section */}
            <section className={`relative min-h-[90vh] flex flex-col items-center justify-center text-center px-6 transition-colors duration-700 ${darkMode ? 'bg-[#121820]' : 'bg-white'
                }`}>
                {/* Background Glow */}
                <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-6xl pointer-events-none blur-[150px] opacity-20 ${darkMode ? 'bg-yellow-500' : 'bg-yellow-600'
                    }`} />

                <div className="relative z-10 max-w-5xl mx-auto space-y-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center gap-3 px-5 py-2 bg-yellow-500/10 border border-yellow-500/30 rounded-full w-fit mx-auto"
                    >
                        <Zap size={18} className="text-yellow-500 fill-yellow-500" />
                        <span className="text-xs font-black text-yellow-500 uppercase tracking-widest">
                            Autonomous LMS Ecosystem
                        </span>
                    </motion.div>

                    <div className="space-y-8">
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className={`text-6xl lg:text-[10rem] font-black leading-[0.85] tracking-tighter ${darkMode ? 'text-white' : 'text-gray-900'
                                }`}
                        >
                            Imagine <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600">Learning.</span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className={`text-xl lg:text-2xl max-w-3xl mx-auto leading-relaxed font-medium ${darkMode ? 'text-gray-400' : 'text-gray-600'
                                }`}
                        >
                            Experience the edge of adaptive education. Our AI-mapped pathways
                            evolve in real-time to match your unique learning signature.
                        </motion.p>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3 }}
                        className="flex flex-wrap items-center justify-center gap-8 pt-6"
                    >
                        <button
                            onClick={() => setActivePage('dashboard')}
                            className="px-10 py-5 bg-[#EAB308] hover:bg-[#CA8A04] text-white rounded-[2rem] font-bold text-lg transition-all shadow-[0_10px_30px_rgba(234,179,8,0.3)] active:scale-95"
                        >
                            Launch Hub
                        </button>
                        <button
                            onClick={() => setActivePage('courses')}
                            className={`px-10 py-5 rounded-[2rem] font-bold text-lg border transition-all active:scale-95 ${darkMode ? 'bg-transparent border-white/10 text-white hover:bg-white/5' : 'bg-transparent border-gray-300 text-gray-700 hover:bg-gray-50'
                                }`}
                        >
                            View Docs
                        </button>
                    </motion.div>
                </div>
            </section>

            {/* Why Choose Section */}
            <section className={`py-32 px-6 ${darkMode ? 'bg-[#0f141b]' : 'bg-gray-50'}`}>
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-20">
                        <h2 className={`text-4xl lg:text-5xl font-black mb-4 ${darkMode ? 'text-white' : 'text-[#1e293b]'}`}>
                            Why Choose Our Autonomous LMS?
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                        <FeatureCard
                            Illustration={SkillGraphIllustration}
                            title="Skill Graph Mapping"
                            desc="Visualize and track skill dependencies for personalized learning paths."
                            darkMode={darkMode}
                        />
                        <FeatureCard
                            Illustration={AdaptivePathIllustration}
                            title="Adaptive Learning Paths"
                            desc="Dynamically adjust course modules based on your performance and pace."
                            darkMode={darkMode}
                        />
                        <FeatureCard
                            Illustration={AIRecommendationIllustration}
                            title="AI-Based Recommendations"
                            desc="Get tailored suggestions for lessons and quizzes based on your progress."
                            darkMode={darkMode}
                        />
                    </div>
                </div>
            </section>
        </div>
    )
}

function FeatureCard({ Illustration, title, desc, darkMode }) {
    return (
        <motion.div
            whileHover={{ y: -10 }}
            className={`p-10 rounded-[2.5rem] border flex flex-col items-center text-center transition-all ${darkMode
                ? 'bg-[#1a222c] border-white/5 hover:border-yellow-500/30'
                : 'bg-white border-gray-100 shadow-xl shadow-gray-200/50 hover:shadow-2xl'
                }`}
        >
            <div className="w-full h-48 flex items-center justify-center mb-8">
                <Illustration darkMode={darkMode} />
            </div>

            <h3 className={`text-2xl font-black mb-4 ${darkMode ? 'text-white' : 'text-[#1e293b]'}`}>
                {title}
            </h3>

            <p className={`text-base leading-relaxed mb-8 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                {desc}
            </p>

            <button
                onClick={() => useLMSStore.getState().setActivePage('course-details')}
                className="mt-auto px-6 py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all group bg-blue-500 hover:bg-blue-600 text-white shadow-lg shadow-blue-500/20 active:scale-95">
                Learn More
                <div className="p-1 rounded-full bg-white/20 group-hover:bg-white/30 transition-colors">
                    <ChevronRight size={14} className="transition-transform group-hover:translate-x-0.5" />
                </div>
            </button>
        </motion.div>
    )
}

// Illustrations
function SkillGraphIllustration({ darkMode }) {
    return (
        <div className="relative w-full h-full flex items-center justify-center">
            {/* Simple representation of the skill graph */}
            <div className="relative">
                <motion.div
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 4, repeat: Infinity }}
                    className="w-20 h-20 bg-blue-500/20 rounded-full flex items-center justify-center border-2 border-dashed border-blue-500/30"
                >
                    <Brain size={40} className="text-blue-500" />
                </motion.div>

                {/* Connecting Nodes */}
                <span className="absolute -top-4 -left-12 px-3 py-1 bg-orange-500 text-white text-[10px] font-bold rounded-md shadow-lg">HTML</span>
                <span className="absolute -bottom-2 -left-8 px-3 py-1 bg-yellow-500 text-white text-[10px] font-bold rounded-md shadow-lg">CSS</span>
                <span className="absolute -bottom-4 right-0 px-3 py-1 bg-green-600 text-white text-[10px] font-bold rounded-md shadow-lg">JS</span>
                <span className="absolute top-2 -right-10 px-3 py-1 bg-blue-600 text-white text-[10px] font-bold rounded-md shadow-lg">React</span>
            </div>
        </div>
    )
}

function AdaptivePathIllustration({ darkMode }) {
    return (
        <div className="relative w-full h-full flex items-center justify-center">
            <div className="relative w-40 h-24">
                <svg viewBox="0 0 200 100" className="w-full h-full overflow-visible">
                    <motion.path
                        d="M0 80 Q 50 10 100 50 T 200 20"
                        fill="none"
                        stroke={darkMode ? '#3b82f6' : '#2563eb'}
                        strokeWidth="4"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 2, repeat: Infinity }}
                    />
                    <circle cx="0" cy="80" r="5" fill="#3b82f6" />
                    <circle cx="100" cy="50" r="5" fill="#3b82f6" />
                    <circle cx="200" cy="20" r="5" fill="#10b981" />
                    <rect x="180" y="0" width="40" height="40" rx="8" fill="#10b981" fillOpacity="0.2" stroke="#10b981" strokeWidth="2" />
                </svg>
            </div>
        </div>
    )
}

function AIRecommendationIllustration({ darkMode }) {
    return (
        <div className="relative w-full h-full flex items-center justify-center">
            <div className="relative">
                <motion.div
                    animate={{ y: [-5, 5, -5] }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className="w-16 h-16 bg-blue-500/20 rounded-2xl flex items-center justify-center border-2 border-blue-500/50"
                >
                    <Bot size={32} className="text-blue-500" />
                </motion.div>

                {/* Abstract UI Elements */}
                <div className="absolute -left-12 top-0 w-8 h-2 bg-gray-300/30 rounded-full" />
                <div className="absolute -left-10 top-4 w-12 h-2 bg-gray-300/30 rounded-full" />
                <div className="absolute -right-12 bottom-0 w-10 h-2 bg-blue-500/30 rounded-full" />
                <div className="absolute -right-8 bottom-4 w-6 h-2 bg-blue-500/30 rounded-full" />
            </div>
        </div>
    )
}
