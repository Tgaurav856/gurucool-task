const express = require('express');
const { register, login } = require('../controller/authController');
const { enqueueRequest } = require('../controllers/queueController');
const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/enqueue', authenticate, enqueueRequest);

module.exports = router;