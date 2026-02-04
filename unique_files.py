#!/usr/bin/env python3

import os
import glob
import hashlib

# hash -> [file names]
seen = {}

for file in glob.glob("*.ark"):
    with open(file) as f:
        h = hashlib.sha256("".join(line for line in f.readlines() if line.strip() != "").encode("utf-8")).hexdigest()
        seen[h] = seen.get(h, []) + [file]

print(f"Found {len(seen)} unique file(s)")

if not os.path.exists("unique"):
    os.mkdir("unique")
for _, files in seen.items():
    file = files[0]
    if not os.path.exists(f"unique/{file}"):
        with open(f"unique/{file}", "w") as f:
            with open(file) as source:
                f.write("".join(source.readlines()))

