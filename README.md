# crypto_masivos

## Database Setup

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
