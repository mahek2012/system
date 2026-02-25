
import re

file_path = r'd:\Mahek\system\web\src\components\Dashboard.jsx'

with open(file_path, 'r', encoding='utf-8') as f:
    lines = f.readlines()

print("--- Tags from Line 2900 to End ---")
for i, line in enumerate(lines):
    if i >= 2900:
        clean_line = line.strip()
        if not clean_line: continue
        
        tags_found = []
        if '<motion.div' in clean_line: tags_found.append("OPEN_MOTION")
        if '</motion.div>' in clean_line: tags_found.append("CLOSE_MOTION")
        if '<div' in clean_line: tags_found.append("OPEN_DIV")
        if '</div' in clean_line: tags_found.append("CLOSE_DIV")
        if '<AnimatePresence' in clean_line: tags_found.append("OPEN_AP")
        if '</AnimatePresence>' in clean_line: tags_found.append("CLOSE_AP")
        if ')}' in clean_line: tags_found.append("CLOSE_COND")
        
        if tags_found:
            print(f"{i+1:4}: {' | '.join(tags_found):20} | {clean_line}")
