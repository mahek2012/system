import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
    Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer,
    AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid,
    BarChart, Bar, Cell
} from 'recharts'
import {
    Zap, Target, TrendingUp, Clock, Trophy, Brain, Sparkles,
    ChevronRight, Play, Users, MessageSquare, Star, ArrowRight,
    BarChart3, Activity, BookOpen, X, PlayCircle, BarChart as BarChartIcon, Users2,
    Flame, GraduationCap, ChevronDown, CheckCircle2, LineChart, Layout,
    Atom, Terminal, MonitorPlay, Cpu, AlertTriangle, Award, RefreshCw,
    ChevronLeft, Gauge, BookMarked, Lightbulb, Shield, Percent, Rocket,
    TrendingDown, Eye, Code, Database, Server, GitBranch, Layers, Medal,
    BarChart2, Bolt,
    Video, VideoOff, Mic, MicOff, Monitor, Hand, Calendar, Bell, Lock, Unlock, Plus, Settings, Phone, Share2, FileText, Hash, Edit3, Send, Globe, XCircle, AlertCircle, FastForward
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
    const [analyticsView, setAnalyticsView] = useState('overview') // 'overview' | 'hub'
    const [analyticsTimeline, setAnalyticsTimeline] = useState('7d') // '7d' | '30d'
    // Peer Session state
    const [peerView, setPeerView] = useState('list') // 'list' | 'room' | 'reminder' | 'create'
    const [reminderSet, setReminderSet] = useState(false)
    const [createSessionForm, setCreateSessionForm] = useState({
        title: '',
        category: 'Frontend',
        date: '',
        time: '',
        duration: '',
        maxParticipants: 8,
        privacy: 'Public',
        hostRole: 'Discussion',
        description: '',
        advanced: {
            whiteboard: false,
            recording: false,
            approval: false,
            skillLevel: 'Beginner'
        }
    })

    // ── Adaptive Quiz Engine State ──────────────────────────────────────
    const [quizPhase, setQuizPhase] = useState('start') // 'start' | 'analyzing' | 'quiz' | 'report'
    const [practicePhase, setPracticePhase] = useState('drill')
    const [selectedWeakTopic, setSelectedWeakTopic] = useState(null)
    const [recommendationView, setRecommendationView] = useState('trees') // 'trees' | 'recursion' | 'roadmap'
    const [treeSimStep, setTreeSimStep] = useState(0)
    const [recursionDebugStep, setRecursionDebugStep] = useState(0)
    const [practiceTimedChallenge, setPracticeTimedChallenge] = useState(false)
    const [practiceTimeLeft, setPracticeTimeLeft] = useState(600) // 10 minutes in seconds
    const [recursionDebugData, setRecursionDebugData] = useState({
        depth: 0,
        stack: ['factorial(4)'],
        vars: { n: 4, result: '?' }
    })
    const [roadmapSubView, setRoadmapSubView] = useState('hub') // 'hub' | 'commit' | 'peer_room' | 'recursive_quiz' | 'booster' | 'interview_sim'
    const [committedTarget, setCommittedTarget] = useState(null)
    const [peerRoomSubView, setPeerRoomSubView] = useState('whiteboard') // 'whiteboard' | 'traversal' | 'doubt' | 'battle'
    const [boosterStep, setBoosterStep] = useState(0)
    const [interviewSimPhase, setInterviewSimPhase] = useState('problem') // 'problem' | 'ide' | 'feedback'
    const [quizConfig, setQuizConfig] = useState({
        domain: 'HTML',
        mode: 'quick',      // 'quick' | 'deep' | 'weakness'
        timing: 'timed',    // 'timed' | 'practice'
        difficulty: 'auto', // 'auto' | 'easy' | 'medium' | 'hard'
    })
    const [currentQ, setCurrentQ] = useState(0)
    const [selectedAnswer, setSelectedAnswer] = useState(null)
    const [answered, setAnswered] = useState(false)
    const [timeLeft, setTimeLeft] = useState(30)
    const [currentDifficulty, setCurrentDifficulty] = useState('Easy')
    const [skillAccuracy, setSkillAccuracy] = useState(78)
    const [difficultyHistory, setDifficultyHistory] = useState(['Easy'])
    const [correctCount, setCorrectCount] = useState(0)
    const [xpEarned, setXpEarned] = useState(0)
    const timerRef = useRef(null)

    const toggleSyllabusModule = (index) => {
        setExpandedSyllabus(prev =>
            prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
        )
    }

    // ── Adaptive Engine: Question Bank (Smart Quiz AI Generated) ─────────────────────────
    const questionBank = {
        'React State': [
            {
                id: 1,
                type: 'concept',
                q: 'What is the primary difference between `useState` and `useReducer`?',
                opts: [
                    '`useReducer` is only for global state.',
                    '`useState` is asynchronous, `useReducer` is synchronous.',
                    '`useReducer` is better for complex state logic that involves multiple sub-values.',
                    'There is no difference, one is just syntactic sugar.'
                ],
                correct: 2,
                diff: 'Easy',
                topic: 'State Basics',
                whyCorrect: 'useReducer provides more predictable state transitions by centralizing logic in a reducer function, making it ideal for managing objects or arrays with complex updates.',
                mistakeType: 'Core Concept Misunderstanding',
            },
            {
                id: 2,
                type: 'code',
                q: 'Consider the following snippet:\n\nconst [count, setCount] = useState(0);\nsetCount(count + 1);\nsetCount(count + 1);\n\nWhy does it not increment twice?',
                opts: [
                    'Because React batches state updates for performance.',
                    'Because `setCount` is synchronous and overrides itself.',
                    'Because you cannot call `setCount` twice in a row.',
                    'It actually does increment twice.'
                ],
                correct: 0,
                diff: 'Medium',
                topic: 'Batching',
                whyCorrect: 'React batches multiple state updates during the same render cycle for performance. Both calls see `count` as `0`, so both effectively run `setCount(0 + 1)`. To fix this, use the functional update form: `setCount(prev => prev + 1)`.',
                mistakeType: 'Stale UI State / Batching Gap',
            },
            {
                id: 3,
                type: 'scenario',
                q: 'You are building a scalable state for a multi-page Dashboard with deeply nested components needing access to user preferences. Which approach is best?',
                opts: [
                    'Pass preferences down as props through every layer.',
                    'Use `useState` at the top level and pass it down.',
                    'Use Context API paired with `useReducer` or a library like Zustand/Redux.',
                    'Store the preferences in `localStorage` and read them in every component.'
                ],
                correct: 2,
                diff: 'Hard',
                topic: 'Architecture',
                whyCorrect: 'Prop drilling (passing props through many layers) is unmaintainable. Context API efficiently broadcasts data to required nested components without intermediate drilling. For complex scalable states, combining it with Redux or Zustand is heavily recommended.',
                mistakeType: 'Suboptimal Architecture Choice',
            },
            {
                id: 4,
                type: 'concept',
                q: 'When should you choose the Context API over Redux?',
                opts: [
                    'When you need complex async side effects (like data fetching).',
                    'When the state is simple (like a theme or auth token) and changes infrequently.',
                    'When you need time-travel debugging.',
                    'Context API should always be used over Redux.'
                ],
                correct: 1,
                diff: 'Medium',
                topic: 'Context API',
                whyCorrect: 'Context is great for passing down simple UI themes or auth states. However, Context is NOT a state management tool by itself (it is a dependency injection tool). If state changes frequently in Context, it will cause mass re-renders.',
                mistakeType: 'Performance / Rendering Trap',
            },
            {
                id: 5,
                type: 'code',
                q: 'What is the output of the following?\n\nuseEffect(() => {\n  console.log("Effect ran");\n}, [user.id])\n\n(Assuming `user.id` stays the same between renders)',
                opts: [
                    'It continuously logs "Effect ran" infinitely.',
                    'It logs "Effect ran" only once on the initial mount.',
                    'It logs "Effect ran" on initial mount and whenever `user.id` changes.',
                    'It never logs anything.'
                ],
                correct: 2,
                diff: 'Medium',
                topic: 'useEffect',
                whyCorrect: 'The dependency array `[user.id]` explicitly tells React to only re-run the effect if `user.id` is different than the previous render. It always runs once on mount.',
                mistakeType: 'Lifecycle Misunderstanding',
            }
        ]
    }

    const difficultyMap = { Easy: 0, Medium: 1, Hard: 2 }
    const difficultyColors = { Easy: 'text-green-500', Medium: 'text-yellow-500', Hard: 'text-red-500' }
    const difficultyBg = { Easy: 'bg-green-500', Medium: 'bg-yellow-500', Hard: 'bg-red-500' }

    const getQuestions = () => {
        // Fallback to 'React State' or the first available domain instead of .HTML which does not exist
        const defaultDomain = Object.keys(questionBank)[0];
        const bank = questionBank[quizConfig.domain] || questionBank[defaultDomain] || [];

        if (!bank || bank.length === 0) return [];

        const total = quizConfig.mode === 'quick' ? 10 : quizConfig.mode === 'deep' ? 10 : 6;
        return bank.slice(0, total);
    }

    const totalQuestions = getQuestions().length
    const questions = getQuestions()
    const currentQuestion = questions[currentQ]

    const startEngine = () => {
        setQuizPhase('analyzing')
        setTimeout(() => {
            setQuizPhase('quiz')
            setCurrentQ(0)
            setSelectedAnswer(null)
            setAnswered(false)
            setCurrentDifficulty('Easy')
            setSkillAccuracy(78)
            setDifficultyHistory(['Easy'])
            setCorrectCount(0)
            setXpEarned(0)
            setTimeLeft(30)
        }, 3000)
    }

    const handleAnswer = (idx) => {
        if (answered) return
        setSelectedAnswer(idx)
        setAnswered(true)
        clearInterval(timerRef.current)

        const isCorrect = idx === currentQuestion.correct
        const currentLevel = difficultyMap[currentDifficulty]

        if (isCorrect) {
            setCorrectCount(c => c + 1)
            setXpEarned(x => x + (currentLevel === 0 ? 10 : currentLevel === 1 ? 20 : 35))
            setSkillAccuracy(a => Math.min(100, a + (currentLevel + 1) * 3))
            if (currentLevel < 2) setCurrentDifficulty(Object.keys(difficultyMap)[currentLevel + 1])
        } else {
            setSkillAccuracy(a => Math.max(0, a - (currentLevel + 1) * 4))
            if (currentLevel > 0) setCurrentDifficulty(Object.keys(difficultyMap)[currentLevel - 1])
        }
        setDifficultyHistory(h => [...h, currentDifficulty])
    }

    const nextQuestion = () => {
        if (currentQ >= totalQuestions - 1) {
            setQuizPhase('report')
            return
        }
        setCurrentQ(q => q + 1)
        setSelectedAnswer(null)
        setAnswered(false)
        setTimeLeft(30)
    }

    const resetQuiz = () => {
        setQuizPhase('start')
        setCurrentQ(0)
        setSelectedAnswer(null)
        setAnswered(false)
        setTimeLeft(30)
        setCurrentDifficulty('Easy')
        setSkillAccuracy(78)
        setDifficultyHistory(['Easy'])
        setCorrectCount(0)
        setXpEarned(0)
    }

    // Quiz timer effect
    useEffect(() => {
        if (quizPhase === 'quiz' && quizConfig.timing === 'timed' && !answered) {
            timerRef.current = setInterval(() => {
                setTimeLeft(t => {
                    if (t <= 1) {
                        clearInterval(timerRef.current)
                        handleAnswer(-1) // timeout = wrong
                        return 0
                    }
                    return t - 1
                })
            }, 1000)
        }
        return () => clearInterval(timerRef.current)
    }, [quizPhase, currentQ, answered])

    // Practice Timed Challenge effect
    useEffect(() => {
        let interval;
        if (practiceTimedChallenge && practiceTimeLeft > 0) {
            interval = setInterval(() => {
                setPracticeTimeLeft(t => t - 1);
            }, 1000);
        } else if (practiceTimeLeft === 0) {
            setPracticeTimedChallenge(false);
            setPracticePhase('report');
        }
        return () => clearInterval(interval);
    }, [practiceTimedChallenge, practiceTimeLeft])

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
                                        <button onClick={() => setActiveModal('quiz')} className="w-full py-3 bg-purple-500 hover:bg-purple-600 text-white rounded-xl font-black text-sm shadow-lg shadow-purple-500/20 transition-all flex items-center justify-center gap-2">
                                            <Cpu size={14} /> Start Adaptive Engine →
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
                                        onClick={() => { setActiveModal('recommendation'); setRecommendationView('trees'); }}
                                    />
                                    <RecommendationItem
                                        text="Practice Recursion Drills"
                                        type="Practice"
                                        darkMode={darkMode}
                                        onClick={() => { setActiveModal('recommendation'); setRecommendationView('recursion'); }}
                                    />
                                    <button
                                        onClick={() => { setActiveModal('recommendation'); setRecommendationView('roadmap'); }}
                                        className={`w-full py-2 text-xs font-bold uppercase tracking-widest mt-2 ${darkMode ? 'text-gray-500 hover:text-white' : 'text-gray-400 hover:text-gray-900'}`}
                                    >
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
                            onClick={() => { setActiveModal(null); setPeerView('list'); }}
                            className="absolute inset-0 bg-black/60 backdrop-blur-md"
                        />

                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className={`w-full max-w-3xl rounded-[2.5rem] border shadow-2xl relative overflow-hidden flex flex-col max-h-[90vh] ${darkMode ? 'bg-[#1a222c] border-white/5' : 'bg-white border-gray-100'}`}
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
                                    onClick={() => { setActiveModal(null); setPeerView('list'); }}
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
                                    <div className="space-y-0 min-h-[420px]">
                                        <AnimatePresence mode="wait">

                                            {/* ── PHASE 1: START SCREEN ─────────────────────────────────── */}
                                            {quizPhase === 'start' && (
                                                <motion.div key="start" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} className="space-y-6">

                                                    {/* AI Context Header */}
                                                    <div className={`p-5 rounded-3xl border relative overflow-hidden ${darkMode ? 'bg-gradient-to-br from-[#1a222c] to-[#121820] border-purple-500/20' : 'bg-gradient-to-br from-purple-50 to-white border-purple-200 shadow-xl shadow-purple-500/10'}`}>
                                                        <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                                                        <div className="relative z-10">
                                                            <div className="flex justify-between items-start mb-4">
                                                                <div>
                                                                    <h3 className={`text-xl font-black flex items-center gap-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                                                                        <Brain size={24} className="text-purple-500" /> Smart Quiz
                                                                    </h3>
                                                                    <div className="text-xs font-black uppercase tracking-widest text-purple-500 mt-1">State Management Mastery</div>
                                                                </div>
                                                                <div className={`px-3 py-1 rounded-xl text-[10px] font-black uppercase border flex items-center gap-1 ${darkMode ? 'bg-white/5 border-white/10 text-gray-300' : 'bg-gray-50 border-gray-200 text-gray-600'}`}>
                                                                    <Cpu size={12} /> AI Generated
                                                                </div>
                                                            </div>

                                                            <div className="space-y-2">
                                                                <div className="text-[10px] font-black uppercase tracking-widest text-gray-500 flex items-center gap-2 mb-1">
                                                                    <BarChart3 size={12} /> Based on your recent activity
                                                                </div>
                                                                {[
                                                                    { label: 'Weak reducer patterns', icon: <TrendingDown size={14} className="text-red-500" /> },
                                                                    { label: 'Incorrect context API usage', icon: <XCircle size={14} className="text-red-500" /> },
                                                                    { label: 'Slow debugging time', icon: <Clock size={14} className="text-orange-500" /> }
                                                                ].map((item, i) => (
                                                                    <div key={i} className={`flex items-center gap-2 p-2 rounded-xl text-xs font-bold border ${darkMode ? 'bg-white/5 border-white/5 text-gray-300' : 'bg-white border-gray-100 text-gray-700'}`}>
                                                                        {item.icon}
                                                                        {item.label}
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {/* Performance Prediction Engine */}
                                                    <div className={`p-4 rounded-3xl border flex flex-col md:flex-row gap-4 items-center justify-between ${darkMode ? 'bg-white/5 border-white/10' : 'bg-gray-50 border-gray-200'}`}>
                                                        <div className="flex-1 text-center md:text-left">
                                                            <div className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-1">Performance Prediction Engine</div>
                                                            <div className="flex items-center justify-center md:justify-start gap-4">
                                                                <div className="space-y-1">
                                                                    <div className={`text-2xl font-black flex items-center gap-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                                                        72% <span className="text-[10px] tracking-widest text-gray-500 uppercase mt-1">Current</span>
                                                                    </div>
                                                                </div>
                                                                <ArrowRight size={20} className="text-purple-500" />
                                                                <div className="space-y-1">
                                                                    <div className="text-2xl font-black text-green-500 flex items-center gap-2">
                                                                        83% <span className="text-[10px] tracking-widest text-green-500/80 uppercase mt-1">Potential</span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className={`px-4 py-3 rounded-2xl flex flex-col items-center justify-center border ${darkMode ? 'bg-green-500/10 border-green-500/20' : 'bg-green-50 border-green-200'}`}>
                                                            <div className="text-xl font-black text-green-500">+15%</div>
                                                            <div className="text-[10px] font-black uppercase tracking-widest text-green-600">Improvement</div>
                                                        </div>
                                                    </div>

                                                    {/* Quiz Modes */}
                                                    <div className="space-y-3">
                                                        <label className="text-[10px] font-black uppercase text-gray-500 tracking-widest flex items-center gap-2">
                                                            <Target size={12} className="text-purple-500" /> Select Mode
                                                        </label>
                                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                                            {[
                                                                { id: 'timed', label: 'Timed Mode', sub: 'Speed & Accuracy', icon: '⚡', color: 'text-orange-500' },
                                                                { id: 'deep', label: 'Deep Learning', sub: 'Explanations included', icon: '🧠', color: 'text-purple-500' },
                                                                { id: 'interview', label: 'Interview Sim', sub: 'Tough scenario prep', icon: '🎯', color: 'text-red-500' },
                                                            ].map(m => (
                                                                <button
                                                                    key={m.id}
                                                                    onClick={() => setQuizConfig(c => ({ ...c, mode: m.id }))}
                                                                    className={`p-4 rounded-2xl border flex flex-col items-center text-center gap-2 transition-all ${quizConfig.mode === m.id
                                                                        ? 'border-purple-500/60 bg-purple-500/10 shadow-lg shadow-purple-500/20 scale-[1.02]'
                                                                        : darkMode ? 'bg-white/5 border-white/10 hover:border-white/20' : 'bg-gray-50 border-gray-200 hover:border-purple-200'}`}
                                                                >
                                                                    <span className="text-3xl mb-1">{m.icon}</span>
                                                                    <div className={`font-black text-sm ${quizConfig.mode === m.id ? 'text-purple-500' : darkMode ? 'text-white' : 'text-gray-900'}`}>{m.label}</div>
                                                                    <div className="text-[10px] font-bold text-gray-500">{m.sub}</div>
                                                                    {quizConfig.mode === m.id && <div className="absolute top-2 right-2"><CheckCircle2 size={16} className="text-purple-500" /></div>}
                                                                </button>
                                                            ))}
                                                        </div>
                                                    </div>

                                                    {/* AI Insight Bar */}
                                                    <div className={`p-4 rounded-2xl border flex items-center gap-4 ${darkMode ? 'bg-purple-500/5 border-purple-500/15' : 'bg-purple-50 border-purple-100'}`}>
                                                        <div className="p-2.5 bg-purple-500 rounded-xl text-white shrink-0"><Sparkles size={18} /></div>
                                                        <div>
                                                            <div className="text-[10px] font-black text-purple-500 uppercase tracking-widest mb-0.5">AI Insight</div>
                                                            <p className={`text-xs font-bold ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                                                Based on your history, <span className="text-purple-400 font-black">Forms & Semantic Tags</span> need attention. Engine will prioritize these.
                                                            </p>
                                                        </div>
                                                    </div>

                                                    <button
                                                        onClick={startEngine}
                                                        className="w-full py-5 bg-gradient-to-r from-purple-600 to-violet-600 text-white rounded-2xl font-black text-lg shadow-xl shadow-purple-500/30 active:scale-95 transition-all hover:shadow-purple-500/50 hover:scale-[1.02] flex items-center justify-center gap-3"
                                                    >
                                                        <Cpu size={22} /> Start Adaptive Engine →
                                                    </button>
                                                </motion.div>
                                            )}

                                            {/* ── PHASE 2: ANALYZING ────────────────────────────────── */}
                                            {quizPhase === 'analyzing' && (
                                                <motion.div key="analyzing" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
                                                    className="flex flex-col items-center justify-center gap-8 py-10">
                                                    <div className="relative">
                                                        <motion.div animate={{ scale: [1, 1.15, 1], opacity: [0.7, 1, 0.7] }} transition={{ repeat: Infinity, duration: 1.8 }}
                                                            className="w-28 h-28 rounded-full bg-purple-500/20 flex items-center justify-center">
                                                            <Brain size={56} className="text-purple-500" />
                                                        </motion.div>
                                                        <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 2, ease: 'linear' }}
                                                            className="absolute inset-0 rounded-full border-4 border-transparent border-t-purple-500" />
                                                    </div>
                                                    <div className="text-center space-y-2">
                                                        <h4 className={`text-2xl font-black ${darkMode ? 'text-white' : 'text-gray-900'}`}>AI Analyzing Your Profile</h4>
                                                        <p className="text-sm font-bold text-gray-500">Scanning performance history • Detecting weak spots • Personalizing quiz…</p>
                                                    </div>
                                                    <div className="w-full space-y-3">
                                                        {['Scanning previous performance', 'Identifying weak topics', 'Calibrating difficulty engine', 'Building question sequence'].map((step, i) => (
                                                            <motion.div key={i} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.5 }}
                                                                className={`flex items-center gap-3 p-3 rounded-xl ${darkMode ? 'bg-white/5' : 'bg-gray-50'}`}>
                                                                <motion.div animate={{ scale: [1, 1.3, 1] }} transition={{ delay: i * 0.5, duration: 0.4 }}
                                                                    className="w-5 h-5 rounded-full bg-purple-500 flex items-center justify-center">
                                                                    <CheckCircle2 size={12} className="text-white" />
                                                                </motion.div>
                                                                <span className={`text-xs font-bold ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{step}</span>
                                                            </motion.div>
                                                        ))}
                                                    </div>
                                                </motion.div>
                                            )}

                                            {/* ── PHASE 3: LIVE QUIZ UI ─────────────────────────────── */}
                                            {quizPhase === 'quiz' && currentQuestion && (
                                                <motion.div key={`quiz-${currentQ}`} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} className="space-y-5">

                                                    {/* Live HUD Bar */}
                                                    <div className={`p-4 rounded-2xl border flex flex-wrap gap-4 items-center justify-between ${darkMode ? 'bg-white/5 border-white/10' : 'bg-gray-50 border-gray-200'}`}>
                                                        <div className="flex items-center gap-2">
                                                            <div className={`px-3 py-1.5 rounded-xl font-black text-xs border ${difficultyBg[currentDifficulty]} text-white border-transparent`}>
                                                                {currentDifficulty}
                                                            </div>
                                                            <span className={`text-[10px] font-black uppercase tracking-widest ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>Level 🔄</span>
                                                        </div>
                                                        <div className="flex items-center gap-1.5 text-xs font-black text-purple-400">
                                                            <Activity size={12} /> Skill Accuracy: <span className="text-white">{skillAccuracy}%</span>
                                                        </div>
                                                        <div className="flex items-center gap-1.5 text-xs font-black">
                                                            <BookOpen size={12} className="text-purple-400" />
                                                            <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>{currentQuestion.topic}</span>
                                                        </div>
                                                        {quizConfig.timing === 'timed' && (
                                                            <div className={`flex items-center gap-1.5 text-xs font-black ${timeLeft <= 10 ? 'text-red-500' : darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                                                <Clock size={12} /> {timeLeft}s
                                                            </div>
                                                        )}
                                                    </div>

                                                    {/* Difficulty Meter */}
                                                    <div className="space-y-1.5">
                                                        <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-gray-500">
                                                            <span>Difficulty Meter</span>
                                                            <span>Q {currentQ + 1} / {totalQuestions}</span>
                                                        </div>
                                                        <div className="w-full h-2 rounded-full bg-gray-500/10 overflow-hidden">
                                                            <motion.div
                                                                animate={{ width: `${((currentQ + 1) / totalQuestions) * 100}%` }}
                                                                className={`h-full rounded-full ${difficultyBg[currentDifficulty]}`}
                                                                transition={{ duration: 0.5 }}
                                                            />
                                                        </div>
                                                        {/* Timer bar */}
                                                        {quizConfig.timing === 'timed' && (
                                                            <motion.div
                                                                animate={{ width: `${(timeLeft / 30) * 100}%` }}
                                                                className={`h-1 rounded-full mt-1 ${timeLeft > 10 ? 'bg-green-500' : 'bg-red-500'}`}
                                                                transition={{ duration: 0.9 }}
                                                            />
                                                        )}
                                                    </div>

                                                    {/* Question with Code Formatting Support */}
                                                    <div className={`p-6 rounded-3xl border ${darkMode ? 'bg-white/5 border-white/10' : 'bg-purple-50 border-purple-100'}`}>
                                                        {currentQuestion.q.split('\n\n').map((block, idx) => {
                                                            if (block.includes('const') || block.includes('useEffect') || block.includes('setCount')) {
                                                                return (
                                                                    <div key={idx} className={`my-3 p-4 rounded-xl font-mono text-xs overflow-x-auto ${darkMode ? 'bg-[#1a222c] border-white/10 text-purple-300' : 'bg-white border-purple-200 text-purple-700'}`}>
                                                                        {block.split('\n').map((line, lIdx) => <div key={lIdx}>{line}</div>)}
                                                                    </div>
                                                                )
                                                            }
                                                            return (
                                                                <p key={idx} className={`text-base font-black leading-relaxed ${idx > 0 ? 'mt-3' : ''} ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                                                                    {block}
                                                                </p>
                                                            )
                                                        })}
                                                    </div>

                                                    {/* Answer Options */}
                                                    <div className="grid grid-cols-1 gap-3">
                                                        {currentQuestion.opts.map((opt, i) => {
                                                            const isSelected = selectedAnswer === i
                                                            const isCorrect = i === currentQuestion.correct
                                                            let style = darkMode ? 'bg-white/5 border-white/10 text-gray-300' : 'bg-gray-50 border-gray-200 text-gray-700'
                                                            if (answered) {
                                                                if (isCorrect) style = 'bg-green-500/20 border-green-500/60 text-green-400 font-black'
                                                                else if (isSelected && !isCorrect) style = 'bg-red-500/20 border-red-500/60 text-red-400'
                                                            } else if (isSelected) {
                                                                style = 'bg-purple-500/20 border-purple-500/60 text-purple-400'
                                                            }
                                                            return (
                                                                <button
                                                                    key={i}
                                                                    onClick={() => handleAnswer(i)}
                                                                    disabled={answered}
                                                                    className={`w-full p-4 rounded-2xl border text-sm font-bold text-left flex items-center gap-4 transition-all ${style} ${!answered ? 'hover:border-purple-400/40 hover:scale-[1.01] active:scale-95' : ''} disabled:cursor-default`}
                                                                >
                                                                    <span className={`w-7 h-7 rounded-lg border flex items-center justify-center text-[11px] font-black shrink-0 ${answered && isCorrect ? 'bg-green-500 border-green-500 text-white' : answered && isSelected ? 'bg-red-500 border-red-500 text-white' : darkMode ? 'border-white/20 text-gray-500' : 'border-gray-300 text-gray-500'}`}>
                                                                        {String.fromCharCode(65 + i)}
                                                                    </span>
                                                                    {opt}
                                                                    {answered && isCorrect && <CheckCircle2 size={16} className="text-green-500 ml-auto shrink-0" />}
                                                                    {answered && isSelected && !isCorrect && <X size={16} className="text-red-500 ml-auto shrink-0" />}
                                                                </button>
                                                            )
                                                        })}
                                                    </div>

                                                    {/* Real-Time Feedback Engine (after answer) */}
                                                    {answered && (
                                                        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="overflow-hidden">
                                                            <div className={`p-5 rounded-3xl border space-y-4 ${selectedAnswer === currentQuestion.correct ? (darkMode ? 'bg-green-500/10 border-green-500/20' : 'bg-green-50 border-green-100') : (darkMode ? 'bg-red-500/10 border-red-500/20' : 'bg-red-50 border-red-100')}`}>

                                                                {/* Header: Result & XP */}
                                                                <div className="flex items-start gap-3 border-b pb-3 border-black/5 dark:border-white/5">
                                                                    <div className={`p-2 rounded-xl shrink-0 ${selectedAnswer === currentQuestion.correct ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}>
                                                                        {selectedAnswer === currentQuestion.correct ? <Lightbulb size={18} /> : <AlertTriangle size={18} />}
                                                                    </div>
                                                                    <div className="flex-1">
                                                                        <div className={`text-sm font-black uppercase tracking-widest flex items-center justify-between ${selectedAnswer === currentQuestion.correct ? 'text-green-500' : 'text-red-500'}`}>
                                                                            <span>{selectedAnswer === currentQuestion.correct ? '✓ Correct Answer!' : '✗ Incorrect'}</span>
                                                                            {selectedAnswer === currentQuestion.correct && (
                                                                                <span className="flex items-center gap-1 text-[10px] bg-green-500/20 px-2 py-1 rounded-lg">
                                                                                    <Zap size={10} /> +{difficultyMap[currentDifficulty] === 0 ? 10 : difficultyMap[currentDifficulty] === 1 ? 20 : 35} XP
                                                                                </span>
                                                                            )}
                                                                        </div>
                                                                        {!selectedAnswer === currentQuestion.correct && (
                                                                            <div className="text-xs font-bold mt-1 text-red-500/80">
                                                                                Engine adjusting difficulty down...
                                                                            </div>
                                                                        )}
                                                                    </div>
                                                                </div>

                                                                {/* Body: AI Explanation */}
                                                                <div className="space-y-3">
                                                                    {selectedAnswer !== currentQuestion.correct && currentQuestion.mistakeType && (
                                                                        <div className="flex items-center gap-2">
                                                                            <span className={`px-2 py-1 rounded-lg text-[10px] items-center gap-1 flex font-black border ${darkMode ? 'bg-red-500/10 border-red-500/20 text-red-400' : 'bg-red-100 border-red-200 text-red-700'}`}>
                                                                                <Target size={10} /> Mistake Type: {currentQuestion.mistakeType}
                                                                            </span>
                                                                        </div>
                                                                    )}
                                                                    <div>
                                                                        <div className={`text-[10px] font-black uppercase tracking-widest mb-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                                                            {selectedAnswer === currentQuestion.correct ? 'Why you are right:' : 'Mini Concept Explanation:'}
                                                                        </div>
                                                                        <p className={`text-sm font-bold leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                                                            {currentQuestion.whyCorrect || `The correct answer was "${currentQuestion.opts[currentQuestion.correct]}".`}
                                                                        </p>
                                                                    </div>
                                                                </div>

                                                            </div>
                                                        </motion.div>
                                                    )}

                                                    {answered && (
                                                        <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                                                            onClick={nextQuestion}
                                                            className="w-full py-4 bg-purple-500 hover:bg-purple-600 text-white rounded-2xl font-black flex items-center justify-center gap-2 transition-all active:scale-95">
                                                            {currentQ >= totalQuestions - 1 ? <><Trophy size={18} /> View Final Report</> : <>Next Question <ChevronRight size={18} /></>}
                                                        </motion.button>
                                                    )}
                                                </motion.div>
                                            )}

                                            {/* ── PHASE 4: RESULTS REPORT ──────────────────────────── */}
                                            {quizPhase === 'report' && (() => {
                                                const score = Math.round((correctCount / totalQuestions) * 100)
                                                const skillBreakdown = [
                                                    { name: 'HTML Structure', prev: 72, curr: Math.min(100, 72 + Math.round(score * 0.2)), color: '#8b5cf6' },
                                                    { name: 'Forms', prev: 45, curr: Math.min(100, 45 + Math.round(score * 0.15)), color: '#f59e0b' },
                                                    { name: 'Semantic Tags', prev: 38, curr: Math.min(100, 38 + Math.round(score * 0.12)), color: '#ef4444' },
                                                    { name: 'Links & Attrs', prev: 65, curr: Math.min(100, 65 + Math.round(score * 0.18)), color: '#10b981' },
                                                ]
                                                const comparisonData = skillBreakdown.map(s => ({ name: s.name.split(' ')[0], Previous: s.prev, Current: s.curr }))
                                                const grade = score >= 85 ? 'A' : score >= 70 ? 'B' : score >= 55 ? 'C' : 'D'
                                                const gradeColor = score >= 85 ? 'text-green-500' : score >= 70 ? 'text-blue-500' : score >= 55 ? 'text-yellow-500' : 'text-red-500'

                                                return (
                                                    <motion.div key="report" initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6">

                                                        {/* Advanced AI Score Hero */}
                                                        <div className={`p-6 rounded-3xl border relative overflow-hidden ${darkMode ? 'bg-gradient-to-br from-[#1a222c] to-[#121820] border-purple-500/20' : 'bg-gradient-to-br from-purple-50 to-white border-purple-200'}`}>
                                                            <div className="absolute top-0 right-0 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

                                                            <div className="flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
                                                                <div className="text-center md:text-left">
                                                                    <div className="text-[10px] font-black uppercase tracking-widest text-purple-500 mb-2">Smart Quiz Results</div>
                                                                    <div className={`text-6xl font-black mb-1 ${gradeColor}`}>
                                                                        {score}%
                                                                    </div>
                                                                    <div className={`text-sm font-bold ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                                                        {correctCount} / {totalQuestions} Correct • State Management Mastery
                                                                    </div>
                                                                </div>

                                                                {/* Prediction vs Actual */}
                                                                <div className={`p-4 rounded-2xl border flex flex-col items-center justify-center min-w-[160px] ${darkMode ? 'bg-white/5 border-white/10' : 'bg-white border-gray-200 shadow-xl shadow-gray-200/50'}`}>
                                                                    <div className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-2">Prediction vs Actual</div>
                                                                    <div className="flex items-center gap-3">
                                                                        <div className="text-center">
                                                                            <div className={`text-xl font-black ${darkMode ? 'text-gray-400' : 'text-gray-400'}`}>72%</div>
                                                                            <div className="text-[9px] font-bold text-gray-500">Predicted</div>
                                                                        </div>
                                                                        <ArrowRight size={14} className="text-gray-400" />
                                                                        <div className="text-center">
                                                                            <div className={`text-xl font-black ${gradeColor}`}>{score}%</div>
                                                                            <div className="text-[9px] font-bold text-gray-500">Actual</div>
                                                                        </div>
                                                                    </div>
                                                                    <div className={`mt-2 text-xs font-black ${score >= 72 ? 'text-green-500' : 'text-red-500'}`}>
                                                                        {score >= 72 ? `+${score - 72}% Overperformance 🚀` : `${score - 72}% Underperformance`}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        {/* Core Metrics Grid */}
                                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                                            <div className={`p-4 rounded-2xl border ${darkMode ? 'bg-white/5 border-white/5' : 'bg-gray-50 border-gray-100'}`}>
                                                                <Target size={18} className="text-purple-500 mb-2" />
                                                                <div className="text-2xl font-black">{score}%</div>
                                                                <div className="text-[10px] font-black uppercase tracking-widest text-gray-500">Accuracy</div>
                                                            </div>
                                                            <div className={`p-4 rounded-2xl border ${darkMode ? 'bg-white/5 border-white/5' : 'bg-gray-50 border-gray-100'}`}>
                                                                <Zap size={18} className="text-yellow-500 mb-2" />
                                                                <div className="text-2xl font-black flex items-end gap-1">
                                                                    92 <span className="text-xs text-green-500 mb-1">+14%</span>
                                                                </div>
                                                                <div className="text-[10px] font-black uppercase tracking-widest text-gray-500">Speed Score</div>
                                                            </div>
                                                            <div className={`p-4 rounded-2xl border ${darkMode ? 'bg-white/5 border-white/5' : 'bg-gray-50 border-gray-100'}`}>
                                                                <Shield size={18} className="text-blue-500 mb-2" />
                                                                <div className="text-2xl font-black">High</div>
                                                                <div className="text-[10px] font-black uppercase tracking-widest text-gray-500">Confidence Index</div>
                                                            </div>
                                                            <div className={`p-4 rounded-2xl border ${darkMode ? 'bg-white/5 border-white/5' : 'bg-gray-50 border-gray-100'}`}>
                                                                <TrendingUp size={18} className="text-green-500 mb-2" />
                                                                <div className="text-2xl font-black text-green-500">+45</div>
                                                                <div className="text-[10px] font-black uppercase tracking-widest text-gray-500">Skill Graph XP</div>
                                                            </div>
                                                        </div>

                                                        {/* Weak Sub-Topics Analysis */}
                                                        <div>
                                                            <h5 className={`text-[10px] font-black uppercase tracking-widest mb-3 flex items-center gap-2 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                                                                <AlertTriangle size={12} className="text-orange-500" /> Weak Sub-topics Identified
                                                            </h5>
                                                            <div className="space-y-2">
                                                                {[
                                                                    { topic: 'Batching State Updates', mistake: 'Stale UI State Gap', impact: 'High Risk' },
                                                                    { topic: 'useReducer Optimization', mistake: 'Unnecessary renders', impact: 'Medium Risk' }
                                                                ].map((w, i) => (
                                                                    <div key={i} className={`p-3 rounded-xl border flex items-center justify-between ${darkMode ? 'bg-orange-500/5 border-orange-500/20' : 'bg-orange-50 border-orange-100'}`}>
                                                                        <div>
                                                                            <div className={`text-sm font-black ${darkMode ? 'text-orange-400' : 'text-orange-700'}`}>{w.topic}</div>
                                                                            <div className="text-[10px] font-bold text-orange-500/80">Common Mistake: {w.mistake}</div>
                                                                        </div>
                                                                        <div className="px-2 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest bg-orange-500 text-white">
                                                                            {w.impact}
                                                                        </div>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </div>

                                                        {/* Smart Action Buttons */}
                                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-4 border-t border-gray-200 dark:border-white/10">
                                                            <button onClick={resetQuiz} className={`py-4 rounded-2xl font-black border flex items-center justify-center gap-2 text-sm transition-all ${darkMode ? 'bg-white/5 border-white/10 text-white hover:bg-white/10' : 'bg-white border-gray-200 text-gray-700 hover:shadow-md'}`}>
                                                                <RefreshCw size={18} className="text-blue-500" /> Retry Smart Quiz
                                                            </button>
                                                            <button className={`py-4 rounded-2xl font-black border flex items-center justify-center gap-2 text-sm transition-all ${darkMode ? 'bg-orange-500/10 border-orange-500/30 text-orange-400 hover:bg-orange-500/20' : 'bg-orange-50 border-orange-200 text-orange-700 hover:shadow-md'}`}>
                                                                <BookOpen size={18} /> Revise Weak Areas
                                                            </button>
                                                            <button className="py-4 bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-500 hover:to-violet-500 text-white rounded-2xl font-black text-sm shadow-xl shadow-purple-500/20 flex items-center justify-center gap-2 transition-all active:scale-95">
                                                                <Rocket size={18} /> Start Advanced Smart Quiz
                                                            </button>
                                                            <button onClick={() => { setActiveModal('graph'); setAnalyticsView('hub'); }} className={`py-4 rounded-2xl font-black border flex items-center justify-center gap-2 text-sm transition-all ${darkMode ? 'bg-white/5 border-white/10 text-gray-300 hover:bg-white/10' : 'bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100'}`}>
                                                                <BarChart3 size={18} className="text-green-500" /> View Analytics
                                                            </button>
                                                        </div>
                                                    </motion.div>
                                                )
                                            })()}
                                        </AnimatePresence>
                                    </div>
                                )}


                                {activeModal === 'graph' && (
                                    <AnimatePresence mode="wait">
                                        {analyticsView === 'overview' ? (
                                            <motion.div key="graph-overview" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-8">
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
                                                <button
                                                    onClick={() => setAnalyticsView('hub')}
                                                    className="w-full py-4 rounded-2xl font-black flex items-center justify-center gap-3 text-white bg-gradient-to-r from-green-600 to-emerald-500 shadow-xl shadow-green-500/25 hover:shadow-green-500/40 hover:scale-[1.02] active:scale-95 transition-all"
                                                >
                                                    <BarChart3 size={20} /> 🔍 Enter Deep Analytics Hub
                                                </button>
                                            </motion.div>
                                        ) : (
                                            <motion.div key="analytics-hub" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} className="space-y-8">
                                                {/* Hub Header */}
                                                <div className="flex items-center justify-between">
                                                    <div>
                                                        <div className="text-[10px] font-black uppercase tracking-widest text-green-500 mb-1">🔍 Deep Analytics Hub</div>
                                                        <h4 className={`text-xl font-black ${darkMode ? 'text-white' : 'text-gray-900'}`}>Full Performance Breakdown</h4>
                                                    </div>
                                                    <button
                                                        onClick={() => setAnalyticsView('overview')}
                                                        className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-black border transition-all ${darkMode ? 'bg-white/5 border-white/10 text-gray-400 hover:text-white' : 'bg-gray-50 border-gray-200 text-gray-500 hover:text-gray-900'}`}
                                                    >
                                                        <ChevronLeft size={14} /> Back
                                                    </button>
                                                </div>

                                                {/* ── SECTION 1: Detailed Skill Breakdown ── */}
                                                <div className="space-y-4">
                                                    <div className="flex items-center gap-2">
                                                        <div className="w-6 h-6 rounded-lg bg-green-500 flex items-center justify-center text-white text-[10px] font-black">1</div>
                                                        <h5 className={`text-sm font-black uppercase tracking-widest ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Detailed Skill Breakdown</h5>
                                                    </div>
                                                    <div className="space-y-3">
                                                        {[
                                                            { label: 'Frontend', icon: Code, color: '#3b82f6', sub: [{ name: 'HTML', score: 85 }, { name: 'CSS', score: 72 }, { name: 'JS', score: 68 }, { name: 'React', score: 78 }], attempts: 142, trend: '+12%' },
                                                            { label: 'Backend', icon: Server, color: '#8b5cf6', sub: [{ name: 'Node.js', score: 55 }, { name: 'API Design', score: 60 }, { name: 'DB Handling', score: 48 }], attempts: 89, trend: '+8%' },
                                                            { label: 'Algorithms', icon: Cpu, color: '#f59e0b', sub: [{ name: 'Easy', score: 90 }, { name: 'Medium', score: 64 }, { name: 'Hard', score: 32 }], attempts: 210, trend: '+5%' },
                                                            { label: 'DevOps', icon: GitBranch, color: '#ef4444', sub: [{ name: 'CI/CD', score: 38 }, { name: 'Deployment', score: 45 }], attempts: 34, trend: '-2%' },
                                                            { label: 'System Design', icon: Layers, color: '#06b6d4', sub: [{ name: 'Architecture', score: 52 }], attempts: 28, trend: '+3%' },
                                                        ].map((skill, si) => (
                                                            <div key={si} className={`p-4 rounded-2xl border ${darkMode ? 'bg-white/5 border-white/5' : 'bg-gray-50 border-gray-100'}`}>
                                                                <div className="flex items-center justify-between mb-3">
                                                                    <div className="flex items-center gap-3">
                                                                        <div className="p-2 rounded-xl" style={{ backgroundColor: skill.color + '20' }}>
                                                                            <skill.icon size={16} style={{ color: skill.color }} />
                                                                        </div>
                                                                        <div>
                                                                            <div className={`font-black text-sm ${darkMode ? 'text-white' : 'text-gray-900'}`}>{skill.label}</div>
                                                                            <div className="text-[10px] font-bold text-gray-500">{skill.attempts} attempts • {skill.trend} trend</div>
                                                                        </div>
                                                                    </div>
                                                                    <div className={`text-xs font-black px-2 py-1 rounded-lg ${skill.trend.startsWith('+') ? 'text-green-500 bg-green-500/10' : 'text-red-500 bg-red-500/10'}`}>{skill.trend}</div>
                                                                </div>
                                                                <div className="grid grid-cols-2 gap-2">
                                                                    {skill.sub.map((s, i) => (
                                                                        <div key={i} className={`px-3 py-2 rounded-xl ${darkMode ? 'bg-white/5' : 'bg-white border border-gray-100'}`}>
                                                                            <div className="flex justify-between items-center mb-1">
                                                                                <span className="text-[10px] font-black text-gray-500">{s.name}</span>
                                                                                <span className="text-[10px] font-black" style={{ color: skill.color }}>{s.score}%</span>
                                                                            </div>
                                                                            <div className="w-full h-1.5 rounded-full bg-gray-500/15 overflow-hidden">
                                                                                <motion.div initial={{ width: 0 }} animate={{ width: `${s.score}%` }} transition={{ delay: si * 0.1 + i * 0.05, duration: 0.7 }} className="h-full rounded-full" style={{ backgroundColor: skill.color }} />
                                                                            </div>
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>

                                                {/* ── SECTION 2: Performance Timeline ── */}
                                                <div className="space-y-4">
                                                    <div className="flex items-center justify-between">
                                                        <div className="flex items-center gap-2">
                                                            <div className="w-6 h-6 rounded-lg bg-blue-500 flex items-center justify-center text-white text-[10px] font-black">2</div>
                                                            <h5 className={`text-sm font-black uppercase tracking-widest ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Performance Timeline</h5>
                                                        </div>
                                                        <div className={`flex p-1 rounded-xl gap-1 ${darkMode ? 'bg-white/5' : 'bg-gray-100'}`}>
                                                            {['7d', '30d'].map(t => (
                                                                <button key={t} onClick={() => setAnalyticsTimeline(t)}
                                                                    className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase transition-all ${analyticsTimeline === t ? 'bg-blue-500 text-white' : darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                                                                    {t === '7d' ? 'Last 7 Days' : 'Last 30 Days'}
                                                                </button>
                                                            ))}
                                                        </div>
                                                    </div>
                                                    <div className={`p-4 rounded-2xl border ${darkMode ? 'bg-white/5 border-white/5' : 'bg-gray-50 border-gray-100'}`}>
                                                        <ResponsiveContainer width="100%" height={160}>
                                                            <AreaChart data={analyticsTimeline === '7d' ?
                                                                [{ d: 'Mon', score: 65 }, { d: 'Tue', score: 72 }, { d: 'Wed', score: 68 }, { d: 'Thu', score: 80 }, { d: 'Fri', score: 75 }, { d: 'Sat', score: 88 }, { d: 'Sun', score: 84 }] :
                                                                [{ d: 'W1', score: 58 }, { d: 'W2', score: 65 }, { d: 'W3', score: 70 }, { d: 'W4', score: 84 }]
                                                            }>
                                                                <defs>
                                                                    <linearGradient id="tlGrad" x1="0" y1="0" x2="0" y2="1">
                                                                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4} />
                                                                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                                                                    </linearGradient>
                                                                </defs>
                                                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={darkMode ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.05)'} />
                                                                <XAxis dataKey="d" axisLine={false} tickLine={false} tick={{ fill: darkMode ? '#6b7280' : '#9ca3af', fontSize: 10 }} />
                                                                <Tooltip contentStyle={{ backgroundColor: darkMode ? '#1a222c' : '#fff', borderRadius: 10, border: 'none', fontSize: 11, fontWeight: 'bold' }} />
                                                                <Area type="monotone" dataKey="score" stroke="#3b82f6" strokeWidth={2.5} fillOpacity={1} fill="url(#tlGrad)" />
                                                            </AreaChart>
                                                        </ResponsiveContainer>
                                                        <div className="grid grid-cols-3 gap-3 mt-3">
                                                            <StatTiny label="Avg Score" value="76%" color="text-blue-500" darkMode={darkMode} />
                                                            <StatTiny label="Peak Day" value="Sat" color="text-green-500" darkMode={darkMode} />
                                                            <StatTiny label="Quiz Trend" value="↑ 18%" color="text-purple-500" darkMode={darkMode} />
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* ── SECTION 3: Weakness Intelligence ── */}
                                                <div className="space-y-4">
                                                    <div className="flex items-center gap-2">
                                                        <div className="w-6 h-6 rounded-lg bg-red-500 flex items-center justify-center text-white text-[10px] font-black">3</div>
                                                        <h5 className={`text-sm font-black uppercase tracking-widest ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Weakness Intelligence</h5>
                                                    </div>
                                                    <div className={`p-4 rounded-2xl border ${darkMode ? 'bg-red-500/5 border-red-500/10' : 'bg-red-50 border-red-100'}`}>
                                                        <div className="flex items-center gap-2 mb-3">
                                                            <Brain size={14} className="text-red-500" />
                                                            <span className="text-[10px] font-black uppercase tracking-widest text-red-500">AI Detected Weaknesses</span>
                                                        </div>
                                                        <div className="space-y-2">
                                                            {[
                                                                { label: 'Recursion accuracy', value: '42%', icon: '❌', issue: 'Repeated mistakes' },
                                                                { label: 'CI/CD concepts', value: '38%', icon: '❌', issue: 'Low confidence' },
                                                                { label: 'Binary Search time', value: 'High', icon: '❌', issue: 'Slow solving' },
                                                                { label: 'Async/Await patterns', value: '51%', icon: '⚠️', issue: 'Inconsistent' },
                                                                { label: 'System Design depth', value: '44%', icon: '⚠️', issue: 'Low confidence' },
                                                            ].map((w, i) => (
                                                                <div key={i} className={`flex items-center justify-between p-3 rounded-xl ${darkMode ? 'bg-white/5' : 'bg-white'}`}>
                                                                    <div className="flex items-center gap-3">
                                                                        <span className="text-sm">{w.icon}</span>
                                                                        <div>
                                                                            <div className={`text-xs font-black ${darkMode ? 'text-white' : 'text-gray-900'}`}>{w.label}</div>
                                                                            <div className="text-[10px] font-bold text-gray-500">{w.issue}</div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="text-xs font-black text-red-500">{w.value}</div>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* ── SECTION 4: Recommendation Engine ── */}
                                                <div className="space-y-4">
                                                    <div className="flex items-center gap-2">
                                                        <div className="w-6 h-6 rounded-lg bg-yellow-500 flex items-center justify-center text-white text-[10px] font-black">4</div>
                                                        <h5 className={`text-sm font-black uppercase tracking-widest ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Recommendation Engine</h5>
                                                    </div>
                                                    <div className="grid grid-cols-2 gap-3">
                                                        {[
                                                            { icon: BookOpen, label: 'Suggested Lesson', value: 'Advanced Recursion Patterns', color: '#f59e0b', bg: 'bg-yellow-500' },
                                                            { icon: Target, label: 'Practice Set', value: 'Binary Search × 20 Problems', color: '#ef4444', bg: 'bg-red-500' },
                                                            { icon: Users, label: 'Peer Session', value: 'CI/CD Expert Group · 3 online', color: '#8b5cf6', bg: 'bg-purple-500' },
                                                            { icon: Brain, label: 'Adaptive Quiz Level', value: 'Medium → Hard Transition', color: '#3b82f6', bg: 'bg-blue-500' },
                                                        ].map((rec, i) => (
                                                            <div key={i} className={`p-4 rounded-2xl border cursor-pointer hover:scale-[1.02] transition-all ${darkMode ? 'bg-white/5 border-white/5 hover:border-white/20' : 'bg-white border-gray-100 hover:shadow-md'}`}>
                                                                <div className={`w-8 h-8 rounded-xl ${rec.bg} flex items-center justify-center mb-3`}>
                                                                    <rec.icon size={16} className="text-white" />
                                                                </div>
                                                                <div className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-1">{rec.label}</div>
                                                                <div className={`text-xs font-black leading-tight ${darkMode ? 'text-white' : 'text-gray-900'}`}>{rec.value}</div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>

                                                {/* ── SECTION 5: Competitive Analysis ── */}
                                                <div className="space-y-4">
                                                    <div className="flex items-center gap-2">
                                                        <div className="w-6 h-6 rounded-lg bg-purple-500 flex items-center justify-center text-white text-[10px] font-black">5</div>
                                                        <h5 className={`text-sm font-black uppercase tracking-widest ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Competitive Analysis</h5>
                                                    </div>
                                                    <div className={`p-5 rounded-2xl border ${darkMode ? 'bg-white/5 border-white/5' : 'bg-gray-50 border-gray-100'}`}>
                                                        <div className="grid grid-cols-3 gap-4 mb-4">
                                                            <div className="text-center">
                                                                <div className="text-2xl font-black text-purple-500">#7</div>
                                                                <div className="text-[10px] font-black uppercase text-gray-500">Batch Rank</div>
                                                            </div>
                                                            <div className="text-center">
                                                                <div className="text-2xl font-black text-green-500">Top 15%</div>
                                                                <div className="text-[10px] font-black uppercase text-gray-500">Percentile</div>
                                                            </div>
                                                            <div className="text-center">
                                                                <div className="text-2xl font-black text-yellow-500">🥇</div>
                                                                <div className="text-[10px] font-black uppercase text-gray-500">Leaderboard</div>
                                                            </div>
                                                        </div>
                                                        <div className={`p-3 rounded-xl ${darkMode ? 'bg-white/5' : 'bg-white'}`}>
                                                            <div className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-2">Your Score vs Batch Avg</div>
                                                            <div className="space-y-2">
                                                                <div className="flex items-center gap-3">
                                                                    <span className="text-[10px] font-black text-green-500 w-12">You</span>
                                                                    <div className="flex-1 h-2 rounded-full bg-gray-500/10 overflow-hidden">
                                                                        <motion.div initial={{ width: 0 }} animate={{ width: '76%' }} transition={{ duration: 0.8 }} className="h-full bg-green-500 rounded-full" />
                                                                    </div>
                                                                    <span className="text-[10px] font-black text-gray-400">76%</span>
                                                                </div>
                                                                <div className="flex items-center gap-3">
                                                                    <span className="text-[10px] font-black text-gray-500 w-12">Avg</span>
                                                                    <div className="flex-1 h-2 rounded-full bg-gray-500/10 overflow-hidden">
                                                                        <motion.div initial={{ width: 0 }} animate={{ width: '61%' }} transition={{ duration: 0.8, delay: 0.2 }} className="h-full bg-gray-400 rounded-full" />
                                                                    </div>
                                                                    <span className="text-[10px] font-black text-gray-400">61%</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* ── SECTION 6: Confidence Meter ── */}
                                                <div className="space-y-4">
                                                    <div className="flex items-center gap-2">
                                                        <div className="w-6 h-6 rounded-lg bg-cyan-500 flex items-center justify-center text-white text-[10px] font-black">6</div>
                                                        <h5 className={`text-sm font-black uppercase tracking-widest ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Confidence Meter</h5>
                                                    </div>
                                                    <div className="grid grid-cols-3 gap-3">
                                                        {[
                                                            { label: 'Speed vs Accuracy', icon: Gauge, value: 72, color: '#06b6d4', desc: 'Balanced' },
                                                            { label: 'Risk-Taking', icon: Zap, value: 58, color: '#f59e0b', desc: 'Moderate' },
                                                            { label: 'Improvement Velocity', icon: TrendingUp, value: 84, color: '#22c55e', desc: 'High' },
                                                        ].map((meter, i) => (
                                                            <div key={i} className={`p-4 rounded-2xl border text-center ${darkMode ? 'bg-white/5 border-white/5' : 'bg-gray-50 border-gray-100'}`}>
                                                                <div className="relative w-14 h-14 mx-auto mb-2">
                                                                    <svg viewBox="0 0 36 36" className="w-14 h-14 -rotate-90">
                                                                        <circle cx="18" cy="18" r="15" fill="none" strokeWidth="3" stroke={darkMode ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'} />
                                                                        <motion.circle cx="18" cy="18" r="15" fill="none" strokeWidth="3" stroke={meter.color}
                                                                            strokeDasharray={`${meter.value * 0.94} 94`}
                                                                            strokeLinecap="round"
                                                                            initial={{ strokeDasharray: '0 94' }}
                                                                            animate={{ strokeDasharray: `${meter.value * 0.94} 94` }}
                                                                            transition={{ duration: 0.9, delay: i * 0.15 }}
                                                                        />
                                                                    </svg>
                                                                    <div className="absolute inset-0 flex items-center justify-center">
                                                                        <meter.icon size={14} style={{ color: meter.color }} />
                                                                    </div>
                                                                </div>
                                                                <div className="text-base font-black" style={{ color: meter.color }}>{meter.value}%</div>
                                                                <div className="text-[10px] font-black text-gray-500 mt-0.5">{meter.label}</div>
                                                                <div className={`text-[9px] font-bold mt-1 px-2 py-0.5 rounded-full inline-block`} style={{ backgroundColor: meter.color + '20', color: meter.color }}>{meter.desc}</div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>

                                                {/* ── SECTION 7: Smart Action Buttons ── */}
                                                <div className="space-y-4">
                                                    <div className="flex items-center gap-2">
                                                        <div className="w-6 h-6 rounded-lg bg-orange-500 flex items-center justify-center text-white text-[10px] font-black">7</div>
                                                        <h5 className={`text-sm font-black uppercase tracking-widest ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Smart Action Buttons</h5>
                                                    </div>
                                                    <div className="grid grid-cols-2 gap-3">
                                                        <button className="flex items-center gap-3 p-4 rounded-2xl bg-red-500/10 border border-red-500/20 hover:bg-red-500 hover:text-white text-red-500 font-black text-sm transition-all active:scale-95 group">
                                                            <RefreshCw size={18} className="group-hover:animate-spin" />
                                                            <div className="text-left">
                                                                <div className="text-xs font-black">🔁 Retry Weak Topics</div>
                                                                <div className="text-[10px] font-bold opacity-60">5 topics pending</div>
                                                            </div>
                                                        </button>
                                                        <button className="flex items-center gap-3 p-4 rounded-2xl bg-blue-500/10 border border-blue-500/20 hover:bg-blue-500 hover:text-white text-blue-500 font-black text-sm transition-all active:scale-95">
                                                            <Target size={18} />
                                                            <div className="text-left">
                                                                <div className="text-xs font-black">🚀 Targeted Practice</div>
                                                                <div className="text-[10px] font-bold opacity-60">AI-curated set</div>
                                                            </div>
                                                        </button>
                                                        <button className="flex items-center gap-3 p-4 rounded-2xl bg-purple-500/10 border border-purple-500/20 hover:bg-purple-500 hover:text-white text-purple-500 font-black text-sm transition-all active:scale-95">
                                                            <Users size={18} />
                                                            <div className="text-left">
                                                                <div className="text-xs font-black">🤝 Expert Peer Session</div>
                                                                <div className="text-[10px] font-bold opacity-60">3 experts online</div>
                                                            </div>
                                                        </button>
                                                        <button className="flex items-center gap-3 p-4 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600 text-white font-black text-sm shadow-lg shadow-green-500/20 transition-all active:scale-95 hover:shadow-green-500/40 hover:scale-[1.02]">
                                                            <Brain size={18} />
                                                            <div className="text-left">
                                                                <div className="text-xs font-black">🧠 Advanced Adaptive Mode</div>
                                                                <div className="text-[10px] font-bold opacity-80">Launch hard mode</div>
                                                            </div>
                                                        </button>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
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
                                                    <button onClick={() => setPeerView('room')} className="px-5 py-2 bg-orange-500 text-white rounded-xl text-xs font-black shadow-lg shadow-orange-500/20 active:scale-95 transition-all">Join Room</button>
                                                </div>
                                                <div className={`p-5 rounded-3xl border flex items-center justify-between opacity-60 ${darkMode ? 'bg-white/5 border-white/5' : 'bg-gray-50 border-gray-100'}`}>
                                                    <div className="flex items-center gap-4">
                                                        <div className="w-12 h-12 bg-gray-500 text-white rounded-2xl flex items-center justify-center font-black">CS</div>
                                                        <div>
                                                            <h5 className={`font-black ${darkMode ? 'text-white' : 'text-gray-900'}`}>Algo Mock Interview</h5>
                                                            <p className="text-xs font-bold text-gray-500">Will start in 25 mins</p>
                                                        </div>
                                                    </div>
                                                    <button onClick={() => setPeerView('reminder')} className={`px-5 py-2 rounded-xl text-xs font-black border ${darkMode ? 'border-white/10 text-gray-400' : 'border-gray-200 text-gray-500'}`}>Set Reminder</button>
                                                </div>
                                            </div>
                                        </div>

                                        <button onClick={() => setPeerView('create')} className="w-full py-5 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-2xl font-black text-lg shadow-xl shadow-orange-500/20 active:scale-95 transition-all">
                                            Create Live Session +
                                        </button>
                                    </div>
                                )}

                                {activeModal === 'peer' && peerView === 'room' && (
                                    <div className="space-y-6 animate-in fade-in zoom-in-95 duration-500">
                                        {/* Real-time Collaboration Room UI */}
                                        <div className="flex justify-between items-center bg-orange-500/10 p-4 rounded-2xl border border-orange-500/20">
                                            <div className="flex items-center gap-3">
                                                <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                                                <h4 className="font-black text-orange-500">JS Closures Deep Dive</h4>
                                            </div>
                                            <div className="flex items-center gap-4">
                                                <div className="flex -space-x-2">
                                                    {[1, 2, 3, 4].map(i => (
                                                        <div key={i} className="w-6 h-6 rounded-full border-2 border-[#1a222c] bg-gray-600 flex items-center justify-center text-[8px] font-bold text-white">U{i}</div>
                                                    ))}
                                                    <div className="w-6 h-6 rounded-full border-2 border-[#1a222c] bg-orange-500 flex items-center justify-center text-[8px] font-bold text-white">+4</div>
                                                </div>
                                                <div className="text-xs font-black opacity-60 flex items-center gap-1">
                                                    <Clock size={12} /> 42:15
                                                </div>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-12 gap-4">
                                            {/* Video Grid & Whiteboard Area */}
                                            <div className="col-span-8 space-y-4">
                                                <div className="grid grid-cols-2 gap-3">
                                                    {[
                                                        { name: 'Alex (You)', active: true, color: 'bg-blue-500' },
                                                        { name: 'Sarah M.', active: true, color: 'bg-purple-500' },
                                                        { name: 'Jordan K.', active: false, color: 'bg-green-500' },
                                                        { name: 'Priya S.', active: true, color: 'bg-yellow-500' }
                                                    ].map((p, i) => (
                                                        <div key={i} className={`aspect-video rounded-3xl relative overflow-hidden bg-gray-800 border-2 ${p.active ? 'border-orange-500/40' : 'border-transparent'}`}>
                                                            <div className="absolute inset-0 flex items-center justify-center">
                                                                <div className={`w-16 h-16 ${p.color} rounded-full flex items-center justify-center text-white text-xl font-black`}>
                                                                    {p.name[0]}
                                                                </div>
                                                            </div>
                                                            <div className="absolute bottom-3 left-3 bg-black/40 backdrop-blur-md px-3 py-1 rounded-lg text-[10px] font-black text-white flex items-center gap-2">
                                                                {p.name}
                                                                {!p.active && <MicOff size={10} className="text-red-500" />}
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>

                                                <div className={`p-6 rounded-[2rem] border min-h-[200px] flex flex-col items-center justify-center gap-4 group cursor-crosshair transition-all ${darkMode ? 'bg-white/5 border-white/5' : 'bg-gray-50 border-gray-100'}`}>
                                                    <Edit3 size={32} className="text-gray-500 group-hover:text-orange-500 transition-colors" />
                                                    <p className="text-xs font-bold text-gray-400">Collaborative Whiteboard Active</p>
                                                    <button className="px-4 py-2 bg-orange-500/10 text-orange-500 rounded-xl text-[10px] font-black uppercase tracking-widest border border-orange-500/20">Open Fullscreen Whiteboard</button>
                                                </div>
                                            </div>

                                            {/* Sidebar: Chat & Polls */}
                                            <div className="col-span-4 flex flex-col gap-4">
                                                <div className={`flex-1 rounded-[2.5rem] border p-5 flex flex-col ${darkMode ? 'bg-white/5 border-white/5' : 'bg-gray-50 border-gray-100'}`}>
                                                    <div className="flex items-center gap-2 mb-4">
                                                        <MessageSquare size={14} className="text-orange-500" />
                                                        <span className="text-[10px] font-black uppercase tracking-widest text-gray-500">Group Chat</span>
                                                    </div>
                                                    <div className="flex-1 space-y-3 overflow-y-auto max-h-[150px] mb-4 scrollbar-hide">
                                                        <div className="bg-orange-500/10 p-3 rounded-2xl rounded-tl-none border border-orange-500/10">
                                                            <p className="text-[10px] font-bold text-orange-500 mb-1">Sarah M.</p>
                                                            <p className="text-[11px] font-medium text-gray-400">Can someone explain the execution context here again?</p>
                                                        </div>
                                                        <div className="bg-white/5 p-3 rounded-2xl rounded-tl-none border border-white/5">
                                                            <p className="text-[10px] font-bold text-gray-400 mb-1">Jordan K.</p>
                                                            <p className="text-[11px] font-medium text-gray-400">Look at the call stack!</p>
                                                        </div>
                                                    </div>
                                                    <div className="relative mt-auto">
                                                        <input type="text" placeholder="Type message..." className="w-full bg-white/5 border border-white/10 rounded-xl py-2 px-4 text-xs font-medium focus:outline-none focus:border-orange-500/50" />
                                                        <button className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 text-orange-500 hover:scale-110 transition-all"><Send size={14} /></button>
                                                    </div>
                                                </div>

                                                <div className={`p-5 rounded-[2rem] border animate-pulse ${darkMode ? 'bg-orange-500/5 border-orange-500/10' : 'bg-orange-50 border-orange-100'}`}>
                                                    <div className="flex items-center gap-2 mb-2">
                                                        <BarChart2 size={14} className="text-orange-500" />
                                                        <span className="text-[10px] font-black uppercase tracking-widest text-orange-500">Live Poll Active</span>
                                                    </div>
                                                    <p className="text-xs font-black text-gray-300 leading-tight">Does this closure have access to global scope?</p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Bottom Controls */}
                                        <div className="flex items-center justify-between pt-4 border-t border-white/5">
                                            <button onClick={() => setPeerView('list')} className="px-6 py-3 bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white rounded-2xl text-xs font-black transition-all flex items-center gap-2">
                                                <Phone size={14} /> Leave Session
                                            </button>
                                            <div className="flex items-center gap-3">
                                                {[
                                                    { icon: Mic, label: 'Mute' },
                                                    { icon: Video, label: 'Cam' },
                                                    { icon: Monitor, label: 'Share' },
                                                    { icon: Hand, label: 'Raise' }
                                                ].map((ctrl, i) => (
                                                    <button key={i} className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${darkMode ? 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white' : 'bg-gray-100 text-gray-600 hover:bg-white hover:shadow-lg'}`}>
                                                        <ctrl.icon size={20} />
                                                    </button>
                                                ))}
                                            </div>
                                            <button className={`p-3 rounded-2xl ${darkMode ? 'bg-white/5 text-gray-400' : 'bg-gray-100 text-gray-600'}`}>
                                                <Settings size={20} />
                                            </button>
                                        </div>
                                    </div>
                                )}

                                {activeModal === 'peer' && peerView === 'reminder' && (
                                    <div className="space-y-8 py-4 animate-in fade-in slide-in-from-bottom-6 duration-500">
                                        <div className="text-center space-y-3">
                                            <div className="w-16 h-16 bg-blue-500 text-white rounded-[2rem] flex items-center justify-center mx-auto shadow-xl shadow-blue-500/20 rotate-12">
                                                <Bell size={32} />
                                            </div>
                                            <h4 className={`text-2xl font-black ${darkMode ? 'text-white' : 'text-gray-900'}`}>Never Miss a Session</h4>
                                            <p className="text-sm font-bold text-gray-500">Select when we should nudge you about <span className="text-blue-500">Algo Mock Interview</span>.</p>
                                        </div>

                                        <div className="grid grid-cols-1 gap-3">
                                            {[
                                                { id: 10, label: '10 mins before', desc: 'Just enough to grab a coffee' },
                                                { id: 30, label: '30 mins before', desc: 'Perfect for a quick revision' },
                                                { id: 60, label: '1 hour before', desc: 'Full preparation mode' }
                                            ].map(opt => (
                                                <button key={opt.id} onClick={() => setReminderSet(true)} className={`p-5 rounded-[2rem] border flex items-center justify-between group transition-all ${darkMode ? 'bg-white/5 border-white/5 hover:bg-blue-500/10 hover:border-blue-500/20' : 'bg-gray-50 border-gray-100 hover:bg-white hover:shadow-lg'}`}>
                                                    <div className="flex items-center gap-4">
                                                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${darkMode ? 'bg-white/5 text-blue-500' : 'bg-blue-100 text-blue-600'}`}>
                                                            <Clock size={20} />
                                                        </div>
                                                        <div className="text-left">
                                                            <div className={`font-black uppercase tracking-widest text-[10px] text-blue-500 mb-1`}>{opt.label}</div>
                                                            <div className={`font-bold text-xs ${darkMode ? 'text-gray-300' : 'text-gray-900'}`}>{opt.desc}</div>
                                                        </div>
                                                    </div>
                                                    <ArrowRight size={18} className="text-gray-500 group-hover:translate-x-1 transition-all" />
                                                </button>
                                            ))}
                                        </div>

                                        <div className="grid grid-cols-2 gap-3">
                                            <button className={`p-4 rounded-2xl border flex items-center justify-center gap-2 text-xs font-black transition-all ${darkMode ? 'bg-white/5 border-white/5 hover:border-blue-500/30 text-gray-300' : 'bg-gray-50 border-gray-100 hover:shadow-md'}`}>
                                                <Calendar size={16} className="text-red-500" /> Google Calendar
                                            </button>
                                            <button className={`p-4 rounded-2xl border flex items-center justify-center gap-2 text-xs font-black transition-all ${darkMode ? 'bg-white/5 border-white/5 hover:border-blue-500/30 text-gray-300' : 'bg-gray-50 border-gray-100 hover:shadow-md'}`}>
                                                <Phone size={16} className="text-green-500" /> WhatsApp Alert
                                            </button>
                                        </div>

                                        <div className="flex gap-3">
                                            <button onClick={() => setPeerView('list')} className={`flex-1 py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all ${darkMode ? 'bg-white/5 text-gray-500' : 'bg-gray-100 text-gray-400'}`}>
                                                Cancel
                                            </button>
                                            <button onClick={() => { setReminderSet(true); setTimeout(() => setPeerView('list'), 1000); }} className={`flex-[2] py-4 bg-blue-500 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-blue-500/20 active:scale-95 transition-all flex items-center justify-center gap-2`}>
                                                {reminderSet ? <><CheckCircle2 size={16} /> Reminder Set ✔</> : 'Enable Notifications'}
                                            </button>
                                        </div>
                                    </div>
                                )}

                                {activeModal === 'peer' && peerView === 'create' && (
                                    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-10 duration-700">
                                        <div className="grid grid-cols-2 gap-8">
                                            <div className="space-y-5">
                                                <div className="space-y-2">
                                                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-1 flex items-center gap-2">
                                                        <Edit3 size={12} className="text-orange-500" /> Session Title
                                                    </label>
                                                    <input type="text" placeholder="e.g., React Hooks Deep Dive"
                                                        value={createSessionForm.title} onChange={e => setCreateSessionForm({ ...createSessionForm, title: e.target.value })}
                                                        className={`w-full p-4 rounded-2xl border focus:outline-none focus:ring-2 focus:ring-orange-500/50 font-bold transition-all ${darkMode ? 'bg-white/5 border-white/10 text-white placeholder:text-gray-600' : 'bg-gray-50 border-gray-100 text-gray-900'}`} />
                                                </div>

                                                <div className="grid grid-cols-2 gap-4">
                                                    <div className="space-y-2">
                                                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-1">📚 Category</label>
                                                        <select value={createSessionForm.category} onChange={e => setCreateSessionForm({ ...createSessionForm, category: e.target.value })}
                                                            className={`w-full p-4 rounded-2xl border focus:outline-none font-bold appearance-none transition-all ${darkMode ? 'bg-white/5 border-white/10 text-white' : 'bg-gray-50 border-gray-100'}`}>
                                                            <option>Frontend</option><option>Backend</option><option>Algo</option>
                                                        </select>
                                                    </div>
                                                    <div className="space-y-2">
                                                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-1">🧑🏫 Host Role</label>
                                                        <select value={createSessionForm.hostRole} onChange={e => setCreateSessionForm({ ...createSessionForm, hostRole: e.target.value })}
                                                            className={`w-full p-4 rounded-2xl border focus:outline-none font-bold appearance-none transition-all ${darkMode ? 'bg-white/5 border-white/10 text-white' : 'bg-gray-50 border-gray-100'}`}>
                                                            <option>Discussion</option><option>Mock Interview</option><option>Doubt Solving</option>
                                                        </select>
                                                    </div>
                                                </div>

                                                <div className="grid grid-cols-2 gap-4">
                                                    <div className="space-y-2">
                                                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-1 flex items-center gap-2"><Calendar size={12} /> Date</label>
                                                        <input type="date" value={createSessionForm.date} onChange={e => setCreateSessionForm({ ...createSessionForm, date: e.target.value })}
                                                            className={`w-full p-4 rounded-2xl border focus:outline-none font-bold transition-all ${darkMode ? 'bg-white/5 border-white/10 text-white' : 'bg-gray-50 border-gray-100'}`} />
                                                    </div>
                                                    <div className="space-y-2">
                                                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-1 flex items-center gap-2"><Clock size={12} /> Time</label>
                                                        <input type="time" value={createSessionForm.time} onChange={e => setCreateSessionForm({ ...createSessionForm, time: e.target.value })}
                                                            className={`w-full p-4 rounded-2xl border focus:outline-none font-bold transition-all ${darkMode ? 'bg-white/5 border-white/10 text-white' : 'bg-gray-50 border-gray-100'}`} />
                                                    </div>
                                                </div>

                                                <div className="space-y-2">
                                                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-1">👥 Max Participants: {createSessionForm.maxParticipants}</label>
                                                    <input type="range" min="2" max="25" value={createSessionForm.maxParticipants} onChange={e => setCreateSessionForm({ ...createSessionForm, maxParticipants: parseInt(e.target.value) })}
                                                        className="w-full accent-orange-500 h-2 bg-gray-500/10 rounded-full appearance-none cursor-pointer" />
                                                </div>
                                            </div>

                                            <div className="space-y-5">
                                                <div className="space-y-2">
                                                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-1">🧾 Description</label>
                                                    <textarea placeholder="What's this session about?" rows={4}
                                                        value={createSessionForm.description} onChange={e => setCreateSessionForm({ ...createSessionForm, description: e.target.value })}
                                                        className={`w-full p-4 rounded-2xl border focus:outline-none focus:ring-2 focus:ring-orange-500/50 font-bold resize-none transition-all ${darkMode ? 'bg-white/5 border-white/10 text-white placeholder:text-gray-600' : 'bg-gray-50 border-gray-100 text-gray-900'}`} />
                                                </div>

                                                <div className="space-y-4">
                                                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-1 flex items-center justify-between">
                                                        <span>Advanced Options</span>
                                                        <Settings size={12} className="text-gray-500" />
                                                    </label>
                                                    <div className="grid grid-cols-2 gap-3">
                                                        {[
                                                            { id: 'whiteboard', label: 'Whiteboard', icon: Edit3 },
                                                            { id: 'recording', label: 'Recording', icon: Video },
                                                            { id: 'approval', label: 'Approval Required', icon: Shield },
                                                            { id: 'public', label: 'Public Room', icon: Globe }
                                                        ].map(opt => (
                                                            <button key={opt.id}
                                                                onClick={() => setCreateSessionForm(c => ({ ...c, advanced: { ...c.advanced, [opt.id]: !c.advanced[opt.id] } }))}
                                                                className={`p-3 rounded-xl border flex items-center gap-3 transition-all ${createSessionForm.advanced[opt.id] ? 'bg-orange-500/10 border-orange-500/40 text-orange-500' : 'bg-white/5 border-white/10 text-gray-500'}`}>
                                                                <opt.icon size={14} />
                                                                <span className="text-[10px] font-black uppercase tracking-widest">{opt.label}</span>
                                                            </button>
                                                        ))}
                                                    </div>
                                                </div>

                                                <div className="flex gap-3 pt-2">
                                                    <button onClick={() => setPeerView('list')} className={`flex-1 py-5 rounded-2xl font-black text-xs uppercase tracking-widest transition-all ${darkMode ? 'bg-white/5 text-gray-500' : 'bg-gray-100 text-gray-400'}`}>
                                                        Back
                                                    </button>
                                                    <button onClick={() => { /* Submit Logic */ setPeerView('list'); }} className="flex-[2] py-5 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-orange-500/20 active:scale-95 transition-all">
                                                        Launch Session 🚀
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {activeModal === 'practice' && (
                                    <div className="space-y-8 min-h-[400px]">
                                        <AnimatePresence mode="wait">
                                            {practicePhase === 'drill' && (
                                                <motion.div key="drill" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="space-y-6">
                                                    {selectedWeakTopic === 'Recursion' ? (
                                                        <div className="space-y-6">
                                                            {/* 🔥 Recursion Drill Mode Design */}
                                                            <div className={`p-6 rounded-[2.5rem] border ${darkMode ? 'bg-red-500/5 border-red-500/10' : 'bg-red-50 border-red-100'}`}>
                                                                {/* Header */}
                                                                <div className="flex justify-between items-start mb-6">
                                                                    <div className="flex items-center gap-3">
                                                                        <div className="p-3 bg-red-500 rounded-2xl text-white shadow-lg shadow-red-500/20"><Flame size={24} /></div>
                                                                        <div>
                                                                            <h4 className={`text-2xl font-black ${darkMode ? 'text-white' : 'text-gray-900'}`}>Recursion Drill Mode</h4>
                                                                            <p className="text-xs font-bold text-red-500/70 uppercase tracking-widest">Mastering Recursive Thinking</p>
                                                                        </div>
                                                                    </div>
                                                                    {practiceTimedChallenge && (
                                                                        <div className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-xl text-sm font-black animate-pulse">
                                                                            <Clock size={16} /> {Math.floor(practiceTimeLeft / 60)}:{(practiceTimeLeft % 60).toString().padStart(2, '0')}
                                                                        </div>
                                                                    )}
                                                                </div>

                                                                {/* 🔹 Focused Practice Set */}
                                                                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
                                                                    {[
                                                                        { label: 'Base Case Detection', icon: Target },
                                                                        { label: 'Stack Behavior', icon: Layers },
                                                                        { label: 'Tail Recursion', icon: Zap },
                                                                        { label: 'Recursive Trees', icon: GitBranch }
                                                                    ].map((item, i) => (
                                                                        <button key={i} className={`p-4 rounded-2xl border flex flex-col items-center gap-3 transition-all hover:scale-105 ${darkMode ? 'bg-white/5 border-white/10 hover:bg-white/10' : 'bg-white border-gray-200 hover:shadow-md'}`}>
                                                                            <item.icon size={20} className="text-red-500" />
                                                                            <span className="text-[10px] font-black uppercase text-center leading-tight">{item.label}</span>
                                                                        </button>
                                                                    ))}
                                                                </div>

                                                                {/* 🔹 Step-by-step Debug View */}
                                                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                                                    <div className={`p-6 rounded-3xl border ${darkMode ? 'bg-black/40 border-white/5' : 'bg-gray-50 border-gray-100'}`}>
                                                                        <div className="flex items-center gap-2 mb-4">
                                                                            <MonitorPlay size={18} className="text-blue-500" />
                                                                            <h5 className="text-xs font-black uppercase tracking-widest">Call Stack Visualization</h5>
                                                                        </div>
                                                                        <div className="space-y-2 flex flex-col-reverse">
                                                                            {recursionDebugData.stack.map((call, i) => (
                                                                                <motion.div
                                                                                    key={i}
                                                                                    initial={{ opacity: 0, x: -20 }}
                                                                                    animate={{ opacity: 1, x: 0 }}
                                                                                    className={`p-3 rounded-xl border text-xs font-mono font-bold ${i === recursionDebugData.stack.length - 1 ? 'bg-blue-500 text-white border-blue-400 shadow-lg' : 'bg-white/5 border-white/5 opacity-60'}`}
                                                                                >
                                                                                    {call}
                                                                                </motion.div>
                                                                            ))}
                                                                        </div>
                                                                    </div>

                                                                    <div className={`p-6 rounded-3xl border ${darkMode ? 'bg-black/40 border-white/5' : 'bg-gray-50 border-gray-100'}`}>
                                                                        <div className="flex items-center gap-2 mb-4">
                                                                            <Activity size={18} className="text-green-500" />
                                                                            <h5 className="text-xs font-black uppercase tracking-widest">Variable Tracking</h5>
                                                                        </div>
                                                                        <div className="space-y-4">
                                                                            <div className="grid grid-cols-2 gap-4">
                                                                                {Object.entries(recursionDebugData.vars).map(([key, val]) => (
                                                                                    <div key={key} className="p-3 rounded-xl bg-black/20 border border-white/5">
                                                                                        <div className="text-[10px] uppercase font-black text-gray-500 mb-1">{key}</div>
                                                                                        <div className="text-lg font-mono font-black text-blue-400">{val}</div>
                                                                                    </div>
                                                                                ))}
                                                                            </div>
                                                                            <div className={`p-3 rounded-xl border border-dashed flex justify-between items-center ${darkMode ? 'border-white/10' : 'border-gray-200'}`}>
                                                                                <span className="text-[10px] font-black uppercase text-gray-500">Depth Counter</span>
                                                                                <span className="text-xl font-black text-orange-500">{recursionDebugData.depth}</span>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>

                                                                {/* 🔹 Mistake Detector */}
                                                                <div className="mt-6 p-5 rounded-3xl bg-orange-500/10 border border-orange-500/20">
                                                                    <div className="flex items-center gap-3 mb-3">
                                                                        <Brain size={20} className="text-orange-500" />
                                                                        <h5 className="text-sm font-black text-orange-500 uppercase">AI Mistake Detector</h5>
                                                                    </div>
                                                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                                                        {[
                                                                            { label: 'Missing Base Case', status: 'At Risk', color: 'text-red-500' },
                                                                            { label: 'Infinite Recursion', status: 'Likely', color: 'text-orange-500' },
                                                                            { label: 'Wrong Return Logic', status: 'Detected', color: 'text-yellow-500' }
                                                                        ].map((issue, i) => (
                                                                            <div key={i} className="p-3 rounded-2xl bg-black/20 border border-white/5">
                                                                                <div className="text-[10px] font-bold text-gray-500">{issue.label}</div>
                                                                                <div className={`text-xs font-black uppercase ${issue.color}`}>{issue.status}</div>
                                                                            </div>
                                                                        ))}
                                                                    </div>
                                                                </div>

                                                                {/* 🔹 Timed Challenge Mode */}
                                                                <div className="mt-6 flex flex-col md:flex-row gap-4">
                                                                    <button
                                                                        onClick={() => { setPracticeTimedChallenge(true); setPracticeTimeLeft(600); }}
                                                                        className="flex-1 py-4 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-2xl font-black text-lg shadow-xl shadow-red-500/20 transition-all hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-3"
                                                                    >
                                                                        <Zap size={24} /> 10 MIN SPEED DRILL
                                                                    </button>
                                                                    <button className="flex-1 py-4 bg-blue-500 text-white rounded-2xl font-black text-lg shadow-xl shadow-blue-500/20 transition-all hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-3">
                                                                        <TrendingUp size={24} /> ACCURACY BOOST
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ) : (
                                                        <div className={`p-6 rounded-[2.5rem] border ${darkMode ? 'bg-red-500/5 border-red-500/10' : 'bg-red-50 border-red-100'}`}>
                                                            <div className="flex items-center gap-3 mb-4">
                                                                <div className="p-2 bg-red-500 rounded-xl text-white"><Target size={20} /></div>
                                                                <div>
                                                                    <h4 className={`text-xl font-black ${darkMode ? 'text-white' : 'text-gray-900'}`}>Active Drill: {selectedWeakTopic || 'Recursion Depth'}</h4>
                                                                    <p className="text-xs font-bold text-red-500/70 uppercase tracking-widest">Focus: Pattern Recognition</p>
                                                                </div>
                                                            </div>
                                                            <div className={`p-5 rounded-2xl ${darkMode ? 'bg-black/20' : 'bg-white'} border border-red-500/10 mb-6`}>
                                                                <p className={`text-sm font-bold leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                                                    Analyze the following recursive function. What is the base case to prevent an infinite loop?
                                                                </p>
                                                                <pre className={`mt-4 p-4 rounded-xl text-xs font-mono ${darkMode ? 'bg-black/40 text-blue-400' : 'bg-gray-100 text-blue-600'}`}>
                                                                    {`function factorial(n) {\n  // Missing code here\n  return n * factorial(n - 1);\n}`}
                                                                </pre>
                                                            </div>
                                                            <div className="grid grid-cols-1 gap-2">
                                                                {['if (n === 0) return 1', 'if (n === 1) return n', 'if (n < 0) return 0', 'if (n > 100) return'].map((opt, i) => (
                                                                    <button key={i} onClick={() => setPracticePhase('report')} className={`p-4 rounded-xl border text-left text-xs font-black transition-all hover:scale-[1.02] ${darkMode ? 'bg-white/5 border-white/5 hover:bg-white/10 text-gray-300' : 'bg-white border-gray-100 hover:shadow-md text-gray-700'}`}>
                                                                        {opt}
                                                                    </button>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    )}
                                                </motion.div>
                                            )}

                                            {practicePhase === 'report' && (
                                                <motion.div key="report" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6">
                                                    <div className={`p-8 rounded-[2.5rem] border text-center relative overflow-hidden ${darkMode ? 'bg-gradient-to-br from-green-500/20 to-transparent border-green-400/20' : 'bg-green-50 border-green-200'}`}>
                                                        <div className="flex flex-col items-center">
                                                            <div className="w-20 h-20 bg-green-500 rounded-3xl flex items-center justify-center text-white mb-4 shadow-xl shadow-green-500/20">
                                                                <Award size={40} />
                                                            </div>
                                                            <h4 className={`text-2xl font-black ${darkMode ? 'text-white' : 'text-gray-900'}`}>Concept Mastered!</h4>
                                                            <p className="text-sm font-bold text-gray-500">Recursion Depth accuracy increased to 88%</p>
                                                        </div>
                                                    </div>
                                                    <div className="grid grid-cols-2 gap-4">
                                                        <div className={`p-4 rounded-2xl border ${darkMode ? 'bg-white/5 border-white/5' : 'bg-gray-50 border-gray-100'}`}>
                                                            <div className="text-[10px] font-black uppercase text-gray-500 mb-1">XP Earned</div>
                                                            <div className="text-xl font-black text-blue-500">+120 XP</div>
                                                        </div>
                                                        <div className={`p-4 rounded-2xl border ${darkMode ? 'bg-white/5 border-white/5' : 'bg-gray-50 border-gray-100'}`}>
                                                            <div className="text-[10px] font-black uppercase text-gray-500 mb-1">Time Spent</div>
                                                            <div className="text-xl font-black text-orange-500">4m 12s</div>
                                                        </div>
                                                    </div>
                                                    <button onClick={() => { setActiveModal(null); setPracticePhase('drill'); }} className="w-full py-5 bg-blue-500 text-white rounded-2xl font-black text-lg shadow-xl shadow-blue-500/20 active:scale-95 transition-all">
                                                        Back to Dashboard
                                                    </button>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>

                                        {practicePhase !== 'drill' && practicePhase !== 'report' && (
                                            <div className="space-y-8 animate-in fade-in duration-500">
                                                {/* 1. Weak Topic Detection Panel */}
                                                <div className="space-y-4">
                                                    <h4 className={`text-sm font-black uppercase tracking-widest flex items-center gap-2 ${darkMode ? 'text-red-400' : 'text-red-500'}`}>
                                                        <AlertTriangle size={16} /> Identified Weak Areas
                                                    </h4>
                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                        {[
                                                            { title: 'Recursion', stat: 'Accuracy 42%', meta: 'Avg 4m 12s • 3 mistakes/session', icon: GitBranch, color: 'text-orange-500 bg-orange-500/10 border-orange-500/20' },
                                                            { title: 'CI/CD Pipeline', stat: 'Concept Clarity Low', meta: 'Last Attempt: 2 days ago', icon: Server, color: 'text-red-500 bg-red-500/10 border-red-500/20' },
                                                            { title: 'Binary Search', stat: 'Slow Execution Time', meta: 'Logic Gap spotted', icon: Database, color: 'text-blue-500 bg-blue-500/10 border-blue-500/20' },
                                                            { title: 'System Design Basics', stat: 'Low Confidence', meta: '5 related mistakes', icon: Layers, color: 'text-purple-500 bg-purple-500/10 border-purple-500/20' }
                                                        ].map((topic, i) => (
                                                            <div key={i}
                                                                onClick={() => { setPracticePhase('drill'); setSelectedWeakTopic(topic.title); }}
                                                                className={`p-5 rounded-3xl border flex flex-col gap-3 transition-all ${darkMode ? 'bg-white/5 border-white/5' : 'bg-gray-50 border-gray-100'} hover:scale-[1.02] cursor-pointer hover:border-red-500/30`}>
                                                                <div className="flex items-center gap-4">
                                                                    <div className={`p-3 rounded-2xl border ${topic.color}`}>
                                                                        <topic.icon size={20} />
                                                                    </div>
                                                                    <div>
                                                                        <h5 className={`font-black ${darkMode ? 'text-white' : 'text-gray-900'}`}>{topic.title}</h5>
                                                                        <div className={`text-[10px] font-black uppercase tracking-widest ${topic.color.split(' ')[0]}`}>{topic.stat}</div>
                                                                    </div>
                                                                </div>
                                                                <div className="bg-black/5 dark:bg-white/5 p-3 rounded-xl text-xs font-bold text-gray-500 flex justify-between items-center">
                                                                    <span>{topic.meta}</span>
                                                                    <ArrowRight size={14} className="opacity-50" />
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>

                                                {/* 2. Targeted Practice Sets */}
                                                <div className={`p-8 rounded-[2.5rem] border relative overflow-hidden ${darkMode ? 'bg-gradient-to-br from-[#1a222c] to-[#121820] border-white/5' : 'bg-gradient-to-br from-white to-gray-50 border-gray-100 shadow-2xl shadow-gray-200/50'}`}>
                                                    <div className="absolute top-0 right-0 w-64 h-64 bg-red-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                                                    <div className="relative z-10 space-y-6">
                                                        <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-4">
                                                            <div>
                                                                <h4 className={`text-xl font-black mb-1 flex items-center gap-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                                                                    <Target size={20} className="text-red-500" /> Targeted Practice Sets
                                                                </h4>
                                                                <p className="text-sm font-bold text-gray-500">5-10 curated real interview problems.</p>
                                                            </div>
                                                            <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/20 text-red-500 px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest w-fit">
                                                                <Flame size={14} /> Recursion Focus
                                                            </div>
                                                        </div>

                                                        <div className="flex gap-4">
                                                            {['Easy', 'Medium', 'Hard'].map((lvl, i) => (
                                                                <div key={i} className={`flex-1 p-4 rounded-2xl border text-center transition-all ${i === 0 ? (darkMode ? 'bg-red-500/20 border-red-500/40 ring-1 ring-red-500/50' : 'bg-red-50 border-red-200 shadow-sm ring-1 ring-red-500/50') : (darkMode ? 'bg-white/5 border-white/5 opacity-60' : 'bg-gray-50 border-gray-100 opacity-60')}`}>
                                                                    <div className={`text-[10px] font-black uppercase tracking-widest mb-1 ${i === 0 ? 'text-red-500' : 'text-gray-500'}`}>{lvl}</div>
                                                                    <div className={`text-xs md:text-sm font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{i === 0 ? 'Concept Refresher' : 'Locked'}</div>
                                                                </div>
                                                            ))}
                                                        </div>

                                                        <button
                                                            onClick={() => { setPracticePhase('drill'); setSelectedWeakTopic('Recursion'); }}
                                                            className="w-full py-5 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-2xl font-black text-lg shadow-xl shadow-red-500/30 active:scale-95 transition-all flex justify-center items-center gap-2"
                                                        >
                                                            Start Focus Practice <Rocket size={20} />
                                                        </button>
                                                    </div>
                                                </div>

                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                                    {/* 3. Mistake Analysis Section */}
                                                    <div className="space-y-4">
                                                        <h4 className={`text-sm font-black uppercase tracking-widest flex items-center gap-2 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                                                            <Brain size={16} /> Mistake Analysis
                                                        </h4>
                                                        <div className={`p-6 rounded-[2rem] border h-full ${darkMode ? 'bg-[#1a222c] border-white/5' : 'bg-white border-gray-100 shadow-xl shadow-gray-200/40'}`}>
                                                            <div className="bg-red-500/10 border border-red-500/20 p-4 rounded-2xl mb-4">
                                                                <div className="text-[10px] font-black uppercase tracking-widest text-red-500 mb-1">❌ Common Mistake Type</div>
                                                                <div className={`font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Missing Base Case / Logic Gap</div>
                                                            </div>
                                                            <div className="space-y-3">
                                                                <div className={`p-4 rounded-xl border ${darkMode ? 'bg-white/5 border-white/5 text-gray-300' : 'bg-gray-50 border-gray-100 text-gray-700'} text-xs font-medium font-mono leading-relaxed`}>
                                                                    <span className="text-red-500 font-bold">-</span> if (n == 0) return;<br />
                                                                    <span className="text-green-500 font-bold">+</span> if (n &#60;= 1) return 1;
                                                                </div>
                                                                <button className={`w-full py-3 border rounded-xl text-xs font-black uppercase tracking-widest transition-all ${darkMode ? 'bg-white/5 border-white/10 text-gray-400 hover:text-white hover:bg-white/10' : 'bg-gray-50 border-gray-200 text-gray-500 hover:text-gray-900 hover:bg-gray-100'}`}>
                                                                    Review Past Answers →
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {/* 4. Speed vs Accuracy Training */}
                                                    <div className="space-y-4">
                                                        <h4 className={`text-sm font-black uppercase tracking-widest flex items-center gap-2 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                                                            <Gauge size={16} /> Speed vs Accuracy
                                                        </h4>
                                                        <div className={`p-6 rounded-[2rem] border h-full ${darkMode ? 'bg-[#1a222c] border-white/5' : 'bg-white border-gray-100 shadow-xl shadow-gray-200/40'}`}>
                                                            <div className="flex justify-between items-center mb-6">
                                                                <div className="space-y-1">
                                                                    <div className="text-3xl font-black text-blue-500">+14%</div>
                                                                    <div className="text-[10px] font-black uppercase tracking-widest text-gray-500">Improvement</div>
                                                                </div>
                                                                <div className="w-24 h-12 bg-blue-500/10 rounded-full overflow-hidden flex items-end px-2 pb-1 gap-1">
                                                                    {[40, 60, 45, 80, 75, 90].map((h, i) => (
                                                                        <div key={i} className="w-full bg-blue-500 rounded-t-sm" style={{ height: `${h}%` }} />
                                                                    ))}
                                                                </div>
                                                            </div>
                                                            <div className="grid grid-cols-2 gap-3 mt-auto">
                                                                <button className={`p-4 rounded-xl border text-center transition-all ${darkMode ? 'bg-white/5 border-white/5 hover:bg-white/10 hover:border-green-500/50' : 'bg-gray-50 border-gray-100 hover:shadow-md hover:border-green-500/50'}`}>
                                                                    <Target size={20} className="mx-auto text-green-500 mb-2" />
                                                                    <div className={`text-[10px] font-black uppercase tracking-widest ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Accuracy First</div>
                                                                </button>
                                                                <button className={`p-4 rounded-xl border text-center transition-all ${darkMode ? 'bg-white/5 border-white/5 hover:bg-white/10 hover:border-orange-500/50' : 'bg-gray-50 border-gray-100 hover:shadow-md hover:border-orange-500/50'}`}>
                                                                    <Zap size={20} className="mx-auto text-orange-500 mb-2" />
                                                                    <div className={`text-[10px] font-black uppercase tracking-widest ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Speed Drill</div>
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                                    {/* 5. Micro Learning Boosters */}
                                                    <div className="space-y-4">
                                                        <h4 className={`text-sm font-black uppercase tracking-widest flex items-center gap-2 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                                                            <Sparkles size={16} /> Micro Learning Boosters
                                                        </h4>
                                                        <div className="grid grid-flow-col auto-cols-[85%] md:auto-cols-[45%] gap-4 overflow-x-auto pb-4 scrollbar-hide snap-x">
                                                            {[
                                                                { title: '3 Min Masterclass', desc: 'Visualizing Call Stacks', icon: Play, color: 'text-purple-500 bg-purple-500/10 border-purple-500/20' },
                                                                { title: '5 Concept Cards', desc: 'Swipe through basics', icon: Layers, color: 'text-blue-500 bg-blue-500/10 border-blue-500/20' },
                                                                { title: 'Cheat Sheet', desc: 'Download PDF notes', icon: FileText, color: 'text-green-500 bg-green-500/10 border-green-500/20' }
                                                            ].map((item, i) => (
                                                                <div key={i} className={`p-5 rounded-3xl border flex flex-col justify-between snap-start cursor-pointer transition-all hover:scale-[1.02] ${darkMode ? 'bg-[#1a222c] border-white/5' : 'bg-white border-gray-100 shadow-xl shadow-gray-200/40'}`}>
                                                                    <div className={`w-10 h-10 rounded-xl border flex items-center justify-center mb-4 ${item.color}`}>
                                                                        <item.icon size={20} />
                                                                    </div>
                                                                    <div>
                                                                        <h5 className={`font-black mb-1 text-sm ${darkMode ? 'text-white' : 'text-gray-900'}`}>{item.title}</h5>
                                                                        <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500">{item.desc}</p>
                                                                    </div>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>

                                                    {/* 6. Confidence Meter */}
                                                    <div className="space-y-4">
                                                        <h4 className={`text-sm font-black uppercase tracking-widest flex items-center gap-2 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                                                            <TrendingUp size={16} /> Confidence Meter
                                                        </h4>
                                                        <div className={`p-6 rounded-[2rem] border ${darkMode ? 'bg-[#1a222c] border-white/5' : 'bg-white border-gray-100 shadow-xl shadow-gray-200/40'} flex flex-col justify-center h-[168px]`}>
                                                            <div className="flex justify-between items-end mb-4">
                                                                <div>
                                                                    <div className="text-4xl font-black text-green-500">68%</div>
                                                                    <div className="text-[10px] font-black uppercase tracking-widest text-gray-500">Topic Mastery</div>
                                                                </div>
                                                                <div className="px-3 py-1.5 bg-green-500/10 border border-green-500/20 text-green-500 rounded-xl text-xs font-black uppercase tracking-widest">
                                                                    Growing 🚀
                                                                </div>
                                                            </div>
                                                            <div className="w-full h-3 bg-gray-500/20 rounded-full overflow-hidden relative">
                                                                <div className="absolute left-0 top-0 h-full bg-orange-500/30 w-[42%]" />
                                                                <div className="absolute left-0 top-0 h-full bg-gradient-to-r from-orange-500 to-green-500 w-[68%] transition-all duration-1000" />
                                                            </div>
                                                            <div className="flex justify-between mt-3 text-[10px] font-black uppercase tracking-widest text-gray-500">
                                                                <span>Prev: 42%</span>
                                                                <span>Goal: 90% (Advanced Ready)</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* 7. Smart Actions */}
                                                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                                    {[
                                                        { label: 'Retry Incorrect', icon: RefreshCw, color: 'text-orange-500 bg-orange-500/10 border-orange-500/20' },
                                                        { label: 'Revise Concept', icon: BookOpen, color: 'text-blue-500 bg-blue-500/10 border-blue-500/20' },
                                                        { label: 'Adaptive Mode', icon: Brain, color: 'text-purple-500 bg-purple-500/10 border-purple-500/20' },
                                                        { label: 'Join Peer Session', icon: Users2, color: 'text-green-500 bg-green-500/10 border-green-500/20' }
                                                    ].map((action, i) => (
                                                        <button key={i} className={`p-4 rounded-2xl border flex flex-col items-center justify-center gap-3 transition-all active:scale-95 group ${darkMode ? 'bg-white/5 border-white/5 hover:bg-white/10' : 'bg-gray-50 border-gray-100 hover:shadow-md hover:bg-white'}`}>
                                                            <div className={`p-3 rounded-xl border transition-all ${action.color} group-hover:scale-110`}>
                                                                <action.icon size={20} />
                                                            </div>
                                                            <span className={`text-[10px] font-black uppercase tracking-widest text-center ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                                                {action.label}
                                                            </span>
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                )}


                                {activeModal === 'recommendation' && (
                                    <div className="space-y-0 min-h-[500px]">
                                        <AnimatePresence mode="wait">
                                            {recommendationView === 'trees' && (
                                                <motion.div key="trees" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="space-y-6">
                                                    <div className={`p-6 rounded-[2.5rem] border ${darkMode ? 'bg-blue-500/5 border-blue-500/10' : 'bg-blue-50 border-blue-100'}`}>
                                                        <div className="flex items-center gap-3 mb-6">
                                                            <div className="p-2 bg-blue-500 rounded-xl text-white"><BookOpen size={20} /></div>
                                                            <div>
                                                                <h4 className={`text-xl font-black ${darkMode ? 'text-white' : 'text-gray-900'}`}>Smart Revision Hub: Trees</h4>
                                                                <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">Personalized Focus Area</p>
                                                            </div>
                                                        </div>

                                                        {/* Tree Simulator */}
                                                        <div className={`p-6 rounded-3xl mb-6 relative overflow-hidden ${darkMode ? 'bg-black/30' : 'bg-white shadow-sm'} border border-blue-500/10`}>
                                                            <div className="flex justify-between items-center mb-6">
                                                                <span className="text-[10px] font-black uppercase text-blue-500 tracking-widest">Visual Tree Simulator</span>
                                                                <div className="flex gap-2">
                                                                    {['Insert', 'Traverse', 'Delete'].map(act => (
                                                                        <button key={act} onClick={() => setTreeSimStep(prev => (prev + 1) % 3)} className={`px-3 py-1 rounded-lg text-[10px] font-black border transition-all ${darkMode ? 'bg-white/5 border-white/10 text-gray-400 hover:text-white' : 'bg-gray-50 border-gray-200 text-gray-500'}`}>{act}</button>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                            <div className="h-40 w-full flex items-center justify-center relative">
                                                                {/* Simple SVG Tree Representation */}
                                                                <svg width="200" height="120" viewBox="0 0 200 120">
                                                                    <motion.line x1="100" y1="20" x2="60" y2="60" stroke="#3b82f6" strokeWidth="2" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} />
                                                                    <motion.line x1="100" y1="20" x2="140" y2="60" stroke="#3b82f6" strokeWidth="2" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} />
                                                                    <motion.circle cx="100" cy="20" r="12" fill={treeSimStep === 0 ? "#3b82f6" : "#1a222c"} stroke="#58a6ff" strokeWidth="2" whileHover={{ scale: 1.2 }} />
                                                                    <motion.circle cx="60" cy="60" r="12" fill={treeSimStep === 1 ? "#3b82f6" : "#1a222c"} stroke="#58a6ff" strokeWidth="2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} />
                                                                    <motion.circle cx="140" cy="60" r="12" fill={treeSimStep === 2 ? "#3b82f6" : "#1a222c"} stroke="#58a6ff" strokeWidth="2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} />
                                                                    <text x="100" y="24" fontSize="8" textAnchor="middle" fill="white" fontWeight="bold">15</text>
                                                                    <text x="60" y="64" fontSize="8" textAnchor="middle" fill="white" fontWeight="bold">8</text>
                                                                    <text x="140" y="64" fontSize="8" textAnchor="middle" fill="white" fontWeight="bold">24</text>
                                                                </svg>
                                                                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute bottom-0 text-[9px] font-bold text-gray-500">
                                                                    {treeSimStep === 0 ? "Inserting node 15 (Root)" : treeSimStep === 1 ? "In-order traversal: 8 -> 15" : "Tree height: 2 units"}
                                                                </motion.div>
                                                            </div>
                                                        </div>

                                                        <div className="grid grid-cols-2 gap-4 mb-6">
                                                            <div className={`p-4 rounded-2xl border ${darkMode ? 'bg-white/5 border-white/5' : 'bg-gray-50 border-gray-100'}`}>
                                                                <div className="text-[10px] font-black uppercase text-red-500 mb-2">Common Mistake</div>
                                                                <p className="text-[11px] font-bold text-gray-500">Confusing Tree Height vs Depth. Height starts from bottom (0), Depth from Root (0).</p>
                                                            </div>
                                                            <div className={`p-4 rounded-2xl border ${darkMode ? 'bg-white/5 border-white/5' : 'bg-gray-50 border-gray-100'}`}>
                                                                <div className="text-[10px] font-black uppercase text-green-500 mb-2">Interview Hack</div>
                                                                <p className="text-[11px] font-bold text-gray-500">BST Search: O(log N) average, but O(N) if skewed. Always mention Balancing.</p>
                                                            </div>
                                                        </div>

                                                        <button onClick={() => { setActiveModal(null); setSkillAccuracy(prev => Math.min(100, prev + 5)); }} className="w-full py-5 bg-blue-600 text-white rounded-2xl font-black text-lg shadow-xl shadow-blue-500/30 active:scale-95 transition-all flex items-center justify-center gap-3">
                                                            🚀 Start Tree Practice <Rocket size={20} />
                                                        </button>
                                                    </div>
                                                </motion.div>
                                            )}

                                            {recommendationView === 'recursion' && (
                                                <motion.div key="recursion" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                                                    <div className={`p-6 rounded-[2.5rem] border ${darkMode ? 'bg-purple-500/5 border-purple-500/10' : 'bg-purple-50 border-purple-100'}`}>
                                                        <div className="flex items-center gap-3 mb-6">
                                                            <div className="p-2 bg-purple-500 rounded-xl text-white"><Zap size={20} /></div>
                                                            <div>
                                                                <h4 className={`text-xl font-black ${darkMode ? 'text-white' : 'text-gray-900'}`}>Recursion Drill Mode</h4>
                                                                <p className="text-xs font-bold text-purple-500 uppercase tracking-widest">AI Mistake Detector Active</p>
                                                            </div>
                                                        </div>

                                                        {/* Debug Visualizer */}
                                                        <div className={`p-6 rounded-3xl border ${darkMode ? 'bg-black/40 border-purple-500/20' : 'bg-white border-purple-200'} mb-6`}>
                                                            <div className="flex justify-between items-center mb-4">
                                                                <span className="text-[10px] font-black uppercase text-purple-500 tracking-widest">Call Stack Debugger</span>
                                                                <span className="text-[10px] font-black text-gray-500 uppercase">Depth: {recursionDebugStep}/4</span>
                                                            </div>
                                                            <div className="flex flex-col-reverse gap-2 min-h-[140px] justify-start transition-all">
                                                                {Array.from({ length: recursionDebugStep + 1 }).map((_, i) => (
                                                                    <motion.div key={i} initial={{ opacity: 0, scale: 0.9, y: 10 }} animate={{ opacity: 1, scale: 1, y: 0 }} className={`p-2 rounded-lg border text-[10px] font-bold font-mono transition-all ${i === recursionDebugStep ? 'bg-purple-500 text-white border-purple-400' : 'bg-gray-500/10 text-gray-500 border-gray-500/10'}`}>
                                                                        factorial({4 - i}) {i === 4 ? "-> return 1" : ""}
                                                                    </motion.div>
                                                                ))}
                                                                {recursionDebugStep < 4 && (
                                                                    <button onClick={() => setRecursionDebugStep(s => s + 1)} className={`p-4 rounded-xl border border-dashed border-purple-500/30 flex items-center justify-center text-purple-500/50 hover:bg-purple-500/5 transition-all`}>
                                                                        <Plus size={16} /> <span className="text-[10px] font-black uppercase ml-2">Next Recursive Call</span>
                                                                    </button>
                                                                )}
                                                            </div>
                                                        </div>

                                                        <div className={`p-4 rounded-2xl bg-orange-500/10 border border-orange-500/20 mb-6 flex items-start gap-3`}>
                                                            <AlertCircle size={18} className="text-orange-500 mt-1 flex-shrink-0" />
                                                            <div>
                                                                <div className="text-xs font-black text-orange-500 uppercase mb-1">AI Detection: Infinite Recursion Risk</div>
                                                                <p className="text-[11px] font-bold text-gray-500">Your logic currently lacks a base case for n &#60;= 1. Add this to prevent Stack Overflow.</p>
                                                            </div>
                                                        </div>

                                                        <div className="grid grid-cols-2 gap-3">
                                                            <button onClick={() => setRecursionDebugStep(0)} className={`py-4 rounded-xl font-black text-xs uppercase border transition-all ${darkMode ? 'bg-white/5 border-white/5 text-gray-500' : 'bg-gray-100 border-gray-200 text-gray-500'}`}>Reset Stack</button>
                                                            <button onClick={() => setActiveModal(null)} className="py-4 bg-purple-500 text-white rounded-xl font-black text-xs uppercase shadow-lg shadow-purple-500/20 active:scale-95 transition-all">Finish Drill</button>
                                                        </div>
                                                    </div>
                                                </motion.div>
                                            )}

                                            {recommendationView === 'roadmap' && (
                                                <div className="relative min-h-[600px]">
                                                    <motion.div key="roadmap" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                                                        {/* 🎯 Full AI Roadmap Dashboard Header */}
                                                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                                            <div>
                                                                <h4 className={`text-3xl font-black ${darkMode ? 'text-white' : 'text-gray-900'}`}>Full AI Roadmap Dashboard</h4>
                                                                <p className="text-sm font-bold text-gray-500">Mastery Path based on 42 recent data points</p>
                                                            </div>
                                                            <div className="flex items-center gap-3">
                                                                <div className="px-4 py-2 bg-green-500/10 border border-green-500/20 text-green-500 rounded-2xl text-sm font-black uppercase tracking-widest flex items-center gap-2">
                                                                    <CheckCircle2 size={16} /> 68% Confidence
                                                                </div>
                                                                <div className="px-4 py-2 bg-blue-500/10 border border-blue-500/20 text-blue-500 rounded-2xl text-sm font-black uppercase tracking-widest flex items-center gap-2">
                                                                    <TrendingUp size={16} /> +12% Trend
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                                                            {/* 🔹 Weak Concepts */}
                                                            <div className={`p-6 rounded-[2.5rem] border ${darkMode ? 'bg-[#1a222c] border-white/5' : 'bg-gray-50 border-gray-100'}`}>
                                                                <h5 className="text-xs font-black uppercase text-gray-500 mb-6 tracking-widest flex items-center gap-2">
                                                                    <AlertTriangle size={16} className="text-red-500" /> Weak Concepts
                                                                </h5>
                                                                <div className="space-y-5">
                                                                    {[
                                                                        { label: 'Trees', mastery: 62, color: 'bg-red-500' },
                                                                        { label: 'Recursion', mastery: 45, color: 'bg-orange-500' },
                                                                        { label: 'CI/CD', mastery: 38, color: 'bg-red-600' },
                                                                        { label: 'System Design basics', mastery: 52, color: 'bg-yellow-500' }
                                                                    ].map((item, i) => (
                                                                        <div key={i} className="space-y-2">
                                                                            <div className="flex justify-between text-xs font-bold">
                                                                                <span className={darkMode ? 'text-gray-300' : 'text-gray-700'}>{item.label}</span>
                                                                                <span className="text-red-500">{item.mastery}% Mastery</span>
                                                                            </div>
                                                                            <div className="w-full h-2 bg-black/20 rounded-full overflow-hidden">
                                                                                <motion.div initial={{ width: 0 }} animate={{ width: `${item.mastery}%` }} className={`h-full ${item.color}`} />
                                                                            </div>
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            </div>

                                                            {/* 🔹 Skill Improvement Suggestions */}
                                                            <div className={`p-6 rounded-[2.5rem] border ${darkMode ? 'bg-[#1a222c] border-white/5' : 'bg-gray-50 border-gray-100'}`}>
                                                                <h5 className="text-xs font-black uppercase text-gray-500 mb-6 tracking-widest flex items-center gap-2">
                                                                    <Sparkles size={16} className="text-blue-500" /> Skill Improvements
                                                                </h5>
                                                                <div className="space-y-4">
                                                                    {[
                                                                        { label: 'Increase speed in Algorithms', icon: Cpu, improvement: '+18% Speed' },
                                                                        { label: 'Improve backend API structuring', icon: Server, improvement: 'Logic Gap' },
                                                                        { label: 'Practice DevOps deployment flow', icon: Globe, improvement: '+25% Clarity' }
                                                                    ].map((s, i) => (
                                                                        <div key={i} className="flex items-center justify-between p-4 rounded-2xl bg-black/20 border border-white/5 group hover:border-blue-500/30 transition-all cursor-pointer">
                                                                            <div className="flex items-center gap-3">
                                                                                <s.icon size={18} className="text-blue-500" />
                                                                                <span className={`text-[11px] font-black leading-tight ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{s.label}</span>
                                                                            </div>
                                                                            <span className="text-[10px] font-black text-green-500 shrink-0">{s.improvement}</span>
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            </div>

                                                            {/* 📊 Extra Smart Features */}
                                                            <div className={`p-6 rounded-[2.5rem] border ${darkMode ? 'bg-[#1a222c] border-white/5' : 'bg-gray-50 border-gray-100'}`}>
                                                                <h5 className="text-xs font-black uppercase text-gray-500 mb-6 tracking-widest flex items-center gap-2">
                                                                    <BarChartIcon size={16} className="text-purple-500" /> Mastery Intel
                                                                </h5>
                                                                <div className="space-y-6">
                                                                    <div className="p-4 rounded-2xl bg-purple-500/10 border border-purple-500/20">
                                                                        <div className="text-[10px] font-black uppercase text-purple-500 mb-1">Suggested Next Milestone</div>
                                                                        <div className="text-sm font-black text-white flex items-center gap-2">
                                                                            <Award size={16} className="text-yellow-500" /> Advanced Ready
                                                                        </div>
                                                                    </div>
                                                                    <div className="grid grid-cols-2 gap-4">
                                                                        <div className="p-4 rounded-2xl bg-black/20 border border-white/5">
                                                                            <div className="text-[10px] font-black uppercase text-gray-500 mb-1">Est. Mastery Time</div>
                                                                            <div className="text-xl font-black text-blue-400">3h 12m</div>
                                                                        </div>
                                                                        <div className="p-4 rounded-2xl bg-black/20 border border-white/5">
                                                                            <div className="text-[10px] font-black uppercase text-gray-500 mb-1">Improvement Trend</div>
                                                                            <div className="text-xl font-black text-green-500">+14.2%</div>
                                                                        </div>
                                                                    </div>
                                                                    <button
                                                                        onClick={() => setRoadmapSubView('commit')}
                                                                        className="w-full py-4 bg-white text-blue-600 rounded-2xl text-xs font-black uppercase tracking-widest shadow-xl shadow-black/10 hover:scale-[1.02] active:scale-95 transition-all"
                                                                    >
                                                                        Lock Next Target
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        {/* 🔹 Smart Actions */}
                                                        <div className="space-y-4">
                                                            <h5 className="text-xs font-black uppercase text-gray-500 tracking-widest flex items-center gap-2">
                                                                <Target size={16} className="text-green-500" /> Smart Actions
                                                            </h5>
                                                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                                                {[
                                                                    { label: 'Join Peer Session: Trees', icon: Users2, color: 'text-green-500 hover:bg-green-500/10 hover:border-green-500/30', view: 'peer_room' },
                                                                    { label: 'Adaptive Quiz: Recursion', icon: Brain, color: 'text-purple-500 hover:bg-purple-500/10 hover:border-purple-500/30', view: 'recursive_quiz' },
                                                                    { label: 'Watch Concept Booster', icon: MonitorPlay, color: 'text-blue-500 hover:bg-blue-500/10 hover:border-blue-500/30', view: 'booster' },
                                                                    { label: '3 Real Interview Problems', icon: FileText, color: 'text-orange-500 hover:bg-orange-500/10 hover:border-orange-500/30', view: 'interview_sim' }
                                                                ].map((action, i) => (
                                                                    <button
                                                                        key={i}
                                                                        onClick={() => setRoadmapSubView(action.view)}
                                                                        className={`p-6 rounded-3xl border flex flex-col items-center gap-4 transition-all ${darkMode ? 'bg-[#1a222c] border-white/5' : 'bg-white border-gray-100 shadow-sm'} ${action.color}`}
                                                                    >
                                                                        <action.icon size={28} />
                                                                        <span className="text-[11px] font-black uppercase text-center leading-tight">{action.label}</span>
                                                                    </button>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    </motion.div>

                                                    {/* 🚀 AI Roadmap Interactive Sub-Views */}
                                                    <AnimatePresence mode="wait">
                                                        {(roadmapSubView && roadmapSubView !== 'hub') && (
                                                            <motion.div
                                                                initial={{ opacity: 0 }}
                                                                animate={{ opacity: 1 }}
                                                                exit={{ opacity: 0 }}
                                                                className="absolute inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 md:p-12 overflow-y-auto"
                                                            >
                                                                <button
                                                                    onClick={() => setRoadmapSubView('hub')}
                                                                    className="absolute top-6 right-6 p-3 bg-white/10 rounded-full text-white hover:bg-white/20 transition-all z-[60]"
                                                                >
                                                                    <X size={24} />
                                                                </button>

                                                                {/* 🔒 1. Target Commitment Panel */}
                                                                {roadmapSubView === 'commit' && (
                                                                    <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} className={`w-full max-w-2xl p-8 rounded-[3rem] border ${darkMode ? 'bg-[#1a222c] border-white/10' : 'bg-white border-gray-100'} shadow-2xl relative overflow-hidden`}>
                                                                        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                                                                        <div className="relative z-10 space-y-8">
                                                                            <div className="text-center">
                                                                                <div className="w-20 h-20 bg-blue-500 rounded-3xl flex items-center justify-center text-white mx-auto mb-4 shadow-xl shadow-blue-500/20"><Target size={40} /></div>
                                                                                <h4 className={`text-3xl font-black ${darkMode ? 'text-white' : 'text-gray-900'}`}>Target Commitment</h4>
                                                                                <p className="text-sm font-bold text-gray-500">Lock your milestone to activate streak tracking</p>
                                                                            </div>
                                                                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                                                                {[{ label: 'Topic', val: 'Trees', color: 'text-blue-500' }, { label: 'Current', val: '62%', color: 'text-orange-500' }, { label: 'Target', val: '75%', color: 'text-green-500' }, { label: 'Est. Time', val: '3h 12m', color: 'text-purple-500' }].map((stat, i) => (
                                                                                    <div key={i} className={`p-4 rounded-2xl border ${darkMode ? 'bg-white/5 border-white/5' : 'bg-gray-50 border-gray-100'}`}>
                                                                                        <div className="text-[10px] font-black uppercase text-gray-500 mb-1">{stat.label}</div>
                                                                                        <div className={`text-lg font-black ${stat.color}`}>{stat.val}</div>
                                                                                    </div>
                                                                                ))}
                                                                            </div>
                                                                            <div className="space-y-4">
                                                                                <h5 className="text-xs font-black uppercase text-gray-500 tracking-widest text-center">Select Your Plan</h5>
                                                                                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                                                                    {[{ title: 'Daily 30 min', meta: 'Consistent growth', icon: Clock }, { title: '3-day Sprint', meta: 'Quick Level-up', icon: FastForward }, { title: '7-day Mastery', meta: 'Deep Learning', icon: Brain }].map((plan, i) => (
                                                                                        <button key={i} className={`p-4 rounded-2xl border text-left transition-all hover:scale-105 ${darkMode ? 'bg-white/5 border-white/5 hover:bg-blue-500/10 hover:border-blue-500/30' : 'bg-white border-gray-100 hover:shadow-lg'}`}>
                                                                                            <plan.icon size={20} className="text-blue-500 mb-3" />
                                                                                            <div className={`text-xs font-black ${darkMode ? 'text-white' : 'text-gray-900'}`}>{plan.title}</div>
                                                                                            <div className="text-[10px] font-bold text-gray-500">{plan.meta}</div>
                                                                                        </button>
                                                                                    ))}
                                                                                </div>
                                                                            </div>
                                                                            <button onClick={() => { setCommittedTarget('Trees'); setRoadmapSubView('hub'); }} className="w-full py-5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl font-black text-lg shadow-xl shadow-blue-500/30 active:scale-95 transition-all">COMMIT TO TARGET 🔒</button>
                                                                        </div>
                                                                    </motion.div>
                                                                )}

                                                                {/* 🤝 2. Trees Discussion Room */}
                                                                {roadmapSubView === 'peer_room' && (
                                                                    <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className={`w-full max-w-6xl rounded-[3rem] border shadow-2xl overflow-hidden flex flex-col md:flex-row h-[80vh] ${darkMode ? 'bg-[#0f172a] border-white/10' : 'bg-white border-gray-100'}`}>
                                                                        <div className="flex-1 p-8 flex flex-col space-y-6">
                                                                            <div className="flex items-center justify-between">
                                                                                <div className="flex items-center gap-4">
                                                                                    <div className="w-12 h-12 bg-green-500/10 rounded-2xl flex items-center justify-center text-green-500"><Users2 size={24} /></div>
                                                                                    <div>
                                                                                        <h4 className={`text-2xl font-black ${darkMode ? 'text-white' : 'text-gray-900'}`}>Trees Discussion Room</h4>
                                                                                        <p className="text-xs font-bold text-gray-500 flex items-center gap-2"><span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" /> 12 peers active now</p>
                                                                                    </div>
                                                                                </div>
                                                                                <div className="flex gap-2">
                                                                                    <button onClick={() => setPeerRoomSubView('whiteboard')} className={`px-4 py-2 rounded-xl text-xs font-black uppercase transition-all ${peerRoomSubView === 'whiteboard' ? 'bg-blue-500 text-white' : 'bg-gray-500/10 text-gray-500'}`}>Whiteboard</button>
                                                                                    <button onClick={() => setPeerRoomSubView('battle')} className={`px-4 py-2 rounded-xl text-xs font-black uppercase transition-all ${peerRoomSubView === 'battle' ? 'bg-red-500 text-white' : 'bg-gray-500/10 text-gray-500'}`}>Tree Debug Battle</button>
                                                                                </div>
                                                                            </div>
                                                                            <div className={`flex-1 rounded-[2.5rem] border relative overflow-hidden ${darkMode ? 'bg-black/40 border-white/5' : 'bg-gray-50 border-gray-100'}`}>
                                                                                {peerRoomSubView === 'whiteboard' ? (
                                                                                    <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-500 space-y-4 text-center p-8">
                                                                                        <Edit3 size={48} className="opacity-20 translate-y-2" />
                                                                                        <p className="text-sm font-black uppercase tracking-widest opacity-50 mb-1">Interactive Tree Drawing Canvas</p>
                                                                                    </div>
                                                                                ) : (
                                                                                    <div className="grid grid-cols-2 h-full gap-px bg-white/5">
                                                                                        <div className="p-6 bg-black/40 border-r border-white/5 flex flex-col">
                                                                                            <div className="flex items-center gap-2 mb-4"><div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" /><span className="text-[10px] font-black uppercase text-blue-400 font-mono tracking-tighter">YOU: IMPLEMENTING LCA</span></div>
                                                                                            <div className="flex-1 p-4 rounded-xl bg-black/60 font-mono text-[11px] text-green-400 leading-relaxed overflow-hidden">
                                                                                                <div className="opacity-50">{'// Find Lowest Common Ancestor'}</div>
                                                                                                <div>{'function findLCA(root, p, q) {'}</div>
                                                                                                <div className="pl-4">{'if (!root) return null;'}</div>
                                                                                                <div className="pl-4">{'if (root === p || root === q) return root;'}</div>
                                                                                                <div className="pl-4 border-l-2 border-blue-500 ml-1 py-1">{'const left = findLCA(root.left, p, q);'}</div>
                                                                                                <div>{'}'}</div>
                                                                                            </div>
                                                                                        </div>
                                                                                        <div className="p-6 bg-black/40 flex flex-col">
                                                                                            <div className="flex items-center gap-2 mb-4"><div className="w-2 h-2 bg-red-400 rounded-full animate-pulse" /><span className="text-[10px] font-black uppercase text-red-100 font-mono tracking-tighter">Alex (Pro): 82% COMPLETED</span></div>
                                                                                            <div className="flex-1 p-4 rounded-xl bg-black/60 font-mono text-[11px] text-yellow-500/80 leading-relaxed overflow-hidden italic">
                                                                                                {'// Challenger is refactoring...'}
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                )}
                                                                            </div>
                                                                        </div>
                                                                        <div className={`w-full md:w-80 border-l p-6 flex flex-col ${darkMode ? 'bg-black/20 border-white/5' : 'bg-gray-50 border-gray-100'}`}>
                                                                            <h5 className="text-[10px] font-black uppercase text-gray-500 mb-6 tracking-widest text-center">Live Peers</h5>
                                                                            <div className="space-y-4 flex-1">
                                                                                {[
                                                                                    { name: 'Alex (Expert)', x: 'E', color: 'bg-blue-500' },
                                                                                    { name: 'Sarah (React Dev)', x: 'S', color: 'bg-purple-500' },
                                                                                    { name: 'Mike (Learner)', x: 'M', color: 'bg-orange-500' }
                                                                                ].map((p, i) => (
                                                                                    <div key={i} className={`p-3 rounded-2xl flex items-center justify-between transition-all hover:translate-x-1 ${darkMode ? 'bg-white/5' : 'bg-white shadow-sm'}`}>
                                                                                        <div className="flex items-center gap-3">
                                                                                            <div className={`w-8 h-8 ${p.color} rounded-full flex items-center justify-center text-white font-black text-[10px]`}>{p.x}</div>
                                                                                            <span className={`text-[11px] font-black ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{p.name}</span>
                                                                                        </div>
                                                                                        <div className="w-2 h-2 bg-green-500 rounded-full shadow-[0_0_8px_rgba(34,197,94,0.5)]" />
                                                                                    </div>
                                                                                ))}
                                                                            </div>
                                                                            <div className="mt-6 space-y-3">
                                                                                <button className="w-full py-4 bg-blue-500 text-white rounded-2xl text-xs font-black uppercase shadow-lg shadow-blue-500/20 active:scale-95 transition-all">Start Peer Call</button>
                                                                            </div>
                                                                        </div>
                                                                    </motion.div>
                                                                )}

                                                                {/* 🧠 3. Recursion Adaptive Engine */}
                                                                {roadmapSubView === 'recursive_quiz' && (
                                                                    <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className={`w-full max-w-4xl p-10 rounded-[4rem] border ${darkMode ? 'bg-[#0f172a] border-white/10' : 'bg-white border-gray-100'} shadow-2xl relative overflow-hidden`}>
                                                                        <div className="absolute top-0 left-0 w-full h-1 bg-white/5">
                                                                            <motion.div initial={{ width: 0 }} animate={{ width: '65%' }} className="h-full bg-purple-500" />
                                                                        </div>

                                                                        <div className="flex items-center justify-between mb-10">
                                                                            <div className="flex items-center gap-4">
                                                                                <div className="w-14 h-14 bg-purple-500/10 rounded-[2rem] flex items-center justify-center text-purple-500 shadow-xl shadow-purple-500/10"><Brain size={32} /></div>
                                                                                <div>
                                                                                    <h4 className={`text-3xl font-black ${darkMode ? 'text-white' : 'text-gray-900'}`}>Recursion Adaptive Engine</h4>
                                                                                    <p className="text-sm font-bold text-gray-500">AI FOCUS: Base Case & Stack Simulation</p>
                                                                                </div>
                                                                            </div>
                                                                        </div>

                                                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-10">
                                                                            <div className="space-y-8">
                                                                                <div className={`p-8 rounded-[3rem] border ${darkMode ? 'bg-white/5 border-white/5' : 'bg-gray-50 border-gray-100'} relative`}>
                                                                                    <p className={`text-xl font-black leading-relaxed mb-6 mt-4 ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>Identify the correct base case for calculating the maximum depth of a binary tree.</p>
                                                                                    <div className="space-y-3">
                                                                                        {[
                                                                                            { text: 'if (root === null) return 0;', status: 'active' },
                                                                                            { text: 'if (root.left === null) return 1;', status: 'idle' }
                                                                                        ].map((opt, i) => (
                                                                                            <button key={i} className={`w-full p-5 rounded-2xl border text-left text-xs font-black transition-all hover:translate-x-2 ${darkMode ? 'bg-black/20 border-white/5 hover:border-purple-500/30 text-gray-300' : 'bg-white border-gray-100 hover:shadow-lg text-gray-600 outline-none'}`}>
                                                                                                {opt.text}
                                                                                            </button>
                                                                                        ))}
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                            <div className="space-y-6 flex flex-col justify-center">
                                                                                <h5 className="text-[10px] font-black uppercase text-gray-500 tracking-widest text-center mb-2">AI STACK SIMULATION</h5>
                                                                                <div className="space-y-2 relative flex flex-col items-center">
                                                                                    {[4, 3, 2].map((n, idx) => (
                                                                                        <motion.div
                                                                                            key={n}
                                                                                            initial={{ y: -20, opacity: 0 }}
                                                                                            animate={{ y: 0, opacity: 1 - (idx * 0.2) }}
                                                                                            className={`w-full p-4 border rounded-2xl text-center text-xs font-black font-mono flex items-center justify-between ${darkMode ? 'bg-purple-500/10 border-purple-500/20 text-purple-300' : 'bg-purple-50 border-purple-100 text-purple-600'}`}
                                                                                        >
                                                                                            <span>maxDepth(root_{n})</span>
                                                                                        </motion.div>
                                                                                    ))}
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <button className="px-12 py-4 bg-purple-500 text-white rounded-[2rem] font-black text-sm shadow-xl shadow-purple-500/30 active:scale-95 transition-all uppercase tracking-widest">Submit Logic</button>
                                                                    </motion.div>
                                                                )}

                                                                {/* 🎥 4. Smart Concept Booster */}
                                                                {roadmapSubView === 'booster' && (
                                                                    <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className={`w-full max-w-4xl rounded-[4rem] border shadow-2xl relative overflow-hidden flex flex-col ${darkMode ? 'bg-[#0f172a] border-white/10' : 'bg-white border-gray-100'}`}>
                                                                        <div className="aspect-video bg-black/95 relative flex items-center justify-center group overflow-hidden">
                                                                            <button className="w-24 h-24 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:scale-110 active:scale-95 transition-all shadow-2xl shadow-black/50 z-10 group-hover:bg-blue-600">
                                                                                <Play size={40} className="fill-white translate-x-1" />
                                                                            </button>
                                                                        </div>

                                                                        <div className="p-10">
                                                                            <h4 className="text-2xl font-black text-white mb-1">Visualizing Recursion: The Calling Stack</h4>
                                                                            <button className="mt-8 px-10 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-[2rem] font-black text-xs shadow-xl shadow-blue-500/30 active:scale-95 transition-all uppercase tracking-widest">Start Mini Test 🎉</button>
                                                                        </div>
                                                                    </motion.div>
                                                                )}

                                                                {/* 💼 5. Interview Simulation Mode */}
                                                                {roadmapSubView === 'interview_sim' && (
                                                                    <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className={`w-full max-w-6xl h-[85vh] rounded-[3rem] border overflow-hidden flex flex-col ${darkMode ? 'bg-[#0f172a] border-white/10' : 'bg-white border-gray-100'} shadow-2xl relative`}>
                                                                        <div className={`p-8 border-b flex items-center justify-between z-10 ${darkMode ? 'bg-black/40 border-white/5' : 'bg-gray-50 border-gray-100 shadow-sm'}`}>
                                                                            <h4 className={`text-xl font-black ${darkMode ? 'text-white' : 'text-gray-900'}`}>Interview Simulation: Lowest Common Ancestor</h4>
                                                                            <div className="text-2xl font-black font-mono text-red-500 tabular-nums">42:15</div>
                                                                        </div>

                                                                        <div className="flex-1 flex overflow-hidden">
                                                                            <div className="flex-1 p-8 overflow-y-auto">
                                                                                <p className={`text-base font-bold leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                                                                    Given a binary search tree (BST), find the lowest common ancestor (LCA) node of two given nodes in the BST.
                                                                                </p>
                                                                            </div>
                                                                            <div className={`w-3/5 border-l flex flex-col ${darkMode ? 'bg-[#0a0f1d] border-white/5' : 'bg-gray-900 border-gray-800'}`}>
                                                                                <div className="flex-1 p-10 font-mono text-[13px] leading-relaxed overflow-y-auto">
                                                                                    <div className="text-purple-400 opacity-60">/** JavaScript Editor ... */</div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </motion.div>
                                                                )}
                                                            </div>
                                                        )}
                                                    </AnimatePresence>
                                                </div>
                                            )}
                                        </AnimatePresence>





                                    </div>
            </div>
                            )
}

                            // Sub-components
                            function SectionCard({title, icon: Icon, children, darkMode }) {
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

                            function QuickActionBtn({icon: Icon, label, color, darkMode, active, onClick }) {
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

                            function RecommendationItem({text, type, darkMode, onClick}) {
    const isCritical = type === 'Critical'
                            return (
                            <div onClick={onClick} className={`p-4 rounded-xl border flex items-center justify-between group cursor-pointer ${darkMode ? 'bg-white/5 border-white/5 hover:bg-white/10' : 'bg-gray-50 border-gray-100 hover:bg-white hover:shadow-md'}`}>
                                <div className="flex items-center gap-3">
                                    <div className={`w-1.5 h-1.5 rounded-full ${isCritical ? 'bg-red-500' : 'bg-blue-500'}`} />
                                    <span className={`text-sm font-bold ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>{text}</span>
                                </div>
                                <ArrowRight size={16} className={`transition-transform group-hover:translate-x-1 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                            </div>
                            )
}

                            function StatTiny({label, value, color, darkMode}) {
    return (
                            <div className={`p-3 rounded-xl text-center ${darkMode ? 'bg-white/5' : 'bg-gray-50'}`}>
                                <div className={`text-lg font-black ${color}`}>{value}</div>
                                <div className={`text-[10px] font-bold uppercase tracking-widest ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>{label}</div>
                            </div>
                            )
}

                            function PeerGroupCard({name, members, active, darkMode}) {
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
