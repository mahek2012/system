const fs = require('fs');
const path = require('path');

const targetFile = path.resolve('d:/Mahek/system/web/src/components/Dashboard.jsx');
let lines = fs.readFileSync(targetFile, 'utf8').split('\n');

// 1. Fix the recursion block end (missing )} and start roadmap block)
// Look for lines 2561-2565 area
let recursionEndIndex = -1;
for (let i = 2500; i < 2600; i++) {
    if (lines[i] && lines[i].includes('</motion.div>') && lines[i + 2] && lines[i + 2].includes('AI Roadmap Interactive Sub-Views')) {
        recursionEndIndex = i;
        break;
    }
}

if (recursionEndIndex !== -1) {
    console.log('Found recursion end at line', recursionEndIndex + 1);
    lines.splice(recursionEndIndex + 1, 0,
        '                                                 )}',
        '',
        '                                                 {recommendationView === \'roadmap\' && (',
        '                                                     <div className="space-y-6 animate-in fade-in duration-700">'
    );
} else {
    console.log('Could not find exact recursion end marker. Searching more broadly...');
    // Fallback: look for the second </motion.div> after {recommendationView === 'recursion' && (
    let recursionStart = -1;
    for (let i = 2200; i < 2400; i++) {
        if (lines[i] && lines[i].includes("recommendationView === 'recursion'")) {
            recursionStart = i;
            break;
        }
    }
    if (recursionStart !== -1) {
        let count = 0;
        for (let i = recursionStart; i < lines.length; i++) {
            if (lines[i].includes('</motion.div>')) {
                count++;
                if (count === 2) { // 1 for the inner div, 1 for the key="recursion" motion.div
                    recursionEndIndex = i;
                    console.log('Found recursion end (fallback) at line', recursionEndIndex + 1);
                    lines.splice(recursionEndIndex + 1, 0,
                        '                                                 )}',
                        '',
                        '                                                 {recommendationView === \'roadmap\' && (',
                        '                                                     <div className="space-y-6 animate-in fade-in duration-700">'
                    );
                    break;
                }
            }
        }
    }
}

// 2. Remove garbage cluster at 2846-2851 area
// Find the "Submit Logic" button
let submitLogicIndex = -1;
for (let i = 0; i < lines.length; i++) {
    if (lines[i] && lines[i].includes('Submit Logic') && lines[i].includes('bg-purple-500')) {
        submitLogicIndex = i;
        break;
    }
}

if (submitLogicIndex !== -1) {
    console.log('Found garbage Submit Logic at line', submitLogicIndex + 1);
    // Remove the 3 lines before it (the stray </div>s) and the line after it (the stray </motion.div>) and its )}
    // Based on view_file:
    // 2845: )}
    // 2846: </div>
    // 2847: </div>
    // 2848: </div>
    // 2849: <button ... Submit Logic
    // 2850: </motion.div>
    // 2851: )}
    lines.splice(submitLogicIndex - 3, 6);
}

// 3. Final tail fix
// The modal was opened with activeModal === 'recommendation' and AnimatePresence and div.
// We need to close those at the very end of the modal content.
// Find the end of interview_sim
let interviewSimEnd = -1;
for (let i = lines.length - 1; i > 2500; i--) {
    if (lines[i] && lines[i].includes('roadmapSubView === \'interview_sim\'')) {
        // Find the next AP end
        for (let j = i; j < lines.length; j++) {
            if (lines[j].includes('</AnimatePresence>') && lines[j - 1].includes(')}')) {
                interviewSimEnd = j;
                break;
            }
        }
        break;
    }
}

if (interviewSimEnd !== -1) {
    console.log('Closing roadmapView and recommendationModal after line', interviewSimEnd + 1);
    lines.splice(interviewSimEnd + 1, 0,
        '                                                    </div>',
        '                                                )}',
        '                                            </AnimatePresence>',
        '                                        </div>',
        '                                    )}'
    );
}

// 4. Clean up the very end of the file (remove redundant closes)
// The Dashboard component ends at 3036.
// Let's find the main </div> return end.
let mainEnd = -1;
for (let i = lines.length - 1; i > 0; i--) {
    if (lines[i].includes('export default function Dashboard() {')) break;
    if (lines[i].trim() === '}') {
        mainEnd = i;
        // The return ( ... ) should end here.
        break;
    }
}

// We'll just truncate the redundant tail manually if we found it.
// I'll search for the cluster of </AnimatePresence> and </div> at the end.
let clusterStart = -1;
for (let i = lines.length - 1; i > 2500; i--) {
    if (lines[i].includes('</AnimatePresence>') && lines[i + 1] && lines[i + 1].includes('</div>') && lines[i + 2] && lines[i + 2].includes(')')) {
        clusterStart = i;
        break;
    }
}

if (clusterStart !== -1) {
    console.log('Fixing redundant tail cluster at line', clusterStart + 1);
    const newTail = [
        '                                </div>',
        '                            </motion.div>',
        '                        </div>',
        '                    )}',
        '                </AnimatePresence>',
        '            </div>',
        '        </div>',
        '    )',
        '}'
    ];
    // Remove everything from clusterStart to the end of component and replace with newTail
    // Actually, let's just find where it SHOULD end.
    // I'll replace the last dozen lines of the component.
}

fs.writeFileSync(targetFile, lines.join('\n'), 'utf8');
console.log('Dashboard.jsx repair attempt completed.');
