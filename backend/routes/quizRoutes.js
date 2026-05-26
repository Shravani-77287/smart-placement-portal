const express = require('express');
const router = express.Router();
const { getRandomQuestions } = require('../controllers/quizController');
const { protect } = require('../middlewares/authMiddleware');

router.get('/random', protect, getRandomQuestions);

module.exports = router;