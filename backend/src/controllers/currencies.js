const pool = require("../db");

async function getCurrencies(req, res) {
  try {
    const result = await pool.query(`SELECT * FROM currencies`);
    return res.status(200).json({ status: "ok", data: result.rows, count: result.rowCount });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ status: "error", message: "Error getting currencies" });
  }
}

async function getCurrency(req, res) {
  const { id } = req.params;

  if (!id || isNaN(id)) {
    return res.status(400).json({ status: "error", message: "Invalid or missing currency ID." });
  }

  try {
    const result = await pool.query("SELECT * FROM currencies WHERE id = $1", [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ status: "error", message: "Currency not found." });
    }

    return res.status(200).json({ status: "ok", data: result.rows[0] });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ status: "error", message: "Error fetching currency." });
  }
}

async function createCurrency(req, res) {
  const { name, usd_value, symbol, type, volatility, liquidity } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO currencies (name, usd_value, symbol, type, volatility, liquidity)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING *`,
      [
        name,
        usd_value,
        symbol,
        type || null,
        volatility || null,
        liquidity
      ]
    );

    return res.status(201).json({
      status: "ok",
      message: "Currency created",
      data: result.rows[0]
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({ status: "error", message: "Error creating currency" });
  }
}

async function updateCurrency(req, res) {
  const { id, name, usd_value, symbol, type, volatility, liquidity } = req.body;

  try {

    const existing = await pool.query('SELECT * FROM currencies WHERE id = $1', [id]);
    if (existing.rows.length === 0) {
      return res.status(404).json({ status: "error", message: "Currency not found" });
    }

    const actual = existing.rows[0];

    const updatedCurrency = {
      name: name || actual.name,
      usd_value: usd_value || actual.usd_value,
      symbol: symbol || actual.symbol,
      type: type || actual.type,
      volatility: volatility || actual.volatility,
      liquidity: liquidity || actual.liquidity
    };

    const updateResult = await pool.query(
      `UPDATE currencies
       SET name = $1, usd_value = $2, symbol = $3, type = $4, volatility = $5, liquidity = $6
       WHERE id = $7
       RETURNING *`,
      [
        updatedCurrency.name,
        updatedCurrency.usd_value,
        updatedCurrency.symbol,
        updatedCurrency.type,
        updatedCurrency.volatility,
        updatedCurrency.liquidity,
        id
      ]
    );

    return res.status(200).json({
      status: "ok",
      message: "Currency updated",
      data: updateResult.rows[0]
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({ status: "error", message: "Error updating currency" });
  }
}

async function deleteCurrency(req, res) {
  const { id } = req.body;

  try {
    const result = await pool.query("DELETE FROM currencies WHERE id = $1 RETURNING *", [id]);
    if (result.rows.length === 0)
      return res.status(404).json({ status: "error", message: "Currency not found" });

    return res.status(200).json({ status: "ok", message: "Currency deleted", data: result.rows[0] });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ status: "error", message: "Error deleting currency" });
  }
}

module.exports = {
  getCurrencies,
  getCurrency,
  createCurrency,
  updateCurrency,
  deleteCurrency,
};