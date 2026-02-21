import React from 'react'
import { motion } from 'framer-motion'
import {
    User, Mail, MapPin, Calendar, Edit3, Award, BookOpen,
    Clock, Star, ChevronRight, FileText, Zap, Shield, Crown,
    CheckCircle2, Flame
} from 'lucide-react'
import { useLMSStore } from '../store/useLMSStore'

export default function Profile() {
    const { student, darkMode, notes, setActivePage, setSelectedCourse } = useLMSStore()

    // Mock Enrolled Courses (In a real app, this would be in the store)
    const enrolledCourses = [
        { id: 1, title: 'HTML & CSS Fundamentals', progress: 45, total: 14, completed: 6, image: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=800&auto=format&fit=crop&q=60' },
        { id: 2, title: 'Advanced React Patterns', progress: 12, total: 28, completed: 3, image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&auto=format&fit=crop&q=60' },
        { id: 3, title: 'UI/UX Design Principles', progress: 88, total: 12, completed: 10, image: 'https://images.unsplash.com/photo-1586717791821-3f44a5638d48?w=800&auto=format&fit=crop&q=60' },
    ]

    const badges = [
        { name: 'Fast Learner', icon: Zap, color: 'text-yellow-500', bg: 'bg-yellow-500/10' },
        { name: 'Code Warrior', icon: Shield, color: 'text-blue-500', bg: 'bg-blue-500/10' },
        { name: 'Top 10%', icon: Crown, color: 'text-purple-500', bg: 'bg-purple-500/10' },
    ]

    return (
        <div className={`min-h-screen p-6 lg:p-10 pb-20 transition-colors duration-500 ${darkMode ? 'bg-[#121820]' : 'bg-gray-50'}`}>
            <div className="max-w-7xl mx-auto space-y-8">

                {/* ── Header Section ── */}
                <div className={`relative rounded-[2.5rem] overflow-hidden p-8 md:p-12 ${darkMode ? 'bg-[#1c232d]' : 'bg-white shadow-xl shadow-gray-200/50'}`}>
                    {/* Background Pattern */}
                    <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />

                    <div className="relative z-10 flex flex-col md:flex-row gap-8 items-center md:items-start text-center md:text-left">
                        <div className="relative">
                            <img
                                src={student.avatar}
                                alt={student.name}
                                className={`w-32 h-32 rounded-3xl border-4 ${darkMode ? 'border-[#121820]' : 'border-white shadow-lg'}`}
                            />
                            <div className="absolute -bottom-2 -right-2 bg-yellow-500 text-white text-xs font-black px-3 py-1 rounded-full shadow-lg border-2 border-[#121820]">
                                LVL {student.level}
                            </div>
                        </div>

                        <div className="flex-1 space-y-4">
                            <div>
                                <h1 className={`text-4xl font-black mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                                    {student.name}
                                </h1>
                                <p className={`text-lg font-medium flex items-center justify-center md:justify-start gap-2 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                    <span className="text-blue-500">Full Stack Student</span>
                                    <span>•</span>
                                    <span>Member since 2023</span>
                                </p>
                            </div>

                            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
                                {badges.map((badge, i) => (
                                    <div key={i} className={`flex items-center gap-2 px-4 py-2 rounded-xl border ${darkMode ? 'border-white/5 bg-white/5' : 'border-gray-100 bg-gray-50'}`}>
                                        <div className={`p-1.5 rounded-lg ${badge.bg} ${badge.color}`}>
                                            <badge.icon size={14} />
                                        </div>
                                        <span className={`text-sm font-bold ${darkMode ? 'text-white' : 'text-gray-700'}`}>{badge.name}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className={`p-6 rounded-2xl border min-w-[200px] ${darkMode ? 'bg-black/20 border-white/5' : 'bg-gray-50 border-gray-100'}`}>
                            <p className={`text-sm font-bold mb-2 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Total XP</p>
                            <div className={`text-4xl font-black mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                                {student.xp.toLocaleString()}
                            </div>
                            <div className="w-full h-2 bg-gray-500/20 rounded-full overflow-hidden">
                                <div className="h-full bg-yellow-500 w-[75%]" />
                            </div>
                            <p className="text-xs text-center mt-2 text-gray-400">{student.nextLevelXp - student.xp} XP to Level {student.level + 1}</p>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* ── Left Column: Courses (8 cols) ── */}
                    <div className="lg:col-span-8 space-y-8">

                        {/* Enrolled Courses */}
                        <div>
                            <h2 className={`text-2xl font-black mb-6 flex items-center gap-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                                <BookOpen className="text-blue-500" /> My Learning
                            </h2>
                            <div className="space-y-4">
                                {enrolledCourses.map(course => (
                                    <div
                                        key={course.id}
                                        className={`group p-4 rounded-2xl border transition-all hover:scale-[1.01] cursor-pointer ${darkMode ? 'bg-[#1c232d] border-white/5 hover:border-blue-500/30' : 'bg-white border-gray-100 shadow-sm hover:shadow-md'}`}
                                        onClick={() => {
                                            setSelectedCourse({
                                                ...course,
                                                // Hydrate with full details if we had them, standard mock fallback in CourseDetails handles basics
                                                description: 'Continued learning...',
                                                author: 'Instructor'
                                            })
                                            setActivePage('course-details')
                                        }}
                                    >
                                        <div className="flex items-center gap-5">
                                            <img src={course.image} className="w-24 h-24 rounded-xl object-cover" alt={course.title} />
                                            <div className="flex-1">
                                                <div className="flex justify-between items-start mb-2">
                                                    <h3 className={`font-bold text-lg ${darkMode ? 'text-white' : 'text-gray-900'}`}>{course.title}</h3>
                                                    <div className={`text-xs font-bold px-3 py-1 rounded-lg ${course.progress > 80 ? 'bg-green-500/10 text-green-500' : 'bg-blue-500/10 text-blue-500'}`}>
                                                        {course.progress}% Complete
                                                    </div>
                                                </div>
                                                <div className="w-full h-2 bg-gray-500/10 rounded-full overflow-hidden mb-3">
                                                    <div className={`h-full rounded-full ${course.progress > 80 ? 'bg-green-500' : 'bg-blue-500'}`} style={{ width: `${course.progress}%` }} />
                                                </div>
                                                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                                    {course.completed} / {course.total} Lessons
                                                </p>
                                            </div>
                                            <button className={`p-3 rounded-xl transition-colors ${darkMode ? 'bg-white/5 group-hover:bg-blue-500 text-white' : 'bg-gray-100 group-hover:bg-blue-500 group-hover:text-white'}`}>
                                                <ChevronRight size={20} />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Saved Notes */}
                        <div>
                            <h2 className={`text-2xl font-black mb-6 flex items-center gap-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                                <FileText className="text-yellow-500" /> My Notes
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {Object.entries(notes || {}).length > 0 ? (
                                    Object.entries(notes).map(([courseTitle, noteContent]) => (
                                        <div key={courseTitle} className={`p-6 rounded-2xl border flex flex-col justify-between h-48 ${darkMode ? 'bg-[#1c232d] border-white/5' : 'bg-white border-gray-100 shadow-sm'}`}>
                                            <div>
                                                <h4 className={`font-bold mb-3 line-clamp-1 ${darkMode ? 'text-white' : 'text-gray-900'}`}>{courseTitle}</h4>
                                                <p className={`text-sm line-clamp-3 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                                    {noteContent}
                                                </p>
                                            </div>
                                            <button
                                                className="text-blue-500 text-sm font-bold flex items-center gap-1 hover:underline mt-4"
                                                onClick={() => {
                                                    // We'd ideally navigate to the course and scroll to notes
                                                    // For now just navigate to course details
                                                    // We need to find the course object or construct a dummy one title matches
                                                    const dummyCourse = { title: courseTitle, image: '', level: 'Unknown' } // Minimal
                                                    setSelectedCourse(dummyCourse)
                                                    setActivePage('course-details')
                                                }}
                                            >
                                                View Note <ChevronRight size={14} />
                                            </button>
                                        </div>
                                    ))
                                ) : (
                                    <div className={`col-span-2 p-8 text-center rounded-2xl border border-dashed ${darkMode ? 'border-white/10 text-gray-500' : 'border-gray-200 text-gray-400'}`}>
                                        <Edit3 size={32} className="mx-auto mb-3 opacity-50" />
                                        <p>No notes saved yet. Start learning!</p>
                                    </div>
                                )}
                            </div>
                        </div>

                    </div>

                    {/* ── Right Column: Stats (4 cols) ── */}
                    <div className="lg:col-span-4 space-y-6">
                        <div className={`p-6 rounded-[2rem] border ${darkMode ? 'bg-[#1c232d] border-white/5' : 'bg-white border-gray-100 shadow-lg shadow-gray-200/50'}`}>
                            <h3 className={`font-black text-lg mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Detail Stats</h3>
                            <div className="space-y-6">
                                {[
                                    { label: 'Study Hours', value: '42h 30m', icon: Clock, color: 'text-blue-500' },
                                    { label: 'Courses Completed', value: '12', icon: CheckCircle2, color: 'text-green-500' },
                                    { label: 'Avg. Quiz Score', value: '92%', icon: Star, color: 'text-yellow-500' },
                                    { label: 'Current Streak', value: '5 Days', icon: Flame, color: 'text-orange-500' },
                                ].map((stat, i) => (
                                    <div key={i} className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className={`p-2 rounded-lg bg-gray-500/10 ${stat.color}`}>
                                                <stat.icon size={18} />
                                            </div>
                                            <span className={`font-medium ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{stat.label}</span>
                                        </div>
                                        <span className={`font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{stat.value}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}
