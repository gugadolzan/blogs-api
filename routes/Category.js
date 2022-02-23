const express = require('express');

const controllers = require('../controllers');
const { validateAuthorization } = require('../middlewares');

const router = express.Router();

router.post('/', validateAuthorization, controllers.Category.create);

module.exports = router;
