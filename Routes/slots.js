const express = require('express');
const slots_controller = require('../Controllers/slots_controller');
const jwt = require('../Security/auth');

const router = express.Router();

router.post('/create', jwt.verifyToken, slots_controller.create);
// router.post('/login', users_controller.login);
// router.put('/update/:id', users_controller.update);
// router.get('/list', users_controller.getAll);
// router.get('/list/:id', users_controller.getOne);
// router.delete('/delete/:id', users_controller.deleteOne);
// router.delete('/delete', users_controller.deleteAll);

module.exports = router;