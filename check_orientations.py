from PIL import Image
import os

target_dir = r"c:\Users\pc\.gemini\antigravity\playground\astral-satellite\public\assets\gallery"

for filename in os.listdir(target_dir):
    if filename.endswith(".webp"):
        path = os.path.join(target_dir, filename)
        with Image.open(path) as img:
            w, h = img.size
            ratio = h / w
            orientation = "Square"
            if ratio > 1.2:
                orientation = "Portrait"
            elif ratio < 0.8:
                orientation = "Landscape"
            print(f"{filename}: {w}x{h} ({orientation})")
