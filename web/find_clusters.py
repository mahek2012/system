
import re

file_path = r'd:\Mahek\system\web\src\components\Dashboard.jsx'

with open(file_path, 'r', encoding='utf-8') as f:
    lines = f.readlines()

print("--- Clustered ')}' ---")
count = 0
for i, line in enumerate(lines):
    if ')}' in line:
        # Check if there are many in a row
        if i + 1 < len(lines) and ')}' in lines[i+1]:
            count += 1
            if count == 1:
                print(f"Cluster starts around line {i+1}")
        else:
            if count > 1:
                print(f"Cluster ends around line {i+1} (Size: {count+1})")
            count = 0

print("\n--- All ')}' positions (first 50) ---")
found = 0
for i, line in enumerate(lines):
    if ')}' in line:
        found += 1
        print(f"{i+1:4}: {line.strip()}")
        if found >= 50:
            break
