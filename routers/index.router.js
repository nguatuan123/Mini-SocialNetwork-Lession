// Express
const express = require('express');
const router = express.Router();
// Controller 
const indexController = require('../controller/index.controller.js');
// Validate
const validate = require('../middleware/validate.middleware.js');

router.get('', validate.licenseFalsed, indexController.index);
router.get('/:id',  validate.licenseFalsed, indexController.user);

module.exports = router;