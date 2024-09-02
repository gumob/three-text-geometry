#!/bin/zsh

# Check if the 'fzf' command is available in the system
if ! command -v fzf &> /dev/null; then
    tput setaf 1;
    echo "fzf is not installed. <https://github.com/junegunn/fzf>";
    tput sgr0;
    exit 1;
fi

local option_list=(
	"pnpm dev"
	"pnpm build"
	"pnpm lint"
	"pnpm preview"
    " "
	"setup demo"
)

local selected_option=$(printf "%s\n" "${option_list[@]}" | fzf --ansi --prompt="Select a job to execute > ")

case "$selected_option" in
	pnpm*)
		eval $selected_option
		;;
	setup*)
		rm -rf node_modules .yarn;
		corepack enable;
		pnpm -v;
		pnpm install;
		;;
	*)
		echo "Invalid option $selected_option" && exit 1
		;;
esac

exit 0;