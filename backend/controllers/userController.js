const User = require('../models/User');

exports.uploadResume = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'Please upload a file' });
    }

    const resumePath = `/uploads/${req.file.filename}`;

    const user = await User.findByIdAndUpdate(
      req.user._id,
      { resume: resumePath },
      { new: true } 
    ).select('-password');

    res.status(200).json({
      message: 'Resume uploaded successfully',
      resume: user.resume
    });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};