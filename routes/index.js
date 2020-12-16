const { Router } = require('express');
const express = require('express');
const router = express.Router();

const homeController = require('../controllers/home_controller')

// To check if the file is loaded
console.log("File is loaded");

router.get('/',homeController.home); //home is accessable over here
router.use('/users',require('./users'));

module.exports = router;
