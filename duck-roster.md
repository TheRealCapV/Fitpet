# 🦆 FitPet All-Duck Roster Plan

Every pet becomes a duck. Each duck maps 1:1 onto an existing pet ID — **keep the same
filenames in `pets/`** and the same rarity + element, so saves, fragments, battles, and
unlocks all keep working with zero migration.

When the art is ready: drop the PNGs into `pets/` (overwriting the old animals), then
have Claude swap the names/descriptions in `ALL_SKINS` (one small edit).

---

## Image style template (lock this, vary only the [DUCK] part)

> A [DUCK DESCRIPTION], single duck character, full body, standing in a slight 3/4 view,
> fierce confident expression, premium mobile game collectible art style, detailed
> digital painting with soft cel shading, dramatic rim lighting, isolated on a plain
> solid background for easy cutout, centered, square, no text, no watermark

Tips:
- Generate at 1024×1024 or larger, then remove the background (transparent PNG).
- Keep the same pose/angle across all 16 so the collection grid looks cohesive.
- Escalate visual drama with rarity: commons plain, divine absurd.

---

## COMMON — "normal ducks with a gimmick" (plain on purpose)

| File (keep name!) | New name | Element | Look |
|---|---|---|---|
| `iron-rhino.png` | **Mallard** | Earth | The starter. A completely ordinary green-headed mallard standing proudly like it doesn't know it's basic. |
| `spark-rabbit.png` | **Static Duckling** | Electric | Tiny fluffy yellow duckling, down feathers sticking up with static electricity, a few tiny sparks. |
| `chalk-panda.png` | **Chalk Duck** | Earth | White duck dusted head-to-toe in gym chalk, small chalk cloud puffing off its wings, deadpan stare. |

**Prompts**
1. Mallard: `an ordinary proud mallard duck with a green head and brown chest, slightly smug expression`
2. Static Duckling: `a tiny fluffy yellow duckling with static-charged down feathers sticking up, small electric sparks crackling around it`
3. Chalk Duck: `a white duck covered in powdery white gym chalk dust, a puff of chalk cloud around its wings, deadpan serious face`

---

## RARE — "ducks with a theme" (one strong color + effect)

| File | New name | Element | Look |
|---|---|---|---|
| `ember-wolf.png` | **Ember Duck** | Fire | Charcoal-black feathers smoldering orange at the tips, faint smoke rising. |
| `glacial-hawk.png` | **Glacial Duck** | Air | Pale blue ice-crystal feathers, frosty breath, standing on a frozen puddle. |
| `coral-mantis.png` | **Coral Duck** | Water | Vivid reef colors (coral pink/orange), in a martial-arts stance, wing tips like fins. |
| `tide-otter.png` | **Riptide Duck** | Water | Sleek navy + seafoam racing duck, streamlined feathers, water streaks trailing off it. |

**Prompts**
4. Ember Duck: `a charcoal black duck with feather tips smoldering like embers, glowing orange cracks, thin wisps of smoke`
5. Glacial Duck: `a pale ice-blue duck with crystalline frost-covered feathers, visible cold breath, standing on a small frozen puddle`
6. Coral Duck: `a vivid coral-pink and orange reef-colored duck in a martial arts fighting stance, fin-like feather edges`
7. Riptide Duck: `a sleek navy blue and seafoam green duck built for speed, streamlined glossy feathers, dynamic water streaks trailing behind`

---

## EPIC — "ducks that broke physics" (glow, particles, exotic materials)

| File | New name | Element | Look |
|---|---|---|---|
| `circuit-panther.png` | **Circuit Duck** | Electric | Matte black with glowing cyan circuit traces under the feathers, LED-like eyes. |
| `storm-gorilla.png` | **Storm Duck** | Electric | Thundercloud-grey, miniature lightning arcing between wingtips, storm swirl above. |
| `mech-bear.png` | **Mecha Duck** | Earth | Half organic, half machine — one chrome wing, hydraulic legs, glowing orange vents. |
| `void-serpent.png` | **Void Duck** | Cosmic | Pure-black silhouette filled with a galaxy, violet glowing eyes, slightly translucent edges. |

**Prompts**
8. Circuit Duck: `a matte black duck with glowing cyan circuit board traces running beneath its feathers, LED glowing eyes, subtle tech glow`
9. Storm Duck: `a dark storm-grey duck with miniature lightning bolts arcing between its wingtips, a small thundercloud swirling above its head`
10. Mecha Duck: `a half-robot duck with one chrome mechanical wing, hydraulic metal legs, glowing orange vents, exposed gears, battle-worn plating`
11. Void Duck: `a duck-shaped void silhouette filled with a dark purple galaxy and stars, glowing violet eyes, edges dissolving into space dust`

---

## LEGENDARY — "boss ducks" (armor, fire, gravitational presence)

| File | New name | Element | Look |
|---|---|---|---|
| `solar-lioness.png` | **Solar Duck** | Fire | Plasma-flame crest flowing like a lion's mane, constellation freckles on golden feathers. |
| `obsidian-phoenix.png` | **Phoenix Duck** | Fire | Glossy obsidian body, wings made of living flame, embers raining off it. |
| `gravity-bull.png` | **Gravity Duck** | Earth | Stoic duck with barbell weight plates orbiting it like planets, cracked ground beneath. |
| `nebula-fox.png` | **Nebula Duck** | Cosmic | Body is a literal window into deep space — nebulas, stars — leaving a stardust trail. |

**Prompts**
12. Solar Duck: `a majestic golden duck with a flowing mane of plasma fire around its head, tiny constellation patterns glowing on its feathers`
13. Phoenix Duck: `a glossy black obsidian duck with wings made entirely of living orange flame, glowing embers falling around it, rebirth energy`
14. Gravity Duck: `a stoic heavy-set duck with barbell weight plates orbiting around it like planets, cracked stone ground beneath its feet, immense gravitational aura`
15. Nebula Duck: `a duck whose body is a window into deep space filled with colorful nebulas and stars, leaving a trail of stardust, cosmic and ethereal`

---

## DIVINE — already perfect

| File | Name | Element | Notes |
|---|---|---|---|
| `golden-duck.png` + `_t0`–`_t5` | **Golden Duck** | Cosmic | Already a duck. Already divine. Already has the +150% XP perk. The prophecy fulfilled — every other pet was just a duck waiting to happen. |

### Optional: make its 6 evolution tiers actually distinct
Current t0–t5 images are near-identical. If regenerating (note: the app currently caps at t4 —
Claude can uncap t5 when distinct art exists):

- **t0** (Lv 1): `a tiny round golden duckling, made of polished gold, big innocent eyes`
- **t1** (Lv 5): `a young golden duck standing upright, polished gold body, determined expression`
- **t2** (Lv 10): `a golden duck with subtle muscle definition, confident smirk, faint golden aura`
- **t3** (Lv 15): `a muscular golden duck with broad chest, glowing gold aura, small floating gold sparks`
- **t4** (Lv 20): `a powerful golden duck with ornate engraved gold armor plates, radiant aura, floating golden particles`
- **t5** (Lv 25+): `a god-tier golden duck with a halo, radiant white-gold light, golden eggs orbiting it, ascended divine presence`

---

## Flavor pass (when art lands — all optional, all easy)

- **Descriptions** → duck lore: "The Void Duck does not swim in water. Water swims in it."
- **Battle move names** → re-theme: "Horn Charge" → "Beak Charge", "Paw Swipe" → "Wing Slap", etc. (powers/effects unchanged)
- **Cases → Eggs**: crack eggs instead of opening crates
- **Tap quack**: pitch-shifted quack per rarity when tapping your pet (deep slow quack = legendary)
- **App title**: "FitPet" still works… but "GymDuck" is right there.
