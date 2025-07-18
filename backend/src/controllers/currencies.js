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

async function updateCurrency(req, res) {
  const { id, name, usd_value, symbol, type, volatility, liquidity } = req.body;

  if (!id) return res.status(400).json({ status: "error", message: "ID is required" });

  try {
    const existing = await pool.query("SELECT * FROM currencies WHERE id = $1", [id]);
    if (existing.rows.length === 0) {
      return res.status(404).json({ status: "error", message: "Currency not found" });
    }

    const actual = existing.rows[0];
    const updated = await pool.query(
      `UPDATE currencies SET
        name = $1,
        usd_value = $2,
        symbol = $3,
        type = $4,
        volatility = $5,
        liquidity = $6
       WHERE id = $7
       RETURNING *`,
      [
        name || actual.name,
        usd_value || actual.usd_value,
        symbol || actual.symbol,
        type || actual.type,
        volatility || actual.volatility,
        liquidity ?? actual.liquidity,
        id,
      ]
    );

    res.status(200).json({ status: "ok", message: "Currency updated", data: updated.rows[0] });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "error", message: "Error updating currency" });
  }
}

module.exports = {
    getCurrencies,
    createCurrency,
    updateCurrency,
};