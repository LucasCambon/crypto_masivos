-- Tables creation
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    role VARCHAR(20) NOT NULL
);

CREATE TABLE IF NOT EXISTS currencies (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    usd_value DECIMAL NOT NULL,
    symbol VARCHAR(10) NOT NULL,
    type VARCHAR(30),
    volatility VARCHAR(10) CHECK (volatility IN ('high', 'medium', 'low')),
    liquidity DECIMAL NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS wallets (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    address VARCHAR(100) NOT NULL UNIQUE,
    alias VARCHAR(50),
    balance DECIMAL NOT NULL DEFAULT 0,
    last_activity TIMESTAMP
);

-- Junction table: wallet_currencies (many-to-many)
CREATE TABLE IF NOT EXISTS wallet_currencies (
    wallet_id INTEGER REFERENCES wallets(id) ON DELETE CASCADE,
    currency_id INTEGER REFERENCES currencies(id) ON DELETE CASCADE,
    PRIMARY KEY (wallet_id, currency_id)
);

-- Data insertion
INSERT INTO users (username, password, email, role)
VALUES
  ('tomas', '$2a$12$1K9feUN63myUiCZlCw4Ayu3KCTFSlp91t5tPijTtMgKaZbSw3qx1e', 'tomas@example.com', 'user'),
  ('lucas', '$2a$12$JiYST1EqtEtHYDEk/3XwLe1U3JaKCZnGZSftCyrrrWG/EDXqvGuIq', 'lucas@example.com', 'admin');

INSERT INTO currencies (name, usd_value, symbol, type, volatility, liquidity)
VALUES
  ('Bitcoin', 70000, 'BTC', 'crypto', 'high', 1000000),
  ('Ethereum', 3500, 'ETH', 'crypto', 'medium', 500000);

INSERT INTO wallets (user_id, address, alias, balance)
VALUES
  (1, 'addr1', 'Tomas Wallet', 2.5),
  (2, 'addr2', 'Lucas Wallet', 1.0);

INSERT INTO wallet_currencies (wallet_id, currency_id)
VALUES
  (1, 1), -- Tomas has Bitcoin
  (1, 2), -- Tomas has Ethereum
  (2, 1); -- Lucas has Bitcoin
