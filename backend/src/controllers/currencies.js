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

module.exports = {
    getCurrencies,
};