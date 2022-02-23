const express = require('express');

const controllers = require('../controllers');
const { validateAuthorization } = require('../middlewares');

const router = express.Router();

router.post('/', validateAuthorization, controllers.BlogPost.create);
router.get('/', validateAuthorization, controllers.BlogPost.getAll);
router.get('/:id', validateAuthorization, controllers.BlogPost.getById);

module.exports = router;
