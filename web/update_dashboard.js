const fs = require('fs');
const filePath = 'd:\\\\Mahek\\\\system\\\\web\\\\src\\\\components\\\\Dashboard.jsx';
let content = fs.readFileSync(filePath, 'utf8');

console.log('File read successfully.');

// 1. Update 'Lock Next Target' button
const buttonSearch = /<button[^>]*>[\s\n]*Lock Next Target[\s\n]*<\/button>/;
const buttonNew = `<button 
                                                                    onClick={() => setRoadmapSubView('commit')}
                                                                    className="w-full py-4 bg-white text-blue-600 rounded-2xl text-xs font-black uppercase tracking-widest shadow-xl shadow-black/10 hover:scale-[1.02] active:scale-95 transition-all"
                                                                >
                                                                    Lock Next Target
                                                                </button>`;

if (buttonSearch.test(content)) {
    content = content.replace(buttonSearch, buttonNew);
    console.log('Updated Lock Next Target button.');
} else {
    console.log('Could not find Lock Next Target button.');
}

// 2. Add sub-views layer
const closingTags = /<\/div>[\s\n]*<\/div>[\s\n]*<\/motion\.div>/;
const sIndex = content.indexOf('Smart Actions');

if (sIndex !== -1) {
    console.log('Found Smart Actions section.');
    const fromSmartActions = content.substring(sIndex);
    const match = fromSmartActions.match(closingTags);
    if (match) {
        console.log('Found closing tags for Smart Actions.');
        const absoluteMatchIndex = sIndex + match.index;

        const subViewsHTML = `                                                        </div>
                                                    </div>

                                                    {/* 🎯 Roadmap Sub-Views Layer */}
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

                                                                {/* 🔒 Target Commitment Panel */}
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
                                                                                    {[{ title: 'Daily 30 min', icon: 'Clock' }, { title: '3-day Sprint', icon: 'FastForward' }, { title: '7-day Mastery', icon: 'Brain' }].map((plan, i) => (
                                                                                        <button key={i} className="p-4 rounded-2xl border text-left transition-all hover:scale-105 bg-white/5 border-white/5 hover:bg-blue-500/10 hover:border-blue-500/30">
                                                                                            <div className="text-xs font-black text-white">{plan.title}</div>
                                                                                        </button>
                                                                                    ))}
                                                                                </div>
                                                                            </div>
                                                                            <button onClick={() => { setCommittedTarget('Trees'); setRoadmapSubView('hub'); }} className="w-full py-5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl font-black text-lg shadow-xl shadow-blue-500/30 active:scale-95 transition-all">COMMIT TO TARGET 🔒</button>
                                                                        </div>
                                                                    </motion.div>
                                                                )}

                                                                {/* 🌳 Trees Discussion Room */}
                                                                {roadmapSubView === 'peer_room' && (
                                                                    <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="w-full max-w-5xl rounded-[3rem] border shadow-2xl overflow-hidden flex flex-col md:flex-row h-[80vh] bg-[#0f172a] border-white/10">
                                                                        <div className="flex-1 p-8 flex flex-col space-y-6">
                                                                            <div className="flex items-center justify-between">
                                                                                <div className="flex items-center gap-4">
                                                                                    <div className="w-12 h-12 bg-green-500/10 rounded-2xl flex items-center justify-center text-green-500"><Users2 size={24} /></div>
                                                                                    <div>
                                                                                        <h4 className="text-2xl font-black text-white">Trees Discussion Room</h4>
                                                                                        <p className="text-xs font-bold text-gray-500 flex items-center gap-2"><span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" /> 12 peers active now</p>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                            <div className="flex-1 rounded-[2.5rem] border relative overflow-hidden bg-black/40 border-white/5">
                                                                                <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-500 space-y-4">
                                                                                    <Edit3 size={48} className="opacity-20" />
                                                                                    <p className="text-sm font-bold uppercase tracking-widest opacity-50">Interactive Tree Drawing Canvas</p>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </motion.div>
                                                                )}
                                                            </motion.div>
                                                        )}
                                                    </AnimatePresence>
                                                </motion.div>`;

        content = content.substring(0, absoluteMatchIndex) + subViewsHTML + fromSmartActions.substring(match.index + match[0].length);
        console.log('Added roadmap sub-views.');
    } else {
        console.log('Could not find closing tags.');
    }
} else {
    console.log('Could not find Smart Actions Marker.');
}

fs.writeFileSync(filePath, content, 'utf8');
console.log('File update complete.');
