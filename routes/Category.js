const express = require('express');

const controllers = require('../controllers');
const { validateAuthorization } = require('../middlewares');

const router = express.Router();

router.use(validateAuthorization);

router.post('/', controllers.Category.create);
router.get('/', controllers.Category.getAll);

module.exports = router;
