// Express
const express = require('express');
const router = express.Router();
// Multe upload file
const multer  = require('multer');
var upload = multer({ dest: './public/avatarUserImg/' });
// Controller 
const funcController = require('../controller/func.controller.js');
// Validate
const validate = require('../middleware/validate.middleware.js'); 

router.post('/search', funcController.search);
router.post('/sign-up', validate.signUp, funcController.signUp);
router.post('/sign-in', validate.signIn, funcController.signIn);
router.post('/pagination', funcController.pagination);
router.post('/upload-avatar', upload.single('fileData'), funcController.uploadAvatar);
router.get('/sign-out', validate.clearCookies, funcController.clearCookies)

module.exports = router;