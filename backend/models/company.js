const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User' // Links this company application to a specific student
  },
  companyName: {
    type: String,
    required: [true, 'Please add a company name']
  },
  role: {
    type: String,
    required: [true, 'Please add the job role']
  },
  status: {
    type: String,
    enum: ['Applied', 'Interviewing', 'Offered', 'Rejected'],
    default: 'Applied'
  }
}, { timestamps: true });

module.exports = mongoose.model('Company', companySchema);