import base64
from PIL import Image
from io import BytesIO

# Read the logo.png we already cleaned and fixed for transparency
img = Image.open('public/logo.png')
# Ensure it is RGBA
img = img.convert("RGBA")

# Save to a buffer to get the clean base64
buffer = BytesIO()
img.save(buffer, format="PNG")
b64_str = base64.b64encode(buffer.getvalue()).decode('utf-8')

# The original viewBox was 0 0 375 375, and we can just use 0 0 width height
width, height = img.size

# Construct a clean SVG without problematic iOS masks/feColorMatrix
svg_content = f"""<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 {width} {height}" width="100%" height="100%">
  <image width="{width}" height="{height}" xlink:href="data:image/png;base64,{b64_str}" />
</svg>"""

with open('public/nav-logo.svg', 'w') as f:
    f.write(svg_content)

print("Generated clean, transparent nav-logo.svg wrapper")
