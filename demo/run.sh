#!/bin/zsh

# Check if the 'fzf' command is available in the system
if ! command -v fzf &> /dev/null; then
    tput setaf 1;
    echo "fzf is not installed. <https://github.com/junegunn/fzf>";
    tput sgr0;
    exit 1;
fi

local option_list=(
	"yarn dev"
	"yarn build"
	"yarn lint"
	"yarn preview"
	" "
	"yarn cache clean && rm -rf .yarn && echo \"\" > yarn.lock && rm -rf node_modules && corepack enable && yarn set version stable && yarn -v && yarn install --inline-builds && yarn dlx @yarnpkg/sdks vscode"
	" "
	"yarn add three-text-geometry@link:../../three-text-geometry"
	"yarn add three-text-geometry@gumob/three-text-geometry#develop"
	"yarn add three-text-geometry@gumob/three-text-geometry#main"
	" "
	"yarn remove three-text-geometry && yarn add three-text-geometry@link:../../three-text-geometry"
	" "
	"yarn remove three-text-geometry"
)

local selected_option=$(printf "%s\n" "${option_list[@]}" | fzf --ansi --prompt="Select a job to execute > ")

case "$selected_option" in
	yarn*)                                eval $selected_option;;
	*)                                    echo "Invalid option $selected_option" && exit 1;;
esac

exit 0;