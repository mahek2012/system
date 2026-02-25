
import os

file_path = r'd:\Mahek\system\web\src\components\Dashboard.jsx'

with open(file_path, 'r', encoding='utf-8') as f:
    lines = f.readlines()

# 1. Find line 2561 (index 2560)
# We expect it to be </motion.div>
# We want to insert two </div> before it.

target_index = 2560
if '</motion.div>' in lines[target_index]:
    print(f"Found target at index {target_index}: {repr(lines[target_index])}")
    # Insert from bottom up to avoid index shift
    lines.insert(target_index, '                                                            </div>\n')
    lines.insert(target_index, '                                                        </div>\n')
    print("Inserted two missing div tags.")
else:
    print("Target line mismatch. Looking for context...")
    for i in range(2550, 2570):
        if '</motion.div>' in lines[i] and ')}' in lines[i+2]:
             print(f"Found context at index {i}")
             lines.insert(i, '                                                            </div>\n')
             lines.insert(i, '                                                        </div>\n')
             break

with open(file_path, 'w', encoding='utf-8') as f:
    f.writelines(lines)
print("File updated.")
