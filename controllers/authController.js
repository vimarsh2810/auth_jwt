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
    
    if(result) {
      delete user.password;
      const token = createToken({ userId: user.id, email: user.email }, 1*60);
      return res.status(200).json(tokenResponse(500, `Logged In Successfully!`, rows[0], token));
    }
    return res.status(401).json(errorResponse(401, 'Incorrect Email or Password'));
  });
};

exports.landingPage = (req, res, next) => {
  res.send('Authorized User Content');
}