// file: src/components/ContactForm.jsx

import React, { useState, useEffect } from 'react';
// --- Step 1: Import the new library components ---
import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input';
import 'react-phone-number-input/style.css'; // Import default styles

// --- Component ---

const initialFormData = {
  firstName: '',
  lastName: '',
  email: '',
  address: { street: '', city: '', state: '', zipCode: '', country: '' },
};

const styles = {
  modalOverlay: { position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 },
  modalContent: { background: 'white', padding: '2rem', borderRadius: '8px', width: '90%', maxWidth: '500px', color: '#333' }, // ensure text color is visible on white bg
  form: { display: 'flex', flexDirection: 'column', gap: '1rem' },
  input: { padding: '0.5rem', fontSize: '1rem', border: '1px solid #ddd', borderRadius: '4px' },
  // --- Style for react-phone-number-input ---
  phoneInputWrapper: { border: '1px solid #ddd', borderRadius: '4px', padding: '0.25rem 0.5rem' },
  phoneInputError: { border: '1px solid red' },
  errorText: { color: 'red', fontSize: '0.8rem', marginTop: '-0.5rem' },
  buttonContainer: { display: 'flex', gap: '1rem', justifyContent: 'flex-end', marginTop: '1rem' },
  button: { padding: '0.5rem 1rem', border: 'none', borderRadius: '4px', cursor: 'pointer' },
  submitButton: { backgroundColor: '#007bff', color: 'white' },
  cancelButton: { backgroundColor: '#f0f0f0', color: '#333' },
};

const ContactForm = ({ existingContact, onSubmitSuccess, onCancel }) => {
  const [formData, setFormData] = useState(initialFormData);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (existingContact) {
      setFormData({
        firstName: existingContact.firstName || '',
        lastName: existingContact.lastName || '',
        email: existingContact.email || '',
        address: existingContact.address || initialFormData.address,
      });
      setPhoneNumber(existingContact.phone || '');
    } else {
      setFormData(initialFormData);
      setPhoneNumber('');
    }
    setErrors({});
  }, [existingContact]);

  const validateForm = () => {
    const newErrors = {};
    if (!phoneNumber) {
      newErrors.phone = 'Phone number is required.';
    } else if (!isValidPhoneNumber(phoneNumber)) {
      newErrors.phone = 'The phone number provided is not valid for the selected country.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      address: { ...prev.address, [name]: value },
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }

    const submissionData = { ...formData, phone: phoneNumber };
    onSubmitSuccess(submissionData, existingContact ? existingContact._id : null);
  };

  return (
    <div style={styles.modalOverlay}>
      <div style={styles.modalContent}>
        <form onSubmit={handleSubmit} style={styles.form}>
          <h3>{existingContact ? 'Edit Contact' : 'Add New Contact'}</h3>
          <input type="text" name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleChange} required style={styles.input} />
          <input type="text" name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleChange} required style={styles.input} />

          <div>
            <div style={{ ...styles.phoneInputWrapper, ...(errors.phone && styles.phoneInputError) }}>
              <PhoneInput
                placeholder="Enter phone number"
                value={phoneNumber}
                onChange={setPhoneNumber}
                international={true}
                defaultCountry="FR"
                limitMaxLength={true}
              />
            </div>

            {errors.phone && <small style={styles.errorText}>{errors.phone}</small>}
          </div>

          <input type="email" name="email" placeholder="Email (Optional)" value={formData.email} onChange={handleChange} style={styles.input} />
          <input type="text" name="street" placeholder="Street Address" value={formData.address.street} onChange={handleAddressChange} style={styles.input} />
          <input type="text" name="city" placeholder="City" value={formData.address.city} onChange={handleAddressChange} style={styles.input} />
          <input type="text" name="state" placeholder="State" value={formData.address.state} onChange={handleAddressChange} style={styles.input} />
          <input type="text" name="zipCode" placeholder="Zip Code" value={formData.address.zipCode} onChange={handleAddressChange} style={styles.input} />

          <div style={styles.buttonContainer}>
            <button type="button" onClick={onCancel} style={{ ...styles.button, ...styles.cancelButton }}>Cancel</button>g
            <button type="submit" style={{ ...styles.button, ...styles.submitButton }}>Save Contact</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;