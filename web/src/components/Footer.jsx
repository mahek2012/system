import React from 'react'
import {
    Github,
    Twitter,
    Linkedin,
    Globe,
    Heart,
    Zap
} from 'lucide-react'
import { useLMSStore } from '../store/useLMSStore'

export default function Footer() {
    const { darkMode } = useLMSStore()

    return (
        <footer className={`transition-all duration-500 border-t pt-16 pb-8 px-8 mt-12 w-full ${darkMode ? 'bg-[#0a0a0b] border-white/5' : 'bg-gray-100 border-gray-200'
            }`}>
            <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
                {/* Brand Section */}
                <div className="space-y-6">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-yellow-500 rounded-xl flex items-center justify-center shadow-lg shadow-yellow-600/20 text-white">
                            <Zap size={24} className="fill-white" />
                        </div>
                        <span className={`text-xl font-black tracking-tighter transition-colors duration-500 ${darkMode ? 'text-white' : 'text-gray-900'
                            }`}>ULTRA</span>
                    </div>
                    <p className={`text-sm leading-relaxed max-w-xs transition-colors duration-500 ${darkMode ? 'text-gray-500' : 'text-gray-600'
                        }`}>
                        Next-generation autonomous learning management system powered by AI adaptive pathways and real-time skill mapping.
                    </p>
                    <div className="flex gap-4">
                        <SocialIcon icon={Twitter} darkMode={darkMode} />
                        <SocialIcon icon={Github} darkMode={darkMode} />
                        <SocialIcon icon={Linkedin} darkMode={darkMode} />
                        <SocialIcon icon={Globe} darkMode={darkMode} />
                    </div>
                </div>

                {/* Links: Platform */}
                <div>
                    <h4 className={`font-bold mb-6 text-sm uppercase tracking-widest transition-colors duration-500 ${darkMode ? 'text-white' : 'text-gray-900'
                        }`}>Platform</h4>
                    <ul className="space-y-4">
                        <FooterLink label="Skill Graph" darkMode={darkMode} />
                        <FooterLink label="Adaptive Paths" darkMode={darkMode} />
                        <FooterLink label="Student Portal" darkMode={darkMode} />
                        <FooterLink label="Instructor Console" darkMode={darkMode} />
                    </ul>
                </div>

                {/* Links: Resources */}
                <div>
                    <h4 className={`font-bold mb-6 text-sm uppercase tracking-widest transition-colors duration-500 ${darkMode ? 'text-white' : 'text-gray-900'
                        }`}>Resources</h4>
                    <ul className="space-y-4">
                        <FooterLink label="Documentation" darkMode={darkMode} />
                        <FooterLink label="Peer Hub" darkMode={darkMode} />
                        <FooterLink label="API Access" darkMode={darkMode} />
                        <FooterLink label="Research Lab" darkMode={darkMode} />
                    </ul>
                </div>

                {/* Newsletter / CTA */}
                <div className={`p-6 rounded-3xl border space-y-4 transition-all duration-500 ${darkMode ? 'bg-white/5 border-white/5' : 'bg-white border-gray-200 shadow-sm'
                    }`}>
                    <h4 className={`font-bold text-sm transition-colors duration-500 ${darkMode ? 'text-white' : 'text-gray-900'
                        }`}>Join the Network</h4>
                    <p className={`text-xs transition-colors duration-500 ${darkMode ? 'text-gray-500' : 'text-gray-600'
                        }`}>Get notified when new learning paths are generated for your profile.</p>
                    <div className="flex gap-2">
                        <input
                            type="email"
                            placeholder="Email"
                            className={`border rounded-xl px-4 py-2 text-xs flex-1 focus:outline-none focus:ring-1 focus:ring-yellow-500/50 transition-all ${darkMode
                                    ? 'bg-black/20 border-white/10 text-white'
                                    : 'bg-gray-100 border-gray-200 text-gray-900'
                                }`}
                        />
                        <button className="bg-yellow-500 hover:bg-yellow-600 text-white p-2 rounded-xl transition-all shadow-md">
                            <Zap size={14} className="fill-white" />
                        </button>
                    </div>
                </div>
            </div>

            <div className={`max-w-[1400px] mx-auto pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-4 transition-colors duration-500 ${darkMode ? 'border-white/5' : 'border-gray-200'
                }`}>
                <p className="text-xs text-gray-600">
                    © 2026 ULTRA Adaptive Ecosystem. All rights reserved.
                </p>
                <p className={`text-xs flex items-center gap-1.5 transition-colors duration-500 ${darkMode ? 'text-gray-600' : 'text-gray-500'
                    }`}>
                    Made with <Heart size={12} className="text-red-500 fill-red-500" /> for the future of education.
                </p>
            </div>
        </footer>
    )
}

function SocialIcon({ icon: Icon, darkMode }) {
    return (
        <a href="#" className={`p-2 rounded-xl transition-all border transition-all duration-500 ${darkMode
                ? 'bg-white/5 text-gray-500 hover:text-white hover:bg-yellow-500 border-white/5'
                : 'bg-white text-gray-400 hover:text-white hover:bg-yellow-600 border-gray-200 shadow-sm'
            }`}>
            <Icon size={18} />
        </a>
    )
}

function FooterLink({ label, darkMode }) {
    return (
        <li>
            <a href="#" className={`text-xs transition-colors duration-500 ${darkMode ? 'text-gray-500 hover:text-yellow-500' : 'text-gray-500 hover:text-yellow-600'
                }`}>
                {label}
            </a>
        </li>
    )
}
