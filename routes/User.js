const express = require('express');

const controllers = require('../controllers');
const { validateAuthorization } = require('../middlewares');

const router = express.Router();

router.post('/', controllers.User.create);
router.get('/', validateAuthorization, controllers.User.getAll);
router.get('/:id', validateAuthorization, controllers.User.getById);
router.delete('/me', validateAuthorization, controllers.User.remove);

module.exports = router;
