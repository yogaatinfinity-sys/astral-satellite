import base64
import json
from PIL import Image

def analyze_icon_svg():
    with open('src/app/icon.svg', 'r') as f:
        content = f.read()

    # Extract base64
    if "base64," in content:
        b64_str = content.split("base64,")[1].split('"')[0]
        with open('temp_icon.png', 'wb') as out:
            out.write(base64.b64decode(b64_str))
        
        img = Image.open('temp_icon.png').convert("RGBA")
        colors = img.getcolors(maxcolors=1000000)
        # Find the most common colors
        colors = sorted(colors, key=lambda x: x[0], reverse=True)
        print("Top colors (count, (R,G,B,A)):")
        for count, color in colors[:10]:
            print(f"{count}: {color}")
        
    else:
        print("No base64 found")

analyze_icon_svg()
