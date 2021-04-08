const bcrypt = require('bcryptjs');
const db = require('../utils/db');
const createToken = require('../helpers/createToken');
const { errorResponse, msgResponse, dataResponse, tokenResponse } = require('../helpers/responses');

exports.signup = (req, res, next) => {
  const userDetails = req.body;
  const hashedPW = bcrypt.hashSync(userDetails.password, 12);
  const sql = `INSERT INTO 
  users (name, username, email, password) 
  VALUES ('${userDetails.name}', '${userDetails.username}', '${userDetails.email}', '${hashedPW}')`;

  db.query(sql, (err, result) => {

    if(err) {
      return res.status(500).json(errorResponse(500, err.message));
    }

    return res.status(200).json(msgResponse(200, `Insertion Successul, InsertId = ${result.insertId}`));
  });
};

exports.login = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const sql = `SELECT * FROM users WHERE email = '${email}'`;

  db.query(sql, (err, rows, fields) => {

    if(err) {
      return res.status(500).json(errorResponse(500, err.message));
    }

    const user = rows[0];
    const result = bcrypt.compareSync(password, user.password);
    delete user.password;
    if(result) {
      const token = createToken({ userId: user.id, email: user.email }, 1*60); // pass 1 or 2 mins to check token expiry
      return res.status(200).json(tokenResponse(500, `Logged In Successfully!`, rows[0], token));
    }
    return res.status(401).json(errorResponse(401, 'Incorrect Email or Password'));
  });
};

exports.dashboard = (req, res, next) => {
  const userId = req.userData.userId;
  const sql = `SELECT id, name, email, username FROM users WHERE id = '${userId}'`;
  
  db.query(sql, (err, rows, fields) => {
    if(err) {
      return res.status(500).json(errorResponse(500, err.message));
    }
    return res.status(200).json(dataResponse(200, `User Details of Logged In user`, rows[0]));
  });
}