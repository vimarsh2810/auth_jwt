const db = require('../utils/db');

exports.signup = (req, res, next) => {
  const userDetails = req.body;
  const sql = `INSERT INTO 
  users (name, username, email, password) 
  VALUES ('${userDetails.name}', '${userDetails.username}', '${userDetails.email}', '${userDetails.password}')`;

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