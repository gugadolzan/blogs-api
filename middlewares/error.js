const codes = require('../helpers/statusCodes');

// Exporting array of middlewares, which will be executed in order
module.exports = [
  /**
   * Middleware for handling Joi errors
   */
  (err, _req, res, next) => {
    // If error is not an instance of Joi
    // then pass it to next middleware
    if (!err.isJoi) return next(err);

    const status = codes.BAD_REQUEST;
    const { message } = err.details[0];

    res.status(status).json({ message });
  },
  /**
   * Middleware for handling other errors
   */
  (err, _req, res, _next) => {
    const status = err.status || codes.INTERNAL_SERVER_ERROR;
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

//   const status = codes.UNAUTHORIZED;
//   const message = 'Expired or invalid token';

//   res.status(status).json({ message });
// };
