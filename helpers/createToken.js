const jwt = require('jsonwebtoken');
require('dotenv').config();

const createToken = (user, interval) => {
  const token = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: interval });
  return token;
};

module.exports = createToken;