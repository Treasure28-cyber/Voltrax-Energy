import sys
from pathlib import Path
sys.path.insert(0, str(Path('tmp/pdf-review-deps').resolve()))
import pymupdf

out = Path('tmp/pdfs/current-review')
out.mkdir(parents=True, exist_ok=True)
for label, filename in [('home', 'screencapture-localhost-5173-2026-10-07-13_21_39.pdf'), ('products', 'screencapture-localhost-5173-products-2026-10-07-13_22_24.pdf')]:
    document = pymupdf.open(Path('C:/Users/pc/Downloads') / filename)
    print(label, 'pages', len(document))
    for number, page in enumerate(document):
        scale = 1000 / page.rect.width
        height = 1400 / scale
        top = 0
        part = 0
        while top < page.rect.height:
            clip = pymupdf.Rect(0, top, page.rect.width, min(top + height, page.rect.height))
            destination = out / f'{label}-{number + 1}-{part + 1}.png'
            page.get_pixmap(matrix=pymupdf.Matrix(scale, scale), clip=clip).save(destination)
            print(destination)
            top += height
            part += 1
