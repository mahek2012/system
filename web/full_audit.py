
import re

file_path = r'd:\Mahek\system\web\src\components\Dashboard.jsx'

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Tags to track
tags = ['div', 'motion.div', 'AnimatePresence']
stack = []

# Regex to find tags and conditionals
# <tag ... > or <tag ... /> or </tag> or { ... && ( or ) }
# This is complex, so let's use a simpler token approach

tokens = []

# 1. Find all JSX tags
# Pattern for opening, closing, and self-closing tags
# We'll use a broad pattern and then refine
tag_pattern = re.compile(r'<(/?)(div|motion\.div|AnimatePresence)(\s|/|>)', re.IGNORECASE)

# 2. Find conditionals
cond_open_pattern = re.compile(r'\{[^{}]*?&&\s*\(')
cond_close_pattern = re.compile(r'\)\s*\}')

# We need to find all these in order of appearance
all_pos = []

for match in tag_pattern.finditer(content):
    start = match.start()
    # Find the end of this tag
    end = content.find('>', start)
    if end == -1: continue
    tag_text = content[start : end + 1]
    is_closing = match.group(1) == '/'
    is_self_closing = tag_text.strip().endswith('/>')
    
    token_type = match.group(2).lower()
    if is_self_closing:
        kind = 'SELF'
    elif is_closing:
        kind = 'CLOSE'
    else:
        kind = 'OPEN'
    
    all_pos.append({
        'pos': start,
        'kind': kind,
        'type': token_type,
        'line': content.count('\n', 0, start) + 1,
        'content': tag_text.replace('\n', ' ')
    })

for match in cond_open_pattern.finditer(content):
    all_pos.append({
        'pos': match.start(),
        'kind': 'OPEN',
        'type': 'cond',
        'line': content.count('\n', 0, match.start()) + 1,
        'content': match.group(0).replace('\n', ' ')
    })

for match in cond_close_pattern.finditer(content):
    all_pos.append({
        'pos': match.start(),
        'kind': 'CLOSE',
        'type': 'cond',
        'line': content.count('\n', 0, match.start()) + 1,
        'content': match.group(0).replace('\n', ' ')
    })

# Sort by position
all_pos.sort(key=lambda x: x['pos'])

print(f"{'Line':<5} | {'Kind':<6} | {'Type':<15} | {'Content'}")
print("-" * 80)

current_stack = []
for p in all_pos:
    if p['kind'] == 'OPEN':
        current_stack.append(p)
        # print(f"{p['line']:<5} | OPEN   | {p['type']:<15} | {p['content'][:50]}")
    elif p['kind'] == 'CLOSE':
        if not current_stack:
            print(f"{p['line']:<5} | EXTRA  | {p['type']:<15} | {p['content'][:50]} (NO OPEN)")
        else:
            last = current_stack.pop()
            if last['type'] != p['type']:
                print(f"{p['line']:<5} | MISMATCH | {p['type']:<15} vs {last['type']} at line {last['line']}")
                # Put it back to keep tracking or something? 
                # This indicates structural error.
    else: # SELF
        # print(f"{p['line']:<5} | SELF   | {p['type']:<15} | {p['content'][:50]}")
        pass

print("\n--- Remaining Stack ---")
for s in current_stack:
    print(f"{s['line']:<5} | UNCLOSED | {s['type']:<15} | {s['content'][:50]}")
