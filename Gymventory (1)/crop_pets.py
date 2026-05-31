"""
FitPet image cropper — run this after saving the pet sheet as pets-sheet.png
in the same folder as this script.

Usage: python3 crop_pets.py
Output: pets/ folder with one PNG per pet
"""

from PIL import Image
import os, math

# ── Grid layout (based on 1400×750 sheet) ────────────────────────────────────
# 6 columns × 3 rows, each cell ≈ 233×250 px.
# We pick ONE canonical cell per pet (choosing the clearest/most detailed version).
# Adjust CELL_W / CELL_H / OFFSET_X / OFFSET_Y if crops look off.

CELL_W   = 233
CELL_H   = 250
OFFSET_X = 0      # left edge of first column
OFFSET_Y = 20     # top edge of first row
PAD      = 10     # extra padding inside each crop

# (row, col) → skin id
# Row 0 = COMMON + top-right section
# Row 1 = RARE section
# Row 2 = EPIC (left) + LEGENDARY (right)
LAYOUT = {
    (0, 0): "iron-rhino",
    (0, 1): "spark-rabbit",
    (0, 2): "chalk-panda",
    (0, 3): "circuit-panther",   # small teal panther shown in top-right
    (0, 4): "coral-mantis",
    (0, 5): "tide-otter",
    (1, 0): "ember-wolf",
    (1, 1): "glacial-hawk",
    (1, 2): "coral-mantis",      # larger version — will overwrite above
    (1, 3): "tide-otter",        # larger version — will overwrite above
    (1, 4): "mech-bear",
    (1, 5): "void-serpent",
    (2, 0): "circuit-panther",   # detailed EPIC version — overwrites (0,3)
    (2, 1): "storm-gorilla",
    (2, 2): "mech-bear",         # overwritten by (1,4) — picks last written
    (2, 3): "solar-lioness",
    (2, 4): "obsidian-phoenix",
    (2, 5): "nebula-fox",
}

# Prefer the bottom-left (epic/rare) versions over the top-right small ones.
# Later entries in LAYOUT overwrite earlier ones for the same pet.

def crop_pet(img, row, col):
    x = OFFSET_X + col * CELL_W + PAD
    y = OFFSET_Y + row * CELL_H + PAD
    w = CELL_W - PAD * 2
    h = CELL_H - PAD * 2
    return img.crop((x, y, x + w, y + h))

def auto_detect_grid(img):
    """Try to auto-detect cell size from image dimensions."""
    global CELL_W, CELL_H
    CELL_W = img.width // 6
    CELL_H = img.height // 3
    print(f"  Auto-detected cell size: {CELL_W}×{CELL_H} px")

def main():
    sheet_path = os.path.join(os.path.dirname(__file__), "pets-sheet.png")
    if not os.path.exists(sheet_path):
        print("❌  pets-sheet.png not found — save the pet sheet image as")
        print("     pets-sheet.png  in the same folder as this script, then re-run.")
        return

    img = Image.open(sheet_path).convert("RGBA")
    print(f"✅  Loaded sheet: {img.width}×{img.height} px")
    auto_detect_grid(img)

    out_dir = os.path.join(os.path.dirname(__file__), "pets")
    os.makedirs(out_dir, exist_ok=True)

    written = {}
    for (row, col), skin_id in LAYOUT.items():
        crop = crop_pet(img, row, col)
        # Save (later crops overwrite earlier ones — gives us the best version)
        path = os.path.join(out_dir, f"{skin_id}.png")
        crop.save(path)
        written[skin_id] = (row, col)

    # Also save tier-0 copies (app looks for {id}_t0.png first)
    for skin_id, (row, col) in written.items():
        crop = crop_pet(img, row, col)
        for tier in range(5):
            path = os.path.join(out_dir, f"{skin_id}_t{tier}.png")
            # Only write t0 for now — same image for all tiers until tier art exists
            if tier == 0:
                crop.save(path)

    print(f"\n✅  Saved {len(written)} pets to  pets/")
    print("    Files written:")
    for sid in sorted(written):
        print(f"      pets/{sid}.png  +  pets/{sid}_t0.png")
    print("\n🎮  Reload fitpet.html — pets will show as images!")

if __name__ == "__main__":
    main()
