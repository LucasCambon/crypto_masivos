const express = require("express");
const app = express();

const userRoutes = require("./routes/users");
const currencyRoutes = require("./routes/currencies");
const walletRoutes = require("./routes/wallets");

const PORT = process.env.PORT || 3000;

// Middlewares

app.use(express.json());


// Routes

app.get("/health", (req, res) => {
    res.status(200).json({
        status: "ok",
        timestamp: new Date().toISOString()
    });
});

app.use("/api/v1/users", userRoutes);

app.use("/api/v1/currencies", currencyRoutes);

app.use("/api/v1/wallets", walletRoutes);

// 404 Handler (Middleware at bottom to act as a catch-all)

app.use((req, res, next) => {
    res.status(404).json({ error: "404 NOT FOUND" });
});

// Initialize server

app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`)
});