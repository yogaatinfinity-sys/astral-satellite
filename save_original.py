from PIL import Image

# Read the extracted image
img = Image.open('temp_icon.png')

# Save it as public/logo.png
img.save('public/logo.png', "PNG")
print("Saved public/logo.png")

# Create 144x144 icon
icon_img = img.resize((144, 144), Image.LANCZOS)
icon_img.save('src/app/icon.png', "PNG")
print("Saved src/app/icon.png")
