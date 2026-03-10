from PIL import Image
import base64
from io import BytesIO

# Load the current 'clean' logo with brand name
img = Image.open('public/logo_with_name_cropped.png').convert("RGBA")

# Save to a buffer with NO METADATA and NO ICC PROFILE
buffer = BytesIO()
img.save(buffer, format="PNG", optimize=True, icc_profile=None)
b64_str = base64.b64encode(buffer.getvalue()).decode('utf-8')

width, height = img.size

# Construct the VERY SIMPLEST SVG possible
svg_content = f"""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {width} {height}" width="100%" height="100%">
  <image width="{width}" height="{height}" href="data:image/png;base64,{b64_str}" />
</svg>"""

with open('public/nav-logo.svg', 'w') as f:
    f.write(svg_content)

print(f"Saved pristine nav-logo.svg (no ICC, no metadata). Size: {width}x{height}")
