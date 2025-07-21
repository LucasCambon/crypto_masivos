const pool = require("../db");

async function getWallets(req, res) {
  try {
    const result = await pool.query(`SELECT * FROM wallets`);
    res.status(200).json({ status: "ok", data: result.rows, count: result.rowCount });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "error", message: "Error fetching wallets" });
  }
}

module.exports = {
    getWallets
}