import React from 'react'
import {
    TrendingUp,
    AlertTriangle,
    Clock,
    CheckCircle2,
    BarChart3,
    Megaphone,
    BellRing
} from 'lucide-react'

export function RiskPrediction({ student }) {
    const riskColor = student.riskScore < 20 ? 'text-green-400' : student.riskScore < 50 ? 'text-yellow-400' : 'text-red-400'
    const riskBg = student.riskScore < 20 ? 'bg-green-500/10' : student.riskScore < 50 ? 'bg-yellow-500/10' : 'bg-red-500/10'

    return (
        <div className="bg-[#1a1a1c] p-6 rounded-3xl border border-white/5 shadow-xl h-full flex flex-col justify-between group">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest leading-none">Risk Prediction</h3>
                <TrendingUp size={18} className="text-blue-400" />
            </div>

            <div className="flex items-end gap-1 mb-2">
                <span className={`text-5xl font-black ${riskColor}`}>{student.riskScore}%</span>
                <span className="text-[10px] text-gray-500 font-bold mb-1 uppercase">Dropout Risk</span>
            </div>

            <div className={`px-3 py-2 rounded-2xl ${riskBg} flex items-center gap-2 mb-6 border border-white/5`}>
                <AlertTriangle size={14} className={riskColor} />
                <p className="text-[10px] text-gray-300 font-medium">
                    {student.riskScore < 20 ? 'Minimal risk. Your pace is optimal.' : 'Moderate risk. Try increasing your activity.'}
                </p>
            </div>

            <div className="pt-6 border-t border-white/5">
                <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2 text-gray-400">
                        <Clock size={14} />
                        <span className="text-xs font-medium">Completion Est.</span>
                    </div>
                    <span className="text-xs font-bold text-white">{student.completionEstimate}</span>
                </div>
                <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500 w-[75%]" />
                </div>
            </div>
        </div>
    )
}

export function QuizPerformance({ quizzes }) {
    if (!quizzes) return null
    return (
        <div className="bg-[#1a1a1c] p-6 rounded-3xl border border-white/5 shadow-xl h-full flex flex-col">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest">Recent Quizzes</h3>
                <BarChart3 size={18} className="text-purple-400" />
            </div>

            <div className="flex-1 space-y-4">
                {quizzes.map(q => (
                    <div key={q.id} className="flex items-center justify-between p-3 bg-white/[0.02] rounded-2xl border border-white/5 hover:bg-white/[0.04] transition-all">
                        <div className="flex items-center gap-3">
                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${q.score > 80 ? 'bg-green-500/10 text-green-400' : 'bg-yellow-500/10 text-yellow-400'}`}>
                                <CheckCircle2 size={16} />
                            </div>
                            <div>
                                <h4 className="text-xs font-bold text-white">{q.title}</h4>
                                <p className="text-[10px] text-gray-500">{q.date}</p>
                            </div>
                        </div>
                        <span className="text-sm font-black text-white">{q.score}%</span>
                    </div>
                ))}
            </div>
        </div>
    )
}

export function SystemAnnouncements({ announcements }) {
    if (!announcements) return null
    return (
        <div className="bg-[#1a1a1c] p-6 rounded-3xl border border-white/5 shadow-xl h-full flex flex-col">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest">Announcements</h3>
                <Megaphone size={18} className="text-yellow-400" />
            </div>

            <div className="flex-1 space-y-3">
                {announcements.map(a => (
                    <div key={a.id} className="relative pl-4 group cursor-pointer">
                        <div className="absolute left-0 top-1 bottom-1 w-1 bg-blue-600 rounded-full group-hover:w-1.5 transition-all"></div>
                        <div className="flex items-start gap-2 mb-1">
                            <span className={`text-[8px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded ${a.type === 'system' ? 'bg-blue-500 text-white' : 'bg-purple-600 text-white'}`}>
                                {a.type}
                            </span>
                            <h4 className="text-[11px] font-bold text-white leading-tight">{a.title}</h4>
                        </div>
                        <p className="text-[10px] text-gray-500 leading-relaxed line-clamp-2">
                            {a.content}
                        </p>
                    </div>
                ))}
            </div>

            <button className="mt-6 w-full py-2.5 bg-white/5 border border-white/10 rounded-xl text-[10px] font-bold text-gray-400 hover:text-white hover:bg-white/10 transition-all flex items-center justify-center gap-2">
                <BellRing size={12} /> View All Notifications
            </button>
        </div>
    )
}
