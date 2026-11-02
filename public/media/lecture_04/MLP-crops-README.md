# Vector crops for the Lecture 4 MLP slides

`bubble-mlp-components-{light,dark}.svg` shows the staged logistic components
and augmented feature vectors. `bubble-mlp-network-{light,dark}.svg` shows the
equivalent 2–2–1 network, including constant-one bias nodes and its title.

These are viewBox crops of the corresponding full
`bubble-mlp-architecture-{light,dark}.svg` in this directory. Those source copies
were checked byte-for-byte against the canonical ML lecture assets in
`/home/andre/Development/ml-cfd-lecture/notebooks/media` before cropping.
No paths, glyph definitions, model values, connections, colors, or placements
were changed. Only the root SVG height and viewBox differ from the full source.

Source SHA-256:

- Light: `c6509452b268c74bebb1c88c74ba47b96ce877bb03a023f8ccd4d7c6a810bf27`
- Dark: `3b0e0ffe2a10bd6ae725f18dd5958a890943a931adef1aad40f0c0b00087d036`

The full coordinate extent is `0 0 510.23622 439.370079`. The components crop
uses `0 0 510.23622 225`; the network crop uses
`0 229 510.23622 210.370079`. Width/height ratios are preserved, so circles and
all other geometry remain undistorted. At 900 pixels wide, the crops are
approximately 397 and 371 pixels tall, respectively.

Reproduce from this directory with Python 3:

```sh
python3 - <<'PY'
from pathlib import Path
import re

for theme in ("light", "dark"):
    source = Path(f"bubble-mlp-architecture-{theme}.svg").read_text()
    for kind, y, height in (("components", 0, 225),
                            ("network", 229, 210.370079)):
        def crop(match):
            tag = re.sub(r'height="[^"]+"', f'height="{height}pt"', match.group(0))
            return re.sub(r'viewBox="[^"]+"',
                          f'viewBox="0 {y} 510.23622 {height}"', tag)
        result = re.sub(r'<svg\b[^>]+>', crop, source, count=1)
        assert re.sub(r'<svg\b[^>]+>', '', result, count=1) == \
               re.sub(r'<svg\b[^>]+>', '', source, count=1)
        Path(f"bubble-mlp-{kind}-{theme}.svg").write_text(result)
PY
```

All four actual cropped SVGs were rendered with Inkscape at 900 pixels wide
and visually inspected. The component titles, tildes, equations, and feature
vectors are fully visible; the network title, weight labels, bias connections,
circles, and output arrow are not clipped. Both themes were inspected.
