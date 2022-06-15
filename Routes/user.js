const express = require('express');
const users_controller = require('../Controllers/users_controller');

const router = express.Router();

router.post('/create', users_controller.create);
// router.get('/', users_controller.create);



module.exports = router;
