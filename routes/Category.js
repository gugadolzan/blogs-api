const express = require('express');

const controllers = require('../controllers');
const { validateAuthorization } = require('../middlewares');

const router = express.Router();

router.post('/', validateAuthorization, controllers.Category.create);
router.get('/', validateAuthorization, controllers.Category.getAll);

module.exports = router;
