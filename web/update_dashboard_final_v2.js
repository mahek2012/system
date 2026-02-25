import fs from 'fs';

const filePath = 'd:\\Mahek\\system\\web\\src\\components\\Dashboard.jsx';
let content = fs.readFileSync(filePath, 'utf8');

console.log('File read, length:', content.length);

// 1. Update button
const lockButtonOldPart = 'Lock Next Target';
if (content.indexOf(lockButtonOldPart) !== -1) {
    // Look for the button tag around it
    const index = content.indexOf(lockButtonOldPart);
    const start = content.lastIndexOf('<button', index);
    const end = content.indexOf('</button>', index) + '</button>'.length;

    if (start !== -1 && end !== -1) {
        const oldButton = content.substring(start, end);
        const newButton = `<button 
                                                                    onClick={() => setRoadmapSubView('commit')}
                                                                    className="w-full py-4 bg-white text-blue-600 rounded-2xl text-xs font-black uppercase tracking-widest shadow-xl shadow-black/10 hover:scale-[1.02] active:scale-95 transition-all"
                                                                >
                                                                    Lock Next Target
                                                                </button>`;
        content = content.substring(0, start) + newButton + content.substring(end);
        console.log('Updated button.');
    }
}

// 2. Add sub-views
const smartActionsIdx = content.indexOf('Smart Actions');
if (smartActionsIdx !== -1) {
    const afterSmart = content.substring(smartActionsIdx);
    const closingIdx = afterSmart.indexOf('</motion.div>');
    if (closingIdx !== -1) {
        const absoluteIdx = smartActionsIdx + closingIdx + '</motion.div>'.length;

        const subViewsHTML = `
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
                                                            </motion.div>
                                                        )}
                                                    </AnimatePresence>
        `;

        content = content.substring(0, absoluteIdx) + subViewsHTML + content.substring(absoluteIdx);
        console.log('Added sub-views.');
    }
}

fs.writeFileSync(filePath, content, 'utf8');
console.log('Update complete.');
