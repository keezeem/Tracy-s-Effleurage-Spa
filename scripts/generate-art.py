#!/usr/bin/env python3
"""
Generates the placeholder artwork in public/images/*.svg.

These are ILLUSTRATIVE stand-ins (warm light, linen, stones, oils, botanicals),
not photographs. Replace them with real photography from Tracy's treatment room
by editing src/data/gallery.ts and src/data/treatments.ts (just change `src`).
Run again with:  python3 scripts/generate-art.py
"""
import math, os, random

OUT = os.path.join(os.path.dirname(__file__), "..", "public", "images")
os.makedirs(OUT, exist_ok=True)

ESP, CHOC, IVORY, GOLD, GREEN, BEIGE = "#211914", "#38271F", "#F7F1E8", "#D8B77C", "#69745C", "#E8DCCD"

def wrap(w, h, body, defs=""):
    return f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w} {h}" width="{w}" height="{h}" preserveAspectRatio="xMidYMid slice">
<defs>
<filter id="blur40" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="40"/></filter>
<filter id="blur12" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="12"/></filter>
<filter id="blur3" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="3"/></filter>
<filter id="grain" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="4"/><feColorMatrix values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.09 0"/></filter>
{defs}
</defs>
{body}
<rect width="{w}" height="{h}" filter="url(#grain)"/>
</svg>'''

def bg(w, h, c1, c2, angle="v"):
    x2, y2 = ("0", "1") if angle == "v" else ("1", "1")
    return (f'<linearGradient id="bg" x1="0" y1="0" x2="{x2}" y2="{y2}"><stop offset="0" stop-color="{c1}"/><stop offset="1" stop-color="{c2}"/></linearGradient>',
            f'<rect width="{w}" height="{h}" fill="url(#bg)"/>')

def glow(cx, cy, r, color, op=0.5):
    return f'<circle cx="{cx}" cy="{cy}" r="{r}" fill="{color}" opacity="{op}" filter="url(#blur40)"/>'

def linen(w, y0, amp, layers, base, hi, h, seed=1):
    """Layered soft draped-fabric waves."""
    rnd = random.Random(seed)
    s, defs = "", ""
    for i in range(layers):
        y = y0 + i * (h - y0) / layers
        a = amp * (0.6 + rnd.random() * 0.8)
        ph = rnd.random() * 6
        pts = []
        for x in range(0, w + 40, 40):
            pts.append((x, y + math.sin(x / w * math.pi * (1.5 + i * 0.35) + ph) * a))
        d = "M0,%d " % h + " ".join("L%d,%.1f" % p for p in pts) + " L%d,%d Z" % (w, h)
        gid = f"lg{seed}{i}"
        defs += f'<linearGradient id="{gid}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="{hi}" stop-opacity="{0.55 - i*0.04}"/><stop offset="1" stop-color="{base}" stop-opacity="0.9"/></linearGradient>'
        s += f'<path d="{d}" fill="url(#{gid})" filter="url(#blur3)"/>'
    return s, defs

def stone(cx, cy, rx, ry, c1, c2, sid):
    d = f'<radialGradient id="{sid}" cx="0.35" cy="0.3" r="0.85"><stop offset="0" stop-color="{c1}"/><stop offset="1" stop-color="{c2}"/></radialGradient>'
    b = (f'<ellipse cx="{cx}" cy="{cy+ry*0.9}" rx="{rx*1.05}" ry="{ry*0.28}" fill="#000" opacity="0.35" filter="url(#blur12)"/>'
         f'<ellipse cx="{cx}" cy="{cy}" rx="{rx}" ry="{ry}" fill="url(#{sid})"/>'
         f'<ellipse cx="{cx-rx*0.25}" cy="{cy-ry*0.4}" rx="{rx*0.4}" ry="{ry*0.18}" fill="#fff" opacity="0.14" filter="url(#blur3)"/>')
    return b, d

def leaf(x, y, length, rot, color, op=0.9):
    return (f'<g transform="translate({x},{y}) rotate({rot})" opacity="{op}">'
            f'<path d="M0,0 C{length*0.25},{-length*0.28} {length*0.75},{-length*0.2} {length},0 C{length*0.75},{length*0.2} {length*0.25},{length*0.28} 0,0 Z" fill="{color}"/>'
            f'<path d="M0,0 L{length*0.95},0" stroke="#fff" stroke-opacity="0.18" stroke-width="2"/></g>')

def candle(cx, base_y, h, w=60):
    top = base_y - h
    return (glow(cx, top - 30, 180, GOLD, 0.55) +
            f'<rect x="{cx-w/2}" y="{top}" width="{w}" height="{h}" rx="6" fill="{IVORY}" opacity="0.92"/>'
            f'<rect x="{cx-w/2}" y="{top}" width="{w*0.35}" height="{h}" rx="6" fill="#fff" opacity="0.25"/>'
            f'<path d="M{cx},{top-8} C{cx-14},{top-34} {cx-6},{top-52} {cx},{top-66} C{cx+8},{top-50} {cx+14},{top-34} {cx},{top-8} Z" fill="#FFD9A0"/>'
            f'<path d="M{cx},{top-8} C{cx-7},{top-22} {cx-3},{top-34} {cx},{top-42} C{cx+4},{top-32} {cx+7},{top-22} {cx},{top-8} Z" fill="#FFF3DA"/>')

def bottle(x, y, w, h, color, cap):
    return (f'<ellipse cx="{x+w/2}" cy="{y+h}" rx="{w*0.7}" ry="{w*0.12}" fill="#000" opacity="0.3" filter="url(#blur12)"/>'
            f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="{w*0.18}" fill="{color}"/>'
            f'<rect x="{x+w*0.12}" y="{y+h*0.05}" width="{w*0.14}" height="{h*0.88}" rx="6" fill="#fff" opacity="0.22"/>'
            f'<rect x="{x+w*0.3}" y="{y-h*0.16}" width="{w*0.4}" height="{h*0.18}" rx="4" fill="{cap}"/>'
            f'<rect x="{x+w*0.12}" y="{y+h*0.35}" width="{w*0.76}" height="{h*0.3}" fill="{IVORY}" opacity="0.85"/>')

def beams(w, h, color=GOLD, n=3, op=0.18, x0=0.6):
    out, defs = "", ""
    for i in range(n):
        gid = f"beam{i}"
        xa = w * (x0 + i * 0.1)
        defs += f'<linearGradient id="{gid}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="{color}" stop-opacity="{op}"/><stop offset="1" stop-color="{color}" stop-opacity="0"/></linearGradient>'
        out += f'<polygon points="{xa},0 {xa+w*0.08},0 {xa-w*0.25},{h} {xa-w*0.33},{h}" fill="url(#{gid})" filter="url(#blur12)"/>'
    return out, defs

def save(name, w, h, body, defs):
    with open(os.path.join(OUT, name + ".svg"), "w") as f:
        f.write(wrap(w, h, body, defs))

# ---------- hero ----------
def hero():
    w, h = 1920, 1200
    d, b = bg(w, h, "#2c1f18", ESP)
    bm, bd = beams(w, h, GOLD, 4, 0.2, 0.55)
    ln, ld = linen(w, 760, 40, 6, CHOC, "#6b4a38", h, 3)
    s1, d1 = stone(1380, 930, 190, 70, "#6a5648", "#2b211b", "st1")
    s2, d2 = stone(1385, 850, 140, 54, "#7a6556", "#33271f", "st2")
    s3, d3 = stone(1390, 790, 96, 40, "#8a7464", "#3a2c23", "st3")
    body = (b + glow(1500, 260, 380, GOLD, 0.45) + glow(300, 1000, 420, "#8a4f2a", 0.35) + bm + ln + s1 + s2 + s3 +
            candle(1000, 1010, 130) + leaf(1620, 1010, 260, -150, GREEN, 0.75) + leaf(1650, 1020, 220, -118, "#55604A", 0.8))
    save("hero", w, h, body, d + bd + ld + d1 + d2 + d3)

# ---------- generic portrait scenes ----------
def room():
    w, h = 1200, 1500
    d, b = bg(w, h, "#3a2a20", ESP)
    bm, bd = beams(w, h, GOLD, 3, 0.25, 0.5)
    ln, ld = linen(w, 820, 34, 5, "#c9b79f", "#fff6e6", h, 5)
    table = f'<rect x="120" y="760" width="960" height="120" rx="30" fill="{BEIGE}" opacity="0.92"/><rect x="150" y="880" width="900" height="400" fill="{CHOC}" opacity="0.9"/>'
    body = b + glow(900, 300, 340, GOLD, 0.5) + bm + table + ln + candle(260, 1250, 110, 50) + leaf(980, 1300, 240, -120, GREEN, 0.8)
    save("room", w, h, body, d + bd + ld)

def stones():
    w, h = 1200, 1500
    d, b = bg(w, h, BEIGE, "#b9a48a")
    s, ds = "", ""
    for i, (cx, cy, rx, ry, c1, c2) in enumerate([(600, 1010, 330, 120, "#8c7a6a", "#3b2f27"), (610, 840, 250, 100, "#9a8777", "#41342b"), (595, 700, 170, 76, "#a8947f", "#4a3b30"), (605, 600, 100, 52, "#b6a18b", "#54433a")]):
        a, c = stone(cx, cy, rx, ry, c1, c2, f"s{i}")
        s += a; ds += c
    body = b + glow(300, 250, 380, "#fff1d6", 0.8) + s + leaf(330, 1180, 300, -20, GREEN, 0.85) + leaf(880, 1210, 280, 200, "#55604A", 0.85)
    save("stones", w, h, body, d + ds)

def oils():
    w, h = 1200, 1500
    d, b = bg(w, h, "#46372c", ESP)
    body = (b + glow(850, 350, 360, GOLD, 0.4) +
            f'<rect x="0" y="1150" width="{w}" height="350" fill="{CHOC}"/><rect x="0" y="1150" width="{w}" height="6" fill="{GOLD}" opacity="0.4"/>' +
            bottle(300, 640, 220, 510, "#6b5230", "#D8B77C") + bottle(580, 780, 190, 370, "#4d5a40", GOLD) + bottle(820, 880, 150, 270, "#8a5a38", GOLD) +
            leaf(180, 1180, 260, -30, GREEN, 0.8))
    save("oils", w, h, body, d)

def linen_img():
    w, h = 1500, 1200
    d, b = bg(w, h, "#f3e9da", "#b8a58c")
    ln, ld = linen(w, 200, 70, 9, "#bfa88a", "#fffaf0", h, 8)
    save("linen", w, h, b + glow(1100, 150, 360, "#fff", 0.7) + ln, d + ld)

def candles():
    w, h = 1500, 1200
    d, b = bg(w, h, "#2f221a", "#14100c")
    body = (b + f'<rect x="0" y="880" width="{w}" height="320" fill="{CHOC}"/>' + candle(520, 900, 190, 80) + candle(760, 930, 120, 64) +
            candle(960, 900, 250, 70) + leaf(300, 960, 260, -10, GREEN, 0.7) + leaf(1220, 980, 240, 190, "#55604A", 0.75))
    save("candles", w, h, body, d)

def botanical():
    w, h = 1200, 1500
    d, b = bg(w, h, "#7b8668", "#3f4a37")
    rnd = random.Random(11)
    leaves = "".join(leaf(600 + rnd.randint(-60, 60), 1500, rnd.randint(520, 900), -90 + rnd.randint(-55, 55),
                           rnd.choice(["#69745C", "#55604A", "#8a9577", "#3d4733"]), 0.85) for _ in range(16))
    save("botanical", w, h, b + glow(300, 250, 320, "#f4e7c6", 0.5) + leaves, d)

def portrait():
    w, h = 1200, 1500
    d, b = bg(w, h, "#3a2a20", ESP)
    body = (b + glow(600, 500, 380, GOLD, 0.35) +
            f'<circle cx="600" cy="610" r="150" fill="{CHOC}" stroke="{GOLD}" stroke-opacity="0.5" stroke-width="2"/>'
            f'<path d="M260,1300 C260,960 420,820 600,820 C780,820 940,960 940,1300 Z" fill="{CHOC}" stroke="{GOLD}" stroke-opacity="0.5" stroke-width="2"/>'
            f'<text x="600" y="1400" text-anchor="middle" font-family="Georgia, serif" font-size="34" fill="{GOLD}" opacity="0.8">Professional portrait goes here</text>')
    save("portrait-placeholder", w, h, body, d)

def og():
    w, h = 1200, 630
    d, b = bg(w, h, "#2c1f18", ESP)
    body = (b + glow(950, 120, 300, GOLD, 0.45) +
            f'<text x="80" y="330" font-family="Georgia, serif" font-size="84" fill="{IVORY}">Tracy&#8217;s Effleurage</text>'
            f'<text x="84" y="400" font-family="Georgia, serif" font-size="34" fill="{GOLD}">Massage therapy &amp; wellness · Ilorin, Nigeria</text>')
    save("og", w, h, body, d)

for fn in (hero, room, stones, oils, linen_img, candles, botanical, portrait, og):
    fn()
print("Artwork written to", os.path.abspath(OUT))
