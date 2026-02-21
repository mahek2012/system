import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
    Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer,
    AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid
} from 'recharts'
import {
    Zap, Target, TrendingUp, Clock, Trophy, Brain, Sparkles,
    ChevronRight, Play, Users, MessageSquare, Star, ArrowRight,
    BarChart3, Activity, BookOpen, X, PlayCircle, BarChart as BarChartIcon, Users2,
    Flame, GraduationCap, ChevronDown, CheckCircle2, LineChart, Layout,
    Atom, Terminal, MonitorPlay
} from 'lucide-react'
import { useLMSStore } from '../store/useLMSStore'

const activityData = [
    { name: 'Mon', hours: 2.5 },
    { name: 'Tue', hours: 3.8 },
    { name: 'Wed', hours: 1.5 },
    { name: 'Thu', hours: 4.2 },
    { name: 'Fri', hours: 3.0 },
    { name: 'Sat', hours: 5.5 },
    { name: 'Sun', hours: 4.8 },
]

export default function Dashboard() {
    const { student, darkMode, setActivePage } = useLMSStore()
    const [activeModal, setActiveModal] = useState(null) // null, 'continue', 'quiz', 'graph', 'peer', 'practice'
    const [continueView, setContinueView] = useState('resume') // 'resume' or 'syllabus'
    const [expandedSyllabus, setExpandedSyllabus] = useState([0])

    const toggleSyllabusModule = (index) => {
        setExpandedSyllabus(prev =>
            prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
        )
    }

    // Mock data for weak topics
    const weakTopics = [
        { id: 1, name: 'Complex Flexbox Layouts', score: 45, icon: Layout, color: 'text-blue-500' },
        { id: 2, name: 'Asynchronous Logic', score: 32, icon: Terminal, color: 'text-purple-500' },
        { id: 3, name: 'CSS Grid Transitions', score: 58, icon: Atom, color: 'text-pink-500' },
    ]

    return (
        <div className={`p-6 lg:p-10 transition-colors duration-500 min-h-screen ${darkMode ? 'bg-[#121820]' : 'bg-gray-50'}`}>
            <div className="max-w-7xl mx-auto space-y-10">

                {/* 1. Personalized Welcome Section */}
                <header className="space-y-6">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                        <div>
                            <h1 className={`text-3xl md:text-5xl font-black mb-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                                Welcome back, <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">{student.name}</span> 👋
                            </h1>
                            <div className="flex flex-wrap items-center gap-4">
                                <div className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-widest border ${darkMode ? 'bg-white/5 border-white/10 text-gray-300' : 'bg-white border-gray-200 text-gray-600'
                                    }`}>
                                    Level {student.level} • {student.xp} / {student.nextLevelXp} XP
                                </div>
                                <div className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-widest border flex items-center gap-2 ${darkMode ? 'bg-blue-500/10 border-blue-500/20 text-blue-400' : 'bg-blue-50 border-blue-200 text-blue-600'
                                    }`}>
                                    <Target size={14} /> Goal: Master React Hooks
                                </div>
                            </div>
                        </div>
                        <div className={`px-6 py-4 rounded-2xl border backdrop-blur-md max-w-sm ${darkMode ? 'bg-yellow-500/10 border-yellow-500/20' : 'bg-yellow-50 border-yellow-200'
                            }`}>
                            <div className="flex items-start gap-3">
                                <Sparkles size={20} className="text-yellow-500 flex-shrink-0 mt-1" />
                                <div>
                                    <span className="text-xs font-black text-yellow-600 uppercase tracking-widest block mb-1">AI Insight</span>
                                    <p className={`text-sm font-bold ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                                        You're on a 7-day streak! Consistency boosts retention by 40%.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>

                {/* 2. Quick Action Panel */}
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                    <QuickActionBtn
                        icon={Play}
                        label="Continue Path"
                        color="blue"
                        darkMode={darkMode}
                        onClick={() => setActiveModal('continue')}
                        active={activeModal === 'continue'}
                    />
                    <QuickActionBtn
                        icon={Brain}
                        label="Adaptive Quiz"
                        color="purple"
                        darkMode={darkMode}
                        onClick={() => setActiveModal('quiz')}
                        active={activeModal === 'quiz'}
                    />
                    <QuickActionBtn
                        icon={Activity}
                        label="Skill Graph"
                        color="green"
                        darkMode={darkMode}
                        onClick={() => setActiveModal('graph')}
                        active={activeModal === 'graph'}
                    />
                    <QuickActionBtn
                        icon={Users}
                        label="Peer Session"
                        color="orange"
                        darkMode={darkMode}
                        onClick={() => setActiveModal('peer')}
                        active={activeModal === 'peer'}
                    />
                    <QuickActionBtn
                        icon={Target}
                        label="Practice Weakness"
                        color="red"
                        darkMode={darkMode}
                        onClick={() => setActiveModal('practice')}
                        active={activeModal === 'practice'}
                    />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                    {/* Left Column (8 cols) */}
                    <div className="lg:col-span-8 space-y-8">

                        {/* 4. Adaptive Learning Path Overview */}
                        <SectionCard title="Adaptive Learning Path" icon={TrendingUp} darkMode={darkMode}>
                            <div className="space-y-6">
                                <div className={`group relative p-8 rounded-[2rem] border overflow-hidden transition-all hover:border-blue-500/30 ${darkMode ? 'bg-[#1a222c] border-white/5' : 'bg-white border-gray-100 shadow-sm'}`}>
                                    {/* Subtle Background Glow */}
                                    <div className="absolute -right-20 -top-20 w-64 h-64 bg-blue-500/5 blur-[100px] pointer-events-none" />

                                    <div className="flex flex-col md:flex-row gap-8 items-center relative z-10">
                                        <div className="flex-1 w-full space-y-6">
                                            <div className="flex justify-between items-start">
                                                <div className="space-y-1">
                                                    <span className="text-[10px] font-black text-blue-500 uppercase tracking-[0.2em]">Current Module</span>
                                                    <h3 className={`text-2xl font-black ${darkMode ? 'text-white' : 'text-gray-900'} tracking-tight`}>
                                                        Advanced React Patterns
                                                    </h3>
                                                </div>
                                                <div className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${darkMode ? 'bg-white/5 text-gray-400 border border-white/10' : 'bg-gray-100 text-gray-500'}`}>
                                                    Est. 45m left
                                                </div>
                                            </div>

                                            <div className="space-y-3">
                                                <div className="flex justify-between items-end">
                                                    <span className={`text-[10px] font-black uppercase tracking-widest ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>Progress</span>
                                                    <span className={`text-sm font-black ${darkMode ? 'text-white' : 'text-gray-900'}`}>65%</span>
                                                </div>
                                                <div className="w-full h-2.5 bg-gray-500/10 rounded-full overflow-hidden">
                                                    <motion.div
                                                        initial={{ width: 0 }}
                                                        animate={{ width: "65%" }}
                                                        transition={{ duration: 1.5, ease: "easeOut" }}
                                                        className="h-full bg-gradient-to-r from-blue-600 to-blue-400 rounded-full relative"
                                                    >
                                                        <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.2)_50%,transparent_75%)] bg-[length:250%_250%] animate-[shimmer_3s_infinite]" />
                                                    </motion.div>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-3 text-xs font-bold text-gray-500 group/link cursor-pointer hover:text-blue-500 transition-colors">
                                                <ArrowRight size={14} className="transition-transform group-hover/link:translate-x-1" />
                                                <span>Next: Performance Optimization</span>
                                            </div>
                                        </div>

                                        <button
                                            onClick={() => setActiveModal('continue')}
                                            className="w-full md:w-auto px-10 py-5 bg-blue-500 hover:bg-blue-600 text-white rounded-[1.5rem] font-black text-lg flex items-center justify-center gap-3 transition-all active:scale-95 shadow-2xl shadow-blue-500/20 hover:shadow-blue-500/40 relative overflow-hidden group/btn"
                                        >
                                            <div className="absolute inset-0 bg-white/10 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300" />
                                            <Play size={24} fill="currentColor" strokeWidth={0} className="relative z-10" />
                                            <span className="relative z-10">Resume</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </SectionCard>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {/* 5. Smart Quiz Section */}
                            <SectionCard title="Smart Quiz" icon={Brain} darkMode={darkMode}>
                                <div className={`p-6 rounded-3xl border relative overflow-hidden ${darkMode ? 'bg-gradient-to-br from-purple-500/20 to-transparent border-purple-500/20' : 'bg-gradient-to-br from-purple-50 to-white border-purple-100'}`}>
                                    <div className="relative z-10 space-y-4">
                                        <div className="flex items-center gap-2">
                                            <span className="px-2 py-1 bg-purple-500 text-white text-[10px] font-black rounded uppercase">AI Generated</span>
                                        </div>
                                        <h4 className={`text-lg font-black ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                                            State Management Mastery
                                        </h4>
                                        <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                            Based on your recent code, we predict a 15% score improvement.
                                        </p>
                                        <button className="w-full py-3 bg-purple-500 hover:bg-purple-600 text-white rounded-xl font-bold text-sm shadow-lg shadow-purple-500/20 transition-all">
                                            Start Quiz
                                        </button>
                                    </div>
                                    <Brain size={120} className="absolute -bottom-4 -right-4 text-purple-500/10 rotate-12" />
                                </div>
                            </SectionCard>

                            {/* 8. AI Recommendation Engine */}
                            <SectionCard title="AI Recommendations" icon={Sparkles} darkMode={darkMode}>
                                <div className="space-y-3">
                                    <RecommendationItem
                                        text="Revise Data Structures: Trees"
                                        type="Critical"
                                        darkMode={darkMode}
                                    />
                                    <RecommendationItem
                                        text="Practice Recursion Drills"
                                        type="Practice"
                                        darkMode={darkMode}
                                    />
                                    <button className={`w-full py-2 text-xs font-bold uppercase tracking-widest mt-2 ${darkMode ? 'text-gray-500 hover:text-white' : 'text-gray-400 hover:text-gray-900'}`}>
                                        View All Suggestions
                                    </button>
                                </div>
                            </SectionCard>
                        </div>

                        {/* 7. Performance Analytics Preview */}
                        <SectionCard title="Performance Analytics" icon={BarChart3} darkMode={darkMode}>
                            <div className="h-64 w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart data={activityData}>
                                        <defs>
                                            <linearGradient id="colorHours" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3} />
                                                <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                                            </linearGradient>
                                        </defs>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={darkMode ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)"} />
                                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: darkMode ? '#6b7280' : '#9ca3af', fontSize: 12 }} />
                                        <Tooltip
                                            contentStyle={{
                                                backgroundColor: darkMode ? '#121820' : '#fff',
                                                borderColor: darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
                                                borderRadius: '12px',
                                                fontWeight: 'bold'
                                            }}
                                        />
                                        <Area type="monotone" dataKey="hours" stroke="#22c55e" strokeWidth={3} fillOpacity={1} fill="url(#colorHours)" />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                            <div className="grid grid-cols-3 gap-4 mt-4">
                                <StatTiny label="Weekly Hours" value="25.3h" color="text-green-500" darkMode={darkMode} />
                                <StatTiny label="Completion" value="92%" color="text-blue-500" darkMode={darkMode} />
                                <StatTiny label="Mastery" value="Top 5%" color="text-yellow-500" darkMode={darkMode} />
                            </div>
                        </SectionCard>

                    </div>

                    {/* Right Column (4 cols) */}
                    <div className="lg:col-span-4 space-y-8">

                        {/* 3. Skill Graph Snapshot */}
                        <SectionCard title="Skill Radar" icon={Activity} darkMode={darkMode}>
                            <div className="h-64 w-full relative">
                                <ResponsiveContainer width="100%" height="100%">
                                    <RadarChart cx="50%" cy="50%" outerRadius="70%" data={student.masteryRadar}>
                                        <PolarGrid stroke={darkMode ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"} />
                                        <PolarAngleAxis dataKey="subject" tick={{ fill: darkMode ? '#9ca3af' : '#4b5563', fontSize: 10, fontWeight: 'bold' }} />
                                        <Radar name="Mastery" dataKey="A" stroke="#eab308" fill="#eab308" fillOpacity={0.5} />
                                    </RadarChart>
                                </ResponsiveContainer>
                                <div className={`absolute bottom-0 left-0 right-0 p-4 rounded-xl text-center backdrop-blur-sm ${darkMode ? 'bg-white/5' : 'bg-gray-50'}`}>
                                    <p className={`text-xs font-bold ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                                        Strong in <span className="text-green-500">React</span>, needs work in <span className="text-red-500">Node.js</span>.
                                    </p>
                                </div>
                            </div>
                        </SectionCard>

                        {/* 6. Peer Learning Activity */}
                        <SectionCard title="Peer Activity" icon={Users} darkMode={darkMode}>
                            <div className="space-y-4">
                                <PeerGroupCard
                                    name="React Advanced"
                                    members={12}
                                    active
                                    darkMode={darkMode}
                                />
                                <PeerGroupCard
                                    name="System Design"
                                    members={8}
                                    darkMode={darkMode}
                                />

                                <div className="pt-4 border-t border-dashed border-gray-700/50">
                                    <h5 className={`text-xs font-black uppercase tracking-widest mb-3 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>Top Contributors</h5>
                                    <div className="flex -space-x-2">
                                        {[1, 2, 3, 4].map(i => (
                                            <div key={i} className={`w-8 h-8 rounded-full border-2 flex items-center justify-center text-[10px] font-bold ${darkMode ? 'bg-gray-800 border-gray-900 text-white' : 'bg-gray-100 border-white text-gray-600'}`}>
                                                U{i}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </SectionCard>

                    </div>
                </div>

            </div>

            {/* Smart Overlays System */}
            <AnimatePresence>
                {activeModal && (
                    <div className="fixed inset-0 z-[5000] flex items-center justify-center p-6">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setActiveModal(null)}
                            className="absolute inset-0 bg-black/60 backdrop-blur-md"
                        />

                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className={`w-full max-w-2xl rounded-[2.5rem] border shadow-2xl relative overflow-hidden flex flex-col max-h-[90vh] ${darkMode ? 'bg-[#1a222c] border-white/5' : 'bg-white border-gray-100'}`}
                        >
                            {/* Modal Header */}
                            <div className="p-8 border-b dark:border-white/5 flex justify-between items-center">
                                <div className="flex items-center gap-4">
                                    <div className={`p-3 rounded-2xl ${activeModal === 'continue' ? 'bg-blue-500/10 text-blue-500' :
                                        activeModal === 'quiz' ? 'bg-purple-500/10 text-purple-500' :
                                            activeModal === 'graph' ? 'bg-green-500/10 text-green-500' :
                                                activeModal === 'peer' ? 'bg-orange-500/10 text-orange-500' :
                                                    'bg-red-500/10 text-red-500'
                                        }`}>
                                        {activeModal === 'continue' && <PlayCircle size={24} />}
                                        {activeModal === 'quiz' && <Brain size={24} />}
                                        {activeModal === 'graph' && <BarChartIcon size={24} />}
                                        {activeModal === 'peer' && <Users2 size={24} />}
                                        {activeModal === 'practice' && <Flame size={24} />}
                                    </div>
                                    <div>
                                        <h3 className={`text-2xl font-black ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                                            {activeModal === 'continue' && 'Smart Resume Path'}
                                            {activeModal === 'quiz' && 'AI Adaptive Quiz'}
                                            {activeModal === 'graph' && 'Student Skill Graph'}
                                            {activeModal === 'peer' && 'Live Study Session'}
                                            {activeModal === 'practice' && 'AI Weakness Drills'}
                                        </h3>
                                        <p className="text-sm font-bold text-gray-500">
                                            {activeModal === 'continue' && 'Pick up exactly where you left off.'}
                                            {activeModal === 'quiz' && 'Dynamic difficulty based on your level.'}
                                            {activeModal === 'graph' && 'Your live performance analytics.'}
                                            {activeModal === 'peer' && 'Real-time collaboration with peers.'}
                                            {activeModal === 'practice' && 'Targeting your personal knowledge gaps.'}
                                        </p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setActiveModal(null)}
                                    className={`p-2 rounded-xl transition-all ${darkMode ? 'hover:bg-white/5 text-gray-500' : 'hover:bg-gray-100 text-gray-400'}`}
                                >
                                    <X size={24} />
                                </button>
                            </div>

                            {/* Modal Content */}
                            <div className="p-8 overflow-y-auto">
                                {activeModal === 'continue' && (
                                    <div className="space-y-6">
                                        {/* Modal Tabs */}
                                        <div className="flex gap-2 p-1 bg-gray-500/5 rounded-2xl w-fit">
                                            <button
                                                onClick={() => setContinueView('resume')}
                                                className={`px-6 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${continueView === 'resume' ? 'bg-blue-500 text-white shadow-lg' : 'text-gray-500 hover:text-gray-300'}`}
                                            >
                                                Resume
                                            </button>
                                            <button
                                                onClick={() => setContinueView('syllabus')}
                                                className={`px-6 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${continueView === 'syllabus' ? 'bg-blue-500 text-white shadow-lg' : 'text-gray-500 hover:text-gray-300'}`}
                                            >
                                                Syllabus
                                            </button>
                                        </div>

                                        {continueView === 'resume' ? (
                                            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                                {/* Netflix-style Resume Card */}
                                                <div className={`group relative rounded-[2.5rem] border overflow-hidden transition-all hover:border-blue-500/30 ${darkMode ? 'bg-white/5 border-white/5' : 'bg-gray-50 border-gray-100'}`}>
                                                    <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/60 to-transparent z-0 pointer-events-none" />

                                                    <div className="p-8 relative z-10 space-y-6">
                                                        <div className="flex justify-between items-start">
                                                            <div className="space-y-1">
                                                                <div className="flex items-center gap-2 mb-2">
                                                                    <div className="px-2 py-0.5 rounded-full bg-red-500/10 text-red-500 border border-red-500/20 text-[8px] font-black uppercase tracking-widest flex items-center gap-1">
                                                                        <div className="w-1 h-1 rounded-full bg-red-500 animate-pulse" />
                                                                        You left off here
                                                                    </div>
                                                                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-500">Direct Resume</span>
                                                                </div>
                                                                <div className="text-[10px] font-black text-gray-500 uppercase">Course</div>
                                                                <h4 className={`text-2xl font-black ${darkMode ? 'text-white' : 'text-gray-900'}`}>Web Development</h4>
                                                            </div>
                                                            <div className="text-right">
                                                                <div className="text-2xl font-black text-blue-500">42%</div>
                                                                <div className="text-[10px] font-black text-gray-500 uppercase">Completed</div>
                                                            </div>
                                                        </div>

                                                        <div className={`p-5 rounded-2xl border backdrop-blur-md ${darkMode ? 'bg-black/20 border-white/10' : 'bg-white border-gray-200 shadow-sm'}`}>
                                                            <div className="grid grid-cols-2 gap-6 relative">
                                                                <div>
                                                                    <div className="text-[10px] font-black text-gray-500 uppercase mb-1">Current Module</div>
                                                                    <div className={`text-sm font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>HTML Foundations</div>
                                                                </div>
                                                                <div className="pl-6 border-l dark:border-white/10 border-gray-100">
                                                                    <div className="text-[10px] font-black text-gray-500 uppercase mb-1">Current Lesson</div>
                                                                    <div className={`text-sm font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Forms & Tables</div>
                                                                </div>
                                                                <PlayCircle size={40} className="absolute -right-2 -top-2 text-blue-500/10 rotate-12" />
                                                            </div>
                                                        </div>

                                                        <div className="space-y-4">
                                                            <div className="w-full h-3 bg-gray-500/10 rounded-full overflow-hidden">
                                                                <motion.div initial={{ width: 0 }} animate={{ width: '42%' }} className="h-full bg-gradient-to-r from-blue-600 to-blue-400" />
                                                            </div>
                                                            <div className="flex justify-between items-center text-xs font-black uppercase tracking-wider text-gray-500">
                                                                <div className="flex items-center gap-2">
                                                                    <Clock size={12} className="text-blue-500" />
                                                                    <span>Est. 42m Remaining</span>
                                                                </div>
                                                                <span>Module 03 / 12</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="flex flex-col gap-4">
                                                    <button
                                                        onClick={() => setActivePage('course-details')}
                                                        className="flex items-center justify-center gap-3 py-5 bg-blue-500 text-white rounded-2xl font-black text-lg shadow-xl shadow-blue-500/30 hover:shadow-blue-500/40 hover:scale-[1.02] active:scale-95 transition-all group"
                                                    >
                                                        <Play size={24} fill="currentColor" strokeWidth={0} className="transition-transform group-hover:scale-110" /> Resume Now
                                                    </button>

                                                    {/* Quick Notes Section */}
                                                    <div className={`p-5 rounded-2xl border ${darkMode ? 'bg-white/5 border-white/5' : 'bg-gray-50 border-gray-100'}`}>
                                                        <div className="flex items-center gap-2 mb-3">
                                                            <div className="p-1.5 rounded-lg bg-yellow-500/10 text-yellow-500">
                                                                <MessageSquare size={14} />
                                                            </div>
                                                            <span className="text-[10px] font-black uppercase tracking-widest text-gray-500">Quick Notes Section</span>
                                                        </div>
                                                        <p className={`text-sm font-medium italic ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                                            "Don't forget to review the Box Model vs Flexbox priority rules for nested containers. Video lesson at 12:40 explains this perfectly."
                                                        </p>
                                                    </div>

                                                    <div className="flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-widest text-gray-500/60">
                                                        <Sparkles size={12} className="text-blue-500" /> Auto-save progress active • Last sync 2m ago
                                                    </div>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                                {/* Syllabus Detailed View */}
                                                <div className="space-y-6">
                                                    <div className={`p-6 rounded-[2rem] border overflow-hidden relative ${darkMode ? 'bg-white/5 border-white/5' : 'bg-gray-50 border-gray-100 shadow-sm'}`}>
                                                        <div className="flex gap-6 relative z-10">
                                                            <div className="w-24 h-24 rounded-2xl bg-blue-500/20 flex items-center justify-center border border-blue-500/20 text-blue-500">
                                                                <BookOpen size={40} />
                                                            </div>
                                                            <div className="flex-1 space-y-2">
                                                                <h4 className={`text-xl font-black ${darkMode ? 'text-white' : 'text-gray-900'}`}>Web Systems Mastery</h4>
                                                                <p className="text-xs font-bold text-gray-500 leading-relaxed">Master the art of building scalable web systems from scratch.</p>
                                                                <div className="flex flex-wrap gap-4 pt-2">
                                                                    <div className="flex items-center gap-1.5 text-[10px] font-black uppercase text-gray-500">
                                                                        <Users size={12} className="text-blue-500" /> Prof. Sarah Chen
                                                                    </div>
                                                                    <div className="flex items-center gap-1.5 text-[10px] font-black uppercase text-gray-500">
                                                                        <Clock size={12} className="text-blue-500" /> 24h Total content
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {/* Learning Outcomes */}
                                                    <div className="grid grid-cols-2 gap-3">
                                                        {['Fullstack Mastery', 'Cloud Deployment', 'UI/UX Design', 'API Architecture'].map((outcome, oi) => (
                                                            <div key={oi} className={`px-4 py-2 rounded-xl border flex items-center gap-2 ${darkMode ? 'bg-white/5 border-white/5 text-gray-400' : 'bg-white border-gray-100 text-gray-600 shadow-sm'}`}>
                                                                <CheckCircle2 size={12} className="text-green-500" />
                                                                <span className="text-[10px] font-black uppercase tracking-wider">{outcome}</span>
                                                            </div>
                                                        ))}
                                                    </div>

                                                    <div className="space-y-3">
                                                        {[
                                                            { title: 'HTML Foundations', content: ['Introduction to DOM', 'Semantic Structures', 'Forms & Tables', 'Accessibility Lab'], completed: true },
                                                            { title: 'CSS Fundamentals', content: ['Advanced Selectors', 'Flexbox Masterclass', 'Grid Systems', 'Responsive Design'], completed: false, active: true },
                                                            { title: 'JavaScript Basics', content: ['Execution Context', 'Closure Power', 'DOM Manipulation', 'Event Loop'], locked: true },
                                                            { title: 'Backend Systems', content: ['Node.js Intro', 'Express Routing', 'MongoDB Integration', 'Auth JWT'], locked: true }
                                                        ].map((mod, i) => (
                                                            <div key={i} className={`rounded-3xl border transition-all ${darkMode ? 'bg-white/5 border-white/5' : 'bg-gray-50 border-gray-100'}`}>
                                                                <button
                                                                    onClick={() => !mod.locked && toggleSyllabusModule(i)}
                                                                    className={`w-full p-5 flex items-center justify-between transition-opacity ${mod.locked ? 'opacity-40 cursor-not-allowed' : 'opacity-100 hover:bg-white/5'}`}
                                                                >
                                                                    <div className="flex items-center gap-4">
                                                                        <div className={`w-8 h-8 rounded-xl flex items-center justify-center text-xs font-black ${mod.completed ? 'bg-green-500 text-white' :
                                                                            mod.active ? 'bg-blue-500 text-white shadow-lg' :
                                                                                'bg-gray-500/20 text-gray-500'
                                                                            }`}>
                                                                            {mod.completed ? <CheckCircle2 size={16} /> : i + 1}
                                                                        </div>
                                                                        <h5 className={`font-black ${darkMode ? 'text-white' : 'text-gray-900'}`}>{mod.title}</h5>
                                                                    </div>
                                                                    <div className="flex items-center gap-3">
                                                                        {mod.locked ? <Clock size={16} className="text-gray-500" /> : <ChevronDown size={16} className={`transition-transform text-gray-500 ${expandedSyllabus.includes(i) ? 'rotate-180' : ''}`} />}
                                                                    </div>
                                                                </button>
                                                                {expandedSyllabus.includes(i) && !mod.locked && (
                                                                    <div className={`p-5 pt-0 mt-2 space-y-3 border-t ${darkMode ? 'border-white/5' : 'border-black/5'}`}>
                                                                        {mod.content.map((lesson, li) => (
                                                                            <div key={li} className="flex items-center gap-3 text-xs font-bold text-gray-500 pl-12 group cursor-pointer hover:text-blue-500 py-1 transition-colors">
                                                                                <div className="w-1.5 h-1.5 rounded-full bg-blue-500 overflow-hidden" />
                                                                                {lesson}
                                                                            </div>
                                                                        ))}
                                                                    </div>
                                                                )}
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>

                                                <button className={`w-full py-4 rounded-2xl font-black border flex items-center justify-center gap-2 transition-all ${darkMode ? 'bg-white/5 border-white/10 text-white hover:bg-white/10' : 'bg-white border-gray-200 text-gray-600 hover:shadow-md'}`}>
                                                    Download Syllabus PDF (2.4MB)
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                )}

                                {activeModal === 'quiz' && (
                                    <div className="space-y-8">
                                        <div className="grid grid-cols-2 gap-6">
                                            <div className="space-y-3">
                                                <label className="text-[10px] font-black uppercase text-gray-500 tracking-widest ml-1">Focus Subject</label>
                                                <select className={`w-full p-4 rounded-2xl border outline-none font-bold text-sm ${darkMode ? 'bg-black/20 border-white/10 text-white' : 'bg-gray-50 border-gray-200'}`}>
                                                    <option>Javascript Essentials</option>
                                                    <option>React Masterclass</option>
                                                    <option>Data Structures</option>
                                                </select>
                                            </div>
                                            <div className="space-y-3">
                                                <label className="text-[10px] font-black uppercase text-gray-500 tracking-widest ml-1">AI Difficulty</label>
                                                <div className={`p-4 rounded-2xl border flex items-center justify-between font-bold text-sm ${darkMode ? 'bg-black/20 border-white/10 text-blue-400' : 'bg-blue-50 border-blue-100 text-blue-600'}`}>
                                                    Adaptive Mode <CheckCircle2 size={18} />
                                                </div>
                                            </div>
                                        </div>

                                        <div className={`p-6 rounded-3xl border flex items-center gap-6 ${darkMode ? 'bg-purple-500/5 border-purple-500/10' : 'bg-purple-50 border-purple-100'}`}>
                                            <div className="w-16 h-16 shrink-0 bg-purple-500 text-white rounded-2xl flex items-center justify-center shadow-lg shadow-purple-500/20">
                                                <TrendingUp size={32} />
                                            </div>
                                            <div>
                                                <h4 className={`text-lg font-black ${darkMode ? 'text-white' : 'text-gray-900'}`}>Current Readiness: 82%</h4>
                                                <p className="text-sm font-medium text-gray-500">AI has noticed your strength in Arrays. Next quiz will focus on Objects & Map types.</p>
                                            </div>
                                        </div>

                                        <button className="w-full py-5 bg-purple-500 text-white rounded-2xl font-black text-lg shadow-xl shadow-purple-500/20 active:scale-95 transition-all">
                                            Start Adaptive Engine →
                                        </button>
                                    </div>
                                )}

                                {activeModal === 'graph' && (
                                    <div className="space-y-8">
                                        <div className="h-64 w-full">
                                            <ResponsiveContainer width="100%" height="100%">
                                                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={student.masteryRadar}>
                                                    <PolarGrid stroke={darkMode ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"} />
                                                    <PolarAngleAxis dataKey="subject" tick={{ fill: darkMode ? '#9ca3af' : '#4b5563', fontSize: 10, fontWeight: 'bold' }} />
                                                    <Radar name="Mastery" dataKey="A" stroke="#22c55e" fill="#22c55e" fillOpacity={0.5} />
                                                </RadarChart>
                                            </ResponsiveContainer>
                                        </div>

                                        <div className="grid grid-cols-2 gap-4">
                                            <div className={`p-4 rounded-2xl border ${darkMode ? 'bg-white/5 border-white/5' : 'bg-gray-50 border-gray-100'}`}>
                                                <div className="text-[10px] font-black uppercase text-gray-500 mb-1">Strongest Pillar</div>
                                                <div className="text-lg font-black text-green-500">Frontend Logic</div>
                                            </div>
                                            <div className={`p-4 rounded-2xl border ${darkMode ? 'bg-white/5 border-white/5' : 'bg-gray-50 border-gray-100'}`}>
                                                <div className="text-[10px] font-black uppercase text-gray-500 mb-1">Growth Area</div>
                                                <div className="text-lg font-black text-orange-500">CI/CD Pipeline</div>
                                            </div>
                                        </div>

                                        <button className={`w-full py-4 rounded-2xl font-black border transition-all ${darkMode ? 'bg-white/5 border-white/10 text-white' : 'bg-white border-gray-200 text-gray-900'}`}>
                                            Enter Deep Analytics Hub
                                        </button>
                                    </div>
                                )}

                                {activeModal === 'peer' && (
                                    <div className="space-y-8">
                                        <div className="space-y-4">
                                            <h4 className={`text-sm font-black uppercase tracking-widest ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>Happening Now</h4>
                                            <div className="space-y-3">
                                                <div className={`p-5 rounded-3xl border flex items-center justify-between group cursor-pointer transition-all ${darkMode ? 'bg-white/5 border-white/5 hover:bg-orange-500/10 hover:border-orange-500/20' : 'bg-gray-50 border-gray-100 hover:bg-white hover:shadow-lg'}`}>
                                                    <div className="flex items-center gap-4">
                                                        <div className="w-12 h-12 bg-orange-500 text-white rounded-2xl flex items-center justify-center font-black">JS</div>
                                                        <div>
                                                            <h5 className={`font-black ${darkMode ? 'text-white' : 'text-gray-900'}`}>JS Closures Deep Dive</h5>
                                                            <p className="text-xs font-bold text-gray-500">8 peers • Live whiteboard active</p>
                                                        </div>
                                                    </div>
                                                    <button className="px-5 py-2 bg-orange-500 text-white rounded-xl text-xs font-black shadow-lg shadow-orange-500/20 active:scale-95 transition-all">Join Room</button>
                                                </div>
                                                <div className={`p-5 rounded-3xl border flex items-center justify-between opacity-60 ${darkMode ? 'bg-white/5 border-white/5' : 'bg-gray-50 border-gray-100'}`}>
                                                    <div className="flex items-center gap-4">
                                                        <div className="w-12 h-12 bg-gray-500 text-white rounded-2xl flex items-center justify-center font-black">CS</div>
                                                        <div>
                                                            <h5 className={`font-black ${darkMode ? 'text-white' : 'text-gray-900'}`}>Algo Mock Interview</h5>
                                                            <p className="text-xs font-bold text-gray-500">Will start in 25 mins</p>
                                                        </div>
                                                    </div>
                                                    <button className={`px-5 py-2 rounded-xl text-xs font-black border ${darkMode ? 'border-white/10 text-gray-400' : 'border-gray-200 text-gray-500'}`}>Set Reminder</button>
                                                </div>
                                            </div>
                                        </div>

                                        <button className="w-full py-5 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-2xl font-black text-lg shadow-xl shadow-orange-500/20 active:scale-95 transition-all">
                                            Create Live Session +
                                        </button>
                                    </div>
                                )}

                                {activeModal === 'practice' && (
                                    <div className="space-y-8">
                                        <div className="space-y-4">
                                            <h4 className={`text-sm font-black uppercase tracking-widest ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>Detected Blindspots</h4>
                                            <div className="grid grid-cols-1 gap-3">
                                                {weakTopics.map(topic => (
                                                    <div key={topic.id} className={`p-5 rounded-3xl border flex items-center justify-between ${darkMode ? 'bg-white/5 border-white/5' : 'bg-gray-50 border-gray-100'}`}>
                                                        <div className="flex items-center gap-4">
                                                            <div className={`p-3 rounded-2xl bg-white/5 ${topic.color}`}>
                                                                <topic.icon size={20} />
                                                            </div>
                                                            <div>
                                                                <h5 className={`font-black ${darkMode ? 'text-white' : 'text-gray-900'}`}>{topic.name}</h5>
                                                                <div className="text-[10px] font-black uppercase tracking-widest text-gray-500">Knowledge Level: {topic.score}%</div>
                                                            </div>
                                                        </div>
                                                        <div className="w-24 h-2 bg-gray-500/20 rounded-full overflow-hidden">
                                                            <div className={`h-full bg-red-500`} style={{ width: `${topic.score}%` }} />
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        <div className={`p-6 rounded-3xl border flex items-center gap-6 ${darkMode ? 'bg-red-500/5 border-red-500/10' : 'bg-red-50 border-red-100'}`}>
                                            <div className="p-4 bg-red-500 text-white rounded-2xl">
                                                <Target size={24} />
                                            </div>
                                            <p className={`text-sm font-bold ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                                AI has generated a <span className="text-red-500 font-black italic">Rapid Re-mastery</span> drill focusing on these topics.
                                            </p>
                                        </div>

                                        <button className="w-full py-5 bg-red-500 text-white rounded-2xl font-black text-lg shadow-xl shadow-red-500/20 active:scale-95 transition-all">
                                            Launch Practice Set →
                                        </button>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    </div>
                )
                }
            </AnimatePresence >
        </div >
    )
}

// Sub-components
function SectionCard({ title, icon: Icon, children, darkMode }) {
    return (
        <div className={`p-6 md:p-8 rounded-[2rem] border ${darkMode ? 'bg-[#1a222c] border-white/5' : 'bg-white border-gray-100 shadow-xl shadow-gray-200/50'}`}>
            <div className="flex items-center gap-3 mb-6">
                <div className={`p-2 rounded-xl ${darkMode ? 'bg-white/5' : 'bg-gray-100'}`}>
                    <Icon size={20} className={darkMode ? 'text-white' : 'text-gray-900'} />
                </div>
                <h3 className={`text-xl font-black ${darkMode ? 'text-white' : 'text-gray-900'}`}>{title}</h3>
            </div>
            {children}
        </div>
    )
}

function QuickActionBtn({ icon: Icon, label, color, darkMode, active, onClick }) {
    const colors = {
        blue: 'text-blue-500 bg-blue-500/10 border-blue-500/20 hover:bg-blue-500 hover:text-white',
        purple: 'text-purple-500 bg-purple-500/10 border-purple-500/20 hover:bg-purple-500 hover:text-white',
        green: 'text-green-500 bg-green-500/10 border-green-500/20 hover:bg-green-500 hover:text-white',
        orange: 'text-orange-500 bg-orange-500/10 border-orange-500/20 hover:bg-orange-500 hover:text-white',
        red: 'text-red-500 bg-red-500/10 border-red-500/20 hover:bg-red-500 hover:text-white',
    }

    return (
        <button
            onClick={onClick}
            className={`p-4 rounded-2xl border flex flex-col items-center gap-3 transition-all active:scale-95 group ${darkMode ? 'bg-[#1a222c] border-white/5' : 'bg-white border-gray-100 shadow-sm'} ${active ? 'ring-2 ring-blue-500 ring-offset-2 dark:ring-offset-[#121820] ring-offset-white' : ''}`}
        >
            <div className={`p-3 rounded-xl transition-all ${colors[color]} ${!darkMode && 'bg-gray-50 px-5'}`}>
                <Icon size={24} />
            </div>
            <span className={`text-xs font-bold text-center ${darkMode ? 'text-gray-300 group-hover:text-white' : 'text-gray-600 group-hover:text-gray-900'}`}>
                {label}
            </span>
        </button>
    )
}

function RecommendationItem({ text, type, darkMode }) {
    const isCritical = type === 'Critical'
    return (
        <div className={`p-4 rounded-xl border flex items-center justify-between group cursor-pointer ${darkMode ? 'bg-white/5 border-white/5 hover:bg-white/10' : 'bg-gray-50 border-gray-100 hover:bg-white hover:shadow-md'}`}>
            <div className="flex items-center gap-3">
                <div className={`w-1.5 h-1.5 rounded-full ${isCritical ? 'bg-red-500' : 'bg-blue-500'}`} />
                <span className={`text-sm font-bold ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>{text}</span>
            </div>
            <ArrowRight size={16} className={`transition-transform group-hover:translate-x-1 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`} />
        </div>
    )
}

function StatTiny({ label, value, color, darkMode }) {
    return (
        <div className={`p-3 rounded-xl text-center ${darkMode ? 'bg-white/5' : 'bg-gray-50'}`}>
            <div className={`text-lg font-black ${color}`}>{value}</div>
            <div className={`text-[10px] font-bold uppercase tracking-widest ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>{label}</div>
        </div>
    )
}

function PeerGroupCard({ name, members, active, darkMode }) {
    return (
        <div className={`flex items-center justify-between p-3 rounded-xl ${darkMode ? 'bg-white/5' : 'bg-gray-50'}`}>
            <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-black ${darkMode ? 'bg-blue-500/20 text-blue-400' : 'bg-blue-100 text-blue-600'}`}>
                    {name.substring(0, 2)}
                </div>
                <div>
                    <h5 className={`text-sm font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{name}</h5>
                    <p className="text-[10px] text-gray-500 font-bold">{members} active now</p>
                </div>
            </div>
            {active && <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />}
        </div>
    )
}
