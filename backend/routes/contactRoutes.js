// routes/contactRoutes.js
const express = require('express');
const router = express.Router();
const { createContact, getContacts, updateContact, deleteContact } = require('../controllers/contactController');
const { protect } = require('../middleware/authMiddleware');

router.use(protect);

router.get('/', getContacts);
router.post('/', createContact);
router.patch('/:id', updateContact);
router.delete('/:id', deleteContact);

module.exports = router;