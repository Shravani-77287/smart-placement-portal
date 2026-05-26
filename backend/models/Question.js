const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  category: {
    type: String,
    required: true,
    enum: ['Quantitative', 'Logical Reasoning', 'Verbal'] // Keeps your data clean
  },
  questionText: {
    type: String,
    required: true
  },
  options: {
    type: [String], // An array of strings for the multiple-choice options
    required: true,
    validate: [v => v.length === 4, 'A question must have exactly 4 options']
  },
  correctAnswer: {
    type: String,
    required: true
  },
  explanation: {
    type: String, // Great for students reviewing their mistakes!
    required: false 
  }
});

module.exports = mongoose.model('Question', questionSchema);