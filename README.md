# Crypto Masivos

## About

_Crypto Masivos_ is a simple cryptocurrency exchange platform that allows users to manage wallets and trade different cryptocurrencies. The app provides a backend API, a frontend interface, and uses PostgreSQL for data storage.

## Local database Setup

This project uses **PostgreSQL** as its database management system.

### 1. Prerequisites

- PostgreSQL installed and running.
- A PostgreSQL user with permission to create databases.

### 2. Create the database

Open a terminal and run the following command to create the database:

```bash
createdb crypto_masivos_db
```

### 3. Run the initialization script

To create the tables and load sample data, run:

```bash
psql -d crypto_masivos_db -f backend/init_data.sql
```

This will create all the necessary tables and insert some example data.

> **Note:**  
> The commands `CREATE DATABASE IF NOT EXISTS ...;` and `USE ...;` are not supported in PostgreSQL.  
> Use the terminal commands above to create and select the database.

## 🐳 Running the project with Docker

You can run the full application using **Docker Compose**.

### 1. Prerequisites

- [Docker](https://www.docker.com/products/docker-desktop/) installed
- [Docker Compose](https://docs.docker.com/compose/) (usually included with Docker Desktop)
- `.env` file configured (you can copy the example):

```bash
cp .env.example .env
```

### 2. Start the app

In the root folder, run:

```bash
docker-compose up --build
```
#### 🖥️ Development

For development, only the base docker-compose.yml is used.
By default, Docker Compose will automatically apply the file `docker-compose.override.yml` if it exists in the same directory. We use this file to configure development-specific options, such as:

- Live reloading and volume mounts for local development.
- Custom local Nginx configuration.

To build and run in dev mode (foreground):

```bash
docker-compose up --build
```

Or in background mode:

```bash
docker-compose up --build -d
```

To follow logs of a specific service:

```bash
docker-compose logs <service>
```

🚀 Production
For production, we use `docker-compose.override.prod.yml`, which includes:

- Nginx with SSL (via Certbot)
- Port 443 exposure (HTTPS)
- Domain setup

To build and run in dev mode (foreground):

```bash
docker-compose -f docker-compose.yml -f docker-compose.override.prod.yml up --build
```
Once deployed, the app is accessible at: http://crypto-masivos.lat