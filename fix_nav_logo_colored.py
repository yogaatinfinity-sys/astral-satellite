import base64
from PIL import Image
from io import BytesIO

# Read the logo.png we already cleaned and fixed for transparency (it HAS the original colors!)
img = Image.open('public/logo.png')
# Ensure it is RGBA
img = img.convert("RGBA")

# Save to a buffer to get the clean base64
buffer = BytesIO()
img.save(buffer, format="PNG")
b64_str = base64.b64encode(buffer.getvalue()).decode('utf-8')

width, height = img.size

# Construct a clean SVG
# The key here is not having any background and ensuring color is accurate.
# The image itself is RGBA, so it will be transparent as long as SVG doesn't render text/background white.
svg_content = f"""<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 {width} {height}" width="100%" height="100%" style="background: transparent;">
  <image width="{width}" height="{height}" xlink:href="data:image/png;base64,{b64_str}" />
</svg>"""

with open('public/nav-logo.svg', 'w') as f:
    f.write(svg_content)

print("Generated clean, transparent, colored nav-logo.svg wrapper")
