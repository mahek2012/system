
import os

file_path = r'd:\Mahek\system\web\src\components\Dashboard.jsx'

with open(file_path, 'r', encoding='utf-8') as f:
    lines = f.readlines()

# 1. Remove the extra </div> at line 2402 (index 2401)
# Note: My inspection showed line 2402 is '            </div>\n'
if '            </div>\n' in lines[2401]:
    print(f"Removing extra div at line 2402: {repr(lines[2401])}")
    del lines[2401]
else:
    print("Extra div at 2402 not found where expected.")

# 2. Fix the roadmap Hub block (around 2564-2565)
# Inspect lines again to find '            </motion.div>\n'
# After del 2401, old 2564 becomes 2563.
found_roadmap_end = False
for i in range(2550, 2580):
    if i < len(lines) and '</motion.div>' in lines[i]:
        print(f"Found motion.div end at line {i+1}")
        # Insert </div> after </motion.div> if missing
        if ')}' in lines[i+1]:
            print("Inserting missing </div> before )} at roadmap end")
            lines.insert(i+1, '                                                </div>\n')
            found_roadmap_end = True
            break

# 3. Remove redundant tags at the end
# After updates, let's find the second set of closing tags
# We expect the file to end around line 3030-3040
# We want to keep:
# </AnimatePresence> (closes 2238)
# </div> (closes 2237)
# )} (closes 2236)
# And then nothing until sub-components

# Let's find the pattern
reco_end_indices = []
for i in range(len(lines)-20, len(lines)):
    if ')}' in lines[i] and 'activeModal === \'recommendation\'' not in lines[i]: # naive check
        reco_end_indices.append(i)

print(f"Found potential modal ends at: {[i+1 for i in reco_end_indices]}")

# Looking at Step 209: 
# 3022: )}
# 3023: </AnimatePresence>
# 3024: </div>
# 3025: )}
# 3027: </div>
# ...
# We want to keep everything up to 3025 (adjusted index) and delete 3027 onwards (until the sub-component)

# Let's find the 'Sub-components' marker
marker_index = -1
for i in range(len(lines)-50, len(lines)):
    if '// Sub-components' in lines[i]:
        marker_index = i
        break

if marker_index != -1:
    # Find the last valid close tag set before the marker
    # We want to delete from the first extra tag until the marker
    # Based on observation, 3027 is the first extra.
    # We should search for where the modal actually ends.
    
    # Let's look for the last set of three tags in sequence: </AnimatePresence>, </div>, )}
    for i in range(marker_index - 1, marker_index - 10, -1):
        if ')}' in lines[i] and '</div>' in lines[i-1] and '</AnimatePresence>' in lines[i-2]:
             # This is line 3025 in old view.
             # Everything after this until marker_index should be deleted.
             print(f"Keeping valid modal end at lines {i-1}, {i}, {i+1}")
             start_del = i + 1
             end_del = marker_index
             if start_del < end_del:
                 print(f"Deleting redundant tags from line {start_del+1} to {end_del}")
                 del lines[start_del:end_del]
             break

with open(file_path, 'w', encoding='utf-8') as f:
    f.writelines(lines)
print("File structural fix applied.")
