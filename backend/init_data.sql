CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    role VARCHAR(20) NOT NULL
);

CREATE TABLE currencies (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    usd_value DECIMAL NOT NULL,
    symbol VARCHAR(10) NOT NULL,
    type VARCHAR(30),
    volatility VARCHAR(10) CHECK (volatility IN ('high', 'medium', 'low')),
    liquidity DECIMAL NOT NULL DEFAULT 0
);

CREATE TABLE wallets (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    address VARCHAR(100) NOT NULL UNIQUE,
    alias VARCHAR(50),
    balance DECIMAL NOT NULL DEFAULT 0,
    last_activity TIMESTAMP
);

-- Junction table: wallet_currencies (many-to-many)
CREATE TABLE wallet_currencies (
    wallet_id INTEGER REFERENCES wallets(id) ON DELETE CASCADE,
    currency_id INTEGER REFERENCES currencies(id) ON DELETE CASCADE,
    PRIMARY KEY (wallet_id, currency_id)
);
