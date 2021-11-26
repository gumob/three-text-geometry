#!/bin/bash

### Function to print and execute a command
function exe () {
	echo "\$ ${@/eval/}";
	echo;
	"$@";
	echo;
}

echo
echo "Select a command to execute."

### Extract container names to a list
choices=(
    "yarn add three-text-geometry@link:../../three-text-geometry"
    "yarn add three-text-geometry@gumob/three-text-geometry#develop"
    "yarn add three-text-geometry@gumob/three-text-geometry#master"
    "yarn remove three-text-geometry"
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
exe ${branch}
