
import re

file_path = r'd:\Mahek\system\web\src\components\Dashboard.jsx'

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Try to find all tags
# This is hard because of strings, but let's try a simple count for specific tags
tags = ['div', 'motion.div', 'AnimatePresence', 'button', 'span', 'motion.button']
results = {}

for tag in tags:
    open_count = len(re.findall(rf'<{tag}(\s|>)', content))
    close_count = len(re.findall(rf'</{tag}>', content))
    self_close_count = len(re.findall(rf'<{tag}[^>]*/>', content))
    results[tag] = (open_count, close_count, self_close_count)

print("Tag Analysis:")
for tag, (o, c, sc) in results.items():
    effective_o = o - sc
    print(f"{tag:20} | Open: {o:4} | Close: {c:4} | Self-close: {sc:4} | Diff: {effective_o - c}")

# Also count conditionals { ... && (
open_cond = len(re.findall(rf'\{{.*&&\s*\(', content))
close_cond = len(re.findall(rf'\)\s*\}}', content))
print(f"\nConditionals {{... && ( | Open: {open_cond:4} | Close: {close_cond:4} | Diff: {open_cond - close_cond}")
