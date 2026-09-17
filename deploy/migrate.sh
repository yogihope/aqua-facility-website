#!/bin/sh
# Applies prisma/schema.prisma to the website database. The app image is a
# standalone build with no Prisma CLI, so this runs from a throwaway Node
# container on the compose network. Run from /opt/aqua-web.
set -e
cd "$(dirname "$0")"
DATABASE_URL=$(grep -o '^DATABASE_URL=.*' .env | cut -d= -f2- | tr -d '"')
docker run --rm \
  --network aqua-web_default \
  -v "$PWD/prisma:/work/prisma:ro" -w /work \
  -e DATABASE_URL="$DATABASE_URL" \
  node:24-alpine sh -c "npm i --no-save --silent prisma@6.19.3 >/dev/null && npx prisma db push --skip-generate --schema prisma/schema.prisma"
