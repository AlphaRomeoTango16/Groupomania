const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer_config');

router.post('/signup', multer, userCtrl.signup);
router.post('/login', userCtrl.login);
router.delete('/delete', auth, userCtrl.deleteUser);

module.exports = router;