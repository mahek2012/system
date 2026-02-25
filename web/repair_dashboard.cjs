const fs = require('fs');
const path = require('path');

const targetFile = path.resolve('d:/Mahek/system/web/src/components/Dashboard.jsx');
let content = fs.readFileSync(targetFile, 'utf8');

// 1. Fix the recursion block end and start of roadmap block
// Line 2563 is </motion.div> for recursion. 
// It needs )} after it to close recommendationView === 'recursion'.
const recursionFix = /recommendationView === 'recursion' && \(\s*<motion\.div key="recursion"[\s\S]+?<\/motion\.div>\s*\)\}\s*(?!\s*recommendationView === 'roadmap')\s*\{(?=\s*\/\* 🚀 AI Roadmap)/;
if (recursionFix.test(content)) {
    console.log('Fixing recursion block end and roadmap block start');
    content = content.replace(recursionFix, (match) => {
        return match.trim() + " recommendationView === 'roadmap' && (\n                                                <div className=\"space-y-6\">\n                                                    ";
    });
} else {
    // If exact match fails, try a simpler replacement at known markers
    console.log('Trying fallback for recursion/roadmap boundary');
    const recursionEndMarker = '/**\n                                                     * Definition for a binary tree node.\n                                                     */'; // No, that's interview sim.
    // Let's look for the specific lines I saw.
    const marker = "                                                     </motion.div>\n\n                                                     {/* 🚀 AI Roadmap Interactive Sub-Views */}";
    if (content.includes(marker)) {
        content = content.replace(marker,
            "                                                     </motion.div>\n                                                 )}\n\n                                                 {recommendationView === 'roadmap' && (\n                                                     <div className=\"space-y-6 animate-in fade-in duration-500\">\n                                                         {/* 🚀 AI Roadmap Interactive Sub-Views */}");
    }
}

// 2. Remove the garbage clustering at 2846-2851
// This garbage is inside the roadmapSubView === 'recursive_quiz' block or after it.
// Actually, looking at the previous view_file:
// 2844: </motion.div> matching recursive_quiz
// 2845: )}
// 2846-2851: garbage cluster
const garbageClusterPattern = /<\/motion\.div>\s*\}\)\s*(?:\s*<\/div>){3}\s*<button[^>]+>Submit Logic<\/button>\s*<\/motion\.div>\s*\}\)\s*/;
if (garbageClusterPattern.test(content)) {
    console.log('Removing garbage cluster at 2846');
    content = content.replace(garbageClusterPattern, '</motion.div>\n                                                                 )}\n');
}

// 3. Close the recommendationView === 'roadmap' block and activeModal === 'recommendation' block
// We need to find the right place to close them before roadmapSubView ends or after.
// Actually, the roadmapSubView code (AnimatePresence at 2566) is PART of the roadmap view.
// So we need to close recommendationView === 'roadmap' and recommendation modal after line 3020.
const roadmapEndMarker = "                                                             </motion.div>\n                                                         )}\n                                                     </AnimatePresence>";
if (content.includes(roadmapEndMarker)) {
    console.log('Closing recommendationView and modal blocks at the end of roadmap section');
    content = content.replace(roadmapEndMarker,
        roadmapEndMarker + "\n                                                    </div>\n                                                )}\n                                            </AnimatePresence>\n                                        </div>\n                                    )}");
}

// 4. Final tail cleanup
// The tail I saw earlier was very redundant.
const redundantTailPattern = /<\/motion\.div>\s*\}\)\s*<\/AnimatePresence>\s*<\/div>\s*\}\)\s*<\/div>\s*<\/motion\.div>\s*<\/div>\s*\}\)\s*<\/AnimatePresence>\s*<\/div>\s*\)\s*\}\s*<\/AnimatePresence>/;
if (redundantTailPattern.test(content)) {
    console.log('Replacing redundant tail with clean structure');
    content = content.replace(redundantTailPattern,
        "                                </div>\n                            </motion.div>\n                        </div>\n                    )}\n                </AnimatePresence>");
}

fs.writeFileSync(targetFile, content, 'utf8');
console.log('Dashboard.jsx repair attempt completed.');
