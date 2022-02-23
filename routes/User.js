const express = require('express');

const controllers = require('../controllers');

const router = express.Router();

router.post('/', controllers.User.create);
router.get('/', controllers.User.getAll);

module.exports = router;
