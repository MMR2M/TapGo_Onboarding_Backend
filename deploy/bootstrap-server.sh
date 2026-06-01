#!/usr/bin/env bash
set -euo pipefail

BACKEND_DIR=/opt/tapgo-backend
ENV_FILE="$BACKEND_DIR/.env"

sed -i 's|^TAPGO_BASE_URL=.*|TAPGO_BASE_URL=https://contract.tapgo.ch|' "$ENV_FILE"
sed -i \
  -e '/^TAPGO_STRIPE_SUCCESS_URL=/d' \
  -e '/^TAPGO_STRIPE_CANCEL_URL=/d' \
  -e '/^TAPGO_ENV=/d' \
  -e '/^TAPGO_HEALTH_TOKEN=/d' \
  "$ENV_FILE"

{
  echo 'TAPGO_ENV=development'
  printf 'TAPGO_HEALTH_TOKEN=%s\n' "$(openssl rand -hex 32)"
} >> "$ENV_FILE"

python3 -m venv "$BACKEND_DIR/.venv"
"$BACKEND_DIR/.venv/bin/pip" install --upgrade pip
"$BACKEND_DIR/.venv/bin/pip" install -r "$BACKEND_DIR/requirements.txt"

mkdir -p "$BACKEND_DIR/data"
chown -R www-data:www-data "$BACKEND_DIR/data"
chown www-data:www-data "$ENV_FILE"
chmod 600 "$ENV_FILE"

cp "$BACKEND_DIR/deploy/tapgo.service" /etc/systemd/system/tapgo.service
cp "$BACKEND_DIR/deploy/nginx.contract.tapgo.ch.conf" /etc/nginx/sites-available/contract.tapgo.ch
ln -sf /etc/nginx/sites-available/contract.tapgo.ch /etc/nginx/sites-enabled/contract.tapgo.ch
rm -f /etc/nginx/sites-enabled/default

systemctl daemon-reload
systemctl enable --now tapgo
nginx -t
systemctl reload nginx

curl -fsS http://127.0.0.1:8000/health
echo
curl -fsS http://contract.tapgo.ch/health
echo
