const fs = require('fs');
const path = require('path');

const filePath = 'd:\\Mahek\\system\\web\\src\\components\\Dashboard.jsx';
let content = fs.readFileSync(filePath, 'utf8');

console.log('Original content length:', content.length);

// 1. Update 'Lock Next Target' button
const lockButtonOld = `<button className="w-full py-4 bg-white text-blue-600 rounded-2xl text-xs font-black uppercase tracking-widest shadow-xl shadow-black/10 hover:scale-[1.02] active:scale-95 transition-all">
                                                                    Lock Next Target
                                                                </button>`;
const lockButtonNew = `<button 
                                                                    onClick={() => setRoadmapSubView('commit')}
                                                                    className="w-full py-4 bg-white text-blue-600 rounded-2xl text-xs font-black uppercase tracking-widest shadow-xl shadow-black/10 hover:scale-[1.02] active:scale-95 transition-all"
                                                                >
                                                                    Lock Next Target
                                                                </button>`;

if (content.includes(lockButtonOld)) {
    content = content.replace(lockButtonOld, lockButtonNew);
    console.log('Updated Lock Next Target button.');
} else {
    console.log('Lock Next Target button not found with exact match, skipping or trying partial.');
}

// 2. Add Roadmap Sub-Views
// We look for the closing of the roadmap motion.div before the recommendation AnimatePresence closing
// Lines verified:
// 2442:                                                 </motion.div>
// 2443:                                             )}
// 2444:                                         </AnimatePresence>

const insertionPointMarker = `                                                </motion.div>
                                            )}
                                        </AnimatePresence>`;

// The sub-views HTML (condensed for space)
const subViewsHTML = `
                                                    {/* 🚀 AI Roadmap Interactive Sub-Views */}
                                                    <AnimatePresence mode="wait">
                                                        {roadmapSubView !== 'hub' && (
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
                                                                    <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} className="w-full max-w-2xl p-8 rounded-[3rem] border bg-[#1a222c] border-white/10 shadow-2xl relative overflow-hidden">
                                                                        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                                                                        <div className="relative z-10 space-y-8">
                                                                            <div className="text-center">
                                                                                <div className="w-20 h-20 bg-blue-500 rounded-3xl flex items-center justify-center text-white mx-auto mb-4 shadow-xl shadow-blue-500/20"><Target size={40} /></div>
                                                                                <h4 className="text-3xl font-black text-white">Target Commitment</h4>
                                                                                <p className="text-sm font-bold text-gray-500">Lock your milestone to activate streak tracking</p>
                                                                            </div>
                                                                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                                                                {[{ label: 'Topic', val: 'Trees', color: 'text-blue-500' }, { label: 'Current', val: '62%', color: 'text-orange-500' }, { label: 'Target', val: '75%', color: 'text-green-500' }, { label: 'Est. Time', val: '3h 12m', color: 'text-purple-500' }].map((stat, i) => (
                                                                                    <div key={i} className="p-4 rounded-2xl border bg-white/5 border-white/5">
                                                                                        <div className="text-[10px] font-black uppercase text-gray-500 mb-1">{stat.label}</div>
                                                                                        <div className={\`text-lg font-black \${stat.color}\`}>{stat.val}</div>
                                                                                    </div>
                                                                                ))}
                                                                            </div>
                                                                            <div className="space-y-4">
                                                                                <h5 className="text-xs font-black uppercase text-gray-500 tracking-widest text-center">Select Your Plan</h5>
                                                                                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                                                                    {[{ title: 'Daily 30 min', icon: Clock }, { title: '3-day Sprint', icon: FastForward }, { title: '7-day Mastery', icon: Brain }].map((plan, i) => (
                                                                                        <button key={i} className="p-4 rounded-2xl border text-left transition-all hover:scale-105 bg-white/5 border-white/5 hover:bg-blue-500/10 hover:border-blue-500/30">
                                                                                            <plan.icon size={20} className="text-blue-500 mb-3" />
                                                                                            <div className="text-xs font-black text-white">{plan.title}</div>
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
                                                                    <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="w-full max-w-6xl rounded-[3rem] border shadow-2xl overflow-hidden flex flex-col md:flex-row h-[80vh] bg-[#0f172a] border-white/10">
                                                                        <div className="flex-1 p-8 flex flex-col space-y-6">
                                                                            <div className="flex items-center justify-between">
                                                                                <div className="flex items-center gap-4">
                                                                                    <div className="w-12 h-12 bg-green-500/10 rounded-2xl flex items-center justify-center text-green-500"><Users2 size={24} /></div>
                                                                                    <div>
                                                                                        <h4 className="text-2xl font-black text-white">Trees Discussion Room</h4>
                                                                                        <p className="text-xs font-bold text-gray-500 flex items-center gap-2"><span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" /> 12 peers active now</p>
                                                                                    </div>
                                                                                </div>
                                                                                <div className="flex gap-2">
                                                                                    <button onClick={() => setPeerRoomSubView('whiteboard')} className={\`px-4 py-2 rounded-xl text-xs font-black uppercase transition-all \${peerRoomSubView === 'whiteboard' ? 'bg-blue-500 text-white' : 'bg-gray-500/10 text-gray-500'}\`}>Whiteboard</button>
                                                                                    <button onClick={() => setPeerRoomSubView('battle')} className={\`px-4 py-2 rounded-xl text-xs font-black uppercase transition-all \${peerRoomSubView === 'battle' ? 'bg-red-500 text-white' : 'bg-gray-500/10 text-gray-500'}\`}>Tree Debug Battle</button>
                                                                                </div>
                                                                            </div>
                                                                            <div className="flex-1 rounded-[2.5rem] border relative overflow-hidden bg-black/40 border-white/5">
                                                                                <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-500 space-y-4 text-center p-8">
                                                                                    <Edit3 size={48} className="opacity-20" />
                                                                                    <p className="text-sm font-black uppercase tracking-widest opacity-50">Interactive Tree Drawing Canvas</p>
                                                                                    <div className="flex gap-4">
                                                                                        <button className="px-6 py-2 bg-blue-500/20 text-blue-500 border border-blue-500/20 rounded-xl text-[10px] font-black uppercase">Add Node</button>
                                                                                        <button className="px-6 py-2 bg-purple-500/20 text-purple-500 border border-purple-500/20 rounded-xl text-[10px] font-black uppercase">Animate DFS</button>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </motion.div>
                                                                )}

                                                                {/* 🧠 3. Recursion Adaptive Engine */}
                                                                {roadmapSubView === 'recursive_quiz' && (
                                                                    <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="w-full max-w-4xl p-10 rounded-[4rem] border bg-[#0f172a] border-white/10 shadow-2xl relative overflow-hidden">
                                                                        <div className="flex items-center justify-between mb-10">
                                                                            <div className="flex items-center gap-4">
                                                                                <div className="w-14 h-14 bg-purple-500/10 rounded-[2rem] flex items-center justify-center text-purple-500"><Brain size={32} /></div>
                                                                                <div>
                                                                                    <h4 className="text-3xl font-black text-white">Recursion Adaptive Engine</h4>
                                                                                    <p className="text-sm font-bold text-gray-500">AI FOCUS: Base Case & Stack Simulation</p>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-10">
                                                                            <div className="space-y-8">
                                                                                <div className="p-8 rounded-[3rem] border bg-white/5 border-white/5">
                                                                                    <p className="text-xl font-black leading-relaxed mb-6 text-gray-200">Identify the correct base case for calculating the maximum depth of a binary tree.</p>
                                                                                    <div className="space-y-3">
                                                                                        {['if (root === null) return 0;', 'if (root.left === null) return 1;', 'if (!root.left && !root.right) return 0;'].map((opt, i) => (
                                                                                            <button key={i} className="w-full p-5 rounded-2xl border text-left text-xs font-black transition-all hover:translate-x-2 bg-black/20 border-white/5 hover:border-purple-500/30 text-gray-300">{opt}</button>
                                                                                        ))}
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                            <div className="space-y-6 flex flex-col justify-center">
                                                                                <h5 className="text-[10px] font-black uppercase text-gray-500 tracking-widest text-center">AI STACK SIMULATION</h5>
                                                                                <div className="space-y-2 relative flex flex-col items-center">
                                                                                    {[4, 3, 2].map((n, idx) => (
                                                                                        <div key={n} className="w-full p-4 border rounded-2xl text-center text-xs font-black font-mono bg-purple-500/10 border-purple-500/20 text-purple-300">maxDepth(root_{n})</div>
                                                                                    ))}
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <button className="w-full py-5 bg-purple-500 text-white rounded-[2rem] font-black text-lg shadow-xl shadow-purple-500/30 active:scale-95 transition-all">Submit Logic</button>
                                                                    </motion.div>
                                                                )}

                                                                {/* 🎥 4. Smart Concept Booster */}
                                                                {roadmapSubView === 'booster' && (
                                                                    <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="w-full max-w-4xl rounded-[4rem] border shadow-2xl relative overflow-hidden flex flex-col bg-[#0f172a] border-white/10">
                                                                        <div className="aspect-video bg-black/95 relative flex items-center justify-center group">
                                                                            <Play size={60} className="text-white/20" />
                                                                        </div>
                                                                        <div className="p-10 flex flex-col items-center">
                                                                            <h4 className="text-2xl font-black text-white mb-6">Visualizing Recursion: The Calling Stack</h4>
                                                                            <button className="px-12 py-5 bg-blue-600 text-white rounded-[2rem] font-black text-lg shadow-xl shadow-blue-500/30 active:scale-95 transition-all">Start Booster</button>
                                                                        </div>
                                                                    </motion.div>
                                                                )}

                                                                {/* 💼 5. Interview Simulation Mode */}
                                                                {roadmapSubView === 'interview_sim' && (
                                                                    <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="w-full max-w-6xl h-[80vh] rounded-[3rem] border overflow-hidden flex flex-col bg-[#0f172a] border-white/10 shadow-2xl relative">
                                                                        <div className="p-8 border-b border-white/5 flex items-center justify-between bg-black/40">
                                                                            <h4 className="text-xl font-black text-white">Interview Simulation: Lowest Common Ancestor</h4>
                                                                            <div className="text-2xl font-black font-mono text-red-500">45:00</div>
                                                                        </div>
                                                                        <div className="flex-1 flex bg-[#0a0f1d]">
                                                                            <div className="w-1/2 p-8 border-r border-white/5 text-gray-300 overflow-y-auto">Problem Statement...</div>
                                                                            <div className="w-1/2 p-8 font-mono text-xs text-blue-400">Editor...</div>
                                                                        </div>
                                                                    </motion.div>
                                                                )}
                                                            </motion.div>
                                                        )}
                                                    </AnimatePresence>
`;

if (content.includes(insertionPointMarker)) {
    const parts = content.split(insertionPointMarker);
    // Insert before the last occurrence of the marker or at a specific part
    // Given the structure, we want to insert it after line 2442 but before 2443.
    // So parts[0] is everything up to 2442. parts[1] is everything after.
    content = parts[0] + '                                                </motion.div>' + subViewsHTML + '                                            )}' + insertionPointMarker.substring(insertionPointMarker.indexOf('                                        </AnimatePresence>'));
    console.log('Inserted Roadmap Sub-Views.');
} else {
    // Try a more granular match
    const motionClosing = `                                                </motion.div>`;
    const animClosing = `                                            )}`;

    // We want the closing of the roadmap div.
    // Let's find "Smart Actions" then find the next motion.div closing.
    const smartIndex = content.indexOf('Smart Actions');
    if (smartIndex !== -1) {
        const afterSmart = content.substring(smartIndex);
        const closingIdx = afterSmart.indexOf('                                                </motion.div>');
        if (closingIdx !== -1) {
            const absoluteClosingIdx = smartIndex + closingIdx + '                                                </motion.div>'.length;
            content = content.substring(0, absoluteClosingIdx) + subViewsHTML + content.substring(absoluteClosingIdx);
            console.log('Inserted Roadmap Sub-Views using Smart Actions marker.');
        } else {
            console.log('Closing motion.div not found after Smart Actions.');
        }
    } else {
        console.log('Smart Actions marker not found.');
    }
}

fs.writeFileSync(filePath, content, 'utf8');
console.log('File update complete.');
