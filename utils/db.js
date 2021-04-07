const mysql = require('mysql');
require('dotenv').config();

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PW,
  database: process.env.MYSQL_DB
});

connection.connect(err => {
  if(err) throw err;
  console.log('Database connected successfully!');
});

module.exports = connection;