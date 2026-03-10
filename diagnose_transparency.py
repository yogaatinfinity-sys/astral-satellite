import base64
from PIL import Image

# test if logo.png is transparent
img = Image.open('public/logo.png')
colors = img.getcolors(maxcolors=100000)
colors = sorted(colors, key=lambda x: x[0], reverse=True)
print("logo.png Top colors (count, (R,G,B,A)):")
for count, color in colors[:5]:
    print(f"{count}: {color}")

# test where the white is coming from
