const fs = require('fs');
const path = require('path');

const targetFile = path.resolve('d:/Mahek/system/web/src/components/Dashboard.jsx');
let lines = fs.readFileSync(targetFile, 'utf8').split('\n');

// We want to find the "Submit Logic" button and the closing tags around it that are BETWEEN the new recursion quiz and the booster.
// The new recursion quiz ends with "Verify Logic" and "Verify Logic" is inside an <ArrowRight> button.
// The booster starts with "{/* 🎥 4. Smart Concept Booster */}"

let startIndex = -1;
let endIndex = -1;

for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes("Verify Logic") && lines[i].includes("ArrowRight")) {
        // Find the next ")}" after this.
        for (let j = i + 1; j < lines.length; j++) {
            if (lines[j].trim() === ")}") {
                startIndex = j + 1;
                break;
            }
        }
        break;
    }
}

for (let i = startIndex; i < lines.length; i++) {
    if (lines[i].includes("{/* 🎥 4. Smart Concept Booster */}")) {
        endIndex = i;
        break;
    }
}

if (startIndex !== -1 && endIndex !== -1 && startIndex < endIndex) {
    console.log(`Removing garbage from line ${startIndex + 1} to ${endIndex}`);
    lines.splice(startIndex, endIndex - startIndex);
    fs.writeFileSync(targetFile, lines.join('\n'), 'utf8');
    console.log('Successfully cleaned up Dashboard.jsx');
} else {
    console.error('Could not find garbage boundaries!', { startIndex, endIndex });
}
