#!/bin/bash
set -euxo pipefail

rm -f firstpage.xpi
cd src
zip -r ../firstpage.xpi *
cd ..

jq ".addons[\"make-it-red@example.com\"].updates[0].update_hash = \"sha256:`shasum -a 256 firstpage.xpi | cut -d' ' -f1`\"" updates-2.0.json.tmpl > updates-2.0.json
