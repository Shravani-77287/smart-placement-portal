// backend/middlewares/authMiddleware.js
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
  let token;

  // Check if the authorization header exists and starts with 'Bearer'
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Extract the token (Format: "Bearer your_token_here")
      token = req.headers.authorization.split(' ')[1];

      // Verify the token using your secret key
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Find the user by the ID embedded in the token, but exclude the password
      req.user = await User.findById(decoded.id).select('-password');

      // Move on to the next function (the actual route controller)
      next();
    } catch (error) {
      console.error(error);
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }

  if (!token) {
    res.status(401).json({ message: 'Not authorized, no token provided' });
  }
};

const admin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(401).json({ message: 'Not authorized as an admin' });
  }
};

module.exports = { protect,admin };