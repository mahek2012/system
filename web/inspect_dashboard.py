
import os

file_path = r'd:\Mahek\system\web\src\components\Dashboard.jsx'

with open(file_path, 'r', encoding='utf-8') as f:
    lines = f.readlines()

print("--- Line 2400-2405 ---")
for i in range(2399, 2405):
    print(f"{i+1}: {repr(lines[i])}")

print("\n--- Line 2560-2570 ---")
for i in range(2559, 2570):
    if i < len(lines):
        print(f"{i+1}: {repr(lines[i])}")
