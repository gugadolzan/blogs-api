const express = require('express');

const controllers = require('../controllers');
const { validateAuthorization } = require('../middlewares');

const router = express.Router();

router.post('/', controllers.User.create);

router.use(validateAuthorization);

router.get('/', controllers.User.getAll);
router.get('/:id', controllers.User.getById);
router.delete('/me', controllers.User.remove);

module.exports = router;
