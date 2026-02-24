const fs = require('fs');
const babel = require('@babel/core');

const code = fs.readFileSync('d:/Mahek/system/web/src/components/Dashboard.jsx', 'utf8');

try {
    babel.transformSync(code, {
        presets: ['@babel/preset-react'],
        filename: 'Dashboard.jsx'
    });
    console.log('Success: No syntax errors found.');
} catch (e) {
    console.error('Syntax Error found:');
    console.error(e.message);
}
