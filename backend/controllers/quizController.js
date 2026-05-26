const Question = require('../models/Question');

// @desc    Get 5 random aptitude questions
// @route   GET /api/quiz/random
// @access  Private
exports.getRandomQuestions = async (req, res) => {
  try {
    // $sample randomly pulls 'size' number of documents from the collection
    const questions = await Question.aggregate([
      { $sample: { size: 5 } } 
    ]);

    if (!questions || questions.length === 0) {
      return res.status(404).json({ message: 'No questions found in database' });
    }

    res.status(200).json(questions);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};