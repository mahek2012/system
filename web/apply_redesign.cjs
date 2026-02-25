const fs = require('fs');
const path = require('path');

const targetFile = path.resolve('d:/Mahek/system/web/src/components/Dashboard.jsx');
let content = fs.readFileSync(targetFile, 'utf8');

console.log('Original content length:', content.length);

// 1. Redesign Peer Room
const peerRoomPattern = /\{\/\* 🤝 2\. Trees Discussion Room \*\/\}[\s\S]+?\{roadmapSubView === 'peer_room' && \([\s\S]+?<\/motion\.div>[\s\S]+?\)\}/;
const newPeerRoom = `{/* 🤝 2. Trees Discussion Room */}
                                                                 {roadmapSubView === 'peer_room' && (
                                                                     <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className={\`w-full max-w-6xl rounded-[3rem] border shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col md:flex-row h-[80vh] \${darkMode ? 'bg-[#0f172a] border-white/10' : 'bg-white border-gray-100'} relative\`}>
                                                                         <div className="flex-1 p-8 flex flex-col space-y-6">
                                                                             <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                                                                                 <div className="flex items-center gap-5">
                                                                                     <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-green-500/20"><Users2 size={28} /></div>
                                                                                     <div>
                                                                                         <h4 className={\`text-2xl font-black \${darkMode ? 'text-white' : 'text-gray-900'} tracking-tight\`}>Trees Discussion Room</h4>
                                                                                         <div className="flex items-center gap-2 mt-1">
                                                                                             <div className="flex -space-x-2">
                                                                                                 {[1, 2, 3].map(i => <div key={i} className="w-5 h-5 rounded-full border-2 border-[#0f172a] bg-gray-700" />)}
                                                                                             </div>
                                                                                             <p className="text-[10px] font-black text-green-500 uppercase tracking-widest">+12 peers active</p>
                                                                                         </div>
                                                                                     </div>
                                                                                 </div>
                                                                                 <div className="flex gap-2 p-1.5 bg-black/20 rounded-2xl border border-white/5 backdrop-blur-md">
                                                                                     <button onClick={() => setPeerRoomSubView('whiteboard')} className={\`px-5 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all \${peerRoomSubView === 'whiteboard' ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20' : 'text-gray-400 hover:text-white'}\`}>Whiteboard</button>
                                                                                     <button onClick={() => setPeerRoomSubView('battle')} className={\`px-5 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all \${peerRoomSubView === 'battle' ? 'bg-red-600 text-white shadow-lg shadow-red-500/20' : 'text-gray-400 hover:text-white'}\`}>Tree Debug Battle</button>
                                                                                 </div>
                                                                             </div>
                                                                             
                                                                             <div className={\`flex-1 rounded-[2.5rem] border relative overflow-hidden group/canvas \${darkMode ? 'bg-black/60 border-white/5 shadow-inner' : 'bg-gray-50 border-gray-100 shadow-inner'}\`}>
                                                                                 {peerRoomSubView === 'whiteboard' ? (
                                                                                     <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-500 space-y-6 text-center p-8">
                                                                                         <div className="relative">
                                                                                             <div className="absolute inset-0 bg-blue-500/20 blur-3xl rounded-full" />
                                                                                             <Edit3 size={64} className="text-blue-500/40 relative z-10 animate-bounce-slow" />
                                                                                         </div>
                                                                                         <div className="space-y-2">
                                                                                             <p className="text-xs font-black uppercase tracking-[0.3em] text-gray-400">Interactive drawing canvas</p>
                                                                                             <p className="text-[10px] font-bold text-gray-600">Drag to start nodes, Shift to connect</p>
                                                                                         </div>
                                                                                         <button className="px-8 py-3 bg-white/5 border border-white/10 rounded-full text-[10px] font-black uppercase text-gray-300 hover:bg-white/10 transition-all">Enable Multiplayer</button>
                                                                                     </div>
                                                                                 ) : (
                                                                                     <div className="grid grid-cols-1 lg:grid-cols-2 h-full gap-px bg-white/5 overflow-hidden">
                                                                                         <div className="p-8 bg-black/40 border-r border-white/5 flex flex-col group/coder">
                                                                                             <div className="flex items-center justify-between mb-6">
                                                                                                 <div className="flex items-center gap-2">
                                                                                                     <div className="w-2.5 h-2.5 bg-blue-500 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.5)] animate-pulse" />
                                                                                                     <span className="text-[10px] font-black uppercase text-blue-400 font-mono tracking-widest">YOU: IMPLEMENTING LCA</span>
                                                                                                 </div>
                                                                                                 <div className="flex gap-1.5">
                                                                                                     <div className="w-2.5 h-2.5 rounded-full bg-red-500/20" />
                                                                                                     <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/20" />
                                                                                                     <div className="w-2.5 h-2.5 rounded-full bg-green-500/20" />
                                                                                                 </div>
                                                                                             </div>
                                                                                             <div className="flex-1 p-6 rounded-2xl bg-[#0a0f1d] border border-white/5 font-mono text-[13px] text-blue-300 leading-relaxed overflow-y-auto selection:bg-blue-500/30">
                                                                                                 <div className="opacity-40 mb-2">{'// Challenge: Find Lowest Common Ancestor'}</div>
                                                                                                 <div className="text-purple-400">{'function findLCA(root, p, q) {'}</div>
                                                                                                 <div className="pl-6"><span className="text-pink-500">{'if'}</span>{' (!root) '} <span className="text-pink-500">{'return'}</span> <span className="text-orange-400">{'null'}</span>{';'}</div>
                                                                                                 <div className="pl-6"><span className="text-pink-500">{'if'}</span>{' (root === p || root === q) '} <span className="text-pink-500">{'return'}</span>{' root;'}</div>
                                                                                                 <div className="pl-6 border-l-2 border-blue-500/50 bg-blue-500/5 my-1 py-1">
                                                                                                     <span className="text-pink-500">{'const'}</span>{' left = findLCA(root.left, p, q);'}
                                                                                                 </div>
                                                                                                 <div className="pl-6">
                                                                                                     <span className="text-pink-500">{'const'}</span>{' right = findLCA(root.right, p, q);'}
                                                                                                 </div>
                                                                                                 <div className="pl-6 mt-2 opacity-50 animate-pulse">|</div>
                                                                                                 <div className="text-purple-400">{'}'}</div>
                                                                                             </div>
                                                                                         </div>
                                                                                         <div className="p-8 bg-black/40 flex flex-col">
                                                                                             <div className="flex items-center justify-between mb-6">
                                                                                                 <div className="flex items-center gap-2">
                                                                                                     <div className="w-2.5 h-2.5 bg-rose-500 rounded-full shadow-[0_0_10px_rgba(244,63,94,0.5)] animate-pulse" />
                                                                                                     <span className="text-[10px] font-black uppercase text-rose-400 font-mono tracking-widest">Alex (Opponent): 82%</span>
                                                                                                 </div>
                                                                                                 <span className="text-[9px] font-black text-white/30 uppercase">Spectating...</span>
                                                                                             </div>
                                                                                             <div className="flex-1 p-6 rounded-2xl bg-[#0a0f1d] border border-white/5 font-mono text-[13px] text-gray-500 leading-relaxed flex items-center justify-center italic text-center">
                                                                                                 <div>
                                                                                                     <Activity size={24} className="mx-auto mb-4 opacity-20" />
                                                                                                     Alex is refactoring to optimized O(1) space...
                                                                                                 </div>
                                                                                             </div>
                                                                                         </div>
                                                                                     </div>
                                                                                 )}
                                                                             </div>
                                                                         </div>
                                                                         
                                                                         <div className={\`w-full md:w-80 border-l p-8 flex flex-col \${darkMode ? 'bg-black/20 border-white/5' : 'bg-gray-50 border-gray-100'}\`}>
                                                                             <div className="flex flex-col items-center mb-10">
                                                                                 <div className="relative group/avatar cursor-pointer mb-4">
                                                                                     <div className="absolute inset-0 bg-blue-500/50 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                                                                                     <div className="w-20 h-20 bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-full flex items-center justify-center text-white text-3xl font-black shadow-xl relative z-10 ring-4 ring-offset-4 ring-[#0f172a] ring-offset-[#0f172a]">M</div>
                                                                                     <div className="absolute bottom-1 right-1 w-5 h-5 bg-green-500 border-4 border-[#0f172a] rounded-full z-20" />
                                                                                 </div>
                                                                                 <h5 className="text-[13px] font-black uppercase tracking-widest text-center">Me (Active)</h5>
                                                                             </div>

                                                                             <h5 className="text-[10px] font-black uppercase text-gray-500 mb-6 tracking-[0.2em] text-center">Room Members</h5>
                                                                             <div className="space-y-4 flex-1">
                                                                                 {[
                                                                                     { name: 'Alex (Expert)', x: 'A', color: 'from-blue-500 to-cyan-500' },
                                                                                     { name: 'Sarah (Elite)', x: 'S', color: 'from-purple-500 to-rose-500' },
                                                                                     { name: 'Mike (Learner)', x: 'M', color: 'from-orange-500 to-amber-500' }
                                                                                 ].map((p, i) => (
                                                                                     <div key={i} className={\`p-4 rounded-2xl flex items-center justify-between transition-all hover:bg-white/5 group/member cursor-default border border-transparent hover:border-white/5 \${darkMode ? '' : 'bg-white shadow-sm'}\`}>
                                                                                         <div className="flex items-center gap-4">
                                                                                             <div className={\`w-10 h-10 bg-gradient-to-tr \${p.color} rounded-xl flex items-center justify-center text-white font-black text-xs shadow-lg group-hover/member:rotate-12 transition-transform\`}>{p.x}</div>
                                                                                             <div className="flex flex-col">
                                                                                                 <span className={\`text-[11px] font-black \${darkMode ? 'text-gray-200' : 'text-gray-700'}\`}>{p.name}</span>
                                                                                                 <span className="text-[9px] font-bold text-gray-500 uppercase">Typing...</span>
                                                                                             </div>
                                                                                         </div>
                                                                                         <div className="w-2 h-2 bg-green-500 rounded-full shadow-[0_0_8px_rgba(34,197,94,0.5)]" />
                                                                                     </div>
                                                                                 ))}
                                                                             </div>
                                                                             
                                                                             <div className="mt-8 space-y-3">
                                                                                 <button className="w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl text-[11px] font-black uppercase tracking-[0.2em] shadow-xl shadow-blue-500/20 hover:shadow-blue-500/40 hover:scale-[1.02] active:scale-95 transition-all">Start Voice Call</button>
                                                                                 <button className="w-full py-4 bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white border border-white/5 rounded-2xl text-[11px] font-black uppercase tracking-[0.2em] transition-all">Leave Room</button>
                                                                             </div>
                                                                         </div>
                                                                     </motion.div>
                                                                 )}`;

if (peerRoomPattern.test(content)) {
    console.log('Found Peer Room section');
    content = content.replace(peerRoomPattern, newPeerRoom);
} else {
    console.error('Peer Room section not found!');
}

// 2. Redesign Recursion Quiz
const recursionQuizPattern = /\{\/\* 🧠 3\. Recursion Adaptive Engine \*\/\}[\s\S]+?\{roadmapSubView === 'recursive_quiz' && \([\s\S]+?<\/motion\.div>[\s\S]+?\)\}/;
const newRecursionQuiz = `{/* 🧠 3. Recursion Adaptive Engine */}
                                                                 {roadmapSubView === 'recursive_quiz' && (
                                                                     <motion.div initial={{ scale: 0.95, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} className={\`w-full max-w-5xl p-1 relative overflow-hidden rounded-[4rem] \${darkMode ? 'bg-gradient-to-b from-purple-500/20 to-transparent' : 'bg-gradient-to-b from-purple-100 to-transparent'}\`}>
                                                                         <div className={\`p-10 rounded-[3.8rem] border \${darkMode ? 'bg-[#0f172a] border-white/10' : 'bg-white border-gray-100'} shadow-2xl relative overflow-hidden\`}>
                                                                             <div className="absolute top-0 left-0 w-full h-1.5 bg-black/10">
                                                                                 <motion.div initial={{ width: 0 }} animate={{ width: '65%' }} className="h-full bg-gradient-to-r from-purple-600 to-pink-600 shadow-[0_0_15px_rgba(168,85,247,0.5)]" />
                                                                             </div>

                                                                             <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-12 gap-6">
                                                                                 <div className="flex items-center gap-6">
                                                                                     <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-[2rem] flex items-center justify-center text-white shadow-xl shadow-purple-500/20"><Brain size={36} /></div>
                                                                                     <div>
                                                                                         <h4 className={\`text-3xl font-black \${darkMode ? 'text-white' : 'text-gray-900'} tracking-tight\`}>Adaptive Engine 2.0</h4>
                                                                                         <div className="flex items-center gap-3 mt-1">
                                                                                             <span className="px-2 py-0.5 rounded-md bg-purple-500/10 text-purple-400 text-[9px] font-black uppercase tracking-widest border border-purple-500/20">Recursion</span>
                                                                                             <p className="text-xs font-bold text-gray-500">Mastering Base Cases</p>
                                                                                         </div>
                                                                                     </div>
                                                                                 </div>
                                                                                 <div className="flex items-center gap-4 px-6 py-3 bg-black/20 rounded-2xl border border-white/5 backdrop-blur-md">
                                                                                     <div className="text-right">
                                                                                         <p className="text-[9px] font-black text-white/30 uppercase tracking-widest">Confidence Score</p>
                                                                                         <p className="text-lg font-black text-purple-400">84%</p>
                                                                                     </div>
                                                                                     <div className="w-px h-8 bg-white/10" />
                                                                                     <div className="text-right">
                                                                                         <p className={\`text-[9px] font-black uppercase tracking-widest \${darkMode ? 'text-white/30' : 'text-gray-400'}\`}>Time Left</p>
                                                                                         <p className="text-lg font-black text-rose-500 font-mono">04:52</p>
                                                                                     </div>
                                                                                 </div>
                                                                             </div>

                                                                             <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-10">
                                                                                 <div className="space-y-8">
                                                                                     <div className={\`p-8 rounded-[3rem] border \${darkMode ? 'bg-gradient-to-br from-white/5 to-transparent border-white/5' : 'bg-gray-50 border-gray-100'} relative group\`}>
                                                                                         <div className="flex items-center gap-3 mb-6">
                                                                                             <div className="w-8 h-8 rounded-full bg-purple-500/10 flex items-center justify-center text-purple-500 font-black text-xs">04</div>
                                                                                             <span className="text-[10px] font-black uppercase text-purple-400 tracking-widest">Logic Selection</span>
                                                                                         </div>
                                                                                         <p className={\`text-xl font-black leading-relaxed mb-8 \${darkMode ? 'text-gray-100' : 'text-gray-800'}\`}>Which base case correctly prevents infinite recursion when calculating binary tree depth?</p>
                                                                                         <div className="space-y-4">
                                                                                             {[
                                                                                                 { text: 'if (root === null) return 0;', status: 'active', meta: 'Safe termination' },
                                                                                                 { text: 'if (root.left === null) return 1;', status: 'idle', meta: 'Partial check' },
                                                                                                 { text: 'if (!node) return -1;', status: 'idle', meta: 'Height offset' }
                                                                                             ].map((opt, i) => (
                                                                                                 <button key={i} className={\`w-full p-6 rounded-2xl border text-left transition-all relative group/opt \${
                                                                                                     i === 0 
                                                                                                         ? 'bg-purple-600 border-purple-500 text-white shadow-lg shadow-purple-500/20' 
                                                                                                         : darkMode ? 'bg-black/20 border-white/5 text-gray-400 hover:border-white/20' : 'bg-white border-gray-100'
                                                                                                 }\`}>
                                                                                                     <div className="flex items-center justify-between">
                                                                                                         <span className="text-[13px] font-black font-mono">{opt.text}</span>
                                                                                                         <span className={\`text-[9px] font-black uppercase tracking-tighter opacity-0 group-hover/opt:opacity-40 transition-opacity\`}>{opt.meta}</span>
                                                                                                     </div>
                                                                                                 </button>
                                                                                             ))}
                                                                                         </div>
                                                                                     </div>
                                                                                 </div>
                                                                                 <div className="flex flex-col space-y-6">
                                                                                     <div className={\`p-8 rounded-[3rem] border \${darkMode ? 'bg-black/40 border-white/5 shadow-inner' : 'bg-purple-50/50 border-purple-100'} flex-1 flex flex-col\`}>
                                                                                         <h5 className="text-[10px] font-black uppercase text-gray-500 tracking-[0.3em] text-center mb-8">Live Stack Simulation</h5>
                                                                                         <div className="space-y-3 relative flex flex-col items-center flex-1 justify-center max-w-[280px] mx-auto w-full">
                                                                                             {[5, 4, 3, 2].map((n, idx) => (
                                                                                                 <motion.div
                                                                                                     key={n}
                                                                                                     initial={{ y: 20, opacity: 0 }}
                                                                                                     animate={{ y: 0, opacity: 1 - (idx * 0.15) }}
                                                                                                     whileHover={{ scale: 1.05, x: 10 }}
                                                                                                     className={\`w-full p-4 border rounded-2xl text-center text-xs font-black font-mono flex items-center justify-between shadow-lg \${
                                                                                                         idx === 0 
                                                                                                             ? 'bg-gradient-to-r from-purple-600 to-pink-600 border-purple-400 text-white' 
                                                                                                             : darkMode ? 'bg-purple-900/20 border-purple-500/20 text-purple-300' : 'bg-white border-purple-100 text-purple-600'
                                                                                                     }\`}
                                                                                                 >
                                                                                                     <div className="flex items-center gap-2">
                                                                                                         <div className={\`w-2 h-2 rounded-full \${idx === 0 ? 'bg-white animate-pulse' : 'bg-purple-500/40'}\`} />
                                                                                                         <span>depth(node_{n})</span>
                                                                                                     </div>
                                                                                                     {idx === 0 && <span className="text-[8px] bg-white/20 px-1.5 py-0.5 rounded uppercase">Active</span>}
                                                                                                 </motion.div>
                                                                                             ))}
                                                                                             <div className="absolute -bottom-6 flex flex-col items-center">
                                                                                                 <div className="w-1 h-8 bg-gradient-to-b from-purple-500/20 to-transparent" />
                                                                                                 <span className="text-[8px] font-black text-purple-500/40 uppercase tracking-widest">Heap Allocation</span>
                                                                                             </div>
                                                                                         </div>
                                                                                     </div>
                                                                                 </div>
                                                                             </div>
                                                                             
                                                                             <div className="flex items-center justify-between">
                                                                                 <div className="flex items-center gap-4">
                                                                                     <div className="flex -space-x-3">
                                                                                         {[1, 2, 3].map(i => <div key={i} className="w-10 h-10 rounded-full border-4 border-[#0f172a] bg-gray-700 shadow-xl" />)}
                                                                                     </div>
                                                                                     <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Analyzed by 4.2k learners today</p>
                                                                                 </div>
                                                                                 <button className="group px-14 py-5 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-[2.5rem] font-black text-sm shadow-2xl shadow-purple-500/30 active:scale-95 transition-all uppercase tracking-[0.2em] flex items-center gap-4">
                                                                                     Verify Logic
                                                                                     <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
                                                                                 </button>
                                                                             </div>
                                                                         </div>
                                                                     </motion.div>
                                                                 )}`;

if (recursionQuizPattern.test(content)) {
    console.log('Found Recursion Quiz section');
    content = content.replace(recursionQuizPattern, newRecursionQuiz);
} else {
    console.error('Recursion Quiz section not found!');
}

// 3. Redesign Concept Booster
const boosterPattern = /\{\/\* 🎥 4\. Smart Concept Booster \*\/\}[\s\S]+?\{roadmapSubView === 'booster' && \([\s\S]+?<\/motion\.div>[\s\S]+?\)\}/;
const newBooster = `{/* 🎥 4. Smart Concept Booster */}
                                                                 {roadmapSubView === 'booster' && (
                                                                     <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className={\`w-full max-w-5xl rounded-[4rem] border shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] relative overflow-hidden flex flex-col \${darkMode ? 'bg-[#0f172a] border-white/10' : 'bg-white border-gray-100'}\`}>
                                                                         <div className="aspect-video bg-[#050810] relative flex items-center justify-center group overflow-hidden">
                                                                             <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-30 grayscale group-hover:grayscale-0 transition-all duration-1000 scale-110 group-hover:scale-100" />
                                                                             <div className="absolute inset-0 bg-gradient-to-t from-[#050810] via-transparent to-transparent" />
                                                                             
                                                                             <button className="w-28 h-28 bg-blue-600/90 backdrop-blur-xl rounded-full flex items-center justify-center text-white hover:scale-110 active:scale-95 transition-all shadow-[0_0_50px_rgba(37,99,235,0.5)] z-20 overflow-hidden relative group/play">
                                                                                 <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-600 opacity-0 group-hover/play:opacity-100 transition-opacity" />
                                                                                 <Play size={44} className="fill-white translate-x-1 relative z-10" />
                                                                             </button>
                                                                             
                                                                             <div className="absolute bottom-8 left-8 right-8 flex items-center justify-between z-20">
                                                                                 <div className="flex items-center gap-4">
                                                                                     <div className="p-3 bg-white/10 backdrop-blur-md rounded-2xl border border-white/10 text-white"><MonitorPlay size={24} /></div>
                                                                                     <div>
                                                                                         <h5 className="text-xl font-black text-white tracking-tight">Visualizing Recursion: Detailed Deep Dive</h5>
                                                                                         <p className="text-xs font-bold text-white/50">Module 04 • 12:45 Duration</p>
                                                                                     </div>
                                                                                 </div>
                                                                                 <div className="flex items-center gap-2 px-4 py-2 bg-black/40 backdrop-blur-md rounded-full border border-white/5">
                                                                                     <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                                                                                     <span className="text-[10px] font-black text-white uppercase tracking-widest">4K Ultra HD</span>
                                                                                 </div>
                                                                             </div>
                                                                         </div>

                                                                         <div className="p-12 flex flex-col md:flex-row items-center justify-between gap-8">
                                                                             <div className="max-w-xl">
                                                                                 <h4 className={\`text-3xl font-black mb-4 tracking-tight \${darkMode ? 'text-white' : 'text-gray-900'}\`}>Master the Calling Stack</h4>
                                                                                 <p className={\`text-base font-medium leading-relaxed \${darkMode ? 'text-gray-400' : 'text-gray-600'}\`}>AI identifies this as your #1 blocker. This visual breakdown explains how memory frames are created and destroyed during recursive calls.</p>
                                                                             </div>
                                                                             <div className="flex flex-col gap-4 w-full md:w-auto">
                                                                                 <button className="group px-12 py-5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-[2.5rem] font-black text-sm shadow-2xl shadow-blue-500/30 active:scale-95 transition-all uppercase tracking-[0.2em] flex items-center justify-center gap-4">
                                                                                     Start Analysis Quiz
                                                                                     <Sparkles size={18} className="group-hover:rotate-12 transition-transform" />
                                                                                 </button>
                                                                                 <button className="px-12 py-5 bg-white/5 hover:bg-white/10 border border-white/5 rounded-[2.5rem] font-black text-xs text-gray-400 hover:text-white transition-all uppercase tracking-widest text-center">Download Notes (PDF)</button>
                                                                             </div>
                                                                         </div>
                                                                     </motion.div>
                                                                 )}`;

if (boosterPattern.test(content)) {
    console.log('Found Concept Booster section');
    content = content.replace(boosterPattern, newBooster);
} else {
    console.error('Concept Booster section not found!');
}

// 4. Redesign Interview Simulation
const interviewSimPattern = /\{\/\* 💼 5\. Interview Simulation Mode \*\/\}[\s\S]+?\{roadmapSubView === 'interview_sim' && \([\s\S]+?<\/motion\.div>[\s\S]+?\)\}/;
const newInterviewSim = `{/* 💼 5. Interview Simulation Mode */}
                                                                 {roadmapSubView === 'interview_sim' && (
                                                                     <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className={\`w-full max-w-7xl h-[88vh] rounded-[3.5rem] border shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col \${darkMode ? 'bg-[#0f172a] border-white/10' : 'bg-white border-gray-100'} relative\`}>
                                                                         <div className={\`p-8 border-b flex flex-col sm:flex-row items-center justify-between gap-6 z-10 \${darkMode ? 'bg-black/60 border-white/5 backdrop-blur-xl' : 'bg-white/80 border-gray-100 shadow-sm backdrop-blur-md'}\`}>
                                                                             <div className="flex items-center gap-6">
                                                                                 <div className="w-14 h-14 bg-rose-500/10 rounded-2xl flex items-center justify-center text-rose-500 shadow-xl shadow-rose-500/5"><Briefcase size={28} /></div>
                                                                                 <div>
                                                                                     <h4 className={\`text-2xl font-black \${darkMode ? 'text-white' : 'text-gray-900'} tracking-tight\`}>FAANG Simulation: LCA</h4>
                                                                                     <div className="flex items-center gap-3 mt-1">
                                                                                         <div className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-blue-500/10 border border-blue-500/20">
                                                                                             <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                                                                                             <span className="text-[9px] font-black text-blue-400 uppercase">Google Mode</span>
                                                                                         </div>
                                                                                         <span className="text-[10px] font-bold text-gray-500 italic">Target: Silicon Valley Level 4</span>
                                                                                     </div>
                                                                                 </div>
                                                                             </div>
                                                                             
                                                                             <div className="flex items-center gap-6">
                                                                                 <div className="flex flex-col items-end">
                                                                                     <span className="text-[9px] font-black text-gray-500 uppercase tracking-widest mb-1">Session Timer</span>
                                                                                     <div className="text-3xl font-black font-mono text-rose-500 tabular-nums tracking-tighter shadow-rose-500/20 drop-shadow-lg flex items-center gap-2">
                                                                                         <Clock size={20} className="animate-pulse" />
                                                                                         42:15
                                                                                     </div>
                                                                                 </div>
                                                                                 <button className="px-8 py-4 bg-rose-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-rose-600/20 active:scale-95 transition-all hover:bg-rose-500">End Session</button>
                                                                             </div>
                                                                         </div>

                                                                         <div className="flex-1 flex overflow-hidden">
                                                                             <div className={\`w-[400px] border-r overflow-y-auto p-10 space-y-8 \${darkMode ? 'bg-black/20 border-white/5' : 'bg-gray-50/50'}\`}>
                                                                                 <div className="space-y-4">
                                                                                     <h5 className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Problem Statement</h5>
                                                                                     <p className={\`text-lg font-black leading-relaxed tracking-tight \${darkMode ? 'text-gray-100' : 'text-gray-800'}\`}>
                                                                                         Lowest Common Ancestor of a Binary Search Tree
                                                                                     </p>
                                                                                     <p className={\`text-sm font-medium leading-relaxed \${darkMode ? 'text-gray-400' : 'text-gray-600'}\`}>
                                                                                         Given a BST, find the lowest common ancestor (LCA) node of two given nodes <code className="px-1.5 py-0.5 rounded bg-black/20 text-blue-400">p</code> and <code className="px-1.5 py-0.5 rounded bg-black/20 text-blue-400">q</code>.
                                                                                     </p>
                                                                                 </div>
                                                                                 
                                                                                 <div className="space-y-4">
                                                                                     <h5 className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Constraints</h5>
                                                                                     <div className="space-y-2">
                                                                                         {['Nodes count: 2 to 10^5', 'Value range: -10^9 to 10^9', 'All node values are unique'].map((c, i) => (
                                                                                             <div key={i} className="flex items-center gap-3 text-xs font-bold text-gray-500">
                                                                                                 <div className="w-1 h-1 rounded-full bg-blue-500/40" />
                                                                                                 {c}
                                                                                             </div>
                                                                                         ))}
                                                                                     </div>
                                                                                 </div>
                                                                                 
                                                                                 <div className={\`p-6 rounded-3xl border \${darkMode ? 'bg-amber-500/5 border-amber-500/10' : 'bg-amber-50 border-amber-100'}\`}>
                                                                                     <div className="flex items-center gap-2 mb-3">
                                                                                         <Lightbulb size={16} className="text-amber-500" />
                                                                                         <span className="text-[10px] font-black uppercase text-amber-500 tracking-widest">AI Hint Agent</span>
                                                                                     </div>
                                                                                     <p className="text-[11px] font-bold text-amber-600/80 leading-relaxed italic">"Remember the property of a BST: for any node, all nodes in the left subtree are smaller, and all in the right are larger."</p>
                                                                                 </div>
                                                                             </div>
                                                                             
                                                                             <div className={\`flex-1 flex flex-col \${darkMode ? 'bg-[#050810]' : 'bg-gray-900 border-gray-800'}\`}>
                                                                                 <div className="px-8 py-4 border-b border-white/5 flex items-center justify-between bg-black/40">
                                                                                     <div className="flex items-center gap-4">
                                                                                         <div className="flex items-center gap-2 px-3 py-1 bg-white/5 rounded-lg border border-white/5">
                                                                                             <div className="w-2 h-2 rounded-full bg-yellow-500" />
                                                                                             <span className="text-[10px] font-black text-gray-400 uppercase font-mono">solution.js</span>
                                                                                         </div>
                                                                                         <span className="text-[10px] font-black text-white/20 uppercase tracking-widest">Read-only mode: OFF</span>
                                                                                     </div>
                                                                                     <div className="flex items-center gap-3">
                                                                                         <div className="w-2.5 h-2.5 rounded-full bg-red-500/20" />
                                                                                         <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/20" />
                                                                                         <div className="w-2.5 h-2.5 rounded-full bg-green-500/20" />
                                                                                     </div>
                                                                                 </div>
                                                                                 <div className="flex-1 p-10 font-mono text-[14px] leading-relaxed overflow-y-auto selection:bg-rose-500/30">
                                                                                     <div className="flex gap-6 mb-2">
                                                                                         <span className="text-white/20 text-right w-6 select-none italic text-[11px]">1</span>
                                                                                         <span className="text-purple-400">/**</span>
                                                                                     </div>
                                                                                     <div className="flex gap-6 mb-2">
                                                                                         <span className="text-white/20 text-right w-6 select-none italic text-[11px]">2</span>
                                                                                         <span className="text-purple-400"> * Definition for a binary tree node.</span>
                                                                                     </div>
                                                                                     <div className="flex gap-6 mb-2">
                                                                                         <span className="text-white/20 text-right w-6 select-none italic text-[11px]">3</span>
                                                                                         <span className="text-purple-400"> */</span>
                                                                                     </div>
                                                                                     <div className="flex gap-6 mb-2">
                                                                                         <span className="text-white/20 text-right w-6 select-none italic text-[11px]">4</span>
                                                                                         <span className="text-pink-500">var</span> <span className="text-blue-400">lowestCommonAncestor</span> = <span className="text-pink-500">function</span>(root, p, q) {
                                                                                     </div>
                                                                                     <div className="flex gap-6 mb-2">
                                                                                         <span className="text-white/20 text-right w-6 select-none italic text-[11px]">5</span>
                                                                                         <span className="ml-8 text-white/40 animate-pulse">|</span>
                                                                                     </div>
                                                                                     <div className="flex gap-6 mb-2">
                                                                                         <span className="text-white/20 text-right w-6 select-none italic text-[11px]">6</span>
                                                                                         <span className="text-white/60">};</span>
                                                                                     </div>
                                                                                 </div>
                                                                                 
                                                                                 <div className="p-8 border-t border-white/5 bg-black/40 flex items-center justify-between">
                                                                                     <div className="flex items-center gap-4">
                                                                                         <button className="px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/5 rounded-xl text-[10px] font-black text-gray-400 hover:text-white transition-all uppercase tracking-widest">Run Code</button>
                                                                                         <button className="flex items-center gap-2 text-[10px] font-black text-blue-400 uppercase tracking-widest hover:text-blue-300 transition-colors">
                                                                                             <RefreshCw size={14} />
                                                                                             Reset Workspace
                                                                                         </button>
                                                                                     </div>
                                                                                     <div className="flex items-center gap-6">
                                                                                         <div className="flex items-center gap-2">
                                                                                             <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]" />
                                                                                             <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Real-time Feedback: ON</span>
                                                                                         </div>
                                                                                         <button className="px-10 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-black text-[11px] uppercase tracking-[0.2em] shadow-xl shadow-blue-500/20 active:scale-95 transition-all">Submit Solution</button>
                                                                                     </div>
                                                                                 </div>
                                                                             </div>
                                                                         </div>
                                                                     </motion.div>
                                                                 )}`;

if (interviewSimPattern.test(content)) {
    console.log('Found Interview Sim section');
    content = content.replace(interviewSimPattern, newInterviewSim);
} else {
    console.error('Interview Sim section not found!');
}

fs.writeFileSync(targetFile, content, 'utf8');
console.log('Successfully updated Dashboard.jsx');
