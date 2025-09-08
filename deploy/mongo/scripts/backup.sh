#!/usr/bin/env bash
set -euo pipefail

: "${APP_DB:=contact_manager}"
: "${HOST_BACKUP_DIR:=./backups}"

ts="$(date +%Y%m%d_%H%M%S)"
out="${HOST_BACKUP_DIR}/${APP_DB}_${ts}"

mkdir -p "${HOST_BACKUP_DIR}"

docker exec mongo sh -lc \
  "mongodump -u \"${APP_USER}\" -p \"${APP_PASSWORD}\" --authenticationDatabase ${APP_DB} --db ${APP_DB} --out /tmp/dump_${ts}"

docker cp mongo:/tmp/dump_${ts}/${APP_DB} "${out}"
docker exec mongo rm -rf "/tmp/dump_${ts}"

echo "Backup saved to: ${out}"
