#!/bin/bash

# find dist-esm -name "*.js" -type f -exec basename {} \;

target=$1
if [ "${target}" != "esm" ] && [ "${target}" != "cjs" ] ; then
    echo "You must specify target. ('esm' or 'cjs')"
    exit 1
fi

paths=($(find dist-${target} -name "*.js" -type f))

for i in "${paths[@]}"
do
    path=${i}
    dir=$(dirname "${path}}")
    file=$(basename "${path}")
    file_base="${file%.*}"
    # file_ext="${file##*.}"
    basepath="${dir}/${file_base}"
    sourcemap_in="${basepath}.js.map"
    sourcemap_out="${basepath}.js.map"
    js_in="${basepath}.js"
    js_out="${basepath}.js"
    echo "sourcemap in: ${sourcemap_in}"
    echo "sourcemap out: ${sourcemap_out}"
    echo "js in: ${js_in}"
    echo "js out: ${js_out}"
    echo ""
    yarn uglifyjs \
        --compress \
        --mangle \
        --source-map "content='${sourcemap_in}'" \
        --source-map "filename='${sourcemap_out}'" \
        --output ${js_out} \
        -- ${js_in}
done