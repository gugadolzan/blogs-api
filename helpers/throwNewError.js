const codes = require('./statusCodes');

const errors = {
  categoryConflict: {
    message: 'Category already registered',
    status: codes.CONFLICT,
  },
  categoryNotFound: {
    message: '"categoryIds" not found',
    status: codes.BAD_REQUEST,
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
  postNotFound: {
    message: 'Post does not exist',
    status: codes.NOT_FOUND,
  },
  tokenNotFound: {
    message: 'Token not found',
    status: codes.UNAUTHORIZED,
  },
  unauthorized: {
    message: 'Unauthorized user',
    status: codes.UNAUTHORIZED,
  },
  userConflict: {
    message: 'User already registered',
    status: codes.CONFLICT,
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
