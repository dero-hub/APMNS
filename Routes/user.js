const express = require('express');
const users_controller = require('../Controllers/users_controller');

const router = express.Router();

router.post('/create', users_controller.create);
router.post('/login', users_controller.login);
router.put('/update/:id', users_controller.update);
router.get('/list', users_controller.getAll);
router.get('/list/:id', users_controller.getOne);
router.delete('/delete/:id', users_controller.deleteOne);
router.delete('/delete', users_controller.deleteAll);

module.exports = router;
