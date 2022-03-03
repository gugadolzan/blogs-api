const router = require('express').Router();

const controllers = require('../controllers');
const middlewares = require('../middlewares');

router.use(middlewares.auth);

router.post('/', controllers.BlogPost.create);
router.get('/', controllers.BlogPost.getAll);
router.get('/search', controllers.BlogPost.search);
router.get('/:id', controllers.BlogPost.getById);
router.put('/:id', controllers.BlogPost.update);
router.delete('/:id', controllers.BlogPost.remove);

module.exports = router;
