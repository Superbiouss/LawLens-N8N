#!/bin/sh

set -eu

BASELINE=178
CURRENT="$(rg -o 'style=\"' src/pages 2>/dev/null | wc -l | tr -d ' ')"

printf 'Inline style count: %s (baseline: %s)\n' "$CURRENT" "$BASELINE"

if [ "$CURRENT" -gt "$BASELINE" ]; then
  printf 'Inline style count increased above the allowed baseline.\n' >&2
  exit 1
fi

printf 'Inline style check passed.\n'
