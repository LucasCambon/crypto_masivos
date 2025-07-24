const pool = require('../db');

async function getWallets(req, res) {
	const user_id = req.user.id;

	try {
		const result = await pool.query(
			`
      SELECT w.*, u.username, c.id as currency_id, c.name as currency_name, 
             c.symbol as currency_symbol, c.usd_value as currency_usd_value
      FROM wallets w
      JOIN users u ON w.user_id = u.id
      LEFT JOIN wallet_currencies wc ON w.id = wc.wallet_id
      LEFT JOIN currencies c ON wc.currency_id = c.id
      WHERE w.user_id = $1
      `,
			[user_id]
		);

		if (result.rows.length === 0) {
			return res.status(200).json({
				status: 'ok',
				message: 'No wallets found for this user',
				data: [],
			});
		}

		res.status(200).json({
			status: 'ok',
			message: 'Wallets retrieved successfully',
			data: result.rows,
		});
	} catch (error) {
		console.error('Error retrieving wallets by user_id:', error);
		res.status(500).json({
			status: 'error',
			message: 'Internal server error',
		});
	}
}

async function getWalletById(req, res) {
	const { id } = req.params;
	const user_id = req.user.id;

	if (!id || isNaN(id)) {
		return res
			.status(400)
			.json({ status: 'error', message: 'Invalid or missing wallet ID' });
	}

	try {
		const result = await pool.query(
			`
      SELECT w.*, u.username 
      FROM wallets w
      JOIN users u ON w.user_id = u.id
      WHERE w.id = $1 AND w.user_id = $2
      `,
			[id, user_id]
		);

		if (result.rows.length === 0) {
			return res
				.status(404)
				.json({ status: 'error', message: 'Wallet not found' });
		}

		res.status(200).json({ status: 'ok', data: result.rows[0] });
	} catch (error) {
		console.error(error);
		res.status(500).json({
			status: 'error',
			message: 'Error retrieving wallet',
		});
	}
}

async function createWallet(req, res) {
	const { address, alias, currency_id } = req.body;
	const user_id = req.user.id;
	if (!user_id || !address || !currency_id) {
		return res
			.status(400)
			.json({ status: 'error', message: 'Missing required fields' });
	}

	try {
		const last_activity = new Date();

		const result = await pool.query(
			`INSERT INTO wallets (user_id, address, alias, balance, last_activity)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
			[user_id, address, alias || null, 0, last_activity]
		);

		const newWallet = result.rows[0];

		await pool.query(
			`INSERT INTO wallet_currencies (wallet_id, currency_id)
       VALUES ($1, $2)`,
			[newWallet.id, currency_id]
		);

		res.status(201).json({
			status: 'ok',
			message: 'Wallet created and linked to currency',
			data: newWallet,
		});
	} catch (error) {
		console.error('Error creating wallet:', error);
		res.status(500).json({
			status: 'error',
			message: 'Error creating wallet',
		});
	}
}

async function updateWallet(req, res) {
  const { id, balance, type } = req.body;
  const user_id = req.user.id;
  if (!id) {
    return res.status(400).json({ status: "error", message: "Wallet ID is required" });
  }

  try {
    const result = await pool.query("SELECT * FROM wallets WHERE id = $1 AND user_id = $2", [id, user_id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ status: "error", message: "Wallet not found" });
    }

    const wallet = result.rows[0];
    let newBalance;

    if (type === "deposit") {
      newBalance = wallet.balance + Number(amount);
    } else if (type === "withdraw") {
      if (Number(amount) > wallet.balance) {
        return res.status(400).json({
          status: "error",
          message: "Insufficient balance for withdrawal",
        });
      }
      newBalance = wallet.balance - Number(amount);
    }

    const last_activity = new Date();

    const updated = await pool.query(
      `UPDATE wallets SET
        balance = $1,
        last_activity = $2
       WHERE id = $3
       RETURNING *`,
      [
        newBalance,
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
	const user_id = req.user.id;
	if (!id)
		return res
			.status(400)
			.json({ status: 'error', message: 'Wallet ID is required' });

	try {
		const result = await pool.query(
			'DELETE FROM wallets WHERE id = $1 AND user_id = $2 RETURNING *',
			[id, user_id]
		);
		if (result.rows.length === 0) {
			return res
				.status(404)
				.json({ status: 'error', message: 'Wallet not found' });
		}

		res.status(200).json({
			status: 'ok',
			message: 'Wallet deleted',
			data: result.rows[0],
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			status: 'error',
			message: 'Error deleting wallet',
		});
	}
}

module.exports = {
	getWallets,
	getWalletById,
	createWallet,
	updateWallet,
	deleteWallet,
};
