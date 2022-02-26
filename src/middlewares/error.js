const { CODES } = require('../helpers');

// Exporting array of middlewares, which will be executed in order
module.exports = [
  /**
   * @description Handle Joi errors
   */
  (err, _req, res, next) => {
    // If error is not an instance of Joi
    // then pass it to next middleware
    if (!err.isJoi) return next(err);

    const status = CODES.BAD_REQUEST;
    const { message } = err.details[0];

    res.status(status).json({ message });
  },
  /**
   * @description Handle all other errors
   */
  (err, _req, res, _next) => {
    const status = err.status || CODES.INTERNAL_SERVER_ERROR;
    const message = err.message || 'Internal server error';

    // If is an internal server error
    // then log it
    if (status === 500) console.error(err);

    res.status(status).json({ message });
  },
];

// Example of JSON Web Token error handling middleware

// Not used in this project because the error is handled by the throwNewError helper
// Refer to ../helpers/throwNewError.js

// module.exports = (err, _req, res, next) => {
//   if (err.name !== 'JsonWebTokenError') return next(err);

//   const status = CODES.UNAUTHORIZED;
//   const message = 'Expired or invalid token';

//   res.status(status).json({ message });
// };
