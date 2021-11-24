#!/bin/bash

### Function to print and execute a command
function exe () {
	echo "\$ ${@/eval/}";
	echo;
	"$@";
	echo;
}

### Extract container names to a list
choices=(
    "develop"
    "master"
)

### Display a selection dialog
PS3="
Choose a branch to install: "
echo
select branch in "${choices[@]}";
do
  echo
  if [ -z "$branch" ]; then
    exit 1;
  else
    break;
  fi
done

### Execute a command
exe yarn remove three-text-geometry
exe yarn add three-text-geometry@gumob/three-text-geometry#${branch}
