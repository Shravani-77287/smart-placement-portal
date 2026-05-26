// backend/seeder.js
require('dotenv').config();
const fs = require('fs');
const mongoose = require('mongoose');
const Question = require('./models/Question');
const connectDB = require('./config/db');

// Connect to the database
connectDB();

// Read the JSON data file
const questions = JSON.parse(
  fs.readFileSync(`${__dirname}/questionsData.json`, 'utf-8')
);

// Import into database
const importData = async () => {
  try {
    // Optional: Clear out existing questions first to prevent endless duplicates during testing
    await Question.deleteMany();
    console.log('Old questions cleared...');

    // Insert the fresh dataset
    await Question.insertMany(questions);
    console.log('Data Successfully Imported!');
    
    process.exit();
  } catch (error) {
    console.error(`Error importing data: ${error.message}`);
    process.exit(1);
  }
};

// Run the script
importData();