from PIL import Image

def make_transparent(image_path, output_path):
    img = Image.open(image_path).convert("RGBA")
    datas = img.getdata()

    new_data = []
    # Let's say black background => (0, 0, 0)
    for item in datas:
        # turn black into transparent
        if item[0] < 50 and item[1] < 50 and item[2] < 50:
            new_data.append((255, 255, 255, 0))
        # maybe turn white to transparent too
        elif item[0] > 200 and item[1] > 200 and item[2] > 200:
            new_data.append((255, 255, 255, 0))
        else:
            new_data.append(item)

    img.putdata(new_data)
    
    # Save the huge version for navbar maybe?
    img.save('public/logo.png', "PNG")
    
    # resize for icon
    img_icon = img.resize((144, 144), Image.LANCZOS)
    img_icon.save('src/app/icon.png', "PNG")
    print(f"Generated transparent public/logo.png and src/app/icon.png")

make_transparent('public/logo_extracted.png', '')
