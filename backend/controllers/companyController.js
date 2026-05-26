const Company = require('../models/Company');

// @desc    Get all companies applied to by the logged-in user
// @route   GET /api/companies
exports.getCompanies = async (req, res) => {
  try {
    // req.user comes from our authMiddleware
    const companies = await Company.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.status(200).json(companies);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Add a new company application
// @route   POST /api/companies
exports.addCompany = async (req, res) => {
  try {
    const { companyName, role, status } = req.body;

    const company = await Company.create({
      user: req.user._id, // Assign the logged-in user's ID
      companyName,
      role,
      status: status || 'Applied'
    });

    res.status(201).json(company);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Update company status
// @route   PUT /api/companies/:id/status
// @access  Private
exports.updateCompanyStatus = async (req, res) => {
  try {
    const company = await Company.findById(req.params.id);

    if (!company) {
      return res.status(404).json({ message: 'Company application not found' });
    }

    // Make sure the logged in user actually owns this company record
    if (company.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'User not authorized' });
    }

    // Update the status and save
    company.status = req.body.status;
    const updatedCompany = await company.save();

    res.status(200).json(updatedCompany);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};// @desc    Delete a company application
// @route   DELETE /api/companies/:id
// @access  Private
exports.deleteCompany = async (req, res) => {
  try {
    const company = await Company.findById(req.params.id);

    if (!company) {
      return res.status(404).json({ message: 'Company application not found' });
    }

    // Security check: Make sure the logged-in user owns this record
    if (company.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'User not authorized' });
    }

    // Delete it from MongoDB
    await company.deleteOne();

    // Send back the ID so the frontend knows which one was removed
    res.status(200).json({ id: req.params.id });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Get ALL companies (Admin only)
// @route   GET /api/companies/all
// @access  Private/Admin
exports.getAllCompaniesAdmin = async (req, res) => {
  try {
    // The .populate() method grabs the name and email from the linked User model!
    const companies = await Company.find({}).populate('user', 'name email resume');
    res.status(200).json(companies);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};