
import re

file_path = r'd:\Mahek\system\web\src\components\Dashboard.jsx'

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Simplify content: remove strings and comments
content = re.sub(r'\{/\*.*?\*/\}', '', content, flags=re.DOTALL) 
content = re.sub(r'//.*?\n', '\n', content)
content = re.sub(r'/\*.*?\*/', '', content, flags=re.DOTALL)

def find_unbalanced(tag_name):
    print(f"\n--- Analyzing {tag_name} ---")
    stack = []
    pattern = re.compile(rf'<(/?){re.escape(tag_name)}(\s|/|>)')
    
    pos = 0
    while True:
        match = pattern.search(content, pos)
        if not match:
            break
        
        is_closing = match.group(1) == '/'
        start_index = match.start()
        
        # Find the end of the tag (the matching >)
        # We need to handle nested brackets if any, but typically JSX tags don't have nested >
        end_pos = content.find('>', start_index)
        if end_pos == -1:
             break
        
        full_tag_content = content[start_index : end_pos + 1]
        # Robust self-closing check: ends with /> (ignoring whitespace)
        is_self_closing = re.search(r'/>\s*$', full_tag_content) is not None
        
        line_num = content.count('\n', 0, start_index) + 1
        
        if is_self_closing:
            # print(f"SELF: Line {line_num}")
            pass
        elif is_closing:
            if stack:
                stack.pop()
            else:
                print(f"EXTRA CLOSE: Line {line_num}")
        else:
            stack.append(line_num)
        
        pos = end_pos + 1
    
    for s in stack:
        # Check if this line is in the modal system
        print(f"UNCLOSED OPEN: Line {s} | Content: {content.splitlines()[s-1].strip()[:50]}")

find_unbalanced('motion.div')
find_unbalanced('div')
find_unbalanced('AnimatePresence')
