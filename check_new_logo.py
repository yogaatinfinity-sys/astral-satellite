from PIL import Image

img = Image.open('public/logo_with_name.png').convert("RGBA")
colors = img.getcolors(maxcolors=1000000)
colors = sorted(colors, key=lambda x: x[0], reverse=True)
print("Top colors (count, (R,G,B,A)):")
for count, color in colors[:10]:
    print(f"{count}: {color}")

print("Corners:")
print(img.getpixel((0,0)))
print(img.getpixel((img.width-1, 0)))
print(img.getpixel((0, img.height-1)))
print(img.getpixel((img.width-1, img.height-1)))
