from PIL import Image

# Read the extracted image
img = Image.open('public/logo_extracted.png')

# Resize it to 144x144, keeping transparency
img = img.resize((144, 144), Image.LANCZOS)

# Save as app/icon.png
img.save('src/app/icon.png')
print("Successfully generated src/app/icon.png")

# Also save as public/logo.png for the navbar to use
img_large = Image.open('public/logo_extracted.png')
img_large.save('public/logo.png')
print("Successfully saved public/logo.png")
