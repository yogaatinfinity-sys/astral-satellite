from PIL import Image

# Open the cropped transparent logo
img = Image.open('public/logo_with_name_cropped.png')

# Create a square canvas for the icon (144x144)
size = 144
icon = Image.new("RGBA", (size, size), (0, 0, 0, 0))

# Resize the logo to fit within the 144x144 canvas while preserving aspect ratio
img.thumbnail((size, size), Image.Resampling.LANCZOS)

# Paste centered
offset = ((size - img.width) // 2, (size - img.height) // 2)
icon.paste(img, offset)

# Save as src/app/icon.png
icon.save('src/app/icon.png')

print("Updated src/app/icon.png with brand name logo version")
