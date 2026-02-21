import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
    Star,
    Clock,
    BookOpen,
    Users,
    Play,
    Youtube,
    Brain,
    CheckCircle2,
    FileText,
    ChevronDown,
    Award,
    Download,
    MessageSquare,
    Sparkles,
    CreditCard,
    Wallet,
    Smartphone,
    LineChart,
    Map,
    CalendarCheck,
    Crosshair,
    TrendingUp,
    MonitorPlay,
    RefreshCw,
    Layout,
    ArrowLeft
} from 'lucide-react'
import { useLMSStore } from '../store/useLMSStore'

export default function CourseDetails() {
    const { darkMode, setActivePage, selectedCourse, notes, saveNote } = useLMSStore()
    const [activeModule, setActiveModule] = useState(0)
    const [note, setNote] = useState('')
    const [noteSaved, setNoteSaved] = useState(false)
    const [isVideoLoaded, setIsVideoLoaded] = useState(false)
    const [enrollmentState, setEnrollmentState] = useState('details') // 'details', 'checkout', 'smart-flow', 'success'
    const [smartStep, setSmartStep] = useState(1)
    const [personalization, setPersonalization] = useState({ goal: 'Career Switch', time: '10h / week', difficulty: 'Adaptive' })
    const [isProcessing, setIsProcessing] = useState(false)

    // Fallback if no course is selected
    const course = selectedCourse || {
        // ... (existing fallback code, make sure to keep existing properties)
        title: 'HTML & CSS Fundamentals',
        description: 'Build modern, responsive websites with semantic HTML5 and CSS3 mastery.',
        level: 'Beginner',
        duration: '18h 30m',
        lessons: '14 Lessons',
        rating: 4.9,
        enrollments: '12.5k',
        author: 'Sarah Drasner',
        image: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=800&auto=format&fit=crop&q=60',
        youtubeId: 'G3e-cpL7ofc',
        skills: ['HTML5', 'CSS3', 'Flexbox', 'Grid', 'Responsive Design'],
        whatYouWillLearn: ['Write semantic, accessible HTML markup', 'Style with modern CSS', 'Build fully responsive layouts', 'Animate elements with CSS'],
        curriculum: [
            { title: 'Module 1: HTML Foundations', duration: '3h 00m' },
            { title: 'Module 2: CSS Styling & Selectors', duration: '4h 30m' },
            { title: 'Module 3: Layouts with Flexbox & Grid', duration: '5h 00m' },
            { title: 'Module 4: Responsive Design', duration: '3h 30m' },
            { title: 'Module 5: Final Project', duration: '2h 30m' },
        ],
    }

    // Effect to load saved note when course or active module changes
    useEffect(() => {
        const courseNotes = notes[course.title]
        if (courseNotes) {
            if (activeModule === -1) {
                setNote(courseNotes.global || '')
            } else {
                setNote(courseNotes.modules?.[activeModule] || '')
            }
        } else {
            setNote('')
        }
    }, [course.title, activeModule, notes])

    const handleSaveNote = () => {
        const moduleId = activeModule === -1 ? 'global' : activeModule
        saveNote(course.title, note, moduleId)
        setNoteSaved(true)
        setTimeout(() => setNoteSaved(false), 2000)
    }

    const handleConfirmEnrollment = () => {
        setIsProcessing(true)
        setTimeout(() => {
            setIsProcessing(false)
            setEnrollmentState('success')
        }, 1500)
    }

    const dm = darkMode

    // ─── SMART ENROLLMENT FLOW (Option 2) ───
    if (enrollmentState === 'smart-flow') {
        return (
            <div className={`min-h-screen py-10 px-6 transition-colors duration-500 flex items-center justify-center ${dm ? 'bg-[#121820]' : 'bg-gray-50'}`}>
                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className={`w-full max-w-4xl p-8 md:p-12 rounded-[3rem] border shadow-2xl relative overflow-hidden ${dm ? 'bg-[#1a222c] border-white/5' : 'bg-white border-gray-100'}`}>

                    {/* Progress Bar */}
                    <div className="absolute top-0 left-0 w-full h-2 bg-gray-100 dark:bg-white/5">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${(smartStep / 4) * 100}%` }}
                            className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
                        />
                    </div>

                    <AnimatePresence mode="wait">
                        {smartStep === 1 && (
                            <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-8 text-center py-10">
                                <div className="w-24 h-24 bg-purple-500/20 text-purple-500 rounded-[2rem] flex items-center justify-center mx-auto shadow-xl">
                                    <Brain size={48} />
                                </div>
                                <div className="space-y-3">
                                    <h2 className={`text-4xl font-black ${dm ? 'text-white' : 'text-gray-900'}`}>Skill Baseline Check</h2>
                                    <p className={`text-lg font-medium max-w-lg mx-auto ${dm ? 'text-gray-400' : 'text-gray-500'}`}>Would you like to take a quick skill assessment before starting to personalize your path?</p>
                                </div>
                                <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
                                    <button onClick={() => setSmartStep(2)} className="px-10 py-5 bg-purple-500 hover:bg-purple-600 text-white rounded-[2rem] font-black text-lg shadow-xl shadow-purple-500/20 transition-all active:scale-95 flex items-center gap-3">
                                        <Sparkles size={22} /> Take Assessment
                                    </button>
                                    <button onClick={() => setSmartStep(2)} className={`px-10 py-5 rounded-[2rem] font-black text-lg border transition-all active:scale-95 ${dm ? 'border-white/10 text-gray-400 hover:bg-white/5' : 'border-gray-200 text-gray-700 hover:bg-gray-50'}`}>
                                        Skip for Now
                                    </button>
                                </div>
                            </motion.div>
                        )}

                        {smartStep === 2 && (
                            <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-10">
                                <div className="text-center">
                                    <h2 className={`text-4xl font-black ${dm ? 'text-white' : 'text-gray-900'}`}>Personalization Setup</h2>
                                    <p className={`text-lg font-medium mt-3 ${dm ? 'text-gray-400' : 'text-gray-500'}`}>Configure your study frequency and objectives.</p>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-6">
                                        <div className="space-y-3">
                                            <label className="text-xs font-black uppercase tracking-widest text-gray-500 ml-2">Primary Learning Goal</label>
                                            <select value={personalization.goal} onChange={e => setPersonalization({ ...personalization, goal: e.target.value })} className={`w-full p-5 rounded-3xl border outline-none font-bold text-lg ${dm ? 'bg-black/20 border-white/10 text-white' : 'bg-gray-50 border-gray-200'}`}>
                                                <option>Career Switch</option>
                                                <option>Freelancing Mastery</option>
                                                <option>Academic Research</option>
                                                <option>Self Improvement</option>
                                            </select>
                                        </div>
                                        <div className="space-y-3">
                                            <label className="text-xs font-black uppercase tracking-widest text-gray-500 ml-2">Commitment Level</label>
                                            <div className="grid grid-cols-3 gap-3">
                                                {['5h', '10h', '20h'].map(t => (
                                                    <button key={t} onClick={() => setPersonalization({ ...personalization, time: t + ' / week' })} className={`p-4 rounded-2xl border font-bold transition-all ${personalization.time.includes(t) ? 'bg-blue-500 border-blue-500 text-white shadow-lg' : dm ? 'bg-white/5 border-white/10 text-gray-400' : 'bg-white border-gray-100 text-gray-600'}`}>
                                                        {t}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                    <div className={`p-8 rounded-[2.5rem] border shadow-inner flex flex-col justify-center gap-6 ${dm ? 'bg-black/20 border-white/10' : 'bg-gray-50 border-gray-200'}`}>
                                        <div className="flex gap-4">
                                            <div className="p-3 bg-blue-500/10 text-blue-500 rounded-xl"><Sparkles size={20} /></div>
                                            <p className="text-sm font-medium text-gray-500 leading-relaxed">AI will use these parameters to drop supplemental resources and schedule milestones.</p>
                                        </div>
                                        <div className="flex gap-4">
                                            <div className="p-3 bg-green-500/10 text-green-500 rounded-xl"><LineChart size={20} /></div>
                                            <p className="text-sm font-medium text-gray-500 leading-relaxed">Dynamic difficulty tracking is enabled by default for your profile.</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex justify-end pt-6">
                                    <button onClick={() => setSmartStep(3)} className="w-full sm:w-auto px-12 py-5 bg-blue-500 hover:bg-blue-600 text-white rounded-[2rem] font-black text-xl shadow-xl shadow-blue-500/20 active:scale-95 transition-all">
                                        Generate Path →
                                    </button>
                                </div>
                            </motion.div>
                        )}

                        {smartStep === 3 && (
                            <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-10 py-4">
                                <div className="text-center">
                                    <h2 className={`text-4xl font-black ${dm ? 'text-white' : 'text-gray-900'}`}>Auto-Generated Learning Path</h2>
                                    <p className={`text-lg font-medium mt-3 ${dm ? 'text-gray-400' : 'text-gray-500'}`}>Your roadmap is ready based on your profile.</p>
                                </div>

                                <div className={`p-10 rounded-[3rem] border shadow-xl relative overflow-hidden ${dm ? 'bg-gradient-to-br from-blue-900/10 to-purple-900/10 border-blue-500/20' : 'bg-gradient-to-br from-blue-50 to-purple-50 border-blue-100'}`}>
                                    <div className="flex flex-col md:flex-row gap-10 items-center">
                                        <div className="w-40 h-40 shrink-0 relative flex items-center justify-center">
                                            <div className="absolute inset-0 rounded-full border-8 border-gray-200/20 dark:border-white/5" />
                                            <div className="absolute inset-0 rounded-full border-8 border-blue-500 border-t-transparent animate-spin-slow rotate-45" />
                                            <div className="text-center">
                                                <div className="text-3xl font-black text-blue-500">6</div>
                                                <div className="text-[10px] font-black uppercase tracking-widest text-gray-500">Weeks</div>
                                            </div>
                                        </div>
                                        <div className="space-y-6">
                                            <div className="flex gap-4">
                                                <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center font-black text-xs">1</div>
                                                <div>
                                                    <h4 className={`font-black ${dm ? 'text-white' : 'text-gray-900'}`}>Foundation Phase</h4>
                                                    <p className="text-sm font-medium text-gray-500">Weeks 1-2 · Mastery of Core Concepts</p>
                                                </div>
                                            </div>
                                            <div className="flex gap-4">
                                                <div className="w-8 h-8 rounded-full bg-purple-500 text-white flex items-center justify-center font-black text-xs">2</div>
                                                <div>
                                                    <h4 className={`font-black ${dm ? 'text-white' : 'text-gray-900'}`}>Integration Hub</h4>
                                                    <p className="text-sm font-medium text-gray-500">Weeks 3-4 · Project Integration & Testing</p>
                                                </div>
                                            </div>
                                            <div className="flex gap-4">
                                                <div className="w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center font-black text-xs">3</div>
                                                <div>
                                                    <h4 className={`font-black ${dm ? 'text-white' : 'text-gray-900'}`}>Deployment & Portfolio</h4>
                                                    <p className="text-sm font-medium text-gray-500">Weeks 5-6 · Final Polish & Showcase</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="text-center bg-blue-500/5 p-6 rounded-3xl border border-blue-500/10">
                                    <p className={`text-lg font-bold ${dm ? 'text-blue-400' : 'text-blue-700'}`}>
                                        🎯 Predicted Score: <span className="font-black">92% Mastery</span> with your chosen pace.
                                    </p>
                                </div>

                                <div className="flex justify-center pt-4">
                                    <button onClick={() => { setIsProcessing(true); setTimeout(() => { setIsProcessing(false); setSmartStep(4); }, 1500) }} className="w-full sm:w-auto px-16 py-6 bg-blue-500 hover:bg-blue-600 text-white rounded-[2rem] font-black text-2xl shadow-2xl shadow-blue-500/30 transition-all active:scale-95 flex items-center gap-4">
                                        {isProcessing ? <RefreshCw className="animate-spin" /> : <><CheckCircle2 size={32} /> Confirm Enrollment</>}
                                    </button>
                                </div>
                            </motion.div>
                        )}

                        {smartStep === 4 && (
                            <motion.div key="step4" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="space-y-12 text-center py-6">
                                <div className="space-y-4">
                                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1, rotate: [0, 10, -10, 0] }} transition={{ type: 'spring', damping: 10 }} className="w-24 h-24 bg-green-500 text-white rounded-[2rem] flex items-center justify-center mx-auto shadow-2xl shadow-green-500/20">
                                        <CheckCircle2 size={48} />
                                    </motion.div>
                                    <h2 className={`text-5xl font-black ${dm ? 'text-white' : 'text-gray-900'}`}>You're All Set!</h2>
                                    <p className={`text-xl font-medium ${dm ? 'text-gray-400' : 'text-gray-500'}`}>Your adaptive course dashboard is now active.</p>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
                                    <button className="p-6 bg-blue-500 text-white rounded-3xl font-black shadow-xl hover:bg-blue-600 transition-all active:scale-95 flex flex-col items-center gap-3">
                                        <MonitorPlay size={32} />
                                        Start Learning
                                    </button>
                                    <button onClick={() => setActivePage('network')} className={`p-6 rounded-3xl font-black border transition-all active:scale-95 flex flex-col items-center gap-3 ${dm ? 'bg-white/5 border-white/10 text-white' : 'bg-gray-50 border-gray-100 text-gray-900'}`}>
                                        <Users size={32} className="text-blue-500" />
                                        Join Study Group
                                    </button>
                                    <button className={`p-6 rounded-3xl font-black border transition-all active:scale-95 flex flex-col items-center gap-3 ${dm ? 'bg-white/5 border-white/10 text-white' : 'bg-gray-50 border-gray-100 text-gray-900'}`}>
                                        <Layout size={32} className="text-purple-500" />
                                        View Dashboard
                                    </button>
                                    <button className={`p-6 rounded-3xl font-black border transition-all active:scale-95 flex flex-col items-center gap-3 ${dm ? 'bg-white/5 border-white/10 text-white' : 'bg-gray-50 border-gray-100 text-gray-900'}`}>
                                        <Map size={32} className="text-green-500" />
                                        My Roadmap
                                    </button>
                                </div>
                                <button onClick={() => setEnrollmentState('details')} className="text-gray-500 font-bold uppercase tracking-widest text-xs hover:text-blue-500 transition-colors">Back to Course Info</button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>
            </div>
        )
    }

    // ─── NEXT-GEN SUCCESS DASHBOARD (DEPRECATED FOR SMART FLOW BUT KEPT FOR BACKWARD COMP) ───
    if (enrollmentState === 'success') {
        return (
            <div className={`min-h-screen py-10 px-6 transition-colors duration-500 flex flex-col items-center justify-center ${dm ? 'bg-[#121820]' : 'bg-gray-50'}`}>
                <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} className={`w-full max-w-5xl p-8 md:p-14 rounded-[3rem] border shadow-2xl space-y-12 ${dm ? 'bg-[#1a222c] border-white/5' : 'bg-white border-gray-100'}`}>
                    <div className="text-center space-y-4">
                        <motion.div initial={{ scale: 0 }} animate={{ scale: 1, rotate: [0, 10, -10, 0] }} transition={{ type: 'spring', delay: 0.2 }} className="w-24 h-24 bg-green-500 text-white rounded-[2rem] flex items-center justify-center mx-auto shadow-2xl shadow-green-500/30">
                            <CheckCircle2 size={48} />
                        </motion.div>
                        <h1 className={`text-4xl md:text-5xl font-black tracking-tight ${dm ? 'text-white' : 'text-gray-900'}`}>Successfully Enrolled! 🎉</h1>
                        <p className={`text-lg font-medium ${dm ? 'text-gray-400' : 'text-gray-500'}`}>The Intelligent LMS has finished configuring your workspace.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <div className={`p-6 rounded-3xl border flex flex-col items-start gap-4 ${dm ? 'bg-purple-500/5 border-purple-500/20' : 'bg-purple-50 border-purple-200'}`}>
                            <div className="p-3 bg-purple-500 text-white rounded-xl shadow-lg shadow-purple-500/20"><LineChart size={24} /></div>
                            <div>
                                <h4 className={`text-lg font-black ${dm ? 'text-white' : 'text-gray-900'}`}>Skill Baseline Test</h4>
                                <p className={`text-sm mt-1 mb-4 leading-relaxed ${dm ? 'text-gray-400' : 'text-gray-600'}`}>Establish your starting intelligence matrix so the AI can adapt the curriculum to you.</p>
                                <button className="text-xs font-black uppercase tracking-widest text-purple-500 hover:text-purple-600">Start Test →</button>
                            </div>
                        </div>

                        <div className={`p-6 rounded-3xl border flex flex-col items-start gap-4 ${dm ? 'bg-blue-500/5 border-blue-500/20' : 'bg-blue-50 border-blue-200'}`}>
                            <div className="p-3 bg-blue-500 text-white rounded-xl shadow-lg shadow-blue-500/20"><Map size={24} /></div>
                            <div>
                                <h4 className={`text-lg font-black ${dm ? 'text-white' : 'text-gray-900'}`}>AI Learning Roadmap</h4>
                                <p className={`text-sm mt-1 mb-4 leading-relaxed ${dm ? 'text-gray-400' : 'text-gray-600'}`}>Your personal trajectory has been generated tracking milestones to mastery.</p>
                                <button className="text-xs font-black uppercase tracking-widest text-blue-500 hover:text-blue-600">View Map →</button>
                            </div>
                        </div>

                        <div className={`p-6 rounded-3xl border flex flex-col items-start gap-4 ${dm ? 'bg-orange-500/5 border-orange-500/20' : 'bg-orange-50 border-orange-200'}`}>
                            <div className="p-3 bg-orange-500 text-white rounded-xl shadow-lg shadow-orange-500/20"><Crosshair size={24} /></div>
                            <div>
                                <h4 className={`text-lg font-black ${dm ? 'text-white' : 'text-gray-900'}`}>Goal Setting Matrix</h4>
                                <p className={`text-sm mt-1 mb-4 leading-relaxed ${dm ? 'text-gray-400' : 'text-gray-600'}`}>Define targets (e.g. Interviews, Freelancing) to optimize resource drops.</p>
                                <button className="text-xs font-black uppercase tracking-widest text-orange-500 hover:text-orange-600">Configure →</button>
                            </div>
                        </div>
                    </div>

                    <div className={`p-8 rounded-[2.5rem] border flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl ${dm ? 'bg-gradient-to-r from-blue-900/20 to-[#1a222c] border-blue-500/20' : 'bg-gradient-to-r from-blue-50 to-white border-blue-100'}`}>
                        <div className="flex items-center gap-6">
                            <div className="w-16 h-16 bg-blue-500 text-white rounded-2xl flex items-center justify-center shadow-lg"><TrendingUp size={32} /></div>
                            <div>
                                <p className="text-xs font-black uppercase tracking-widest text-blue-500 mb-1">AI Prediction</p>
                                <h4 className={`text-xl font-bold ${dm ? 'text-white' : 'text-gray-900'}`}>Expected Completion: 14 Days</h4>
                                <p className={`text-sm font-medium mt-1 ${dm ? 'text-gray-400' : 'text-gray-500'}`}>Based on a calculated 2 hrs/day study schedule.</p>
                            </div>
                        </div>
                        <button className="w-full md:w-auto px-10 py-5 bg-blue-500 hover:bg-blue-600 text-white rounded-[2rem] font-black text-lg shadow-2xl shadow-blue-500/30 transition-all active:scale-95 flex items-center justify-center gap-3">
                            <MonitorPlay size={22} /> Go to Course Engine
                        </button>
                    </div>

                </motion.div>
            </div>
        )
    }

    return (
        <div className={`min-h-screen pb-20 transition-colors duration-500 ${dm ? 'bg-[#121820]' : 'bg-gray-50'}`}>

            {/* ── Hero Header ── */}
            <header className={`relative pt-20 pb-16 px-6 overflow-hidden ${dm ? 'bg-gradient-to-b from-[#1a222c] to-[#121820]' : 'bg-white border-b border-gray-100'}`}>
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

                    {/* Left: Info */}
                    <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6 text-left">
                        <div className="flex items-center gap-3 flex-wrap">
                            <span className="px-3 py-1 rounded-lg bg-yellow-500/10 text-yellow-500 text-xs font-black uppercase tracking-widest">
                                {course.level}
                            </span>
                            <div className="flex items-center gap-1 text-yellow-500 text-sm font-bold">
                                <Star size={14} fill="currentColor" /> {course.rating} · {course.enrollments} students
                            </div>
                        </div>

                        <h1 className={`text-4xl lg:text-5xl font-black leading-tight ${dm ? 'text-white' : 'text-gray-900'}`}>
                            {course.title}
                        </h1>
                        <p className={`text-lg leading-relaxed ${dm ? 'text-gray-400' : 'text-gray-600'}`}>
                            {course.description}
                        </p>

                        <div className="flex flex-wrap items-center gap-5 text-sm font-bold text-gray-500">
                            <div className="flex items-center gap-2"><Clock size={16} /> {course.duration}</div>
                            <div className="flex items-center gap-2"><BookOpen size={16} /> {course.lessons}</div>
                            <div className="flex items-center gap-2"><Users size={16} /> {course.enrollments} Enrolled</div>
                        </div>

                        <div className="flex flex-col gap-3 pt-2">
                            <div className="flex flex-wrap gap-4">
                                <button onClick={() => { setEnrollmentState('smart-flow'); setSmartStep(1) }} className="px-10 py-4 bg-blue-500 hover:bg-blue-600 text-white rounded-2xl font-black text-lg shadow-xl shadow-blue-500/20 transition-all active:scale-95">
                                    Enroll Now
                                </button>
                                <button
                                    onClick={() => setActivePage('courses')}
                                    className={`px-7 py-4 rounded-2xl font-bold border transition-all ${dm ? 'border-white/10 text-white hover:bg-white/5' : 'border-gray-200 text-gray-700 hover:bg-gray-50'}`}
                                >
                                    ← Go Back
                                </button>
                            </div>
                            <div className={`flex flex-wrap items-center gap-x-4 gap-y-2 mt-2 text-xs font-bold ${dm ? 'text-gray-400' : 'text-gray-500'}`}>
                                <span className="flex items-center gap-1.5"><CheckCircle2 size={14} className="text-green-500" /> Lifetime Access</span>
                                <span className="flex items-center gap-1.5"><CheckCircle2 size={14} className="text-green-500" /> Certificate Included</span>
                                <span className="flex items-center gap-1.5"><CheckCircle2 size={14} className="text-green-500" /> Community Access</span>
                                <span className="flex items-center gap-1.5"><CheckCircle2 size={14} className="text-green-500" /> Project-Based Learning</span>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right: YouTube Embed */}
                    <motion.div initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.1 }}
                        className={`rounded-[2rem] overflow-hidden border shadow-2xl ${dm ? 'border-white/5 bg-[#0d1117]' : 'border-gray-200 bg-white'}`}
                    >
                        {course.youtubeId ? (
                            <div className="relative aspect-video w-full group">
                                {!isVideoLoaded && (
                                    <div
                                        className="absolute inset-0 cursor-pointer"
                                        onClick={() => setIsVideoLoaded(true)}
                                    >
                                        <img
                                            src={`https://img.youtube.com/vi/${course.youtubeId}/maxresdefault.jpg`}
                                            onError={e => { e.target.src = course.image }}
                                            className="w-full h-full object-cover"
                                            alt="Video Preview"
                                        />
                                        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition flex items-center justify-center">
                                            <div className="w-20 h-20 rounded-full bg-red-600 flex items-center justify-center shadow-xl shadow-red-500/30 group-hover:scale-105 transition-transform">
                                                <Play size={36} fill="white" className="text-white ml-1" />
                                            </div>
                                        </div>
                                        <div className="absolute top-4 left-4 flex items-center gap-2 bg-black/60 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-xs font-bold">
                                            <Youtube size={14} className="text-red-500" />
                                            Course Preview Video
                                        </div>
                                    </div>
                                )}
                                {isVideoLoaded && (
                                    <iframe
                                        className="w-full h-full"
                                        src={`https://www.youtube.com/embed/${course.youtubeId}?autoplay=1&rel=0`}
                                        title="Course Video"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                    />
                                )}
                            </div>
                        ) : (
                            <div className="aspect-video w-full overflow-hidden relative group">
                                <img src={course.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="Course" />
                                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                                    <div className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30">
                                        <Play size={36} fill="white" className="text-white ml-1" />
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* AI Badge inside card */}
                        <div className={`p-4 flex items-center gap-3 ${dm ? 'bg-blue-500/5 border-t border-blue-500/10' : 'bg-blue-50 border-t border-blue-100'}`}>
                            <div className="w-8 h-8 rounded-lg bg-blue-500 flex items-center justify-center text-white shrink-0">
                                <Brain size={16} />
                            </div>
                            <p className={`text-sm font-semibold ${dm ? 'text-gray-300' : 'text-gray-700'}`}>
                                <span className="text-blue-500 font-black">AI Match:</span> This course aligns with your learning profile.
                            </p>
                        </div>
                    </motion.div>
                </div>
            </header>

            {/* ── Main Content ── */}
            <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-12 gap-12">

                {/* Left (8 cols) */}
                <div className="lg:col-span-8 space-y-12">

                    {/* What You'll Learn */}
                    <Section title="What You'll Learn" darkMode={dm}>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left">
                            {(course.whatYouWillLearn || []).map((item, i) => (
                                <div key={i} className={`flex items-start gap-3 p-4 rounded-2xl ${dm ? 'bg-white/5' : 'bg-white border border-gray-100 shadow-sm'}`}>
                                    <CheckCircle2 size={18} className="text-green-500 shrink-0 mt-0.5" />
                                    <span className={`text-sm font-medium ${dm ? 'text-gray-300' : 'text-gray-700'}`}>{item}</span>
                                </div>
                            ))}
                        </div>
                    </Section>

                    {/* Personal Notes */}
                    <Section title="📝 My Course Notes" darkMode={dm}>
                        <div className={`p-6 rounded-3xl border ${dm ? 'bg-[#1a222c] border-white/5' : 'bg-white border-gray-100 shadow-sm'}`}>
                            <div className="flex justify-between items-center mb-4">
                                <p className={`text-sm ${dm ? 'text-gray-400' : 'text-gray-500'}`}>
                                    {activeModule === -1
                                        ? 'Write general notes for this entire course.'
                                        : `Write notes for "${course.curriculum[activeModule]?.title}".`
                                    }
                                </p>
                                {activeModule !== -1 && (
                                    <button
                                        onClick={() => setActiveModule(-1)}
                                        className="text-xs font-bold text-blue-500 hover:underline"
                                    >
                                        Edit General Notes
                                    </button>
                                )}
                            </div>
                            <textarea
                                value={note}
                                onChange={(e) => setNote(e.target.value)}
                                placeholder={activeModule === -1
                                    ? `Start general notes for "${course.title}"...`
                                    : `Enter notes for ${course.curriculum[activeModule]?.title}...`
                                }
                                rows={5}
                                className={`w-full p-4 rounded-xl border transition-all focus:outline-none focus:ring-2 focus:ring-blue-500/40 resize-none ${dm ? 'bg-white/5 border-white/10 text-white placeholder:text-gray-600' : 'bg-gray-50 border-gray-200 text-gray-900 placeholder:text-gray-400'}`}
                            />
                            <div className="flex items-center justify-between mt-4">
                                <p className={`text-xs ${dm ? 'text-gray-600' : 'text-gray-400'}`}>{note.length} characters</p>
                                <button
                                    onClick={handleSaveNote}
                                    className={`px-6 py-2 rounded-xl font-bold text-sm transition-all active:scale-95 flex items-center gap-2 ${noteSaved ? 'bg-green-500 text-white' : 'bg-blue-500 hover:bg-blue-600 text-white shadow-lg shadow-blue-500/20'}`}
                                >
                                    {noteSaved ? <><CheckCircle2 size={15} /> Saved!</> : <><FileText size={15} /> Save Notes</>}
                                </button>
                            </div>
                        </div>
                    </Section>

                    {/* Course Curriculum */}
                    <Section title="Course Curriculum" darkMode={dm}>
                        <div className="space-y-3">
                            {(course.curriculum || []).map((mod, i) => (
                                <div
                                    key={i}
                                    onClick={() => setActiveModule(activeModule === i ? -1 : i)}
                                    className={`rounded-2xl border overflow-hidden cursor-pointer transition-all ${dm ? 'bg-[#1a222c] border-white/5 hover:border-white/10' : 'bg-white border-gray-100 hover:shadow-md'}`}
                                >
                                    <div className="p-5 flex items-center justify-between">
                                        <div className="flex items-center gap-4">
                                            <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-sm font-black shrink-0 ${activeModule === i ? 'bg-blue-500 text-white' : dm ? 'bg-white/5 text-gray-400' : 'bg-gray-100 text-gray-500'}`}>
                                                {i + 1}
                                            </div>
                                            <div className="text-left">
                                                <h4 className={`font-bold text-sm ${dm ? 'text-white' : 'text-gray-900'}`}>{mod.title}</h4>
                                                <p className="text-xs text-gray-500 mt-0.5">{mod.duration} · 5 Lessons</p>
                                            </div>
                                        </div>
                                        <ChevronDown size={18} className={`text-gray-500 transition-transform duration-300 ${activeModule === i ? 'rotate-180' : ''}`} />
                                    </div>
                                    <AnimatePresence>
                                        {activeModule === i && (
                                            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                                                <div className={`px-5 pb-5 pl-16 space-y-4 text-left ${dm ? 'text-gray-400' : 'text-gray-600'}`}>
                                                    <div className="space-y-2.5">
                                                        {['Introduction & Overview', 'Core Concepts Explained', 'Hands-on Lab', 'Quiz: Test Your Knowledge'].map((lesson, li) => (
                                                            <div key={li} className={`flex items-center gap-3 text-sm p-2 rounded-lg ${dm ? 'hover:bg-white/5' : 'hover:bg-gray-50'}`}>
                                                                <Play size={12} className="text-blue-500 shrink-0" />
                                                                {lesson}
                                                            </div>
                                                        ))}
                                                    </div>

                                                    {/* Saved Note Display in Curriculum */}
                                                    {notes[course.title]?.modules?.[i] && (
                                                        <div className={`p-4 rounded-2xl border-l-4 border-yellow-500 ${dm ? 'bg-yellow-500/5 text-gray-300' : 'bg-yellow-50 text-gray-700'}`}>
                                                            <div className="flex items-center gap-2 mb-2">
                                                                <FileText size={14} className="text-yellow-500" />
                                                                <span className="text-[10px] font-black uppercase tracking-widest text-yellow-600">Your Saved Module Note</span>
                                                            </div>
                                                            <p className="text-xs leading-relaxed italic">"{notes[course.title].modules[i]}"</p>
                                                        </div>
                                                    )}
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            ))}
                        </div>
                    </Section>

                    {/* Instructor */}
                    <Section title="Your Instructor" darkMode={dm}>
                        <div className={`p-6 rounded-3xl border flex flex-col sm:flex-row gap-6 items-center sm:items-start text-center sm:text-left ${dm ? 'bg-[#1a222c] border-white/5' : 'bg-white border-gray-100 shadow-sm'}`}>
                            <img src={course.image} className="w-20 h-20 rounded-2xl object-cover shrink-0" alt={course.author} />
                            <div>
                                <h4 className={`text-xl font-black ${dm ? 'text-white' : 'text-gray-900'}`}>{course.author}</h4>
                                <p className="text-blue-500 font-bold text-sm mb-2">Lead Instructor · Industry Expert</p>
                                <p className={`text-sm leading-relaxed ${dm ? 'text-gray-400' : 'text-gray-600'}`}>
                                    A passionate educator and industry leader with extensive experience helping thousands of students master the subject. Renowned for clear explanations and practical, real-world examples.
                                </p>
                            </div>
                        </div>
                    </Section>

                    {/* Reviews */}
                    <Section title="Student Reviews" darkMode={dm}>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-left">
                            {[
                                { user: 'Alex Chen', comment: 'Absolutely brilliant. The depth and clarity of this course is unmatched.' },
                                { user: 'Maria G.', comment: 'The pacing is perfect and the instructor explains everything so well.' },
                            ].map((review, i) => (
                                <div key={i} className={`p-6 rounded-3xl border ${dm ? 'bg-[#1a222c] border-white/5' : 'bg-white border-gray-100 shadow-sm'}`}>
                                    <div className="flex items-center gap-1 text-yellow-500 mb-3">
                                        {[...Array(5)].map((_, j) => <Star key={j} size={13} fill="currentColor" />)}
                                    </div>
                                    <p className={`text-sm mb-4 leading-relaxed italic ${dm ? 'text-gray-300' : 'text-gray-700'}`}>"{review.comment}"</p>
                                    <div className="flex items-center gap-2">
                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${dm ? 'bg-blue-500/20 text-blue-400' : 'bg-blue-100 text-blue-600'}`}>
                                            {review.user.charAt(0)}
                                        </div>
                                        <span className={`text-sm font-bold ${dm ? 'text-gray-400' : 'text-gray-500'}`}>{review.user}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Section>
                </div>

                {/* Right Sidebar (4 cols) */}
                <div className="lg:col-span-4 space-y-6">

                    {/* Skills */}
                    <div className={`p-6 rounded-[2rem] border ${dm ? 'bg-[#1a222c] border-white/5' : 'bg-white border-gray-100 shadow-xl shadow-gray-200/50'}`}>
                        <h3 className={`font-black text-lg mb-4 ${dm ? 'text-white' : 'text-gray-900'}`}>Skills You'll Gain</h3>
                        <div className="flex flex-wrap gap-2">
                            {(course.skills || ['Problem Solving', 'Practical Coding', 'Industry Tools', 'Deployment']).map(tag => (
                                <span key={tag} className={`px-3 py-1.5 rounded-xl text-xs font-bold ${dm ? 'bg-white/5 text-gray-300 border border-white/10' : 'bg-blue-50 text-blue-700 border border-blue-100'}`}>
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Course Analytics */}
                    <div className={`p-6 rounded-[2rem] border ${dm ? 'bg-[#1a222c] border-white/5' : 'bg-white border-gray-100 shadow-xl shadow-gray-200/50'}`}>
                        <h3 className={`font-black text-lg mb-5 ${dm ? 'text-white' : 'text-gray-900'}`}>Course Analytics</h3>
                        <div className="space-y-5">
                            {[
                                { label: 'Completion Rate', value: '94%', color: 'bg-green-500', w: 'w-[94%]' },
                                { label: 'Industry Demand', value: 'High', color: 'bg-blue-500', w: 'w-[85%]' },
                                { label: 'Avg. Difficulty', value: course.level, color: 'bg-yellow-500', w: course.level === 'Beginner' ? 'w-[33%]' : course.level === 'Intermediate' ? 'w-[66%]' : 'w-[90%]' },
                            ].map(item => (
                                <div key={item.label}>
                                    <div className="flex justify-between text-xs font-bold mb-2">
                                        <span className={dm ? 'text-gray-400' : 'text-gray-500'}>{item.label}</span>
                                        <span className={dm ? 'text-white' : 'text-gray-800'}>{item.value}</span>
                                    </div>
                                    <div className="w-full h-2 bg-gray-500/10 rounded-full overflow-hidden">
                                        <div className={`h-full ${item.color} rounded-full ${item.w}`} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Extras */}
                    <div className={`p-6 rounded-[2rem] border ${dm ? 'bg-[#1a222c] border-white/5' : 'bg-white border-gray-100 shadow-xl shadow-gray-200/50'}`}>
                        <h3 className={`font-black text-lg mb-5 ${dm ? 'text-white' : 'text-gray-900'}`}>Extras Included</h3>
                        <ul className="space-y-4">
                            {[
                                { icon: Award, label: 'Certificate of Completion', color: 'text-yellow-500' },
                                { icon: Download, label: 'Downloadable Resources', color: 'text-blue-500' },
                                { icon: MessageSquare, label: 'Discord Community Access', color: 'text-purple-500' },
                                { icon: Sparkles, label: 'AI-Powered Exercises', color: 'text-pink-500' },
                            ].map(({ icon: Icon, label, color }) => (
                                <li key={label} className="flex items-center gap-3">
                                    <Icon size={18} className={color} />
                                    <span className={`text-sm font-medium ${dm ? 'text-gray-300' : 'text-gray-700'}`}>{label}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                </div>
            </div>
        </div>
    )
}

function Section({ title, children, darkMode }) {
    return (
        <div className="space-y-5">
            <h3 className={`text-2xl font-black ${darkMode ? 'text-white' : 'text-gray-900'}`}>{title}</h3>
            {children}
        </div>
    )
}
