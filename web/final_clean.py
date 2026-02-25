
import os

file_path = r'd:\Mahek\system\web\src\components\Dashboard.jsx'

with open(file_path, 'r', encoding='utf-8') as f:
    lines = f.readlines()

# Remove the extra </div> at lines 2564 and 2563 (one by one to avoid index shift)
# We saw them in Step 356.
if '</div>' in lines[2563]:
    print(f"Removing redundant div at 2564: {repr(lines[2563])}")
    del lines[2563]

if '</div>' in lines[2562]:
    print(f"Removing redundant div at 2563: {repr(lines[2562])}")
    del lines[2562]

with open(file_path, 'w', encoding='utf-8') as f:
    f.writelines(lines)
print("Final cleanup of extra divs applied.")
