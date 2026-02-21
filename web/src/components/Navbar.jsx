import React from 'react'
import {
    Sun,
    Moon,
    Zap,
    LayoutDashboard,
    BookOpen,
    Users,
    FileQuestion,
    Network,
    Trophy
} from 'lucide-react'
import { useLMSStore } from '../store/useLMSStore'
import { motion } from 'framer-motion'

export default function Navbar() {
    const { darkMode, toggleTheme, setActivePage, activePage, student } = useLMSStore()

    return (
        <nav className={`h-16 border-b px-6 flex items-center justify-between sticky top-0 z-[1002] transition-colors duration-500 ${darkMode ? 'bg-[#121820] border-white/10' : 'bg-white border-bottom shadow-sm'
            }`}>
            <div className="flex items-center gap-10">
                <div
                    className="flex items-center gap-3 cursor-pointer shrink-0"
                    onClick={() => setActivePage('home')}
                >
                    <div className="w-9 h-9 bg-yellow-500 rounded-lg flex items-center justify-center">
                        <Zap size={22} className="text-white fill-white" />
                    </div>
                    <span className={`text-xl font-black ${darkMode ? 'text-white' : 'text-gray-900'}`}>ULTRA</span>
                </div>

                {/* Browser-style Address Bar (The "Port") */}
                <div className="flex-1 max-w-xl hidden md:flex items-center">
                    <div className={`w-full h-10 px-4 rounded-full flex items-center gap-3 transition-colors ${darkMode ? 'bg-[#1a222c] border border-white/5 shadow-inner' : 'bg-gray-100 border border-gray-200'
                        }`}>
                        <div className={`w-5 h-5 rounded-full flex items-center justify-center ${darkMode ? 'text-gray-400 bg-white/5' : 'text-gray-500 bg-white shadow-sm'}`}>
                            <span className="text-[10px] font-black italic">i</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-sm font-medium overflow-hidden">
                            <span className={`${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>localhost:5173</span>
                            <span className="text-gray-600">/</span>
                            <span className="text-blue-500 font-bold tracking-wide truncate transition-all">
                                {activePage.replace('-', ' ')}
                            </span>
                        </div>
                    </div>
                </div>

                <div className="hidden lg:flex items-center gap-8 shrink-0">
                    <NavItem
                        icon={LayoutDashboard}
                        label="Home"
                        darkMode={darkMode}
                        active={activePage === 'home'}
                        onClick={() => setActivePage('home')}
                    />
                    <NavItem
                        icon={Zap}
                        label="Dashboard"
                        darkMode={darkMode}
                        active={activePage === 'dashboard'}
                        onClick={() => setActivePage('dashboard')}
                    />
                    <NavItem
                        icon={BookOpen}
                        label="Courses"
                        darkMode={darkMode}
                        active={activePage === 'courses'}
                        onClick={() => setActivePage('courses')}
                    />
                    <NavItem
                        icon={Network}
                        label="Network"
                        darkMode={darkMode}
                        active={activePage === 'network'}
                        onClick={() => setActivePage('network')}
                    />
                    <NavItem
                        icon={Trophy}
                        label="Quizzes"
                        darkMode={darkMode}
                        active={activePage === 'quizzes'}
                        onClick={() => setActivePage('quizzes')}
                    />
                </div>
            </div>

            <div className="flex items-center gap-4">
                <button
                    onClick={toggleTheme}
                    className={`p-2 rounded-lg border ${darkMode ? 'text-gray-400 border-white/5 bg-white/5' : 'text-gray-500 border-gray-200 bg-gray-50'}`}
                >
                    {darkMode ? <Sun size={20} /> : <Moon size={20} />}
                </button>

                {student ? (
                    <div
                        className="flex items-center gap-3 cursor-pointer pl-2"
                        onClick={() => setActivePage('profile')}
                    >
                        <div className="text-right hidden sm:block">
                            <p className={`text-sm font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{student.name}</p>
                            <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Lvl {student.level}</p>
                        </div>
                        <img
                            src={student.avatar}
                            alt={student.name}
                            className="w-10 h-10 rounded-xl border-2 border-white/10"
                        />
                    </div>
                ) : (
                    <button className="px-5 py-2 bg-yellow-500 text-white rounded-xl text-sm font-bold shadow-lg">
                        Login
                    </button>
                )}
            </div>
        </nav>
    )
}

function NavItem({ icon: Icon, label, darkMode, onClick, active }) {
    return (
        <button
            onClick={onClick}
            className={`relative flex items-center gap-2 text-sm font-bold transition-all duration-300 group outline-none ${active
                ? (darkMode ? 'text-white' : 'text-gray-900')
                : (darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-900')
                }`}
        >
            <Icon size={18} className={`transition-colors duration-300 ${active
                ? 'text-yellow-500'
                : (darkMode ? 'group-hover:text-yellow-500' : 'group-hover:text-yellow-600')
                }`} />
            {label}
            {active && (
                <motion.div
                    layoutId="activeNav"
                    className="absolute -bottom-[21px] left-0 right-0 h-1 bg-yellow-500 rounded-t-full"
                />
            )}
        </button>
    )
}
