const pool = require("../db");

async function getCurrencies(req, res) {
    try {
        const result = await pool.query(`SELECT * FROM currencies`);
        res.status(200).json({ status: "ok", data: result.rows, count: result.rowCount });
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: "error", message: "Error getting currencies" });
    }
}

async function createCurrency(req, res) {
  const { name, usd_value, symbol, type, volatility, liquidity } = req.body;

  if (!name || !usd_value || !symbol) {
    return res.status(400).json({ status: "error", message: "Missing required fields" });
  }

  try {
    const result = await pool.query(
      `INSERT INTO currencies (name, usd_value, symbol, type, volatility, liquidity)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING *`,
      [name, usd_value, symbol, type, volatility, liquidity || 0]
    );
    res.status(201).json({ status: "ok", message: "Currency created", data: result.rows[0] });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "error", message: "Error creating currency" });
  }
}

module.exports = {
    getCurrencies,
    createCurrency,
};