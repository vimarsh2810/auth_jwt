const errorResponse = (status, message) => {
  return {
    status: status,
    success: false,
    message: message
  };
};

const msgResponse = (status, message) => {
  return {
    status: status,
    success: true,
    message: message
  };
};

const dataResponse = (status, message, data) => {
  return {
    status: status,
    success: true,
    message: message,
    payload: data
  };
};

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