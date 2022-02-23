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
};

module.exports = (code) => {
  const { message, status } = errors[code];

  const err = new Error(message);
  err.status = status;
  throw err;
};
