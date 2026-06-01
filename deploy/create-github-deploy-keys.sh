#!/usr/bin/env bash
set -euo pipefail

mkdir -p "$HOME/.ssh"
chmod 700 "$HOME/.ssh"

if [[ ! -f "$HOME/.ssh/tapgo_ui_deploy" ]]; then
  ssh-keygen -q -t ed25519 -N "" -f "$HOME/.ssh/tapgo_ui_deploy"
fi

if [[ ! -f "$HOME/.ssh/tapgo_backend_deploy" ]]; then
  ssh-keygen -q -t ed25519 -N "" -f "$HOME/.ssh/tapgo_backend_deploy"
fi

ssh-keyscan -t ed25519 github.com >> "$HOME/.ssh/known_hosts" 2>/dev/null
chmod 600 \
  "$HOME/.ssh/known_hosts" \
  "$HOME/.ssh/tapgo_ui_deploy" \
  "$HOME/.ssh/tapgo_backend_deploy"

echo "UI_DEPLOY_KEY"
cat "$HOME/.ssh/tapgo_ui_deploy.pub"
echo "BACKEND_DEPLOY_KEY"
cat "$HOME/.ssh/tapgo_backend_deploy.pub"
