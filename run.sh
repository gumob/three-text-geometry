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
}

local option_list=(
	"Setup yarn"
)

local selected_option=$(printf "%s\n" "${option_list[@]}" | fzf --ansi --prompt="Select a job to execute > ")

case "$selected_option" in
	"Setup yarn")                                setup_yarn;;
	*)                                           echo "Invalid option $selected_option" && exit 1;;
esac

exit 0;