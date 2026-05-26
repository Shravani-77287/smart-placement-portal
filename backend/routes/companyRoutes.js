const express = require('express');
const router = express.Router();
const { addCompany, getCompanies, updateCompanyStatus, deleteCompany,getAllCompaniesAdmin } = require('../controllers/companyController');
const { protect ,admin} = require('../middlewares/authMiddleware');

router.get('/all', protect, admin, getAllCompaniesAdmin);
router.post('/', protect, addCompany);
router.get('/', protect, getCompanies);
router.put('/:id/status', protect, updateCompanyStatus);
router.delete('/:id', protect, deleteCompany);

module.exports = router;