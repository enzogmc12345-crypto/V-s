with open('index.html', 'r', encoding='utf-8') as f:
    lines = f.readlines()

for i, line in enumerate(lines):
    if "<!-- Item 3 — Bela Hair" in line:
        start_idx = i
        break

for i in range(start_idx, len(lines)):
    if "<!-- Item 9" in line:
        # found item 9, find the closing div for item 9
        pass
    if "Site Loja Moda Única" in line:
        # next div is ptf-overlay
        pass
    
# Let's just use line numbers directly if they haven't changed.
# Lines to delete: 1466 to 1723
# We'll print the boundary lines to be safe.
print("Line 1465:", lines[1464].strip())
print("Line 1466:", lines[1465].strip())
print("Line 1723:", lines[1722].strip())
print("Line 1724:", lines[1723].strip())
print("Line 1725:", lines[1724].strip())

del lines[1465:1723]

with open('index.html', 'w', encoding='utf-8') as f:
    f.writelines(lines)
