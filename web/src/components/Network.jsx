import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
    Users, MessageSquare, Share2, Trophy, Zap, Search, UserPlus, Flame, Hash, ShieldCheck, Atom,
    Brain, AppWindow, Network as NetworkIcon, ChevronDown, ChevronLeft, ChevronRight, Star,
    Calendar, CheckCircle2, Clock, Globe, Lock, Plus, ArrowLeft, Send, Sparkles, Bell,
    RefreshCw, FileText, Layout, MoreVertical, Terminal, Paperclip, Smile, Activity, Target,
    Play, Code2, PlayCircle, Mic, Video, MonitorUp, PhoneOff, Image, Download, AlertCircle, ExternalLink
} from 'lucide-react'
import { useLMSStore } from '../store/useLMSStore'

// Mock Data
const allGroups = [
    { id: 1, name: 'JavaScript Beginners', topic: 'Web Development', members: 24, level: 'Beginner', status: 'Online', icon: Atom, color: 'text-yellow-500', bg: 'bg-yellow-500/10', description: 'Mastering ES6+ and DOM manipulation together.', activity: 92, successRate: 88, avgSkill: 'Novice', recentDiscussion: 'How do I handle async/await in loops?' },
    { id: 2, name: 'Data Science Mastery', topic: 'Data Science', members: 18, level: 'Advanced', status: 'Active Today', icon: Brain, color: 'text-purple-500', bg: 'bg-purple-500/10', description: 'Deep dive into Pandas, NumPy and Machine Learning models.', activity: 85, successRate: 94, avgSkill: 'Pro', recentDiscussion: 'Tuning hyperparameters for Random Forest.' },
    { id: 3, name: 'DSA Practice: LeetCode', topic: 'Computer Science', members: 32, level: 'Intermediate', status: 'Online', icon: NetworkIcon, color: 'text-blue-500', bg: 'bg-blue-500/10', description: 'Daily problem solving and algorithm analysis sessions.', activity: 98, successRate: 82, avgSkill: 'Intermediate', recentDiscussion: 'Optimal solution for 3Sum problem?' },
    { id: 4, name: 'UI/UX Design Hub', topic: 'Design', members: 15, level: 'Beginner', status: 'Active Today', icon: AppWindow, color: 'text-pink-500', bg: 'bg-pink-500/10', description: 'Critiquing designs and sharing Figma best practices.', activity: 70, successRate: 90, avgSkill: 'Novice', recentDiscussion: 'Auto-layout best practices in Figma.' },
]

const recommendedGroups = [
    { id: 101, name: 'React Advanced Patterns', members: 14, match: '98%', reason: 'Similar skill level users', icon: Atom, color: 'text-blue-500', bg: 'bg-blue-500/10', activity: 95, successRate: 92, avgSkill: 'Advanced', recentDiscussion: 'React 19 Server Components discussion.' },
    { id: 102, name: 'DSA Final Preparation', members: 24, match: '95%', reason: 'Same learning goal users', icon: ShieldCheck, color: 'text-green-500', bg: 'bg-green-500/10', activity: 88, successRate: 85, avgSkill: 'Intermediate', recentDiscussion: 'Graph traversal algorithms.' },
    { id: 103, name: 'AI Engineering Roadmap', members: 18, match: '92%', reason: 'Active learners', icon: Brain, color: 'text-purple-500', bg: 'bg-purple-500/10', activity: 90, successRate: 91, avgSkill: 'Pro', recentDiscussion: 'LLM integration strategies.' },
]

export default function Network() {
    const { darkMode } = useLMSStore()
    const [view, setView] = useState('landing') // landing, listing, create, dashboard, join-modal, ai-matching, recommended-listing, preview, live-meet, meet-summary
    const [selectedGroup, setSelectedGroup] = useState(null)
    const [activeTab, setActiveTab] = useState('Chat')
    const [onboardingData, setOnboardingData] = useState({
        level: 'Intermediate',
        goal: '',
        timePerWeek: '5-10 hours',
        preferredTime: 'Evening',
        privacy: 'Public'
    })

    const dm = darkMode

    // ─── FLOW HANDLERS ───
    const triggerJoinFlow = (group) => {
        setSelectedGroup(group)
        setView('join-modal')
    }

    const startMatching = () => {
        setView('ai-matching')
        setTimeout(() => setView('recommended-listing'), 3000)
    }

    const handleFinalJoin = (group) => {
        setSelectedGroup(group)
        setView('dashboard')
    }

    const openPreview = (group) => {
        setSelectedGroup(group)
        setView('preview')
    }

    // ─── RENDERING VIEWS ───

    // 1. LANDING VIEW
    if (view === 'landing') {
        return (
            <div className={`p-6 lg:p-10 min-h-screen transition-colors duration-500 ${dm ? 'bg-[#121820]' : 'bg-gray-50'}`}>
                {/* Hero Section */}
                <div className={`max-w-7xl mx-auto mb-16 rounded-[3rem] p-10 md:p-16 flex flex-col lg:flex-row items-center gap-16 overflow-hidden relative border ${dm ? 'bg-[#1a222c] border-white/5' : 'bg-white border-gray-100 shadow-2xl shadow-blue-500/5'}`}>
                    <div className="flex-1 space-y-8 text-center lg:text-left relative z-10">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full">
                            <Users size={18} className="text-blue-500" />
                            <span className="text-xs font-black text-blue-500 uppercase tracking-widest">Connect with 15k+ Learners</span>
                        </div>
                        <h1 className={`text-5xl md:text-7xl font-black tracking-tight leading-tight ${dm ? 'text-white' : 'text-gray-900'}`}>
                            Your Peer <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">Network Edge.</span>
                        </h1>
                        <p className={`text-xl leading-relaxed max-w-xl mx-auto lg:mx-0 ${dm ? 'text-gray-400' : 'text-gray-600'}`}>
                            Collaborate in real-time. Join or create study groups powered by AI matching to maximize your learning efficiency.
                        </p>
                        <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                            <div className="flex flex-col gap-6 w-full sm:w-auto">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <ChoiceBtn
                                        icon={Users}
                                        title="Join Existing Network"
                                        desc="Smart AI matching"
                                        onClick={() => setView('listing')}
                                        dm={dm}
                                        primary
                                    />
                                    <ChoiceBtn
                                        icon={Plus}
                                        title="Create Your Network"
                                        desc="Start your own community"
                                        onClick={() => setView('create')}
                                        dm={dm}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Popular Groups Preview */}
                <div className="max-w-7xl mx-auto space-y-10">
                    <div className="flex justify-between items-end">
                        <div>
                            <h2 className={`text-3xl font-black ${dm ? 'text-white' : 'text-gray-900'}`}>Popular Communities</h2>
                            <p className={dm ? 'text-gray-500' : 'text-gray-500'}>Trends in your current domains.</p>
                        </div>
                        <button onClick={() => setView('listing')} className="text-blue-500 font-bold flex items-center gap-2 hover:gap-3 transition-all">
                            Explore All Groups <ArrowLeft className="rotate-180" size={20} />
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {allGroups.slice(0, 3).map(group => (
                            <GroupCard key={group.id} group={group} dm={dm} onJoin={() => triggerJoinFlow(group)} />
                        ))}
                    </div>
                </div>
            </div>
        )
    }

    // LISTING VIEW
    if (view === 'listing') {
        return (
            <div className={`p-6 lg:p-10 min-h-screen transition-colors duration-500 ${dm ? 'bg-[#121820]' : 'bg-gray-50'}`}>
                <div className="max-w-7xl mx-auto space-y-12">
                    <button onClick={() => setView('landing')} className={`flex items-center gap-2 text-sm font-bold opacity-60 hover:opacity-100 transition-all ${dm ? 'text-white' : 'text-gray-900'}`}>
                        <ArrowLeft size={16} /> Back to Hub
                    </button>
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                        <div>
                            <h1 className={`text-5xl font-black mb-3 ${dm ? 'text-white' : 'text-gray-900'}`}>Study Groups</h1>
                            <p className={dm ? 'text-gray-400' : 'text-gray-600'}>Find the perfect community for your learning path.</p>
                        </div>
                        <div className="flex gap-4 w-full md:w-auto">
                            <div className="relative flex-1 md:w-80">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                                <input
                                    type="text"
                                    placeholder="Search by topic..."
                                    className={`w-full h-14 pl-12 pr-4 rounded-xl border focus:outline-none focus:ring-2 focus:ring-blue-500/40 ${dm ? 'bg-[#1a222c] border-white/5 text-white' : 'bg-white border-gray-200'}`}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {allGroups.map(group => (
                            <GroupCard key={group.id} group={group} dm={dm} onJoin={() => triggerJoinFlow(group)} />
                        ))}
                    </div>
                </div>
            </div>
        )
    }

    // 2. QUICK JOIN MODAL
    if (view === 'join-modal') {
        return (
            <div className={`fixed inset-0 z-[2000] flex items-center justify-center p-6 bg-black/60 backdrop-blur-sm`}>
                <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    className={`w-full max-w-2xl rounded-[3rem] p-10 md:p-16 border shadow-2xl relative ${dm ? 'bg-[#1a222c] border-white/5' : 'bg-white border-gray-100'}`}
                >
                    <button onClick={() => setView('listing')} className="absolute top-8 right-8 text-gray-500 hover:text-red-500 transition-colors">
                        <Plus className="rotate-45" size={24} />
                    </button>

                    <div className="space-y-8">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="w-12 h-12 rounded-2xl bg-blue-500 flex items-center justify-center text-white shadow-lg shadow-blue-500/20">
                                <Zap size={24} />
                            </div>
                            <div>
                                <h2 className={`text-3xl font-black ${dm ? 'text-white' : 'text-gray-900'}`}>Quick Setup</h2>
                                <p className={dm ? 'text-gray-400' : 'text-gray-600'}>Prepare for the optimized peer match.</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <FormReq label="Your Skill Level" dm={dm}>
                                <select
                                    className={`w-full h-14 px-5 rounded-2xl border outline-none ${dm ? 'bg-black/20 border-white/10 text-white' : 'bg-gray-50 border-gray-200'}`}
                                >
                                    <option>Beginner</option>
                                    <option>Intermediate</option>
                                    <option>Advanced</option>
                                </select>
                            </FormReq>
                            <FormReq label="Study Timing" dm={dm}>
                                <select
                                    className={`w-full h-14 px-5 rounded-2xl border outline-none ${dm ? 'bg-black/20 border-white/10 text-white' : 'bg-gray-50 border-gray-200'}`}
                                >
                                    <option>Morning</option>
                                    <option>Evening</option>
                                    <option>Night Owl</option>
                                </select>
                            </FormReq>
                        </div>

                        <FormReq label="Learning Goal" dm={dm}>
                            <input
                                type="text"
                                placeholder="e.g. Master ES6 in 2 weeks"
                                className={`w-full h-14 px-5 rounded-2xl border outline-none ${dm ? 'bg-black/20 border-white/10 text-white' : 'bg-gray-50 border-gray-200'}`}
                            />
                        </FormReq>

                        <div className="grid grid-cols-2 gap-6">
                            <FormReq label="Time Available / Week" dm={dm}>
                                <select className={`w-full h-14 px-5 rounded-2xl border outline-none ${dm ? 'bg-black/20 border-white/10 text-white' : 'bg-gray-50 border-gray-200'}`}>
                                    <option>1-5 hours</option>
                                    <option>5-10 hours</option>
                                    <option>10+ hours</option>
                                </select>
                            </FormReq>
                            <FormReq label="Preference" dm={dm}>
                                <select className={`w-full h-14 px-5 rounded-2xl border outline-none ${dm ? 'bg-black/20 border-white/10 text-white' : 'bg-gray-50 border-gray-200'}`}>
                                    <option>Public Group</option>
                                    <option>Private Group</option>
                                </select>
                            </FormReq>
                        </div>

                        <button
                            onClick={startMatching}
                            className="w-full py-5 bg-blue-500 hover:bg-blue-600 text-white rounded-[2rem] font-black text-lg shadow-2xl shadow-blue-500/30 transition-all active:scale-95 flex items-center justify-center gap-3"
                        >
                            Confirm Join <ChevronRight size={20} />
                        </button>
                    </div>
                </motion.div>
            </div>
        )
    }

    // 3. AI MATCHING SCREEN
    if (view === 'ai-matching') {
        return (
            <div className={`fixed inset-0 z-[3000] flex flex-col items-center justify-center transition-colors duration-500 ${dm ? 'bg-[#121820]' : 'bg-gray-50'}`}>
                <div className="relative mb-12">
                    <motion.div
                        animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="w-48 h-48 bg-blue-500/20 rounded-full blur-3xl absolute inset-0"
                    />
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                        className={`w-36 h-36 rounded-full border-4 border-dashed ${dm ? 'border-blue-500/50' : 'border-blue-50'}`}
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                        <Search size={48} className="text-blue-500" />
                    </div>
                </div>
                <h2 className={`text-4xl font-black mb-4 ${dm ? 'text-white' : 'text-gray-900'}`}>🔎 Finding best peers for you...</h2>
                <div className="flex gap-2">
                    {[1, 2, 3].map(i => (
                        <motion.div
                            key={i}
                            animate={{ opacity: [0.2, 1, 0.2] }}
                            transition={{ duration: 1, delay: i * 0.2, repeat: Infinity }}
                            className="w-3 h-3 bg-blue-500 rounded-full"
                        />
                    ))}
                </div>
            </div>
        )
    }

    // 4. RECOMMENDED LISTING
    if (view === 'recommended-listing') {
        return (
            <div className={`p-6 lg:p-10 min-h-screen transition-colors duration-500 ${dm ? 'bg-[#121820]' : 'bg-gray-50'}`}>
                <div className="max-w-7xl mx-auto space-y-12">
                    <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                        <div>
                            <div className="flex items-center gap-2 mb-2">
                                <Sparkles size={16} className="text-blue-500" />
                                <span className="text-xs font-black uppercase tracking-widest text-blue-500">AI Matches Selected</span>
                            </div>
                            <h1 className={`text-5xl font-black ${dm ? 'text-white' : 'text-gray-900'}`}>🤝 Recommended Groups</h1>
                            <p className={dm ? 'text-gray-400' : 'text-gray-600'}>Peers optimized for your learning speed and goal.</p>
                        </div>
                        <button onClick={() => setView('listing')} className={`px-6 py-3 rounded-xl border font-bold text-sm ${dm ? 'border-white/10 text-white' : 'border-gray-200 text-gray-700'}`}>
                            Back to All Groups
                        </button>
                    </header>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {recommendedGroups.map(group => (
                            <div key={group.id} className={`p-8 rounded-[2.5rem] border group transition-all duration-300 hover:shadow-2xl ${dm ? 'bg-[#1a222c] border-white/5 hover:border-blue-500/20' : 'bg-white border-gray-100 shadow-xl shadow-gray-200/50'}`}>
                                <div className="flex justify-between items-start mb-6">
                                    <div className={`p-4 rounded-2xl ${group.bg} ${group.color}`}>
                                        <group.icon size={26} />
                                    </div>
                                    <div className={`px-4 py-1.5 bg-blue-500 text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-blue-500/20`}>
                                        Match {group.match}
                                    </div>
                                </div>
                                <h3 className={`text-2xl font-black mb-2 ${dm ? 'text-white' : 'text-gray-900'}`}>{group.name}</h3>
                                <div className="flex items-center gap-2 text-blue-500 text-[10px] font-black uppercase tracking-widest mb-6 border-b border-blue-500/10 pb-4">
                                    <Activity size={12} /> {group.reason}
                                </div>

                                <div className="flex items-center justify-between pt-6">
                                    <div className="flex flex-col gap-1">
                                        <div className="flex items-center gap-2 text-xs font-bold text-gray-500">
                                            <Users size={14} /> {group.members} members
                                        </div>
                                    </div>
                                    <div className="flex gap-2">
                                        <button onClick={() => openPreview(group)} className={`px-4 py-2.5 rounded-xl border font-bold text-xs transition-all hover:bg-white/5 ${dm ? 'border-white/10 text-white' : 'border-gray-200 text-gray-600'}`}>
                                            View Details
                                        </button>
                                        <button onClick={() => handleFinalJoin(group)} className="px-5 py-2.5 bg-blue-500 hover:bg-blue-600 text-white rounded-xl font-bold text-xs shadow-lg shadow-blue-500/20 transition-all active:scale-95">
                                            Join Group
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        )
    }

    // 5. PREVIEW VIEW
    if (view === 'preview') {
        const group = selectedGroup
        return (
            <div className={`p-6 lg:p-10 min-h-screen transition-colors duration-500 ${dm ? 'bg-[#121820]' : 'bg-gray-50'}`}>
                <div className="max-w-4xl mx-auto">
                    <button onClick={() => setView('recommended-listing')} className={`flex items-center gap-2 text-sm font-bold mb-8 hover:text-blue-500 transition-colors ${dm ? 'text-gray-400' : 'text-gray-600'}`}>
                        <ArrowLeft size={16} /> Back to matches
                    </button>

                    <div className={`p-10 md:p-16 rounded-[3rem] border shadow-2xl overflow-hidden relative ${dm ? 'bg-[#1a222c] border-white/5' : 'bg-white border-gray-100'}`}>
                        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12">
                            <div className="lg:col-span-12 space-y-10">
                                <div className="flex flex-wrap items-center justify-between gap-6">
                                    <div className="flex items-center gap-6">
                                        <div className={`w-20 h-20 rounded-[1.5rem] flex items-center justify-center ${group.bg} ${group.color}`}>
                                            <group.icon size={40} />
                                        </div>
                                        <div>
                                            <h1 className={`text-4xl font-black ${dm ? 'text-white' : 'text-gray-900'}`}>{group.name}</h1>
                                            <div className="flex items-center gap-3 mt-1.5 font-bold text-gray-500">
                                                <span>{group.topic || 'Web Dev'}</span>
                                                <span className="w-1 h-1 bg-gray-500 rounded-full" />
                                                <span>{group.avgSkill} Level</span>
                                            </div>
                                        </div>
                                    </div>
                                    <button onClick={() => handleFinalJoin(group)} className="px-10 py-5 bg-blue-500 hover:bg-blue-600 text-white rounded-[2rem] font-black text-lg shadow-2xl shadow-blue-500/30 transition-all active:scale-95">
                                        Confirm & Join 🚀
                                    </button>
                                </div>

                                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                                    <StatsMini label="Total Members" val={group.members} icon={Users} dm={dm} />
                                    <StatsMini label="Activity Score" val={`${group.activity}%`} icon={Flame} dm={dm} color="text-orange-500" />
                                    <StatsMini label="Avg. Skill Level" val={group.avgSkill} icon={ShieldCheck} dm={dm} color="text-blue-500" />
                                    <StatsMini label="Success Rate" val={`${group.successRate}%`} icon={Trophy} dm={dm} color="text-yellow-500" />
                                </div>

                                <div className="space-y-4">
                                    <h4 className={`text-lg font-black ${dm ? 'text-white' : 'text-gray-900'}`}>Recent discussions</h4>
                                    <div className={`p-6 rounded-2xl border italic text-lg ${dm ? 'bg-white/5 border-white/10 text-gray-300' : 'bg-gray-50 border-gray-200 text-gray-700 shadow-inner'}`}>
                                        "{group.recentDiscussion}"
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    // 6. DASHBOARD VIEW
    if (view === 'dashboard') {
        const group = selectedGroup || allGroups[0]
        return (
            <div className={`min-h-screen transition-colors duration-500 pb-20 ${dm ? 'bg-[#121820]' : 'bg-gray-50'}`}>
                {/* Fixed Header */}
                <div className={`sticky top-0 z-[100] px-6 lg:px-10 h-20 border-b flex items-center justify-between backdrop-blur-xl ${dm ? 'bg-[#121820]/80 border-white/5' : 'bg-white/80 border-gray-100'}`}>
                    <div className="flex items-center gap-6">
                        <button onClick={() => setView('listing')} className={`p-3 rounded-xl hover:bg-white/5 transition-colors border ${dm ? 'border-white/10' : 'border-gray-100'}`}>
                            <ArrowLeft size={20} className={dm ? 'text-white' : 'text-gray-900'} />
                        </button>
                        <div className="flex items-center gap-4">
                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${group.bg || 'bg-blue-500/10'} ${group.color || 'text-blue-500'}`}>
                                <group.icon size={20} />
                            </div>
                            <div>
                                <h2 className={`font-black tracking-tight ${dm ? 'text-white' : 'text-gray-900'}`}>{group.name}</h2>
                                <p className="text-[10px] font-black uppercase tracking-widest text-blue-500">Collaborative Hub Active</p>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <button className={`p-3 rounded-xl border relative ${dm ? 'border-white/10 text-white bg-white/5' : 'border-gray-200 text-gray-700 bg-white'}`}>
                            <Bell size={20} />
                        </button>
                        <button onClick={() => setView('live-meet')} className="px-6 py-2.5 bg-blue-500 text-white rounded-xl font-bold text-sm shadow-lg shadow-blue-500/20 active:scale-95 transition-all">Launch Session</button>
                    </div>
                </div>

                <div className="max-w-[1600px] mx-auto px-6 lg:px-10 py-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
                    <div className="lg:col-span-2 space-y-4">
                        <SideTab icon={MessageSquare} label="Live Discussion" active={activeTab === 'Chat'} onClick={() => setActiveTab('Chat')} dm={dm} />
                        <SideTab icon={Trophy} label="Leaderboard" active={activeTab === 'Leaderboard'} onClick={() => setActiveTab('Leaderboard')} dm={dm} />
                        <SideTab icon={Layout} label="Group Tasks" active={activeTab === 'Tasks'} onClick={() => setActiveTab('Tasks')} dm={dm} />
                        <SideTab icon={Calendar} label="Schedule" active={activeTab === 'Schedule'} onClick={() => setActiveTab('Schedule')} dm={dm} />
                        <SideTab icon={Target} label="Shared Resources" active={activeTab === 'Hub'} onClick={() => setActiveTab('Hub')} dm={dm} />
                    </div>

                    <div className="lg:col-span-10 xl:col-span-7 space-y-8">
                        <AnimatePresence mode="wait">
                            {activeTab === 'Chat' && <ChatArena dm={dm} />}
                            {activeTab === 'Leaderboard' && <LBView dm={dm} />}
                            {activeTab === 'Tasks' && <TasksArea dm={dm} />}
                            {activeTab === 'Schedule' && <ScheduleArea dm={dm} setView={setView} />}
                            {activeTab === 'Hub' && <ResourcesArea dm={dm} />}
                        </AnimatePresence>
                    </div>

                    <div className="hidden xl:col-span-3 xl:block space-y-8">
                        <ActivePeers dm={dm} />
                        <Vault dm={dm} />
                    </div>
                </div>
            </div>
        )
    }

    // ─── CREATE VIEW ───
    if (view === 'create') {
        return (
            <div className={`p-6 lg:p-10 min-h-screen flex items-center justify-center transition-colors duration-500 ${dm ? 'bg-[#121820]' : 'bg-gray-50'}`}>
                <div className={`w-full max-w-4xl p-10 md:p-16 rounded-[3rem] border shadow-2xl relative overflow-hidden ${dm ? 'bg-[#1a222c] border-white/5' : 'bg-white border-gray-100'}`}>
                    <header className="flex items-center gap-6 mb-12">
                        <button onClick={() => setView('landing')} className={`p-4 rounded-2xl hover:bg-white/5 transition-colors border ${dm ? 'border-white/10' : 'border-gray-100'}`}>
                            <ArrowLeft size={24} className={dm ? 'text-white' : 'text-gray-900'} />
                        </button>
                        <div>
                            <h1 className={`text-4xl font-black ${dm ? 'text-white' : 'text-gray-900'}`}>Start a Community</h1>
                        </div>
                    </header>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                        <div className="space-y-8">
                            <FormReq label="Group Title" dm={dm}>
                                <input type="text" className={`w-full h-14 px-5 rounded-2xl border outline-none ${dm ? 'bg-black/20 border-white/10 text-white' : 'bg-gray-50 border-gray-200'}`} />
                            </FormReq>
                            <button onClick={() => setView('dashboard')} className="w-full py-5 bg-blue-500 hover:bg-blue-600 text-white rounded-2xl font-black text-lg">Create Group</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    // ─── MEET VIEWS ───
    if (view === 'live-meet') {
        const group = selectedGroup || allGroups[0]
        return (
            <div className={`fixed inset-0 z-[5000] flex flex-col ${dm ? 'bg-[#0a0f16]' : 'bg-black'}`}>
                {/* Meet Header */}
                <div className="h-16 px-6 border-b border-white/10 flex items-center justify-between bg-black/50 backdrop-blur-md">
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2 px-3 py-1.5 bg-red-500/20 text-red-500 rounded-lg text-xs font-black uppercase tracking-widest border border-red-500/30">
                            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" /> Live
                        </div>
                        <h2 className="text-white font-bold">{group.name} - React UI Protocol</h2>
                        <span className="text-gray-400 text-sm font-medium">| 14 Participants</span>
                    </div>
                    <div className="flex items-center gap-4 text-white font-mono text-sm">
                        45:12
                    </div>
                </div>

                <div className="flex-1 flex overflow-hidden">
                    {/* Video Area */}
                    <div className="flex-1 p-4 flex flex-col gap-4">
                        <div className="flex-1 bg-[#121820] rounded-3xl border border-white/10 relative overflow-hidden flex items-center justify-center">
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10" />
                            <div className="w-full h-full object-cover opacity-60 flex flex-col items-center justify-center space-y-4">
                                <Code2 size={64} className="text-blue-500 opacity-50" />
                                <span className="text-xl font-bold text-white tracking-widest uppercase">Instructor Screen Share</span>
                            </div>
                            <div className="absolute bottom-6 left-6 z-20">
                                <div className="text-white font-bold bg-black/50 px-3 py-1.5 rounded-lg flex items-center gap-2 backdrop-blur-md">
                                    <Mic size={14} className="text-blue-400" /> System Instructor View
                                </div>
                            </div>
                        </div>
                        <div className="h-40 grid grid-cols-4 gap-4">
                            {[1, 2, 3, 4].map(i => (
                                <div key={i} className="bg-[#121820] rounded-2xl border border-white/10 relative overflow-hidden flex items-center justify-center">
                                    <div className="w-12 h-12 bg-blue-500/20 text-blue-500 rounded-full flex items-center justify-center font-black text-xl">
                                        P{i}
                                    </div>
                                    <div className="absolute bottom-2 left-2 z-20">
                                        <div className="text-white text-[10px] font-bold bg-black/50 px-2 py-1 rounded backdrop-blur-md">Peer {i}</div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Controls */}
                        <div className="h-20 flex items-center justify-center gap-4">
                            <button className="w-14 h-14 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all"><Mic size={24} /></button>
                            <button className="w-14 h-14 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all"><Video size={24} /></button>
                            <button className="w-14 h-14 rounded-full bg-blue-500 hover:bg-blue-600 shadow-lg shadow-blue-500/20 text-white flex items-center justify-center transition-all"><MonitorUp size={24} /></button>
                            <div className="w-px h-8 bg-white/20 mx-2" />
                            <button onClick={() => setView('meet-summary')} className="px-8 h-14 rounded-full bg-red-500 hover:bg-red-600 shadow-lg shadow-red-500/20 text-white flex items-center justify-center font-bold gap-2 transition-all active:scale-95">
                                <PhoneOff size={20} /> Leave Session
                            </button>
                        </div>
                    </div>

                    {/* Chat Sidebar */}
                    <div className="w-80 bg-[#121820] border-l border-white/5 flex flex-col">
                        <div className="p-4 border-b border-white/5 flex items-center gap-4">
                            <button className="text-white font-bold border-b-2 border-blue-500 pb-1">Discussion</button>
                            <button className="text-gray-500 font-bold border-b-2 border-transparent pb-1">Notes</button>
                        </div>
                        <div className="flex-1 overflow-y-auto p-4 space-y-4">
                            <Msg dm={true} user="Mahek" text="The ref forwarding seems tricky." />
                            <Msg dm={true} user="Instructor" text="Check the code block I just shared on screen, that's the modern way." />
                        </div>
                        <div className="p-4 border-t border-white/5 bg-white/5">
                            <input type="text" placeholder="Send message..." className="w-full bg-black/20 text-white text-sm px-4 py-3 rounded-xl border border-white/10 outline-none" />
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    if (view === 'meet-summary') {
        return (
            <div className={`p-6 lg:p-10 min-h-screen transition-colors duration-500 flex items-center justify-center ${dm ? 'bg-[#121820]' : 'bg-gray-50'}`}>
                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className={`w-full max-w-4xl rounded-[3rem] p-10 md:p-14 border shadow-2xl space-y-10 ${dm ? 'bg-[#1a222c] border-white/5' : 'bg-white border-gray-100'}`}>
                    <div className="flex justify-between items-center border-b pb-6 dark:border-white/10">
                        <div>
                            <div className="flex items-center gap-2 mb-2">
                                <Sparkles size={16} className="text-blue-500" />
                                <span className="text-xs font-black uppercase tracking-widest text-blue-500">AI Generated Session Summary</span>
                            </div>
                            <h2 className={`text-4xl font-black ${dm ? 'text-white' : 'text-gray-900'}`}>React UI Protocol</h2>
                        </div>
                        <button onClick={() => setView('dashboard')} className={`px-5 py-2.5 rounded-xl text-sm font-bold border transition-all ${dm ? 'border-white/10 hover:bg-white/10 text-white' : 'border-gray-200 hover:bg-gray-50 text-gray-700'}`}>Return to Dashboard</button>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        <StatsMini dm={dm} icon={Clock} val="45m" label="Duration" color="text-blue-500" />
                        <StatsMini dm={dm} icon={Users} val="14" label="Attended" color="text-purple-500" />
                        <StatsMini dm={dm} icon={Video} val="Ready" label="Recording" color="text-red-500" />
                        <StatsMini dm={dm} icon={Activity} val="92%" label="Engagement" color="text-green-500" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className={`p-8 rounded-[2rem] border ${dm ? 'bg-white/5 border-white/10' : 'bg-gray-50 border-gray-100'}`}>
                            <h4 className={`text-lg font-black mb-4 flex items-center gap-2 ${dm ? 'text-white' : 'text-gray-900'}`}><Hash size={18} className="text-blue-500" /> Key Discussion Topics</h4>
                            <ul className={`space-y-3 text-sm font-medium ${dm ? 'text-gray-300' : 'text-gray-600'}`}>
                                <li>&bull; Handled `forwardRef` warnings inside the input block.</li>
                                <li>&bull; Implemented proper state lifting for the sidebar.</li>
                                <li>&bull; Covered 3 potential bugs with `useEffect` infinite loops.</li>
                            </ul>
                        </div>
                        <div className={`p-8 rounded-[2rem] border ${dm ? 'bg-purple-500/5 border-purple-500/20' : 'bg-purple-50 border-purple-200'}`}>
                            <h4 className={`text-lg font-black mb-4 flex items-center gap-2 ${dm ? 'text-purple-400' : 'text-purple-700'}`}><Zap size={18} className="text-purple-500" /> AI Tasks Assigned</h4>
                            <div className="space-y-3">
                                <div className={`p-3 rounded-xl border text-sm font-bold ${dm ? 'bg-black/30 border-white/5 text-purple-200' : 'bg-white border-purple-100 text-purple-800'}`}>Refactor Layout.jsx (Due tmrw)</div>
                                <div className={`p-3 rounded-xl border text-sm font-bold ${dm ? 'bg-black/30 border-white/5 text-purple-200' : 'bg-white border-purple-100 text-purple-800'}`}>Push fixes to feature branch</div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        )
    }

    return null
}

// ─── ATOMIC COMPONENTS ───

function ChoiceBtn({ icon: Icon, title, desc, onClick, dm, primary }) {
    return (
        <button
            onClick={onClick}
            className={`p-6 rounded-[2rem] border transition-all text-left flex items-center gap-6 group ${primary
                ? dm ? 'bg-blue-600/20 border-blue-500/30' : 'bg-blue-50 border-blue-100'
                : dm ? 'bg-white/5 border-white/5' : 'bg-white border-gray-100 shadow-xl shadow-gray-200/50'
                }`}
        >
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 ${primary ? 'bg-blue-500 text-white shadow-lg' : dm ? 'bg-gray-800 text-gray-400' : 'bg-gray-100 text-gray-500'}`}>
                <Icon size={26} />
            </div>
            <div>
                <h4 className={`font-black text-sm uppercase tracking-widest ${dm ? 'text-white' : 'text-gray-900'}`}>{title}</h4>
                <p className={`text-xs font-bold leading-relaxed ${dm ? 'text-gray-500' : 'text-gray-400'}`}>{desc}</p>
            </div>
        </button>
    )
}

function GroupCard({ group, dm, onJoin }) {
    return (
        <div className={`p-8 rounded-[2.5rem] border group transition-all duration-300 hover:shadow-2xl ${dm ? 'bg-[#1a222c] border-white/5 hover:border-blue-500/20' : 'bg-white border-gray-100 shadow-xl shadow-gray-200/50'}`}>
            <div className="flex justify-between items-start mb-10">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${group.bg} ${group.color}`}>
                    <group.icon size={28} />
                </div>
            </div>
            <h3 className={`text-2xl font-black mb-2 ${dm ? 'text-white' : 'text-gray-900'}`}>{group.name}</h3>
            <p className={`text-sm mb-10 font-medium ${dm ? 'text-gray-400' : 'text-gray-500'}`}>{group.description}</p>

            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm font-bold text-gray-500">
                    <Users size={16} /> {group.members} Members
                </div>
                <button
                    onClick={onJoin}
                    className="text-blue-500 font-black text-xs uppercase tracking-[0.2em] hover:tracking-[0.3em] transition-all"
                >
                    Join Now
                </button>
            </div>
        </div>
    )
}

function FormReq({ label, children, dm }) {
    return (
        <div className="space-y-3">
            <label className={`text-[10px] font-black uppercase tracking-[0.2em] ${dm ? 'text-gray-500' : 'text-gray-400'}`}>{label}</label>
            {children}
        </div>
    )
}

function StatsMini({ label, val, icon: Icon, dm, color = 'text-gray-500' }) {
    return (
        <div className={`p-6 rounded-3xl border text-center space-y-2 ${dm ? 'bg-white/5 border-white/5' : 'bg-gray-50 border-gray-100 shadow-sm'}`}>
            <Icon size={24} className={`mx-auto mb-2 ${color}`} />
            <div className={`text-2xl font-black ${dm ? 'text-white' : 'text-gray-900'}`}>{val}</div>
            <div className="text-[10px] font-black uppercase tracking-widest text-gray-500">{label}</div>
        </div>
    )
}

function SideTab({ icon: Icon, label, active, onClick, dm }) {
    return (
        <button onClick={onClick} className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all border ${active ? 'bg-blue-500 text-white border-blue-600 shadow-lg' : dm ? 'text-gray-400 border-transparent hover:bg-white/5' : 'text-gray-500 border-transparent hover:bg-gray-100'}`}>
            <Icon size={18} />
            <span className="font-black text-xs uppercase tracking-widest text-left">{label}</span>
        </button>
    )
}

// Sub-Arena Components
function ChatArena({ dm }) {
    const [msgs, setMsgs] = useState([
        { id: 1, user: "Mahek", text: "Ready for the group study session?", isCode: false },
        { id: 2, user: "Sarah D.", text: "Almost there, just wrapping up the AI match algorithm review. Attached the code snippet below.", isCode: true }
    ])
    const [inputVal, setInputVal] = useState('')
    const [showAttach, setShowAttach] = useState(false)
    const [showEmoji, setShowEmoji] = useState(false)
    const [activeModal, setActiveModal] = useState(null) // 'snippet', 'image', 'pdf', 'link'

    const handleSend = (options = {}) => {
        const text = options.text || inputVal
        if (!text.trim() && !options.type) return

        const newMsg = {
            id: Date.now(),
            user: "Mahek",
            text: text,
            type: options.type || 'text',
            content: options.content || null,
            aiHighlight: options.aiHighlight || null
        }

        setMsgs([...msgs, newMsg])
        setInputVal('')
        setShowEmoji(false)
        setShowAttach(false)
        setActiveModal(null)
    }

    const emojis = ["😀", "😂", "😢", "🔥", "👍", "❤️", "🎉", "🚀", "💡", "🧠"]

    return (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className={`h-[700px] rounded-[3rem] border flex flex-col overflow-hidden shadow-2xl ${dm ? 'bg-[#1a222c] border-white/5' : 'bg-white border-gray-100'}`}>
            <div className={`p-6 border-b flex justify-between items-center ${dm ? 'border-white/5' : 'border-gray-100'}`}>
                <div className="flex items-center gap-4">
                    <Hash size={24} className="text-blue-500" />
                    <div>
                        <h4 className={`font-black uppercase tracking-widest text-xs ${dm ? 'text-white' : 'text-gray-900'}`}>#General-Sync</h4>
                        <p className="text-[10px] font-bold text-gray-500">Pinned: Project deadline Friday</p>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <button className="p-2 rounded-xl border border-gray-200 dark:border-white/10 text-gray-500 hover:text-blue-500"><Activity size={18} /></button>
                </div>
            </div>

            <div className={`mx-8 mt-6 p-4 rounded-2xl border flex gap-3 ${dm ? 'bg-purple-500/10 border-purple-500/20' : 'bg-purple-50 border-purple-200'}`}>
                <div className="p-2 bg-purple-500 text-white rounded-xl self-start shadow-md"><Sparkles size={16} /></div>
                <div>
                    <h4 className={`text-[10px] font-black uppercase tracking-widest ${dm ? 'text-purple-400' : 'text-purple-700'}`}>AI Live Discussion Highlight</h4>
                    <p className={`text-sm font-medium mt-1 leading-relaxed ${dm ? 'text-purple-200' : 'text-purple-900'}`}>
                        Team is discussing <strong>AI match algorithms</strong>. Sarah is sharing a PDF. Check the <span className="underline cursor-pointer font-bold">threads</span>.
                    </p>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto p-8 space-y-8">
                {msgs.map((m, i) => (
                    <div key={m.id} className="space-y-4">
                        <Msg dm={dm} user={m.user} text={m.text} type={m.type} content={m.content} isCode={m.isCode} aiHighlight={m.aiHighlight} />
                        {i === 1 && (
                            <div className="flex justify-end gap-2 pr-4 -mt-2 text-[10px] text-gray-500 relative z-10">
                                <span className="flex items-center gap-1 bg-gray-100 dark:bg-white/5 px-2 py-1 rounded border dark:border-white/10">👍 2</span>
                                <span className="flex items-center gap-1 bg-gray-100 dark:bg-white/5 px-2 py-1 rounded border dark:border-white/10">🧠 1</span>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            <div className={`p-4 border-t relative flex flex-col justify-end ${dm ? 'border-white/5 bg-[#121820]' : 'border-gray-100 bg-gray-50'}`}>
                {/* Menus */}
                <AnimatePresence>
                    {showAttach && (
                        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} className={`absolute bottom-20 left-6 w-52 rounded-2xl border shadow-2xl overflow-hidden z-50 ${dm ? 'bg-[#1a222c] border-white/10' : 'bg-white border-gray-100'}`}>
                            <button onClick={() => setActiveModal('snippet')} className={`w-full flex items-center gap-3 p-4 text-sm font-bold hover:bg-white/5 transition-colors ${dm ? 'text-gray-300' : 'text-gray-700'}`}>
                                <Code2 size={18} className="text-blue-500" /> Share Snippet
                            </button>
                            <button onClick={() => setActiveModal('image')} className={`w-full flex items-center gap-3 p-4 text-sm font-bold hover:bg-white/5 transition-colors ${dm ? 'text-gray-300' : 'text-gray-700'}`}>
                                <Image size={18} className="text-pink-500" /> Upload Image
                            </button>
                            <button onClick={() => setActiveModal('pdf')} className={`w-full flex items-center gap-3 p-4 text-sm font-bold hover:bg-white/5 transition-colors ${dm ? 'text-gray-300' : 'text-gray-700'}`}>
                                <FileText size={18} className="text-purple-500" /> Upload PDF
                            </button>
                            <button onClick={() => setActiveModal('link')} className={`w-full flex items-center gap-3 p-4 text-sm font-bold hover:bg-white/5 transition-colors ${dm ? 'text-gray-300' : 'text-gray-700'}`}>
                                <Globe size={18} className="text-green-500" /> Share Link
                            </button>
                        </motion.div>
                    )}
                    {showEmoji && (
                        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} className={`absolute bottom-20 right-16 grid grid-cols-5 gap-2 p-4 rounded-2xl border shadow-2xl z-50 ${dm ? 'bg-[#1a222c] border-white/10' : 'bg-white border-gray-100'}`}>
                            {emojis.map(emoji => (
                                <button key={emoji} onClick={() => setInputVal(prev => prev + emoji)} className="w-10 h-10 rounded-xl flex items-center justify-center hover:bg-white/10 text-2xl transition-all active:scale-90">{emoji}</button>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>

                <div className={`flex items-center gap-3 px-4 py-3 rounded-2xl border ${dm ? 'bg-black/20 border-white/10 focus-within:border-blue-500/50' : 'bg-white border-gray-200 focus-within:border-blue-500/50'} transition-all`}>
                    <button onClick={() => { setShowAttach(!showAttach); setShowEmoji(false) }} className={`p-2 rounded-xl transition-colors ${showAttach ? 'text-blue-500 bg-blue-500/10' : 'text-gray-400 hover:text-blue-500'}`}>
                        <Paperclip size={20} />
                    </button>
                    <input
                        type="text"
                        value={inputVal}
                        onChange={(e) => setInputVal(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                        placeholder="Type a message or use @ to mention..."
                        className={`flex-1 bg-transparent outline-none text-sm font-medium ${dm ? 'text-white' : 'text-gray-900'}`}
                    />
                    <button onClick={() => { setShowEmoji(!showEmoji); setShowAttach(false) }} className={`p-2 rounded-xl transition-colors ${showEmoji ? 'text-blue-500 bg-blue-500/10' : 'text-gray-400 hover:text-blue-500'}`}>
                        <Smile size={20} />
                    </button>
                    <button onClick={() => handleSend()} className="p-2 bg-blue-500 text-white rounded-xl shadow-lg shadow-blue-500/30 hover:bg-blue-600 active:scale-95 transition-all">
                        <Send size={18} className="translate-x-[-1px] translate-y-[1px]" />
                    </button>
                </div>

                {/* Horizontal Quick Icons */}
                <div className="flex items-center gap-6 mt-4 pl-2 opacity-60 hover:opacity-100 transition-opacity">
                    <button onClick={() => setActiveModal('snippet')} className={`flex items-center gap-2 text-[10px] font-black uppercase tracking-widest ${dm ? 'text-gray-400 hover:text-blue-400' : 'text-gray-500 hover:text-blue-600'}`}>
                        <Code2 size={14} /> Code
                    </button>
                    <button onClick={() => setActiveModal('image')} className={`flex items-center gap-2 text-[10px] font-black uppercase tracking-widest ${dm ? 'text-gray-400 hover:text-pink-400' : 'text-gray-500 hover:text-pink-600'}`}>
                        <Image size={14} /> Image
                    </button>
                    <button onClick={() => setActiveModal('pdf')} className={`flex items-center gap-2 text-[10px] font-black uppercase tracking-widest ${dm ? 'text-gray-400 hover:text-purple-400' : 'text-gray-500 hover:text-purple-600'}`}>
                        <FileText size={14} /> PDF
                    </button>
                    <button onClick={() => setActiveModal('link')} className={`flex items-center gap-2 text-[10px] font-black uppercase tracking-widest ${dm ? 'text-gray-400 hover:text-green-400' : 'text-gray-500 hover:text-green-600'}`}>
                        <Globe size={14} /> Link
                    </button>
                </div>
            </div>

            {/* Modals Overlay */}
            <AnimatePresence>
                {activeModal && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[6000] flex items-center justify-center p-6 bg-black/60 backdrop-blur-sm">
                        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className={`w-full max-w-2xl rounded-[3rem] border shadow-2xl overflow-hidden ${dm ? 'bg-[#1a222c] border-white/5' : 'bg-white border-gray-100'}`}>
                            {activeModal === 'snippet' && <SnippetModal dm={dm} onSend={(data) => handleSend({ type: 'snippet', content: data, aiHighlight: 'AI Code Review: No errors found. Time complexity O(n).' })} onClose={() => setActiveModal(null)} />}
                            {activeModal === 'image' && <ImageModal dm={dm} onSend={(data) => handleSend({ type: 'image', content: data, aiHighlight: 'AI OCR: Extracted "Error: Cannot read property of undefined".' })} onClose={() => setActiveModal(null)} />}
                            {activeModal === 'pdf' && <PdfModal dm={dm} onSend={(data) => handleSend({ type: 'pdf', content: data, aiHighlight: 'AI Summary: This PDF covers React 19 concurrent features.' })} onClose={() => setActiveModal(null)} />}
                            {activeModal === 'link' && <LinkModal dm={dm} onSend={(data) => handleSend({ type: 'link', content: data, aiHighlight: 'AI Content Summary: Documentation page about Framer Motion.' })} onClose={() => setActiveModal(null)} />}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    )
}

function Msg({ dm, user, text, type, content, isCode, aiHighlight }) {
    return (
        <div className="flex gap-4 group">
            <div className={`w-10 h-10 shrink-0 rounded-2xl flex items-center justify-center font-black ${user === "Mahek" ? 'bg-green-500/20 text-green-500' : 'bg-blue-500/20 text-blue-400'}`}>
                {user.charAt(0)}
            </div>
            <div className="space-y-2.5 flex-1 w-full max-w-2xl">
                <div className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-2">{user}</div>
                <div className={`p-5 rounded-[2rem] rounded-tl-none text-sm font-medium leading-relaxed shadow-lg ${dm ? 'bg-white/5 border border-white/10 text-gray-300' : 'bg-gray-50 border border-gray-100 text-gray-700'}`}>
                    {text && <div className="mb-3">{text}</div>}

                    {/* Snippet Message */}
                    {(type === 'snippet' || isCode) && (
                        <div className="rounded-2xl bg-[#0d1117] border border-gray-700 font-mono text-xs overflow-hidden">
                            <div className="px-4 py-2 border-b border-gray-700 bg-black/40 flex justify-between items-center">
                                <span className="text-gray-500 uppercase tracking-widest font-black text-[9px]">{content?.lang || 'Javascript'}</span>
                                <button className="text-blue-400 hover:text-blue-300">Copy</button>
                            </div>
                            <div className="p-4 text-blue-300 whitespace-pre">
                                {content?.code || `const matchPeers = async () => {\n  await aiModule.rank();\n}`}
                            </div>
                        </div>
                    )}

                    {/* Image Message */}
                    {type === 'image' && (
                        <div className="rounded-2xl border border-white/10 overflow-hidden bg-black/20">
                            <img src={content?.url || 'https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=800&auto=format&fit=crop'} alt="upload" className="w-full max-h-80 object-cover" />
                            {content?.caption && <div className="p-3 text-xs text-gray-400 italic font-bold border-t border-white/5 bg-black/20">{content.caption}</div>}
                        </div>
                    )}

                    {/* PDF Message */}
                    {type === 'pdf' && (
                        <div className={`p-4 rounded-xl border flex items-center justify-between ${dm ? 'bg-purple-500/5 border-purple-500/20' : 'bg-purple-50 border-purple-100'}`}>
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-red-500 text-white rounded-lg"><FileText size={18} /></div>
                                <div>
                                    <div className={`font-bold text-xs truncate max-w-[150px] ${dm ? 'text-white' : 'text-gray-900'}`}>{content?.name || 'StudyNotes.pdf'}</div>
                                    <div className="text-[10px] text-gray-500 font-bold">PDF · {content?.size || '1.2 MB'}</div>
                                </div>
                            </div>
                            <button className="text-blue-500 hover:text-blue-600"><Download size={18} /></button>
                        </div>
                    )}

                    {/* Link Message */}
                    {type === 'link' && (
                        <div className={`p-4 rounded-xl border flex gap-4 ${dm ? 'bg-blue-500/10 border-blue-500/20' : 'bg-blue-50 border-blue-100'}`}>
                            <div className="w-16 h-16 rounded-lg bg-gray-200 overflow-hidden shrink-0">
                                <img src="https://images.unsplash.com/photo-1614850523296-d8c1af93d400?w=200" className="w-full h-full object-cover" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className={`font-black text-xs uppercase tracking-widest truncate ${dm ? 'text-blue-400' : 'text-blue-700'}`}>{content?.url || 'framer.com/motion'}</div>
                                <h4 className={`text-sm font-bold mt-1 truncate ${dm ? 'text-white' : 'text-gray-900'}`}>Framer Motion - Production Ready Gestures</h4>
                                <div className="text-[10px] text-gray-500 line-clamp-1 mt-1">Open source React library for creating smooth animations.</div>
                            </div>
                        </div>
                    )}

                    {/* AI Smart Highlight */}
                    {aiHighlight && (
                        <div className="mt-4 pt-4 border-t border-white/5 flex gap-3">
                            <Sparkles size={14} className="text-yellow-500 shrink-0 mt-0.5" />
                            <div className="text-[11px] font-bold text-gray-500 italic leading-relaxed">
                                {aiHighlight}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

function SnippetModal({ dm, onSend, onClose }) {
    const [lang, setLang] = useState('Javascript')
    const [code, setCode] = useState('')
    return (
        <div className="flex flex-col h-full max-h-[80vh]">
            <div className="p-6 border-b border-white/5 flex justify-between items-center">
                <h3 className={`text-xl font-black ${dm ? 'text-white' : 'text-gray-900'}`}>Share Code Snippet</h3>
                <div className="flex items-center gap-3">
                    <select value={lang} onChange={e => setLang(e.target.value)} className={`bg-black/20 border border-white/10 rounded-lg px-3 py-1.5 text-xs font-bold outline-none ${dm ? 'text-gray-300' : 'text-gray-700'}`}>
                        {['Javascript', 'Python', 'C++', 'CSS', 'HTML'].map(l => <option key={l} value={l}>{l}</option>)}
                    </select>
                    <button onClick={onClose} className="p-2 text-gray-500 hover:text-white"><ArrowLeft size={18} /></button>
                </div>
            </div>
            <div className={`p-6 flex-1 bg-black/40 overflow-hidden flex flex-col`}>
                <div className="mb-4 flex gap-4">
                    <button className="px-3 py-1.5 bg-blue-500 text-white rounded-lg text-xs font-bold flex items-center gap-2"><Play size={12} /> Run</button>
                    <button className="px-3 py-1.5 bg-white/5 border border-white/10 text-gray-400 rounded-lg text-xs font-bold">Copy</button>
                    <div className="flex-1" />
                    <label className="flex items-center gap-2 text-[10px] font-black uppercase text-gray-500">
                        <input type="checkbox" defaultChecked className="rounded border-white/10 bg-white/5 h-3 w-3" /> Save to group
                    </label>
                </div>
                <textarea
                    value={code} onChange={e => setCode(e.target.value)}
                    placeholder="// Paste your code here..."
                    className="flex-1 w-full bg-transparent font-mono text-xs text-blue-300 outline-none resize-none border-t border-white/5 pt-4"
                />
                <div className="mt-4 p-4 rounded-xl bg-blue-500/5 border border-blue-500/10 flex gap-3">
                    <Brain size={18} className="text-blue-500 shrink-0" />
                    <p className="text-[10px] text-blue-400 font-bold leading-relaxed">AI Review will auto-activate on send to detect errors and analyze complexity.</p>
                </div>
            </div>
            <div className="p-6 border-t border-white/5 flex gap-4">
                <button onClick={onClose} className={`px-6 py-3 rounded-xl font-bold border ${dm ? 'border-white/10 text-gray-500' : 'border-gray-200'}`}>Cancel</button>
                <button onClick={() => onSend({ lang, code })} className="flex-1 py-3 bg-blue-500 text-white rounded-xl font-black shadow-lg shadow-blue-500/20">Send to Discussion</button>
            </div>
        </div>
    )
}

function ImageModal({ dm, onSend, onClose }) {
    const [caption, setCaption] = useState('')
    return (
        <div className="flex flex-col h-full">
            <div className="p-6 border-b border-white/5 flex justify-between items-center">
                <h3 className={`text-xl font-black ${dm ? 'text-white' : 'text-gray-900'}`}>Upload Image</h3>
                <button onClick={onClose} className="p-2 text-gray-500 hover:text-white"><ArrowLeft size={18} /></button>
            </div>
            <div className="p-10 flex flex-col items-center">
                <div className={`w-full aspect-video rounded-[2rem] border-2 border-dashed flex flex-col items-center justify-center gap-4 group cursor-pointer hover:border-pink-500/50 transition-all ${dm ? 'bg-white/5 border-white/10' : 'bg-gray-50 border-gray-200'}`}>
                    <div className="p-5 bg-pink-500/10 text-pink-500 rounded-3xl group-hover:scale-110 transition-transform"><Image size={40} /></div>
                    <div className="text-center">
                        <p className={`font-black text-sm ${dm ? 'text-white' : 'text-gray-900'}`}>Drop screenshot or diagram here</p>
                        <p className="text-xs text-gray-500 font-bold mt-1">Supports PNG, JPG (Max 10MB)</p>
                    </div>
                </div>
                <input
                    type="text" value={caption} onChange={e => setCaption(e.target.value)}
                    placeholder="Add a caption..."
                    className={`w-full mt-8 p-4 rounded-2xl border outline-none font-bold text-sm ${dm ? 'bg-black/20 border-white/10 text-white' : 'bg-gray-50 border-gray-200'}`}
                />
                <div className="mt-8 p-4 w-full rounded-xl bg-pink-500/5 border border-pink-500/10 flex gap-3">
                    <Sparkles size={18} className="text-pink-500 shrink-0" />
                    <p className="text-[10px] text-pink-400 font-bold leading-relaxed">AI Smart Vision will extract text (OCR) and explain any error screens automatically.</p>
                </div>
            </div>
            <div className="p-6 border-t border-white/5 flex gap-4">
                <button onClick={onClose} className={`px-6 py-3 rounded-xl font-bold border ${dm ? 'border-white/10 text-gray-500' : 'border-gray-200'}`}>Cancel</button>
                <button onClick={() => onSend({ url: null, caption })} className="flex-1 py-3 bg-pink-500 text-white rounded-xl font-black shadow-lg shadow-pink-500/20">Send to Discussion</button>
            </div>
        </div>
    )
}

function PdfModal({ dm, onSend, onClose }) {
    return (
        <div className="flex flex-col h-full">
            <div className="p-6 border-b border-white/5 flex justify-between items-center">
                <h3 className={`text-xl font-black ${dm ? 'text-white' : 'text-gray-900'}`}>Upload Study Material</h3>
                <button onClick={onClose} className="p-2 text-gray-500 hover:text-white"><ArrowLeft size={18} /></button>
            </div>
            <div className="p-10 flex flex-col items-center">
                <div className={`w-full aspect-[2/1] rounded-[2rem] border-2 border-dashed flex items-center gap-6 p-8 group cursor-pointer hover:border-purple-500/50 transition-all ${dm ? 'bg-white/5 border-white/10' : 'bg-gray-50 border-gray-200'}`}>
                    <div className="p-6 bg-purple-500/10 text-purple-500 rounded-3xl group-hover:scale-110 transition-transform"><FileText size={48} /></div>
                    <div className="text-left">
                        <p className={`font-black text-lg ${dm ? 'text-white' : 'text-gray-900'}`}>Select PDF Notes</p>
                        <p className="text-xs text-gray-500 font-bold mt-1">Research papers, Assignments, or Cheat sheets</p>
                    </div>
                </div>
                <div className="mt-10 grid grid-cols-2 gap-4 w-full">
                    <div className={`p-4 rounded-xl border ${dm ? 'bg-white/5 border-white/10 text-gray-400' : 'bg-gray-50 border-gray-100 text-gray-500'} text-[10px] font-black uppercase`}>Auto-Tagging Enabled</div>
                    <div className={`p-4 rounded-xl border ${dm ? 'bg-white/5 border-white/10 text-gray-400' : 'bg-gray-50 border-gray-100 text-gray-500'} text-[10px] font-black uppercase`}>AI Summary Generator</div>
                </div>
            </div>
            <div className="p-6 border-t border-white/5 flex gap-4">
                <button onClick={onClose} className={`px-6 py-3 rounded-xl font-bold border ${dm ? 'border-white/10 text-gray-500' : 'border-gray-200'}`}>Cancel</button>
                <button onClick={() => onSend({ name: 'Architecture_Ref.pdf', size: '2.4 MB' })} className="flex-1 py-3 bg-purple-500 text-white rounded-xl font-black shadow-lg shadow-purple-500/20">Upload & Summarize</button>
            </div>
        </div>
    )
}

function LinkModal({ dm, onSend, onClose }) {
    const [url, setUrl] = useState('')
    return (
        <div className="flex flex-col h-full">
            <div className="p-6 border-b border-white/5 flex justify-between items-center">
                <h3 className={`text-xl font-black ${dm ? 'text-white' : 'text-gray-900'}`}>Share Resource Link</h3>
                <button onClick={onClose} className="p-2 text-gray-500 hover:text-white"><ArrowLeft size={18} /></button>
            </div>
            <div className="p-10 space-y-8">
                <FormReq label="External URL" dm={dm}>
                    <div className={`flex items-center gap-3 p-4 rounded-2xl border ${dm ? 'bg-black/20 border-white/10' : 'bg-gray-50 border-gray-200'}`}>
                        <Globe size={18} className="text-green-500" />
                        <input value={url} onChange={e => setUrl(e.target.value)} type="text" placeholder="https://github.com/reactjs/..." className="flex-1 bg-transparent outline-none text-sm font-bold" />
                    </div>
                </FormReq>
                <div className={`p-6 rounded-2xl border ${dm ? 'bg-white/5 border-white/5' : 'bg-gray-50 border-gray-100'}`}>
                    <div className="flex gap-4">
                        <div className="w-12 h-12 bg-white/5 rounded-lg flex items-center justify-center text-gray-500"><Search size={24} /></div>
                        <div className="flex-1">
                            <div className="h-4 w-32 bg-gray-500/20 rounded mb-2"></div>
                            <div className="h-3 w-48 bg-gray-500/10 rounded"></div>
                        </div>
                    </div>
                    <p className="mt-4 text-[10px] text-gray-500 font-black uppercase text-center">AI is ready to generate an instant preview card</p>
                </div>
            </div>
            <div className="p-6 border-t border-white/5 flex gap-4">
                <button onClick={onClose} className={`px-6 py-3 rounded-xl font-bold border ${dm ? 'border-white/10 text-gray-500' : 'border-gray-200'}`}>Cancel</button>
                <button onClick={() => onSend({ url })} className="flex-1 py-3 bg-green-500 text-white rounded-xl font-black shadow-lg shadow-green-500/20">Generate Preview & Send</button>
            </div>
        </div>
    )
}
function LBView({ dm }) {
    const leaders = [
        { rank: 1, name: 'Mahek', score: 980, badges: '🔥 Streak Explorer', hours: '45h' },
        { rank: 2, name: 'Sarah D.', score: 850, badges: '🎯 Quiz Ace', hours: '38h' },
        { rank: 3, name: 'John K.', score: 720, badges: '🧠 Top Helper', hours: '30h' },
    ]
    return (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className={`p-8 lg:p-12 rounded-[3rem] border shadow-2xl space-y-10 ${dm ? 'bg-[#1a222c] border-white/5' : 'bg-white border-gray-100'}`}>
            <div className="flex justify-between items-center">
                <h3 className={`text-3xl font-black flex items-center gap-3 ${dm ? 'text-white' : 'text-gray-900'}`}><Trophy className="text-yellow-500" size={32} /> Group Leaderboard</h3>
                <div className="px-4 py-2 bg-blue-500/10 text-blue-500 rounded-xl text-xs font-bold border border-blue-500/20">Balanced AI Ranking</div>
            </div>

            <div className="space-y-4">
                {leaders.map((l) => (
                    <div key={l.rank} className={`flex flex-col sm:flex-row items-center justify-between p-6 rounded-3xl border transition-all ${dm ? 'bg-white/5 border-white/10 hover:bg-white/10' : 'bg-gray-50 border-gray-100 hover:bg-gray-100'}`}>
                        <div className="flex w-full sm:w-auto items-center gap-6 mb-4 sm:mb-0">
                            <div className={`shrink-0 w-14 h-14 flex items-center justify-center font-black text-2xl rounded-full ${l.rank === 1 ? 'bg-yellow-500 text-white shadow-lg shadow-yellow-500/30' : l.rank === 2 ? 'bg-gray-300 text-gray-800' : 'bg-orange-400 text-white'}`}>
                                #{l.rank}
                            </div>
                            <div>
                                <h4 className={`text-xl font-bold ${dm ? 'text-white' : 'text-gray-900'}`}>{l.name}</h4>
                                <div className="text-sm font-bold text-gray-500 flex items-center gap-2 mt-1">
                                    <Clock size={14} /> {l.hours} studied
                                </div>
                            </div>
                        </div>
                        <div className="flex w-full sm:w-auto items-center justify-between sm:justify-end gap-6">
                            <div className={`px-4 py-2 rounded-xl text-xs font-bold border whitespace-nowrap ${dm ? 'bg-purple-500/10 border-purple-500/20 text-purple-400' : 'bg-purple-50 border-purple-200 text-purple-600'}`}>
                                {l.badges}
                            </div>
                            <div className="text-3xl font-black text-blue-500">{l.score} <span className="text-sm text-gray-500 opacity-50">PTS</span></div>
                        </div>
                    </div>
                ))}
            </div>
        </motion.div>
    )
}

function TasksArea({ dm }) {
    const tasks = [
        { id: 1, title: 'Build a mini project (React)', deadline: 'Tomorrow', assigned: 'Mahek & Sarah', status: 'In Progress', progress: 60 },
        { id: 2, title: 'Solve 50 coding problems', deadline: 'Next Week', assigned: 'All Members', status: 'Pending', progress: 10 },
        { id: 3, title: 'Complete Module 2 together', deadline: 'Done', assigned: 'All Members', status: 'Completed', progress: 100 },
    ]
    return (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className={`p-8 lg:p-12 rounded-[3rem] border shadow-2xl space-y-10 ${dm ? 'bg-[#1a222c] border-white/5' : 'bg-white border-gray-100'}`}>
            <div className="flex justify-between items-center">
                <h3 className={`text-3xl font-black flex items-center gap-3 ${dm ? 'text-white' : 'text-gray-900'}`}><Layout className="text-blue-500" size={32} /> Collaborative Tasks</h3>
                <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-purple-500/10 border border-purple-500/20 text-xs font-bold text-purple-500"><Sparkles size={14} /> AI Detected Weak Spots</div>
            </div>

            <div className="grid grid-cols-1 gap-6">
                {tasks.map(t => (
                    <div key={t.id} className={`p-8 rounded-[2rem] border flex flex-col gap-6 transition-all hover:-translate-y-1 ${dm ? 'bg-white/5 border-white/10' : 'bg-gray-50 border-gray-100'}`}>
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                            <div>
                                <h4 className={`text-xl font-bold ${dm ? 'text-white' : 'text-gray-900'}`}>{t.title}</h4>
                                <div className="text-sm font-bold text-gray-500 flex flex-wrap items-center gap-4 md:gap-6 mt-2">
                                    <span className="flex items-center gap-1.5"><Calendar size={14} className="text-orange-500" /> {t.deadline}</span>
                                    <span className="flex items-center gap-1.5"><Users size={14} className="text-blue-500" /> {t.assigned}</span>
                                </div>
                            </div>
                            <div className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest border ${t.progress === 100 ? 'bg-green-500/10 text-green-500 border-green-500/30' : 'bg-blue-500/10 text-blue-500 border-blue-500/30'}`}>
                                {t.status}
                            </div>
                        </div>
                        <div className="w-full h-3 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden shadow-inner">
                            <div className={`h-full relative rounded-full ${t.progress === 100 ? 'bg-green-500' : 'bg-gradient-to-r from-blue-400 to-blue-600'}`} style={{ width: `${t.progress}%` }}>
                                {t.progress < 100 && <div className="absolute inset-0 bg-white/20 animate-pulse" />}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </motion.div>
    )
}

function ScheduleArea({ dm, setView }) {
    const [sessions, setSessions] = useState([
        { id: 1, day: '24', month: 'Today', title: 'React UI Challenge Session', time: '8:00 PM - 9:30 PM', attendees: 14, type: 'Live' }
    ])
    const [showNew, setShowNew] = useState(false)
    const [formData, setFormData] = useState({ title: '', date: '', time: '', attendees: '0' })

    const handleAdd = () => {
        if (!formData.title || !formData.date) return
        const newSession = {
            id: Date.now(),
            day: formData.date.split('-')[2] || '??',
            month: 'Upcoming',
            title: formData.title,
            time: formData.time || 'TBD',
            attendees: parseInt(formData.attendees) || 0,
            type: 'Scheduled'
        }
        setSessions([newSession, ...sessions])
        setShowNew(false)
        setFormData({ title: '', date: '', time: '', attendees: '0' })
    }

    return (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className={`p-8 lg:p-12 rounded-[3rem] border shadow-2xl space-y-10 relative ${dm ? 'bg-[#1a222c] border-white/5' : 'bg-white border-gray-100'}`}>
            <div className="flex justify-between items-center">
                <h3 className={`text-3xl font-black flex items-center gap-3 ${dm ? 'text-white' : 'text-gray-900'}`}><Calendar className="text-purple-500" size={32} /> Master Schedule</h3>
                <button onClick={() => setShowNew(true)} className={`px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest border transition-colors flex items-center gap-2 ${dm ? 'border-white/10 hover:bg-white/10 text-gray-300' : 'border-gray-200 hover:bg-gray-50 text-gray-600'}`}><Plus size={16} /> New</button>
            </div>

            <div className={`p-6 rounded-[2rem] flex items-center gap-5 border shadow-xl ${dm ? 'bg-gradient-to-r from-blue-900/30 to-purple-900/30 border-blue-500/20' : 'bg-gradient-to-r from-blue-50 to-purple-50 border-blue-100'}`}>
                <div className="p-4 bg-blue-500 rounded-2xl text-white shadow-lg"><Brain size={24} /></div>
                <div>
                    <h4 className={`text-lg font-black ${dm ? 'text-blue-400' : 'text-blue-800'}`}>AI Suggested Time: 8:00 PM EST</h4>
                    <p className="text-sm font-medium text-gray-500 mt-1">Based on global timezones, 90% of members are active.</p>
                </div>
            </div>

            <div className="space-y-4">
                {sessions.map(s => (
                    <div key={s.id} className={`p-8 rounded-[2rem] border flex flex-col md:flex-row items-start md:items-center justify-between gap-6 ${dm ? 'bg-white/5 border-white/10 hover:bg-white/10 transition-colors' : 'bg-gray-50 border-gray-100 hover:bg-gray-100 transition-colors'}`}>
                        <div className="flex items-center gap-6 md:gap-10">
                            <div className="text-center font-black shrink-0">
                                <div className={`text-[10px] uppercase tracking-widest mb-1 ${s.month === 'Today' ? 'text-red-500' : 'text-blue-500'}`}>{s.month}</div>
                                <div className={`text-4xl ${dm ? 'text-white' : 'text-gray-900'}`}>{s.day}</div>
                            </div>
                            <div className="hidden md:block w-px h-16 bg-gray-200 dark:bg-gray-800" />
                            <div>
                                <h4 className={`text-xl font-bold ${dm ? 'text-white' : 'text-gray-900'}`}>{s.title}</h4>
                                <div className="text-sm font-bold text-gray-500 flex items-center gap-4 mt-2">
                                    <span className="flex items-center gap-1.5"><Clock size={16} className="text-blue-500" /> {s.time}</span>
                                    <span className="flex items-center gap-1.5"><Users size={16} className="text-purple-500" /> {s.attendees} Attending</span>
                                </div>
                            </div>
                        </div>
                        {s.month === 'Today' ? (
                            <button onClick={() => setView('live-meet')} className="w-full md:w-auto px-8 py-4 bg-blue-500 hover:bg-blue-600 text-white rounded-xl font-black text-sm shadow-xl shadow-blue-500/20 active:scale-95 transition-all flex justify-center items-center gap-2">
                                <Play size={18} /> Enter Meet
                            </button>
                        ) : (
                            <button className={`w-full md:w-auto px-8 py-4 border rounded-xl font-black text-sm transition-all ${dm ? 'border-white/10 text-gray-400 hover:bg-white/5' : 'border-gray-200 text-gray-500 hover:bg-gray-50'}`}>Reminder Set</button>
                        )}
                    </div>
                ))}
            </div>

            {/* New Session Modal */}
            <AnimatePresence>
                {showNew && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[7000] flex items-center justify-center p-6 bg-black/60 backdrop-blur-sm">
                        <motion.div initial={{ scale: 0.9, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.9, opacity: 0, y: 20 }} className={`w-full max-w-lg rounded-[3rem] border shadow-2xl overflow-hidden ${dm ? 'bg-[#1a222c] border-white/5' : 'bg-white border-gray-100'}`}>
                            <div className="p-8 space-y-8">
                                <div className="flex justify-between items-center">
                                    <h3 className={`text-2xl font-black ${dm ? 'text-white' : 'text-gray-900'}`}>New Group Session</h3>
                                    <button onClick={() => setShowNew(false)} className="p-2 text-gray-500 hover:text-white"><ArrowLeft size={24} /></button>
                                </div>
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase text-gray-500 tracking-widest ml-1">Session Title</label>
                                        <input value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} placeholder="e.g. Brainstorming Phase 1" className={`w-full p-4 rounded-2xl border outline-none font-bold text-sm ${dm ? 'bg-black/20 border-white/10 text-white' : 'bg-gray-50 border-gray-200'}`} />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black uppercase text-gray-500 tracking-widest ml-1">Date</label>
                                            <input type="date" value={formData.date} onChange={e => setFormData({ ...formData, date: e.target.value })} className={`w-full p-4 rounded-2xl border outline-none font-bold text-sm ${dm ? 'bg-black/20 border-white/10 text-white' : 'bg-gray-50 border-gray-200'}`} />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black uppercase text-gray-500 tracking-widest ml-1">Time Range</label>
                                            <input value={formData.time} onChange={e => setFormData({ ...formData, time: e.target.value })} placeholder="9:00 AM - 10:00 AM" className={`w-full p-4 rounded-2xl border outline-none font-bold text-sm ${dm ? 'bg-black/20 border-white/10 text-white' : 'bg-gray-50 border-gray-200'}`} />
                                        </div>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <button onClick={() => setShowNew(false)} className={`flex-1 py-4 rounded-2xl font-bold border ${dm ? 'border-white/10 text-gray-500' : 'border-gray-200'}`}>Cancel</button>
                                    <button onClick={handleAdd} className="flex-1 py-4 bg-blue-500 text-white rounded-2xl font-black shadow-lg shadow-blue-500/20 active:scale-95 transition-all">Schedule Meet</button>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    )
}

function ResourcesArea({ dm }) {
    const [openMenu, setOpenMenu] = useState(null)
    const [activeModal, setActiveModal] = useState(null) // 'summary', 'vault', 'report'
    const [selectedRes, setSelectedRes] = useState(null)
    const [downloadingId, setDownloadingId] = useState(null)
    const [downloadProgress, setDownloadProgress] = useState(0)
    const [copyStatus, setCopyStatus] = useState(null)

    const resources = [
        { id: 1, name: 'Redux Advanced Handout.pdf', type: 'PDF', size: '2.4 MB', tags: ['React', 'State', 'Must Read'], downloads: 145 },
        { id: 2, name: 'auth_middleware.js', type: 'Code', size: '4 KB', tags: ['Node', 'Security'], downloads: 89 },
        { id: 3, name: 'Weekly Recording (24th Feb).mp4', type: 'Video', size: '145 MB', tags: ['Session', 'Review'], downloads: 210 },
    ]

    const handleDownload = (res) => {
        setDownloadingId(res.id)
        setDownloadProgress(0)
        let progress = 0
        const interval = setInterval(() => {
            progress += 10
            setDownloadProgress(progress)
            if (progress >= 100) {
                clearInterval(interval)
                setTimeout(() => setDownloadingId(null), 1000)
            }
        }, 200)
    }

    const handleCopy = (res) => {
        setCopyStatus(res.id)
        setTimeout(() => setCopyStatus(null), 2000)
    }

    return (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className={`p-8 lg:p-12 rounded-[3rem] border shadow-2xl space-y-10 ${dm ? 'bg-[#1a222c] border-white/5' : 'bg-white border-gray-100'}`}>
            <div className="flex justify-between items-center">
                <h3 className={`text-3xl font-black flex items-center gap-3 ${dm ? 'text-white' : 'text-gray-900'}`}><Target className="text-orange-500" size={32} /> Shared Resource Hub</h3>
                <div className="flex gap-2 text-xs font-bold text-gray-500 relative">
                    <span className="flex items-center gap-1.5 px-4 py-2 border dark:border-white/10 rounded-xl bg-gray-50 dark:bg-white/5"><Sparkles size={14} className="text-purple-500" /> Active Auto-tags</span>
                    <AnimatePresence>
                        {copyStatus && (
                            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="absolute -top-12 right-0 bg-green-500 text-white px-4 py-2 rounded-xl text-xs font-black shadow-lg">Link Copied! 🔗</motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {resources.map((r) => (
                    <div key={r.id} className={`p-6 rounded-[2rem] border flex flex-col gap-6 transition-all hover:shadow-xl hover:-translate-y-1 relative ${dm ? 'bg-white/5 border-white/10 hover:bg-white/10' : 'bg-gray-50 border-gray-100 hover:bg-white'}`}>
                        <div className="flex justify-between items-start">
                            <div className={`p-4 rounded-2xl shadow-lg flex items-center justify-center ${r.type === 'PDF' ? 'bg-red-500/10 text-red-500 shadow-red-500/10' : r.type === 'Code' ? 'bg-blue-500/10 text-blue-500 shadow-blue-500/10' : 'bg-purple-500/10 text-purple-500 shadow-purple-500/10'}`}>
                                {r.type === 'PDF' ? <FileText size={24} /> : r.type === 'Code' ? <Code2 size={24} /> : <PlayCircle size={24} />}
                            </div>
                            <div className="relative">
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        setOpenMenu(openMenu === r.id ? null : r.id)
                                    }}
                                    className={`p-2 rounded-xl transition-colors ${openMenu === r.id ? 'bg-blue-500 text-white' : 'text-gray-400 hover:text-blue-500'}`}
                                >
                                    <MoreVertical size={20} />
                                </button>

                                <AnimatePresence>
                                    {openMenu === r.id && (
                                        <motion.div
                                            initial={{ opacity: 0, scale: 0.9, y: 10 }}
                                            animate={{ opacity: 1, scale: 1, y: 0 }}
                                            exit={{ opacity: 0, scale: 0.9, y: 10 }}
                                            className={`absolute right-0 mt-2 w-52 rounded-2xl border shadow-2xl overflow-hidden z-[100] ${dm ? 'bg-[#1a222c] border-white/10' : 'bg-white border-gray-100'}`}
                                        >
                                            <div className="p-2 space-y-1">
                                                <button onClick={() => { handleDownload(r); setOpenMenu(null) }} className={`w-full flex items-center gap-3 p-3 text-xs font-bold rounded-xl transition-colors ${dm ? 'text-gray-300 hover:bg-white/5' : 'text-gray-700 hover:bg-gray-50'}`}>
                                                    <Download size={14} className="text-blue-500" /> Download
                                                </button>
                                                <button onClick={() => { setSelectedRes(r); setActiveModal('summary'); setOpenMenu(null) }} className={`w-full flex items-center gap-3 p-3 text-xs font-bold rounded-xl transition-colors ${dm ? 'text-gray-300 hover:bg-white/5' : 'text-gray-700 hover:bg-gray-50'}`}>
                                                    <Sparkles size={14} className="text-purple-500" /> AI Summary
                                                </button>
                                                <button onClick={() => { handleCopy(r); setOpenMenu(null) }} className={`w-full flex items-center gap-3 p-3 text-xs font-bold rounded-xl transition-colors ${dm ? 'text-gray-300 hover:bg-white/5' : 'text-gray-700 hover:bg-gray-50'}`}>
                                                    <Share2 size={14} className="text-green-500" /> Copy Link
                                                </button>
                                                <button onClick={() => { setSelectedRes(r); setActiveModal('vault'); setOpenMenu(null) }} className={`w-full flex items-center gap-3 p-3 text-xs font-bold rounded-xl transition-colors ${dm ? 'text-gray-300 hover:bg-white/5' : 'text-gray-700 hover:bg-gray-50'}`}>
                                                    <ShieldCheck size={14} className="text-yellow-500" /> Save to Vault
                                                </button>
                                                <div className={`h-px my-1 ${dm ? 'bg-white/5' : 'bg-gray-100'}`} />
                                                <button onClick={() => { setSelectedRes(r); setActiveModal('report'); setOpenMenu(null) }} className={`w-full flex items-center gap-3 p-3 text-xs font-bold rounded-xl transition-colors text-red-500 ${dm ? 'hover:bg-red-500/10' : 'hover:bg-red-50'}`}>
                                                    <AlertCircle size={14} /> Report Issue
                                                </button>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>
                        <div>
                            <h4 className={`text-lg font-bold ${dm ? 'text-white' : 'text-gray-900'}`}>{r.name}</h4>
                            <div className="flex items-center justify-between mt-1">
                                <div className="text-xs font-bold text-gray-500">{r.size} &bull; Uploaded recently</div>
                                <div className="text-[10px] font-black uppercase text-blue-500/60 flex items-center gap-1"><Download size={10} /> {r.downloads} Downloads</div>
                            </div>
                        </div>

                        {downloadingId === r.id && (
                            <div className="space-y-2">
                                <div className="flex justify-between text-[10px] font-black text-blue-500 uppercase tracking-widest">
                                    <span>Downloading...</span>
                                    <span>{downloadProgress}%</span>
                                </div>
                                <div className="h-1.5 w-full bg-gray-200 dark:bg-black/40 rounded-full overflow-hidden">
                                    <motion.div initial={{ width: 0 }} animate={{ width: `${downloadProgress}%` }} className="h-full bg-blue-500" />
                                </div>
                            </div>
                        )}

                        <div className="flex flex-wrap gap-2 mt-auto">
                            {r.tags.map(t => (
                                <span key={t} className={`px-3 py-1.5 rounded-xl border text-[10px] font-black uppercase tracking-widest ${dm ? 'border-white/10 text-blue-400 bg-blue-500/5' : 'border-gray-200 text-blue-600 bg-white'}`}>{t}</span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            {/* Resources Modals */}
            <AnimatePresence>
                {activeModal && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[6000] flex items-center justify-center p-6 bg-black/60 backdrop-blur-sm">
                        <motion.div initial={{ scale: 0.9, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.9, opacity: 0, y: 20 }} className={`w-full max-w-xl rounded-[3rem] border shadow-2xl overflow-hidden ${dm ? 'bg-[#1a222c] border-white/5' : 'bg-white border-gray-100'}`}>
                            {/* Summary Modal */}
                            {activeModal === 'summary' && (
                                <div className="p-10 space-y-8">
                                    <div className="flex justify-between items-start">
                                        <div className="flex items-center gap-4">
                                            <div className="p-3 bg-purple-500 text-white rounded-2xl shadow-lg"><Sparkles size={24} /></div>
                                            <div>
                                                <h3 className={`text-2xl font-black ${dm ? 'text-white' : 'text-gray-900'}`}>{selectedRes?.name}</h3>
                                                <p className="text-xs font-bold text-gray-500 mt-1 uppercase tracking-widest">AI Generated Deep Digest</p>
                                            </div>
                                        </div>
                                        <button onClick={() => setActiveModal(null)} className="p-2 text-gray-500 hover:text-white"><ArrowLeft size={24} /></button>
                                    </div>
                                    <div className="space-y-6">
                                        <div className={`p-6 rounded-2xl border ${dm ? 'bg-white/5 border-white/5' : 'bg-gray-50 border-gray-100'}`}>
                                            <h4 className="text-[10px] font-black uppercase tracking-widest text-purple-500 mb-3">Core digest</h4>
                                            <p className={`text-sm font-medium leading-relaxed ${dm ? 'text-gray-300' : 'text-gray-700'}`}>This document explains advanced {selectedRes?.tags[0]} strategies, focusing on performance optimization and scalable architecture patterns.</p>
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <SummaryPoint icon={Activity} label="Revision Level" val="Moderate" color="text-yellow-500" dm={dm} />
                                            <SummaryPoint icon={Zap} label="Key Concepts" val="12 Identified" color="text-blue-500" dm={dm} />
                                        </div>
                                        <div className="space-y-3">
                                            <h4 className="text-[10px] font-black uppercase tracking-widest text-gray-500">Suggested Practice Topics</h4>
                                            <div className="flex flex-wrap gap-2">
                                                {['Architecture', 'Logic Flow', 'Security'].map(t => <span key={t} className={`px-3 py-1 text-[10px] font-bold rounded-lg ${dm ? 'bg-white/5 text-gray-400' : 'bg-gray-100 text-gray-600'}`}>#{t}</span>)}
                                            </div>
                                        </div>
                                    </div>
                                    <button onClick={() => setActiveModal(null)} className="w-full py-4 bg-purple-500 text-white rounded-2xl font-black shadow-lg shadow-purple-500/20 active:scale-95 transition-all">Close Digest</button>
                                </div>
                            )}

                            {/* Vault Modal */}
                            {activeModal === 'vault' && (
                                <div className="p-10 space-y-8 text-center">
                                    <div className="w-20 h-20 bg-yellow-500/10 text-yellow-500 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-inner"><ShieldCheck size={40} /></div>
                                    <div>
                                        <h3 className={`text-3xl font-black ${dm ? 'text-white' : 'text-gray-900'}`}>Save to Private Vault</h3>
                                        <p className="text-sm font-medium text-gray-500 mt-2">Classify this resource for your personal revision library.</p>
                                    </div>
                                    <div className="grid grid-cols-1 gap-3">
                                        {['Primary Notes', 'Critical Revision', 'Reference Material'].map(cat => (
                                            <button key={cat} onClick={() => setActiveModal(null)} className={`p-4 rounded-2xl border text-sm font-bold transition-all text-left flex items-center justify-between group ${dm ? 'bg-white/5 border-white/5 hover:bg-blue-500/10 hover:border-blue-500/30 text-gray-300' : 'bg-gray-50 border-gray-100 hover:bg-blue-50 hover:border-blue-200'}`}>
                                                {cat}
                                                <ChevronRight size={16} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                                            </button>
                                        ))}
                                    </div>
                                    <button onClick={() => setActiveModal(null)} className="w-full py-4 text-xs font-black uppercase tracking-widest text-gray-500 hover:text-gray-400">Cancel Storage</button>
                                </div>
                            )}

                            {/* Report Modal */}
                            {activeModal === 'report' && (
                                <div className="p-10 space-y-8">
                                    <div className="flex items-center gap-4">
                                        <div className="p-3 bg-red-500 text-white rounded-2xl"><AlertCircle size={24} /></div>
                                        <div>
                                            <h3 className={`text-2xl font-black ${dm ? 'text-white' : 'text-gray-900'}`}>Report Issue</h3>
                                            <p className="text-xs font-bold text-gray-500 mt-1 uppercase tracking-widest">Help us keep the hub clean</p>
                                        </div>
                                    </div>
                                    <div className="space-y-4">
                                        <select className={`w-full h-14 px-5 rounded-2xl border outline-none font-bold text-sm ${dm ? 'bg-black/20 border-white/10 text-white' : 'bg-gray-50 border-gray-200'}`}>
                                            <option>Broken File / Link</option>
                                            <option>Inappropriate Content</option>
                                            <option>Wrong Category</option>
                                            <option>Spam</option>
                                        </select>
                                        <textarea placeholder="Describe the problem..." className={`w-full h-32 p-5 rounded-2xl border outline-none font-bold text-sm resize-none ${dm ? 'bg-black/20 border-white/10 text-white' : 'bg-gray-50 border-gray-200'}`} />
                                    </div>
                                    <div className="flex gap-4">
                                        <button onClick={() => setActiveModal(null)} className={`flex-1 py-4 rounded-2xl font-bold border ${dm ? 'border-white/10 text-gray-500' : 'border-gray-200'}`}>Cancel</button>
                                        <button onClick={() => setActiveModal(null)} className="flex-1 py-4 bg-red-500 text-white rounded-2xl font-black shadow-lg shadow-red-500/20 active:scale-95 transition-all">Submit Report</button>
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    )
}

function SummaryPoint({ icon: Icon, label, val, color, dm }) {
    return (
        <div className={`p-4 rounded-xl border ${dm ? 'bg-black/20 border-white/5' : 'bg-white border-gray-100 flex items-center gap-3'}`}>
            <Icon size={18} className={color} />
            <div>
                <div className="text-[9px] font-black uppercase text-gray-500 tracking-tighter">{label}</div>
                <div className={`text-xs font-black ${dm ? 'text-white' : 'text-gray-900'}`}>{val}</div>
            </div>
        </div>
    )
}
function ActivePeers({ dm }) {
    const peers = ['M', 'S', 'J', 'A', 'K'];
    return (
        <div className={`p-8 rounded-[2.5rem] border shadow-2xl ${dm ? 'bg-[#1a222c] border-white/5' : 'bg-white border-gray-100'}`}>
            <h3 className={`font-black text-xs uppercase tracking-widest mb-6 ${dm ? 'text-gray-400' : 'text-gray-500'}`}>Peers Online</h3>
            <div className="flex -space-x-3">
                {peers.map((p, i) => (
                    <div key={i} className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm border-2 shadow-lg ${dm ? 'bg-[#1c232d] border-[#121820] text-gray-300' : 'bg-gray-100 border-white text-gray-600'}`}>
                        {p}
                    </div>
                ))}
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs border-2 shadow-lg ${dm ? 'bg-blue-500 border-[#121820] text-white' : 'bg-blue-500 border-white text-white'}`}>
                    +12
                </div>
            </div>
        </div>
    )
}
function Vault({ dm }) {
    return (
        <div className={`p-8 rounded-[2.5rem] border shadow-2xl ${dm ? 'bg-[#1a222c] border-white/5' : 'bg-white border-gray-100'}`}>
            <h3 className={`font-black text-xs uppercase tracking-widest mb-6 flex items-center gap-2 ${dm ? 'text-gray-400' : 'text-gray-500'}`}>
                <Paperclip size={14} /> Vault
            </h3>
            <div className="space-y-4">
                {['roadmap_v2.pdf', 'core_notes.zip', 'algorithms.md'].map((f, i) => (
                    <div key={f} className={`flex items-center gap-3 p-3 rounded-2xl border transition-colors cursor-pointer ${dm ? 'bg-white/5 border-white/10 hover:bg-white/10 text-gray-300' : 'bg-gray-50 border-gray-100 hover:bg-gray-100 text-gray-700'}`}>
                        <FileText size={16} className={i === 0 ? "text-red-500" : i === 1 ? "text-yellow-500" : "text-blue-500"} />
                        <span className="text-xs font-bold">{f}</span>
                    </div>
                ))}
            </div>
        </div>
    )
}
