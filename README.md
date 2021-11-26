![Main Workflow](https://github.com/gumob/three-text-geometry/actions/workflows/main.yaml/badge.svg)
![Develop Workflow](https://github.com/gumob/three-text-geometry/actions/workflows/develop.yaml/badge.svg)
[![codecov](https://codecov.io/gh/gumob/three-text-geometry/branch/main/graph/badge.svg?token=CL35QZ32NY)](https://codecov.io/gh/gumob/three-text-geometry)

# three-text-geometry

## Generate Bitmap Font

#### Install msdf-bmfont-xml

```
npm install msdf-bmfont-xml -g
```

```
msdf-bmfont \
    --output-type xml \
    --filename 'OdudoMono-Regular' \
    --font-size 128 \
    --texture-size 1024,1024 \
    --field-type 'sdf' \
    'OdudoMono-Regular.otf'
```

```
msdf-bmfont \
    --output-type json \
    --filename 'OdudoMono-Regular' \
    --font-size 128 \
    --texture-size 1024,1024 \
    --field-type 'sdf' \
    'OdudoMono-Regular.otf'
```
