const fs = require('fs');
const code = fs.readFileSync('d:/Mahek/system/web/src/components/Dashboard.jsx', 'utf8');

function checkBalance(str) {
    let stack = [];
    let pairs = { '{': '}', '(': ')', '[': ']' };
    let lines = str.split('\n');

    for (let i = 0; i < lines.length; i++) {
        let line = lines[i];
        for (let j = 0; j < line.length; j++) {
            let char = line[j];
            if (pairs[char]) {
                stack.push({ char, line: i + 1, col: j + 1 });
            } else if (Object.values(pairs).includes(char)) {
                if (stack.length === 0) {
                    console.error(`Unmatched closing ${char} at line ${i + 1}, col ${j + 1}`);
                    return;
                }
                let last = stack.pop();
                if (pairs[last.char] !== char) {
                    console.error(`Mismatched ${char} at line ${i + 1}, col ${j + 1}. Expected ${pairs[last.char]} (opened at line ${last.line}, col ${last.col})`);
                    return;
                }
            }
        }
    }
    if (stack.length > 0) {
        let last = stack.pop();
        console.error(`Unclosed ${last.char} opened at line ${last.line}, col ${last.col}`);
    } else {
        console.log('Balanced!');
    }
}

checkBalance(code);
