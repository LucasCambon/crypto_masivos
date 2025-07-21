function isAdmin(req, res, next) {
  if (req.user.role !== "admin") {
    return res.status(403).json({ status: "error", message: "Unauthorized access." });
  }
  next();
}

module.exports = isAdmin;