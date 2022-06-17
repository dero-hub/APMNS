const express = require('express');
const slots_controller = require('../Controllers/slots_controller');
const jwt = require('../Security/auth');

const router = express.Router();

router.post('/create', jwt.verifyToken, slots_controller.create);
router.put('/update/:id', jwt.verifyToken, slots_controller.update);
router.get('/list', jwt.verifyToken, slots_controller.findAll);
router.delete('/delete', jwt.verifyToken, slots_controller.deleteAll);

module.exports = router;