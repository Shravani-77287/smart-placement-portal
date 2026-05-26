// backend/routes/authRoutes.js
const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getUserProfile } = require('../controllers/authController');
const { protect } = require('../middlewares/authMiddleware'); // Import the middleware

router.post('/register', registerUser);
router.post('/login', loginUser);

// Add 'protect' as the second argument to secure this route
router.get('/me', protect, getUserProfile); 

module.exports = router;