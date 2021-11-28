#!/bin/bash

# find dist-esm -name "*.js" -type f -exec basename {} \;

target=$1
if [ "${target}" != "esm" ] && [ "${target}" != "cjs" ] ; then
    echo "You must specify target. ('esm' or 'cjs')"
    exit 1
fi

function minify_js() {
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
        script_in="${basepath}.js"
        script_out="${basepath}.js"
        echo "minifying... ${path}"
        yarn uglifyjs \
            --compress \
            --mangle \
            --source-map "content='${sourcemap_in}'" \
            --source-map "filename='${sourcemap_out}'" \
            --output ${script_out} \
            -- ${script_in}
    done
}

# function minify_ts() {
#     paths=($(find dist-${target} -name "*.d.ts" -type f))
#     for i in "${paths[@]}"
#     do
#         path=${i}
#         dir=$(dirname "${path}}")
#         file=$(basename "${path}")
#         file_base="${file%.*}"
#         # file_ext="${file##*.}"
#         basepath="${dir}/${file_base}"
#         sourcemap_in="${basepath}.ts.map"
#         sourcemap_out="${basepath}.ts.map"
#         script_in="${basepath}.ts"
#         script_out="${basepath}.ts"
#         echo "minifying... ${path}"
#         echo ""
#         yarn uglifyjs \
#             --compress \
#             --mangle \
#             --source-map "content='${sourcemap_in}'" \
#             --source-map "filename='${sourcemap_out}'" \
#             --output ${script_out} \
#             -- ${script_in}
#     done
# }

minify_js
# minify_ts