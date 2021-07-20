const express = require('express');
const router = express.Router();

const commentCtrl = require('../controllers/comment');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer_config');

/* Routes pour les fonctions commentaires */
router.post('/:id', auth, multer, commentCtrl.createComment);
router.put('/:id', auth, multer, commentCtrl.modifyComment);
router.delete('/:id', auth, commentCtrl.deleteComment);

module.exports = router;