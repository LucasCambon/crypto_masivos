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

### 2. Build and start the services

In the root directory of the project (where `docker-compose.yml` is located), run:

```bash
docker-compose up --build
```

And you should see all the services with created and running status. Also, you can se the real time logs to be sure that the app is running correctly

Tip: You can use the _-d_ flag to run it on background mode so you can keep using the same terminal session. In case you want to see the background logs, just run the following command for the service you want to see (backend, frontend or db):

```bash
docker-compose logs <service>
```
