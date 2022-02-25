const CODES = require('./statusCodes');

const errors = {
  categoryConflict: {
    message: 'Category already registered',
    status: CODES.CONFLICT,
  },
  categoryNotFound: {
    message: '"categoryIds" not found',
    status: CODES.BAD_REQUEST,
  },
  invalidFields: {
    message: 'Invalid fields',
    status: CODES.BAD_REQUEST,
  },
  // It is possible to handle JsonWebTokenError using an error middleware
  // Refer to ../middlewares/error.js
  JsonWebTokenError: {
    message: 'Expired or invalid token',
    status: CODES.UNAUTHORIZED,
  },
  postNotFound: {
    message: 'Post does not exist',
    status: CODES.NOT_FOUND,
  },
  tokenNotFound: {
    message: 'Token not found',
    status: CODES.UNAUTHORIZED,
  },
  unauthorized: {
    message: 'Unauthorized user',
    status: CODES.UNAUTHORIZED,
  },
  userConflict: {
    message: 'User already registered',
    status: CODES.CONFLICT,
  },
  userNotFound: {
    message: 'User does not exist',
    status: CODES.NOT_FOUND,
  },
};

/**
 * @description Throw an error with the given error code message and status
 * @param {string} code
 * @param {Error} joiError
 * @throws {Error}
 */
module.exports = (code, joiError) => {
  // Conditional implemented so all errors pass through this function
  // even Joi errors (which will be handled by the error middleware)
  if (code === 'joi') throw joiError;

  const { message, status } = errors[code];

  const err = new Error(message);
  err.status = status;

  throw err;
};
