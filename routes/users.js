const express = require('express');
const { route } = require('.');
const router = express.Router();

const userController = require('../controllers/users_controller');
router.get('/profile',userController.profile);

module.exports = router;