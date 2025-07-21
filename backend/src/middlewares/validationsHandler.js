const { validationResult } = require("express-validator");

function validationsErrors(req, res, next) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      status: "error",
      message: "Request data does not match required format.",
      errors: errors.array().map(err => ({
        field: err.param,
        message: err.msg,
      })),
    });
  }

  next();
}

module.exports = validationsErrors;