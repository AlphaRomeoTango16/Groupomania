const express = require('express');
const router = express.Router();

const postCtrl = require('../controllers/post');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer_config');

/* Routes pour les fonctions posts */
router.post('/', auth, multer, postCtrl.createPost);
router.put('/:id', auth, multer, postCtrl.modifyPost);
router.delete('/:id', auth, postCtrl.deletePost);
router.get('/:id', postCtrl.getOnePost);
router.get('/', postCtrl.getAllPost);

module.exports = router;