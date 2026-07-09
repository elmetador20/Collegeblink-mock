#!/bin/bash
export GIT_PAGER=cat
export PAGER=cat
export TERM=dumb

set -e
cd /var/www/Collegeblink

echo "=== Step 0: Loading environment variables ==="
set -a
[ -f .env ] && . .env
[ -f .env.local ] && . .env.local
set +a

echo "=== Step 1: Prisma generate ==="
/root/.nvm/versions/node/v24.15.0/bin/npx prisma generate

echo "=== Step 2: Build Next.js ==="
/root/.nvm/versions/node/v24.15.0/bin/npm run build

echo "=== Step 2.5: Copy static assets for standalone mode ==="
cp -r public .next/standalone/
cp -r .next/static .next/standalone/.next/

echo "=== Step 3: Restart PM2 ==="
/root/.nvm/versions/node/v24.15.0/bin/pm2 restart collegeblink --update-env || \
  /root/.nvm/versions/node/v24.15.0/bin/pm2 start "node .next/standalone/server.js" --name collegeblink --update-env

echo "=== Step 4: PM2 status ==="
/root/.nvm/versions/node/v24.15.0/bin/pm2 status

echo "=== DEPLOYMENT COMPLETE ==="

