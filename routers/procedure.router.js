// Express
const express = require('express');
const router = express.Router();
// Controller 
const procedure = require('../controller/procedure.controller.js');
// Validate
const validate = require('../middleware/validate.middleware.js'); 

router.get('/sign-up', validate.licensePassed, procedure.signUp);
router.get('/sign-in', validate.licensePassed, procedure.signIn);

module.exports = router;