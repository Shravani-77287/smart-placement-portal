const express = require('express');
const router = express.Router();
const { uploadResume } = require('../controllers/userController');
const { protect } = require('../middlewares/authMiddleware');
const upload = require('../middlewares/uploadMiddleware');

router.post('/resume', protect, upload.single('resume'), uploadResume);

module.exports = router;