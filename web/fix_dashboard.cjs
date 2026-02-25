const fs = require('fs');
const path = require('path');

const targetFile = path.resolve('d:/Mahek/system/web/src/components/Dashboard.jsx');
let content = fs.readFileSync(targetFile, 'utf8');

// 1. Fix missing closing tags for recommendationView block
// Find the end of the recursion motion.div
const recursionEndPattern = /(<motion\.div key="recursion"[^>]*>[\s\S]+?<\/motion\.div>)\s*(?!\s*\)\}\s*<\/AnimatePresence>)\s*(\{ roadmapSubView)/;
if (recursionEndPattern.test(content)) {
    console.log('Inserting missing closing tags for recommendationView');
    content = content.replace(recursionEndPattern, '$1\n                                                )}\n                                            </AnimatePresence>\n\n                                            $2');
}

// 2. Remove garbage cluster around 2846
const garbagePattern = /<\/motion\.div>\s*\}\)\s*(?:<\/div>\s*){3}\s*<button[^>]+>Submit Logic<\/button>\s*<\/motion\.div>\s*\}\)\s*\{roadmapSubView === 'booster'/;
if (garbagePattern.test(content)) {
    console.log('Removing garbage cluster');
    content = content.replace(garbagePattern, "</motion.div>\n                                                                 )}\n\n                                                                 {roadmapSubView === 'booster'");
} else {
    // Try a more flexible pattern if indentation differs
    const garbagePatternFlex = /<\/motion\.div>\s*\}\)\s*<\/div>\s*<\/div>\s*<\/div>\s*<button[^>]+>Submit Logic<\/button>\s*<\/motion\.div>\s*\}\)\s*\{roadmapSubView === 'booster'/;
    if (garbagePatternFlex.test(content)) {
        console.log('Removing garbage cluster (flex)');
        content = content.replace(garbagePatternFlex, "</motion.div>\n                                                                 )}\n\n                                                                 {roadmapSubView === 'booster'");
    }
}

// 3. Cleanup tail (3020 onwards)
// We closed AP2 at 2565.
// roadmapSubView block (2566) closes with its own AP, motion.div etc.
const tailPattern = /<\/motion\.div>\s*\}\)\s*<\/AnimatePresence>\s*(?:<\/motion\.div>\s*\}\)\s*<\/AnimatePresence>\s*){1,2}(<\/div>\s*\}\)\s*<\/div>\s*<\/motion\.div>\s*<\/div>\s*\}\)\s*<\/AnimatePresence>\s*<\/div>\s*\)\s*\})/;
if (tailPattern.test(content)) {
    console.log('Cleaning up tail');
    content = content.replace(tailPattern, "</motion.div>\n                                                                 )}\n                                                             </AnimatePresence>\n                                                         $1");
} else {
    // If tail doesn't match, let's just target the redundant AnimatePresence/motion.div
    const redundantTailPattern = /<\/AnimatePresence>\s*<\/div>\s*\}\)\s*<\/AnimatePresence>/;
    if (redundantTailPattern.test(content)) {
        console.log('Fixing redundant tail tags');
        content = content.replace(redundantTailPattern, "</AnimatePresence>");
    }
}

fs.writeFileSync(targetFile, content, 'utf8');
console.log('Successfully repaired Dashboard.jsx');
