require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const path = require('path'); 

// Route Imports
const authRoutes = require('./routes/authRoutes');
const companyRoutes = require('./routes/companyRoutes');
const quizRoutes = require('./routes/quizRoutes');
const userRoutes = require('./routes/userRoutes'); 

const app = express();
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Mount Routes
app.use('/api/auth', authRoutes);
app.use('/api/companies', companyRoutes);
app.use('/api/quiz', quizRoutes);
app.use('/api/users', userRoutes); 

// Make the "uploads" folder static so the frontend can see the PDFs
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});