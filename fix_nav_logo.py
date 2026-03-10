import re

with open('public/nav-logo.svg', 'r') as f:
    content = f.read()

# Make the white rects transparent
content = re.sub(r'fill="#ffffff"', 'fill="none"', content)
content = re.sub(r'fill-opacity="1"', 'fill-opacity="0"', content)

with open('public/nav-logo.svg', 'w') as f:
    f.write(content)

print("Saved public/nav-logo.svg with transparent background")
