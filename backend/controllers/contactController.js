// controllers/contactController.js
const Contact = require('../models/Contact');

// @desc    Create a new contact
// @route   POST /api/v1/contacts
exports.createContact = async (req, res) => {
  try {
    const { firstName, lastName, phone, email, address } = req.body;
    const newContact = await Contact.create({
      user: req.user.id,
      firstName,
      lastName,
      phone,
      email,
      address,
    });
    res.status(201).json(newContact);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Get all contacts for the logged-in user
// @route   GET /api/v1/contacts
exports.getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find({ user: req.user.id, isDeleted: false }).sort({ createdAt: -1 });
    res.status(200).json(contacts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update a contact
// @route   PATCH /api/v1/contacts/:id
exports.updateContact = async (req, res) => {
  try {
    // Find a contact that is not soft-deleted
    const contact = await Contact.findOne({ _id: req.params.id, isDeleted: false });

    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' });
    }

    if (contact.user.toString() !== req.user.id) {
      return res.status(403).json({ message: 'User not authorized to update this contact' });
    }

    const updatedContact = await Contact.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json(updatedContact);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Delete a contact (soft delete)
// @route   DELETE /api/v1/contacts/:id
exports.deleteContact = async (req, res) => {
  try {
    const contact = await Contact.findOne({ _id: req.params.id, isDeleted: false });

    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' });
    }

    if (contact.user.toString() !== req.user.id) {
      return res.status(403).json({ message: 'User not authorized to delete this contact' });
    }
    
    await Contact.findByIdAndUpdate(req.params.id, { isDeleted: true });
    
    res.status(200).json({ message: 'Contact deleted successfully.' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
