const fs = require("fs");
const path = require("path");
const bcrypt = require("bcrypt");
const users = require("../mockData/users.json");

function getUsers(req, res) {
    res.status(200).json({
        status: "ok",
        data: users,
        count: users.length
    });
}

function createUser(req, res) {
    const { username, email, password } = req.body;
    if (!username, email, password) return res.status(400).json({ status: "error", message: "Incomplete required fields."});
    const exist = users.find(user => user.username === username || user.email === email);
    if (exist) return res.status(409).json({ status: "error", message: "Username or email already in use."});
    const hash = bcrypt.hashSync(password, 12);
    const newUser = {
        id: users.length + 1,
        username,
        password: hash,
        email,
        role: "user", // Default value
        created_at: new Date().toISOString()
    };
    users.push(newUser);
    fs.writeFileSync(
        path.join(__dirname, "../mockData/users.json"),
        JSON.stringify(users, null, 2)
    );
    const { password: _, ...newUserData } = newUser;
    res.status(201).json({
        status: "ok",
        message: "New user created correctly.",
        data: newUserData,
        newCount: users.length
    });
}

function updateUser(req, res) {
  const { id, nombre, email, password } = req.body;

  const index = users.findIndex(usr => usr.id === id);
  if (index === -1) return res.status(404).json({ status: "error", message: "user not found."});


  if (nombre) users[index].nombre = nombre;
  if (email) users[index].email = email;
  if (password) users[index].password = password;

  fs.writeFileSync(
    path.join(__dirname, "../mockData/users.json"),
    JSON.stringify(users, null, 2)
  );

  const { password: _, ...userUpdatedData } = users[index];

  res.status(200).json({
    status: "ok",
    message: "User updated correctly",
    data: userUpdatedData
  });

}

function deleteUser(req, res) {
  const { id } = req.body;

  const index = users.findIndex(u => u.id === id);
  if (index === -1) return res.status(404).json({ status: "error", message: "user not found."});

  const deletedUser = users.splice(index, 1)[0];

  fs.writeFileSync(
    path.join(__dirname, "../mockData/users.json"),
    JSON.stringify(users, null, 2)
  );

  const { password: _, ...deletedUserData } = deletedUser;

  res.status(200).json({
    status: "ok",
    message: "User deleted correctly.",
    data: deletedUserData
  });
}

module.exports = {
    getUsers,
    createUser,
    updateUser,
    deleteUser
};