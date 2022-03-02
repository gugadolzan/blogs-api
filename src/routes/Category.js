const express = require('express');

const controllers = require('../controllers');
const middlewares = require('../middlewares');

const router = express.Router();

router.use(middlewares.auth);

router.post('/', controllers.Category.create);
router.get('/', controllers.Category.getAll);

module.exports = router;
