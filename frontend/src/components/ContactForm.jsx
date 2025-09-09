import React, { useState, useEffect } from 'react';
import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input';
import 'react-phone-number-input/style.css';

const styles = {
  modalOverlay: { position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 },
  modalContent: { background: 'var(--color-background)', padding: '2rem', borderRadius: '8px', width: '90%', maxWidth: '500px', color: 'var(--color-text)' },
  form: { display: 'flex', flexDirection: 'column', gap: '1rem' },
  input: { padding: '0.5rem', fontSize: '1rem', border: '1px solid var(--color-border)', borderRadius: '4px', backgroundColor: 'var(--color-background)', color: 'var(--color-text)' },
  phoneInputWrapper: { border: '1px solid var(--color-border)', borderRadius: '4px', padding: '0.25rem 0.5rem' },
  phoneInputError: { borderColor: 'var(--color-error)' },
  errorText: { color: 'var(--color-error)', fontSize: '0.8rem', marginTop: '-0.5rem' },
  buttonContainer: { display: 'flex', gap: '1rem', justifyContent: 'flex-end', marginTop: '1rem' },
  button: { padding: '0.5rem 1rem', border: 'none', borderRadius: '4px', cursor: 'pointer' },
  submitButton: { backgroundColor: 'var(--color-primary)', color: '#FFFFFF' },
  cancelButton: { backgroundColor: 'var(--color-surface)', color: 'var(--color-text)' },
};

const ContactForm = ({ existingContact, onSubmitSuccess, onCancel }) => {
  const [formData, setFormData] = useState({
    firstName: '', lastName: '', email: '',
    address: { street: '', city: '', state: '', zipCode: '', country: '' },
  });
  const [phoneNumber, setPhoneNumber] = useState('');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (existingContact) {
      setFormData({
        firstName: existingContact.firstName || '',
        lastName: existingContact.lastName || '',
        email: existingContact.email || '',
        address: existingContact.address || { street: '', city: '', state: '', zipCode: '', country: '' },
      });
      setPhoneNumber(existingContact.phone || '');
    }
  }, [existingContact]);

  const validateForm = () => {
    const newErrors = {};
    if (!phoneNumber) newErrors.phone = 'Phone number is required.';
    else if (!isValidPhoneNumber(phoneNumber)) newErrors.phone = 'The phone number provided is not valid.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, address: { ...prev.address, [name]: value } }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    onSubmitSuccess({ ...formData, phone: phoneNumber }, existingContact?._id || null);
  };

  return (
    <div style={styles.modalOverlay}>
      <div style={styles.modalContent}>
        <form onSubmit={handleSubmit} style={styles.form}>
          <h3>{existingContact ? 'Edit Contact' : 'Add New Contact'}</h3>
          <input type="text" name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleChange} required style={styles.input} />
          <input type="text" name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleChange} required style={styles.input} />
          <div>
            <style>{`
              .PhoneInputInput { border: none !important; outline: none !important; background-color: transparent; color: var(--color-text); }
              .PhoneInputCountrySelect { background-color: transparent !important; }
              .PhoneInputCountryIcon { box-shadow: none !important; }
            `}</style>
            <div style={{ ...styles.phoneInputWrapper, ...(errors.phone && styles.phoneInputError) }}>
              <PhoneInput placeholder="Enter phone number" value={phoneNumber} onChange={setPhoneNumber} international defaultCountry="FR" limitMaxLength />
            </div>
            {errors.phone && <small style={styles.errorText}>{errors.phone}</small>}
          </div>
          <input type="email" name="email" placeholder="Email (Optional)" value={formData.email} onChange={handleChange} style={styles.input} />
          <input type="text" name="street" placeholder="Street Address" value={formData.address.street} onChange={handleAddressChange} style={styles.input} />
          <input type="text" name="city" placeholder="City" value={formData.address.city} onChange={handleAddressChange} style={styles.input} />
          <input type="text" name="state" placeholder="State" value={formData.address.state} onChange={handleAddressChange} style={styles.input} />
          <input type="text" name="zipCode" placeholder="Zip Code" value={formData.address.zipCode} onChange={handleAddressChange} style={styles.input} />
          <div style={styles.buttonContainer}>
            <button type="button" onClick={onCancel} style={{ ...styles.button, ...styles.cancelButton }}>Cancel</button>
            <button type="submit" style={{ ...styles.button, ...styles.submitButton }}>Save Contact</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;