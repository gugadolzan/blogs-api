const codes = require('./statusCodes');

const errors = {
  alreadyRegistered: {
    message: 'User already registered',
    status: codes.CONFLICT,
  },
  invalidFields: {
    message: 'Invalid fields',
    status: codes.BAD_REQUEST,
  },
  // It is possible to handle JsonWebTokenError using an error middleware
  // Refer to ../middlewares/error.js
  JsonWebTokenError: {
    message: 'Expired or invalid token',
    status: codes.UNAUTHORIZED,
  },
  tokenNotFound: {
    message: 'Token not found',
    status: codes.UNAUTHORIZED,
  },
  userNotFound: {
    message: 'User does not exist',
    status: codes.NOT_FOUND,
  },
};

module.exports = (code) => {
  const { message, status } = errors[code];

  const err = new Error(message);
  err.status = status;
  throw err;
};
