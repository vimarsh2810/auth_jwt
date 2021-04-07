const bcrypt = require('bcryptjs');
const db = require('../utils/db');

exports.signup = (req, res, next) => {
  const userDetails = req.body;
  const hashedPW = bcrypt.hashSync(userDetails.password, 12);
  const sql = `INSERT INTO 
  users (name, username, email, password) 
  VALUES ('${userDetails.name}', '${userDetails.username}', '${userDetails.email}', '${hashedPW}')`;

  db.query(sql, (err, result) => {

    if(err) {
      return res.status(500).json({
        status: 500,
        success: false,
        message: err.message
      });
    }

    return res.status(200).json({
      status: 200,
      success: true,
      message: `Insertion Successul, InsertId = ${result.insertId}`
    });
  });
};

exports.login = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const sql = `SELECT * FROM users WHERE email = '${email}'`;

  db.query(sql, (err, rows, fields) => {

    if(err) {
      return res.status(500).json({
        status: 500,
        success: false,
        message: err.message
      });
    }
    
    if(rows.length < 1) {
      return res.status(401).json({
        status: 401,
        success: false,
        message: 'Email is not registered'
      }); 
    }

    const user = rows[0];
    bcrypt.compare(password, user.password)
      .then(doMatch => {
        delete user.password;
        return res.status(200).json({
          status: 200,
          success: true,
          message: `Logged In Successfully!`,
          payload: rows[0]
        });
      })
      .catch(err => {
        return res.status(401).json({
          status: 401,
          success: false,
          message: `Invalid Email or Password`
        });
      });
    
  });
};