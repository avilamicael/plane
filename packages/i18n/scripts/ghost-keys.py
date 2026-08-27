#!/usr/bin/env python3
"""Ghost-key detector for t() calls.

A t("x.y") whose key is absent from packages/i18n/src/locales/en/*.json renders
the raw key text ("x.y") on screen. useTranslation types t as
(key: string) => string, so tsc cannot catch it. Run this instead.

Usage: python3 packages/i18n/scripts/ghost-keys.py [app_dir]   (default: apps/web)
Exits 1 if any ghost, branch-node, or bad-prefix key is found.
"""

import json
import os
import re
import sys

ROOT = os.path.abspath(os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "..", ".."))
EN = os.path.join(ROOT, "packages/i18n/src/locales/en")
APP = os.path.join(ROOT, sys.argv[1] if len(sys.argv) > 1 else "apps/web")


def flatten(obj, prefix=""):
    out = set()
    for key, value in obj.items():
        full = f"{prefix}.{key}" if prefix else key
        if isinstance(value, str):
            out.add(full)
        elif isinstance(value, dict):
            out |= flatten(value, full)
    return out


keys = set()
for name in sorted(os.listdir(EN)):
    if name.endswith(".json"):
        with open(os.path.join(EN, name), encoding="utf-8") as handle:
            keys |= flatten(json.load(handle))

# Branch nodes: every dotted ancestor of a leaf. t() on one returns an object,
# and the coerceToString guard in use-translation.ts then renders the key text.
prefixes = set()
for key in keys:
    parts = key.split(".")
    for i in range(1, len(parts)):
        prefixes.add(".".join(parts[:i]))

LITERAL = re.compile(r"""(?<![\w$.])t\(\s*(["'`])([^"'`\n]*)\1""")

files = []
for dirpath, dirnames, filenames in os.walk(APP):
    dirnames[:] = [d for d in dirnames if d not in (".next", "node_modules", ".turbo", "dist")]
    files += [os.path.join(dirpath, f) for f in filenames if f.endswith((".ts", ".tsx"))]

ghost, branch, bad_prefix = {}, {}, {}
static_calls = 0
for path in sorted(files):
    with open(path, encoding="utf-8") as handle:
        src = handle.read()
    rel = os.path.relpath(path, ROOT)
    for match in LITERAL.finditer(src):
        key = match.group(2)
        loc = f"{rel}:{src.count(chr(10), 0, match.start()) + 1}"
        if "${" in key:
            # Dynamic key. The static prefix can still be checked.
            static = key.split("${")[0]
            if static.endswith("."):
                base = static[:-1]
                if base and base not in prefixes:
                    bad_prefix.setdefault(key, []).append(loc)
            continue
        static_calls += 1
        if key in keys:
            continue
        (branch if key in prefixes else ghost).setdefault(key, []).append(loc)

print(f"scanned {len(files)} files | {static_calls} static literal t() calls | {len(keys)} en keys\n")
for title, bucket in (
    ("GHOST KEYS (no entry at all)", ghost),
    ("BRANCH-NODE KEYS (object, not string)", branch),
    ("DYNAMIC KEYS with unresolvable static prefix", bad_prefix),
):
    print(f"== {title}: {len(bucket)}")
    for key in sorted(bucket):
        print(f"   {key!r}")
        for loc in bucket[key][:8]:
            print(f"       {loc}")

sys.exit(1 if (ghost or branch or bad_prefix) else 0)
