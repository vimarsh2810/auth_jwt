const db = require('../utils/db');

const checkEmailInUse = (req, res, next) => {
  const email = req.body.email;
  const username = req.body.username;
  const sql = `SELECT email, username FROM users WHERE email = '${email}' or username = '${username}'`;
  db.query(sql, (err, rows, fields) => {
    if(err) {
      return res.status(500).json({
        status: 500,
        success: false,
        message: err.message
      });
    }
    if(rows.length == 0) {
      next();
    }
    else {
      return res.status(409).json({
        status: 409,
        success: false,
        message: `User with this email or username already exist`
      });
    }
  });
}

const checkEmailExist = (req, res, next) => {
  const email = req.body.email;
  const sql = `SELECT email FROM users WHERE email = '${email}'`;
  db.query(sql, (err, rows, fields) => {
    if(err) {
      return res.status(500).json({
        status: 500,
        success: false,
        message: err.message
      });
    }
    if(rows.length == 0) {
      return res.status(404).json({
        status: 404,
        success: false,
        message: `User with this email does not exist`
      });
    }
    else {
      next();
    }
  });
}

module.exports = { checkEmailInUse, checkEmailExist };