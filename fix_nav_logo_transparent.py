from PIL import Image
import base64
from io import BytesIO

# Open the extracted image from nav-logo.svg
img = Image.open('temp_nav_icon.png').convert("RGBA")

# Make black pixels transparent
datas = img.getdata()
new_data = []
for item in datas:
    if item[0] == 0 and item[1] == 0 and item[2] == 0:
        new_data.append((0, 0, 0, 0))
    else:
        new_data.append(item)

img.putdata(new_data)

# Save the transparent image
buffer = BytesIO()
img.save(buffer, format="PNG")
b64_str = base64.b64encode(buffer.getvalue()).decode('utf-8')

width, height = img.size

# Construct a VERY COMPATIBLE, cleanly transparent SVG
# We will use pure standard SVG 1.1 structure.
svg_content = f"""<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 {width} {height}" width="100%" height="100%">
  <image width="{width}" height="{height}" xlink:href="data:image/png;base64,{b64_str}" />
</svg>"""

with open('public/nav-logo.svg', 'w') as f:
    f.write(svg_content)

print("Generated universally transparent nav-logo.svg")
