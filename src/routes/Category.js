const router = require('express').Router();

const controllers = require('../controllers');
const middlewares = require('../middlewares');

router.use(middlewares.auth);

router.post('/', controllers.Category.create);
router.get('/', controllers.Category.getAll);

module.exports = router;
