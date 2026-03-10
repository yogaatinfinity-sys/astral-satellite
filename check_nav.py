import base64
import json
from PIL import Image

def analyze_nav_logo_svg():
    with open('src/app/nav-logo.svg', 'r') as f:
        content = f.read()

    # Extract base64
    if "base64," in content:
        b64_str = content.split("base64,")[1].split('"')[0]
        with open('temp_nav_icon.png', 'wb') as out:
            out.write(base64.b64decode(b64_str))
        
        img = Image.open('temp_nav_icon.png').convert("RGBA")
        colors = img.getcolors(maxcolors=1000000)
        # Find the most common colors
        colors = sorted(colors, key=lambda x: x[0], reverse=True)
        print("Top colors (count, (R,G,B,A)):")
        for count, color in colors[:10]:
            print(f"{count}: {color}")

        # Check corners to see if they are white
        print("Corners:")
        print(img.getpixel((0,0)))
        print(img.getpixel((0, img.height-1)))
        
    else:
        print("No base64 found")

analyze_nav_logo_svg()
