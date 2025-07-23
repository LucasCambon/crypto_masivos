const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const pool = require("../db");

async function getUsers(req, res) {
    try {
        const queryResult = await pool.query(`SELECT id, username, email, role, created_at FROM users`);
        return res.status(200).json({
            status: "ok",
            data: queryResult.rows,
            count: queryResult.rowCount,
        });
    } catch (error) {
        console.log(error)
        return res.status(500).json({ status: "error", message: "Error obtaining all users" });
    }
    
}

async function createUser(req, res) {
    const { username, email, password } = req.body;
    try {

        const exist = await pool.query("SELECT * FROM users WHERE username = $1 OR email = $2", [username, email]);
        if (exist.rows.length > 0) return res.status(409).json({ status: "error", message: "Username or email already in use."});
        
        const hash = await bcrypt.hash(password, 12);
        const result = await pool.query(
            `INSERT INTO users (username, email, password, role)
            VALUES ($1, $2, $3, $4)
            RETURNING id, username, email, role, created_at`,
            [username, email, hash, "user"]
        );
        return res.status(201).json({
            status: "ok",
            message: "New user created correctly.",
            data: result.rows[0],
        });
    } catch (error) {
        console.log(error)
        return res.status(500).json({ status: "error", message: "Error creating user." });
    }
}

async function updateUser(req, res) {
    const { username, email, password } = req.body;
    const id = req.user.id
    try {
        const user = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
        if (user.rows.length === 0) return res.status(404).json({ status: "error", message: "User not found."});
        const actual = user.rows[0];
        const hash = password ? await bcrypt.hash(password, 12) : actual.password;

        const updated = await pool.query(
            `UPDATE users SET 
                username = $1,
                email = $2,
                password = $3
            WHERE id = $4
            RETURNING id, username, email, role, created_at`,
            [
                username || actual.username,
                email || actual.email,
                hash,
                id,
            ]
        );
        return res.status(200).json({
            status: "ok",
            message: "User updated correctly.",
            data: updated.rows[0],
        });
    } catch (error) {
        console.log(error)
        return res.status(500).json({ status: "error", message: "Error updating user." });
    }
}

async function deleteUser(req, res) {
  const id = req.user.id
  try {
    const result = await pool.query(
      "DELETE FROM users WHERE id = $1 RETURNING id, username, email, role, created_at",
      [id]
    );

    if (result.rows.length === 0) return res.status(404).json({ status: "error", message: "User not found."});

    return res.status(200).json({
      status: "ok",
      message: "User deleted correctly.",
      data: result.rows[0],
    });
  } catch (error) {
    console.log(error)
    return res.status(500).json({ status: "error", message: "Error deleting user." });
  }
}

async function login(req, res) {

    try {
        const userResult = await pool.query("SELECT * FROM users WHERE email = $1", [req.body.email]);

        if (userResult.rows.length === 0) {
            return res.status(401).json({ status: "error", message: "Invalid email or password." }); // Avoid giving hints on what is wrong, email or password.
        }

        const user = userResult.rows[0];

        const passwordMatch = await bcrypt.compare(req.body.password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ status: "error", message: "Invalid email or password." }); // Same as above, not giving hints.
        }

        const token = jwt.sign(
            { id: user.id, email: user.email, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        const { password, ...userData } = user;
        res.setHeader("Authorization", `Bearer ${token}`);
        return res.status(200).json({
            status: "ok",
            message: "Login successful.",
            token: token,
            data: userData,
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ status: "error", message: "Login failed." });
    }
}

async function profile(req, res) {
    try {
        const result = await pool.query(
            "SELECT id, username, email, role, created_at FROM users WHERE id = $1",
            [req.user.id]
        );
        return res.status(200).json({ status: "ok", data: result.rows[0] });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ status: "error", message: "Error fetching user profile info." });
    }
}

async function roleManagement(req, res) {
  const { id, role } = req.body;

  try {
    const user = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
    if (user.rows.length === 0) {
      return res.status(404).json({ status: "error", message: "User not found." });
    }

    const updated = await pool.query(
      "UPDATE users SET role = $1 WHERE id = $2 RETURNING id, username, email, role, created_at",
      [role, id]
    );

    return res.status(200).json({
      status: "ok",
      message: `Role updated to ${role} correctly.`,
      data: updated.rows[0],
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ status: "error", message: "Failed to assign admin role." });
  }
}

module.exports = {
    getUsers,
    createUser,
    updateUser,
    deleteUser,
    login,
    profile,
    roleManagement,
};