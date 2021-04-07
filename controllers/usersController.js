const db = require('../utils/db');
const { errorResponse, msgResponse, dataResponse, tokenResponse } = require('../helpers/responses');

exports.getAllUsers = (req, res, next) => {
  const sql = 'SELECT id, name, email, username FROM users';

  db.query(sql, (err, rows, fields) => {
    if(err) {
      return res.status(500).json(errorResponse(500, err.message));
    }
    return res.status(200).json(dataResponse(200, 'All Users', rows));
  });

};

exports.getUserById = (req, res, next) => {
  const id = req.params.id;
  const sql = `SELECT id, name, email, username FROM users WHERE id = ${id}`;

  db.query(sql, (err, rows, fields) => {
    if(err) {
      return res.status(500).json(errorResponse(500, err.message));
    }
    return res.status(200).json(dataResponse(200, `User with id = ${id}`, rows));
  });
};

exports.getUserByEmail = (req, res, next) => {
  const email = req.params.email;
  const sql = `SELECT id, name, email, username FROM users WHERE email = '${email}'`;

  db.query(sql, (err, rows, fields) => {
    if(err) {
      return res.status(500).json(errorResponse(500, err.message));
    }
    return res.status(200).json(dataResponse(200, `User with email = ${email}`, rows));
  });
};