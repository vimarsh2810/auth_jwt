const jwt = require('jsonwebtoken');
const { errorResponse } = require('../helpers/responses');

// To check whether token exists in header and is expired or invalid
const verifyToken = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).json(errorResponse(401, 'No Token'));
  }
  const token = req.headers.authorization.split(" ")[1];
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      switch(err.name) {
        case 'TokenExpiredError':
          return res.status(401).json(errorResponse(401, 'Token Expired'));
        case 'JsonWebTokenError':
          return res.status(401).json(errorResponse(401, 'Invalid Token'));
        case 'SyntaxError':
          return res.status(401).json(errorResponse(401, 'Malformed Token'));
        default:
          return res.status(401).json(errorResponse(401, err.message));
      }
    }
    req.userData = decoded;
    next();
  });
};

module.exports = verifyToken;