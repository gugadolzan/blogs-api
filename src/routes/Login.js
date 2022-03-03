const router = require('express').Router();

const controllers = require('../controllers');

router.post('/', controllers.Login.getToken);

module.exports = router;
