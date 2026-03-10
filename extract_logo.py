import base64
import re
import xml.etree.ElementTree as ET

with open('public/logo.svg', 'r') as f:
    content = f.read()

# search for base64 encoded png
match = re.search(r'href="data:image/png;base64,([^"]+)"', content)
if match:
    image_data = base64.b64decode(match.group(1))
    with open('public/logo_extracted.png', 'wb') as f:
        f.write(image_data)
    print("Extracted base64 png")
else:
    print("Could not find base64 png in svg")
