![Main Workflow](https://github.com/gumob/three-text-geometry/actions/workflows/main.yaml/badge.svg)
![Development Workflow](https://github.com/gumob/three-text-geometry/actions/workflows/develop.yaml/badge.svg)

# three-text-geometry

## Generate Bitmap Font

#### Install msdf-bmfont-xml

```
npm install msdf-bmfont-xml -g
```

```
msdf-bmfont \
    --output-type xml \
    --filename './tests/fonts/Roboto-Regular' \
    --font-size 128 \
    --texture-size 4096,4096 \
    './tests/fonts/Roboto-Regular.ttf'
```

```
msdf-bmfont \
    --output-type json \
    --filename './tests/fonts/Roboto-Regular' \
    --font-size 128 \
    --texture-size 4096,4096 \
    './tests/fonts/Roboto-Regular.ttf'
```
