const codes = require('../helpers/statusCodes');

// Exporting array of middlewares, which will be executed in order
module.exports = [
  /**
   * Middleware for handling Joi errors
   */
  (err, _req, res, next) => {
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

    if (status === codes.INTERNAL_SERVER_ERROR) console.error(err);

    res.status(status).json({ message });
  },
];
