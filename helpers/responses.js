// Error response
const errorResponse = (status, message) => {
  return {
    status: status,
    success: false,
    message: message
  };
};

// Response on success with message
const msgResponse = (status, message) => {
  return {
    status: status,
    success: true,
    message: message
  };
};

// Response on success with message as well as payload
const dataResponse = (status, message, data) => {
  return {
    status: status,
    success: true,
    message: message,
    payload: data
  };
};

// Response on success with message, payload and Token
const tokenResponse = (status, message, data, token) => {
  return {
    status: status,
    success: true,
    message: message,
    payload: data,
    accessToken: token
  };
};

module.exports = { errorResponse, msgResponse, dataResponse, tokenResponse };