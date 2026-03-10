from PIL import Image

def process_image(src, dst):
    img = Image.open(src)
    # Ensure it's RGBA
    img = img.convert("RGBA")
    
    # We can extract the data and put it into a new image to strip metadata like ICC profiles
    data = list(img.getdata())
    new_img = Image.new("RGBA", img.size)
    new_img.putdata(data)
    
    new_img.save(dst, "PNG", optimize=True)

process_image('temp_icon.png', 'public/logo.png')

# create favicon
img = Image.open('public/logo.png')
icon = img.resize((144, 144), Image.Resampling.LANCZOS)
icon.save('src/app/icon.png', "PNG")
print("Done fixing PNGs")
