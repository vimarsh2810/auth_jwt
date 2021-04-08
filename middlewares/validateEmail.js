const db = require('../utils/db');
const { errorResponse } = require('../helpers/responses');

// Check if there is no User with this email/username already exists in DB at the time of signup
const checkEmailInUse = (req, res, next) => {
  const email = req.body.email;
  const username = req.body.username;
  const sql = `SELECT email, username FROM users WHERE email = '${email}' or username = '${username}'`;
  db.query(sql, (err, rows, fields) => {
    if(err) {
      return res.status(500).json(errorResponse(500, err.message));
    }
    if(rows.length == 0) {
      next();
      return;
    }
    return res.status(409).json(errorResponse(409, 'User with this email or username already exist'));
    
  });
}

// Check whether user with this email/username already exists in DB at the time of signup
const checkEmailExist = (req, res, next) => {
  const email = req.body.email;
  const sql = `SELECT email FROM users WHERE email = '${email}'`;
  db.query(sql, (err, rows, fields) => {
    if(err) {
      return res.status(500).json(errorResponse(500, err.message));
    }
    if(rows.length == 0) {
      return res.status(404).json(errorResponse(404, 'User with this email does not exist'));
    }
    next();
  });
}

module.exports = { checkEmailInUse, checkEmailExist };