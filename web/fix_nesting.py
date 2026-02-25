
import os

file_path = r'd:\Mahek\system\web\src\components\Dashboard.jsx'

with open(file_path, 'r', encoding='utf-8') as f:
    lines = f.readlines()

# Find the roadmap Hub block near 2560
# Look for the pattern of div closes followed by motion.div close
found = False
for i in range(2550, 2580):
    if i + 2 < len(lines) and '</div>' in lines[i] and '</div>' in lines[i+1] and '</motion.div>' in lines[i+2]:
        print(f"Found wrong nesting at lines {i+1}-{i+3}")
        # Swap them: motion.div should be first
        # We want: </motion.div>, </div>, </div>
        lines[i] = '                                            </motion.div>\n'
        lines[i+1] = '                                        </div>\n'
        lines[i+2] = '                                    </div>\n'
        found = True
        break

if not found:
    # Try another pattern just in case whitespace differs
    for i in range(2550, 2580):
         if i + 1 < len(lines) and '</div>' in lines[i] and '</motion.div>' in lines[i+1]:
              print(f"Found wrong nesting (pair) at lines {i+1}-{i+2}")
              lines[i] = '                                        </motion.div>\n'
              lines[i+1] = '                                    </div>\n'
              found = True
              break

with open(file_path, 'w', encoding='utf-8') as f:
    f.writelines(lines)
print("Nesting order fix applied.")
