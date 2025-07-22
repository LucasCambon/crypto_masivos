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

async function createWallet(req, res) {
  const { user_id, address, alias, balance, last_activity } = req.body;

  if (!user_id || !address) {
    return res.status(400).json({ status: "error", message: "Missing required fields" });
  }

  try {
    const result = await pool.query(
      `INSERT INTO wallets (user_id, address, alias, balance, last_activity)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [user_id, address, alias || null, balance, last_activity || null]
    );

    res.status(201).json({
      status: "ok",
      message: "Wallet created",
      data: result.rows[0]
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "error", message: "Error creating wallet" });
  }
}

async function updateWallet(req, res) {
  const { id, user_id, address, alias, balance, last_activity } = req.body;

  if (!id) {
    return res.status(400).json({ status: "error", message: "Wallet ID is required" });
  }

  try {
    const result = await pool.query("SELECT * FROM wallets WHERE id = $1", [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ status: "error", message: "Wallet not found" });
    }

    const current = result.rows[0];

    const updated = await pool.query(
      `UPDATE wallets SET
        user_id = $1,
        address = $2,
        alias = $3,
        balance = $4,
        last_activity = $5
      WHERE id = $6
      RETURNING *`,
      [
        user_id || current.user_id,
        address || current.address,
        alias || current.alias,
        balance || current.balance,
        last_activity || current.last_activity,
        id
      ]
    );

    res.status(200).json({ status: "ok", message: "Wallet updated", data: updated.rows[0] });

  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "error", message: "Error updating wallet" });
  }
}

module.exports = {
    getWallets,
    createWallet,
    updateWallet
}