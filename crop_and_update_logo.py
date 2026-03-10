from PIL import Image
import base64
from io import BytesIO

# Open the new logo
img = Image.open('public/logo_with_name.png').convert("RGBA")

# Get bounding box of non-transparent content
bbox = img.getbbox()
if bbox:
    img = img.crop(bbox)
    # Add a tiny bit of padding (e.g. 10px) to prevent clipping
    padding = 20
    new_width = img.width + padding * 2
    new_height = img.height + padding * 2
    new_img = Image.new("RGBA", (new_width, new_height), (0, 0, 0, 0))
    new_img.paste(img, (padding, padding))
    img = new_img

# Save the cropped/padded image
img.save('public/logo_with_name_cropped.png')

# Save to a buffer to get the clean base64
buffer = BytesIO()
img.save(buffer, format="PNG")
b64_str = base64.b64encode(buffer.getvalue()).decode('utf-8')

width, height = img.size

# Construct a clean SVG with the CROPPED logo
svg_content = f"""<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 {width} {height}" width="100%" height="100%" style="background: transparent;">
  <image width="{width}" height="{height}" xlink:href="data:image/png;base64,{b64_str}" />
</svg>"""

with open('public/nav-logo.svg', 'w') as f:
    f.write(svg_content)

print(f"Generated cropped nav-logo.svg. Size: {width}x{height}")
