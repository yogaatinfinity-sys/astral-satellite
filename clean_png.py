from PIL import Image

def create_transparent_logo(input_path, out_png, out_icon, color=(13, 148, 136)):
    # Read the grayscale image
    l_img = Image.open(input_path).convert("L")
    
    # Create a new RGBA image with Teal color
    rgba_img = Image.new("RGBA", l_img.size, color + (255,))
    
    # Put the grayscale image as the alpha channel
    rgba_img.putalpha(l_img)
    
    # Save it as public/logo.png
    rgba_img.save(out_png, "PNG")
    print(f"Generated {out_png} with color {color}")
    
    # Create 144x144 icon
    icon_img = rgba_img.resize((144, 144), Image.LANCZOS)
    icon_img.save(out_icon, "PNG")
    print(f"Generated {out_icon}")

create_transparent_logo('public/logo_extracted.png', 'public/logo.png', 'src/app/icon.png', color=(13, 148, 136))
