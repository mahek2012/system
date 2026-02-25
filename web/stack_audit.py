
import re

file_path = r'd:\Mahek\system\web\src\components\Dashboard.jsx'

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Simplify content: remove strings and comments
# This is hard to do perfectly with regex but let's try a bit
content = re.sub(r'\{/\*.*?\*/\}', '', content, flags=re.DOTALL) # JSX comments
content = re.sub(r'//.*?\n', '\n', content) # JS comments
content = re.sub(r'/\*.*?\*/', '', content, flags=re.DOTALL) # JS block comments

def find_unbalanced(tag_name):
    print(f"\n--- Analyzing {tag_name} ---")
    stack = []
    # Find all tags
    pattern = re.compile(rf'<(/?){re.escape(tag_name)}(\s|/|>)')
    
    # We also need to identify self-closing tags
    # This is tricky because they can be multiline.
    # Let's find all '<tag' and then the matching '>'
    pos = 0
    while True:
        match = pattern.search(content, pos)
        if not match:
            break
        
        is_closing = match.group(1) == '/'
        start_index = match.start()
        
        # Find the end of the tag
        end_pos = content.find('>', start_index)
        if end_pos == -1:
             break
        
        full_tag_content = content[start_index : end_pos + 1]
        is_self_closing = full_tag_content.endswith('/>')
        
        # Get line number
        line_num = content.count('\n', 0, start_index) + 1
        
        if is_self_closing:
            print(f"SELF: Line {line_num}")
        elif is_closing:
            if stack:
                stack.pop()
            else:
                print(f"EXTRA CLOSE: Line {line_num}")
        else:
            stack.append(line_num)
        
        pos = end_pos + 1
    
    for s in stack:
        print(f"UNCLOSED OPEN: Line {s}")

find_unbalanced('motion.div')
find_unbalanced('div')
find_unbalanced('AnimatePresence')
