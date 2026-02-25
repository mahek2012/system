
import os

file_path = r'd:\Mahek\system\web\src\components\Dashboard.jsx'

with open(file_path, 'r', encoding='utf-8') as f:
    lines = f.readlines()

# We want to remove the redundant tags between 3026 and 3031 (old line numbers)
# Let's find the 'Sub-components' marker
marker_index = -1
for i in range(len(lines)-100, len(lines)):
    if '// Sub-components' in lines[i]:
        marker_index = i
        break

if marker_index != -1:
    # Look back from the marker for the modal end sequence
    # 3023: </AnimatePresence> (closes 2238)
    # 3024: </div> (closes 2237)
    # 3025: )} (closes 2236)
    
    # After 3025, we should only have </AnimatePresence> (closes 600) and ) }
    
    valid_reco_end = -1
    for i in range(marker_index - 5, 2200, -1):
        if ')}' in lines[i] and '</div>' in lines[i-1] and '</AnimatePresence>' in lines[i-2]:
            if 'activeModal === \'recommendation\'' not in lines[i-3]: # it's the end, not start
                valid_reco_end = i
                print(f"Found valid recommendation modal end at index {i}")
                break
    
    if valid_reco_end != -1:
        # After valid_reco_end, we expect:
        # </AnimatePresence>
        # )
        # }
        
        # Everything between lines[valid_reco_end + 1] and the final closing tags should be removed.
        # Let's find the final closing tags just before the marker
        final_tags_start = -1
        for i in range(marker_index - 1, valid_reco_end, -1):
            if '}' in lines[i] and ')' in lines[i-1] and '</AnimatePresence>' in lines[i-2]:
                final_tags_start = i - 2
                break
        
        if final_tags_start != -1 and final_tags_start > valid_reco_end + 1:
            print(f"Deleting redundant lines from {valid_reco_end + 2} to {final_tags_start}")
            del lines[valid_reco_end + 1 : final_tags_start]

with open(file_path, 'w', encoding='utf-8') as f:
    f.writelines(lines)
print("Final cleanup applied.")
