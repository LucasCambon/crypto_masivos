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

async function getWalletById(req, res) {
  const { id } = req.params;

  if (!id || isNaN(id)) {
    return res.status(400).json({ status: "error", message: "Invalid or missing wallet ID" });
  }

  try {
    const result = await pool.query(
      `
      SELECT w.*, u.username
      FROM wallets w
      JOIN users u ON w.user_id = u.id
      WHERE w.id = $1
      `,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ status: "error", message: "Wallet not found" });
    }

    res.status(200).json({ status: "ok", data: result.rows[0] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "error", message: "Error retrieving wallet" });
  }
}

const getWalletsByUserId = async (req, res) => {
  const { user_id } = req.params;

  if (!user_id || isNaN(user_id)) {
    return res.status(400).json({ status: "error", message: "Invalid or missing user ID" });
  }

  try {
    const result = await pool.query(
      `
      SELECT w.*, u.username
      FROM wallets w
      JOIN users u ON w.user_id = u.id
      WHERE w.user_id = $1
      `,
      [user_id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ status: "error", message: "No wallets found for this user" });
    }

    res.status(200).json({
      status: "ok",
      message: "Wallets retrieved successfully",
      data: result.rows,
    });
  } catch (error) {
    console.error("Error retrieving wallets by user_id:", error);
    res.status(500).json({ status: "error", message: "Internal server error" });
  }
};

async function createWallet(req, res) {
  const { user_id, address, alias, balance, currency_id } = req.body;

  if (!user_id || !address || !currency_id) {
    return res.status(400).json({ status: "error", message: "Missing required fields" });
  }

  try {
    const last_activity = new Date();

    const result = await pool.query(
      `INSERT INTO wallets (user_id, address, alias, balance, last_activity)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [user_id, address, alias || null, balance || 0, last_activity]
    );

    const newWallet = result.rows[0];

    await pool.query(
      `INSERT INTO wallet_currencies (wallet_id, currency_id)
       VALUES ($1, $2)`,
      [newWallet.id, currency_id]
    );

    res.status(201).json({
      status: "ok",
      message: "Wallet created and linked to currency",
      data: newWallet
    });

  } catch (error) {
    console.error("Error creating wallet:", error);
    res.status(500).json({ status: "error", message: "Error creating wallet" });
  }
}

async function updateWallet(req, res) {
  const { id, user_id, alias, balance } = req.body;

  if (!id) {
    return res.status(400).json({ status: "error", message: "Wallet ID is required" });
  }

  try {
    const result = await pool.query("SELECT * FROM wallets WHERE id = $1", [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ status: "error", message: "Wallet not found" });
    }

    const current = result.rows[0];
    const last_activity = new Date();

    const updated = await pool.query(
      `UPDATE wallets SET
        user_id = $1,
        alias = $2,
        balance = $3,
        last_activity = $4
       WHERE id = $5
       RETURNING *`,
      [
        user_id || current.user_id,
        alias || current.alias,
        balance || current.balance,
        last_activity,
        id
      ]
    );

    res.status(200).json({
      status: "ok",
      message: "Wallet updated",
      data: updated.rows[0]
    });

  } catch (error) {
    console.error("Error updating wallet:", error);
    res.status(500).json({ status: "error", message: "Error updating wallet" });
  }
}

async function deleteWallet(req, res) {
  const { id } = req.body;
  if (!id) return res.status(400).json({ status: "error", message: "Wallet ID is required" });

  try {
    const result = await pool.query("DELETE FROM wallets WHERE id = $1 RETURNING *", [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ status: "error", message: "Wallet not found" });
    }

    res.status(200).json({ status: "ok", message: "Wallet deleted", data: result.rows[0] });

  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "error", message: "Error deleting wallet" });
  }
}

module.exports = {
    getWallets,
    getWalletById,
    getWalletsByUserId,
    createWallet,
    updateWallet,
    deleteWallet
}