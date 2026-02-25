const fs = require('fs');

const path = 'src/components/Dashboard.jsx';
let content = fs.readFileSync(path, 'utf8');

const anchor1 = "roadmapSubView === 'interview_sim' && (";
const idx1 = content.indexOf(anchor1);

const anchor2 = '// Sub-components';
const idx2 = content.indexOf(anchor2);

if (idx1 !== -1 && idx2 !== -1) {
    const before = content.substring(0, idx1 + anchor1.length);
    const validHTML = `
                                                                    <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className={\`w-full max-w-6xl h-[85vh] rounded-[3rem] border overflow-hidden flex flex-col \${darkMode ? 'bg-[#0f172a] border-white/10' : 'bg-white border-gray-100'} shadow-2xl relative\`}>
                                                                        <div className={\`p-8 border-b flex items-center justify-between z-10 \${darkMode ? 'bg-black/40 border-white/5' : 'bg-gray-50 border-gray-100 shadow-sm'}\`}>
                                                                            <h4 className={\`text-xl font-black \${darkMode ? 'text-white' : 'text-gray-900'}\`}>Interview Simulation: Lowest Common Ancestor</h4>
                                                                            <div className="text-2xl font-black font-mono text-red-500 tabular-nums">42:15</div>
                                                                        </div>

                                                                        <div className="flex-1 flex overflow-hidden">
                                                                            <div className="flex-1 p-8 overflow-y-auto">
                                                                                <p className={\`text-base font-bold leading-relaxed \${darkMode ? 'text-gray-300' : 'text-gray-700'}\`}>
                                                                                    Given a binary search tree (BST), find the lowest common ancestor (LCA) node of two given nodes in the BST.
                                                                                </p>
                                                                            </div>
                                                                            <div className={\`w-3/5 border-l flex flex-col \${darkMode ? 'bg-[#0a0f1d] border-white/5' : 'bg-gray-900 border-gray-800'}\`}>
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
                                                </div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    </div>
  )
}

`;
    const after = content.substring(idx2);
    fs.writeFileSync(path, before + validHTML + after, 'utf8');
    console.log('Fixed tags safely');
} else {
    console.log('Anchors not found');
}
