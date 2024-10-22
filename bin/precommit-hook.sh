#!/bin/sh

STAGED_FILES=$(git diff --cached --name-only --diff-filter=ACM | grep ".jsx\{0,1\}$")
ESLINT="$(git rev-parse --show-toplevel)/node_modules/.bin/eslint"
PRETTIER="$(git rev-parse --show-toplevel)/node_modules/.bin/prettier"

if [[ "$STAGED_FILES" = "" ]]; then
  exit 0
fi

PASS=true

echo "\nValidating Javascript:\n"

# Check for eslint
if [[ ! -x "$ESLINT" ]]; then
  echo "\t\033[41mPlease install ESlint\033[0m (npm i --save --save-exact --dev eslint)"
  exit 1
fi

# Check for prettier
if [[ ! -x "$PRETTIER" ]]; then
  echo "\t\033[41mPlease install Prettier\033[0m (npm i --save --save-exact --dev prettier)"
  exit 1
fi

for FILE in $STAGED_FILES
do
  $PRETTIER --write "$FILE"
  git add $FILE

  $ESLINT "$FILE" --quiet

  if [[ "$?" == 0 ]]; then
    echo "\t\033[32mESLint Passed: $FILE\033[0m"
  else
    echo "\t\033[41mESLint Failed: $FILE\033[0m"
    PASS=false
  fi
done

echo "\nJavascript validation completed!\n"

if ! $PASS; then
  echo "\033[41mCOMMIT FAILED:\033[0m Your commit contains files that should pass ESLint but do not. Please fix the ESLint errors and try again.\n"
  exit 1
else
  echo "\033[42mCOMMIT SUCCEEDED\033[0m\n"
fi

exit $?
