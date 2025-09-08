#!/usr/bin/env bash
set -euo pipefail

: "${APP_DB:=contact_manager}"

src="${1:-}"
if [ -z "$src" ]; then
  echo "Usage: $0 /path/to/backup_dir_for_${APP_DB}"
  exit 1
fi

docker cp "$src" mongo:/tmp/restore_db
docker exec mongo sh -lc \
  "mongorestore -u \"${APP_USER}\" -p \"${APP_PASSWORD}\" --authenticationDatabase ${APP_DB} --db ${APP_DB} --drop /tmp/restore_db"
docker exec mongo rm -rf /tmp/restore_db

echo "Restore complete."
