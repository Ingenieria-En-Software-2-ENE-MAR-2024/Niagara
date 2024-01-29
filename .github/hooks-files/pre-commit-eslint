#!/bin/sh

echo Running ESLint
echo ===============================
LINTER_MSG=$(npm run lint)
FOUND_ERROR=$?

WARNING="$(echo $LINTER_MSG | grep -o Warning)"
FOUND_WARNING=$?

if [ $FOUND_ERROR -eq 1 ] || [ $FOUND_WARNING -eq 0 ]; then
    echo "$LINTER_MSG"
    echo " "
    echo ESLint has warning or errors. Fix them before commiting.
    exit 1
fi

echo All good. Allowing commit to proceed.
exit 0