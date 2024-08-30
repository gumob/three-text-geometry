#!/bin/zsh

# Check if the 'fzf' command is available in the system
if ! command -v fzf &> /dev/null; then
    tput setaf 1;
    echo "fzf is not installed. <https://github.com/junegunn/fzf>";
    tput sgr0;
    exit 1;
fi

local setup_yarn() {
    corepack enable
    yarn set version stable
    yarn -v
    yarn dlx @yarnpkg/sdks vscode
}

local option_list=(
	"yarn cache clean && rm -rf .yarn && rm -rf node_modules && corepack enable && yarn set version stable && yarn -v && yarn install --inline-builds && yarn dlx @yarnpkg/sdks vscode"
)

local selected_option=$(printf "%s\n" "${option_list[@]}" | fzf --ansi --prompt="Select a job to execute > ")

case "$selected_option" in
	yarn*)                                eval $selected_option;;
	*)                                           echo "Invalid option $selected_option" && exit 1;;
esac

exit 0;