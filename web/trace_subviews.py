
import re

file_path = r'd:\Mahek\system\web\src\components\Dashboard.jsx'

with open(file_path, 'r', encoding='utf-8') as f:
    lines = f.readlines()

print("--- motion.div Tags (Extended Range) ---")
for i, line in enumerate(lines):
    if i > 2570: # After the Hub view
        if '<motion.div' in line:
            print(f"OPEN:  Line {i+1}: {line.strip()}")
        if '</motion.div>' in line:
            print(f"CLOSE: Line {i+1}: {line.strip()}")
        # Also track the conditionals that wrap them
        if 'roadmapSubView ===' in line and '&& (' in line:
            print(f"SUBVIEW: Line {i+1}: {line.strip()}")
        if ')}' in line and i > 2600:
             # Just show a few to avoid noise, but enough to see the sequence
             if i % 100 == 0 or i > 3000:
                 print(f"CLOSE_COND: Line {i+1}: {line.strip()}")

print("\n--- End of Subviews ---")
for i in range(3015, 3030):
    print(f"{i+1}: {lines[i].strip()}")
