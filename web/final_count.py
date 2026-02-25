
import re

file_path = r'd:\Mahek\system\web\src\components\Dashboard.jsx'

with open(file_path, 'r', encoding='utf-8') as f:
    lines = f.readlines()

open_m = []
close_m = []
self_m = []

for i, line in enumerate(lines):
    # Self closing: <motion.div ... />
    if re.search(r'<motion\.div[^>]*/>', line):
        self_m.append(i+1)
    # Opening: <motion.div ... > (not ending in />)
    elif re.search(r'<motion\.div', line):
        open_m.append(i+1)
    # Closing: </motion.div>
    if re.search(r'</motion\.div>', line):
        close_m.append(i+1)

print(f"Open: {len(open_m)} | Close: {len(close_m)} | Self: {len(self_m)}")
print(f"Diff (Open - Close): {len(open_m) - len(close_m)}")

print("\nOpen Positions:")
print(open_m)
print("\nClose Positions:")
print(close_m)
