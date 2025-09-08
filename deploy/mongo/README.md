# MongoDB Deployment Guide (Dockerized)

This document explains how to set up and run the MongoDB service for the **MERN Contact Manager** project using Docker. It covers **local development** and **VPS deployment**.

---

## 1. Prerequisites

* [Docker](https://docs.docker.com/get-docker/) and [Docker Compose](https://docs.docker.com/compose/) installed.
* Git installed.

---

## 2. Clone the Repository

```bash
# Clone repo
git clone https://github.com/Sam-Vrgl/MERN_Renfo.git
cd MERN_Renfo/deploy/mongo
```

---

## 3. Configure Environment Variables

Copy the example environment file:

```bash
cp .env.example .env   # (Linux/Mac)
copy .env.example .env # (Windows cmd)
```

Edit `.env` with your preferred values:

```env
MONGO_VERSION=7.0
MONGO_INITDB_ROOT_USERNAME=root
MONGO_INITDB_ROOT_PASSWORD=change_me_root
APP_DB=contact_manager
APP_USER=app_user
APP_PASSWORD=change_me_app
HOST_DATA_DIR=./data
HOST_BACKUP_DIR=./backups
```

---

## 4. Create Required Folders

**Linux/macOS (And Windows with Git Bash)**:

```bash
mkdir -p data backups
```
---

## 5. Start MongoDB

```bash
docker compose up -d
```

Check status:

```bash
docker compose ps
```

You should see `mongo` listed and healthy.

---

## 6. Verify Connection

Open a Mongo shell inside the container:

```bash
docker exec -it mongo mongosh -u root -p change_me_root --authenticationDatabase admin
```

Then switch to the app database:

```js
use contact_manager
db.auth('app_user', 'change_me_app')
show collections
```

---

## 7. Connection String for Applications

Use this in your backend `.env`:

```env
MONGO_URI=mongodb://app_user:change_me_app@localhost:27017/contact_manager?authSource=contact_manager
```

> ⚠️ On a VPS, keep Mongo **bound to localhost** (`127.0.0.1`) for security.

---

## 8. Backup & Restore

Backups are stored in `backups/`.

**Backup:**

```bash
./backup.sh
```

**Restore:**

```bash
./restore.sh ./backups/contact_manager_YYYYMMDD_HHMMSS
```

---

## 9. Notes

* **Do not expose port 27017 to the internet.** Use SSH tunnels if you need remote access.
* Ensure `.env` contains strong passwords before deploying.
* Regularly back up the `backups/` directory.

---

✅ Your MongoDB instance is now running and ready for the backend to connect.
