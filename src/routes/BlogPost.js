const express = require('express');

const controllers = require('../controllers');
const { validateAuthorization } = require('../middlewares');

const router = express.Router();

router.use(validateAuthorization);

router.post('/', controllers.BlogPost.create);
router.get('/', controllers.BlogPost.getAll);
router.get('/search', controllers.BlogPost.search);
router.get('/:id', controllers.BlogPost.getById);
router.put('/:id', controllers.BlogPost.update);
router.delete('/:id', controllers.BlogPost.remove);

module.exports = router;
