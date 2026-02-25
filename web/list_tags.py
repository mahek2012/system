
import re

file_path = r'd:\Mahek\system\web\src\components\Dashboard.jsx'

with open(file_path, 'r', encoding='utf-8') as f:
    lines = f.readlines()

print("--- AnimatePresence Tags ---")
for i, line in enumerate(lines):
    if '<AnimatePresence' in line:
        print(f"OPEN:  Line {i+1}: {line.strip()}")
    if '</AnimatePresence>' in line:
        print(f"CLOSE: Line {i+1}: {line.strip()}")

print("\n--- motion.div Tags (selected range) ---")
for i, line in enumerate(lines):
    if i > 2200 and i < 2600:
        if '<motion.div' in line:
            print(f"OPEN:  Line {i+1}: {line.strip()}")
        if '</motion.div>' in line:
            print(f"CLOSE: Line {i+1}: {line.strip()}")

print("\n--- div Tags (selected range) ---")
for i, line in enumerate(lines):
    if i > 2550 and i < 2580:
        if '<div' in line:
            print(f"OPEN:  Line {i+1}: {line.strip()}")
        if '</div' in line:
            print(f"CLOSE: Line {i+1}: {line.strip()}")
