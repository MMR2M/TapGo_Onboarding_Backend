#!/usr/bin/env bash
set -euo pipefail

UI_DIR=/opt/tapgo-ui
BACKEND_DIR=/opt/tapgo-backend
UI_REMOTE=git@github.com:MMR2M/TapGo_Onboarding_UI.git
BACKEND_REMOTE=git@github.com:MMR2M/TapGo_Onboarding_Backend.git
UI_SSH="ssh -i /home/ubuntu/.ssh/tapgo_ui_deploy -o IdentitiesOnly=yes"
BACKEND_SSH="ssh -i /home/ubuntu/.ssh/tapgo_backend_deploy -o IdentitiesOnly=yes"

update_repo() {
  local directory="$1"
  local remote="$2"
  local ssh_command="$3"

  if [[ ! -d "$directory/.git" ]]; then
    git -C "$directory" init
    git -C "$directory" remote add origin "$remote"
  fi

  GIT_SSH_COMMAND="$ssh_command" git -C "$directory" fetch origin main
  git -C "$directory" reset --hard origin/main
}

update_repo "$UI_DIR" "$UI_REMOTE" "$UI_SSH"
update_repo "$BACKEND_DIR" "$BACKEND_REMOTE" "$BACKEND_SSH"

"$BACKEND_DIR/.venv/bin/pip" install -r "$BACKEND_DIR/requirements.txt"
chown -R www-data:www-data "$BACKEND_DIR/data"
systemctl restart tapgo
sleep 3
systemctl is-active tapgo
curl -fsS https://contract.tapgo.ch/health
echo
