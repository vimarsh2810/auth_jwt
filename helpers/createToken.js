const jwt = require('jsonwebtoken');

const createToken = (user, interval) => {
  console.log(process.env.JWT_SECRET)
  const token = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: interval });
  return token;
};

module.exports = createToken;