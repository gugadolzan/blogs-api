const router = require('express').Router();

const controllers = require('../controllers');
const middlewares = require('../middlewares');

router.post('/', controllers.User.create);

router.use(middlewares.auth);

router.get('/', controllers.User.getAll);
router.get('/:id', controllers.User.getById);
router.delete('/me', controllers.User.remove);

module.exports = router;
