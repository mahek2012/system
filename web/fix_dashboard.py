
import os

file_path = r'd:\Mahek\system\web\src\components\Dashboard.jsx'

with open(file_path, 'r', encoding='utf-8') as f:
    lines = f.readlines()

# Context around 2563-2564
# We want to find the line that has </motion.div> followed by )}
# and insert </div> in between.

found = False
for i in range(2400, 2600):
    if i >= len(lines):
        break
    if '</motion.div>' in lines[i] and ')}' in lines[i+1]:
        print(f"Found target at lines {i+1} and {i+2}")
        # Check if </div> is already there
        if '</div>' not in lines[i+1]:
            # Insert </div>
            # Preserve indentation of the </motion.div> line or slightly less
            indent = lines[i][:lines[i].find('</motion.div>')]
            # Let's check line 2405 for indent of div
            # Line 2405 is around lines[2404]
            div_indent = "                                                 " # from observation
            lines.insert(i+1, div_indent + '</div>\n')
            found = True
            print("Inserted </div>")
            break

if found:
    with open(file_path, 'w', encoding='utf-8') as f:
        f.writelines(lines)
    print("File updated successfully.")
else:
    print("Target context not found.")
