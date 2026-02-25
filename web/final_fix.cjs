const fs = require('fs');
const path = require('path');

const targetFile = path.resolve('d:/Mahek/system/web/src/components/Dashboard.jsx');
let lines = fs.readFileSync(targetFile, 'utf8').split('\n');

// Find the line with "Submit Logic" button
const index = lines.findIndex(line => line.includes('Submit Logic') && line.includes('bg-purple-500'));

if (index !== -1) {
    console.log('Found garbage at index:', index);
    // Remove 2846 to 2851. In the current array, line 2849 is index.
    // So 2846 is index - 3.
    // 2851 is index + 2.
    // We remove index - 3 to index + 2 (6 lines).
    const start = index - 3;
    const count = 6;
    console.log('Removing lines:', lines.slice(start, start + count));
    lines.splice(start, count);
    fs.writeFileSync(targetFile, lines.join('\n'), 'utf8');
    console.log('Successfully cleaned up Dashboard.jsx');
} else {
    console.error('Garbage not found!');
}
