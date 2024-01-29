#!/bin/sh

if ! cp -r ../hooks-files/finals/* ../../.git/hooks ; then
    echo Problem copying hooks to .git/hooks
    exit 1
fi

if ! chmod +x ../../.git/hooks/* ; then
    echo Problem giving execution permissions to the hooks
    exit 1
fi

exit 0
