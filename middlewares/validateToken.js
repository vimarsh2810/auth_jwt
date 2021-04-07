const jwt = require('jsonwebtoken');

// To Check whether the access token exists in header or not
const checkAuth = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).json({
      status: 401,
      success: false,
      message: 'No Token'
    });
  }
  next();
};

// To check whether token is expired or invalid
const verifyToken = (req, res, next) => {

  const token = req.headers.authorization.split(" ")[1];
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      switch(err.name) {
        case 'TokenExpiredError':
          return res.status(401).json({
            status: 401,
            success: false,
            message: 'Token Expired'
          });
        case 'JsonWebTokenError':
          return res.status(401).json({
            status: 401,
            success: false,
            message: 'Invalid Token'
          });
        default: 
          return res.status(401).json({
            status: 401,
            success: false,
            message: err.message
          });
      }
    }
    next();
  });
};

module.exports = {checkAuth, verifyToken};