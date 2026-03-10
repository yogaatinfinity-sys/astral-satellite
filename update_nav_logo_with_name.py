import base64
from PIL import Image
from io import BytesIO

# Read the logo_with_name.png that ALREADY has transparency
img = Image.open('public/logo_with_name.png')
# Ensure it is RGBA
img = img.convert("RGBA")

# Save to a buffer to get the clean base64
buffer = BytesIO()
img.save(buffer, format="PNG")
b64_str = base64.b64encode(buffer.getvalue()).decode('utf-8')

width, height = img.size

# Construct a clean SVG with the new logo (including brand name text)
svg_content = f"""<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 {width} {height}" width="100%" height="100%" style="background: transparent;">
  <image width="{width}" height="{height}" xlink:href="data:image/png;base64,{b64_str}" />
</svg>"""

with open('public/nav-logo.svg', 'w') as f:
    f.write(svg_content)

print("Generated new nav-logo.svg with brand name logo")
