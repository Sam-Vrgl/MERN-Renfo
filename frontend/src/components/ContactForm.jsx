// file: src/components/ContactForm.jsx

import React, { useState, useEffect } from 'react';

// --- Country Code Data ---
// A sample list of country codes. In a large application, this would come from a separate JSON file or library.
const countryCodes = [
  { code: '+1', name: 'USA/Canada' },
  { code: '+33', name: 'France' },
  { code: '+44', name: 'United Kingdom' },
  { code: '+49', name: 'Germany' },
  { code: '+34', name: 'Spain' },
  { code: '+39', name: 'Italy' },
  { code: '+61', name: 'Australia' },
  { code: '+81', name: 'Japan' },
  // Add more countries as needed
];

// --- Helper Function ---
/**
 * Attempts to parse a full E.164 phone number into country code and national number.
 * Example: Input "+33612345678" -> Output { code: "+33", number: "612345678" }
 */
const parsePhoneNumber = (fullNumber) => {
  if (!fullNumber || !fullNumber.startsWith('+')) {
    return { code: countryCodes[0].code, number: fullNumber || '' }; // Default return if format is unexpected
  }

  // Find the longest matching prefix from our list. Iterate from longest code to shortest.
  let bestMatch = null;
  for (const country of countryCodes) {
    if (fullNumber.startsWith(country.code)) {
      if (!bestMatch || country.code.length > bestMatch.code.length) {
        bestMatch = country;
      }
    }
  }

  if (bestMatch) {
    return {
      code: bestMatch.code,
      number: fullNumber.substring(bestMatch.code.length),
    };
  }

  // Fallback if no specific code matches (e.g., code not in our short list)
  const defaultCode = countryCodes[0].code;
  return { code: defaultCode, number: fullNumber };
};

// --- Component ---

const initialFormData = {
  firstName: '',
  lastName: '',
  email: '',
  address: { street: '', city: '', state: '', zipCode: '', country: '' },
};

const styles = {
  modalOverlay: { position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 },
  modalContent: { background: 'white', padding: '2rem', borderRadius: '8px', width: '90%', maxWidth: '500px' },
  form: { display: 'flex', flexDirection: 'column', gap: '1rem' },
  input: { padding: '0.5rem', fontSize: '1rem', border: '1px solid #ddd', borderRadius: '4px' },
  phoneInputContainer: { display: 'flex', gap: '0.5rem' },
  countryCodeSelect: { flexBasis: '30%', padding: '0.5rem', border: '1px solid #ddd', borderRadius: '4px', backgroundColor: '#f9f9f9' },
  nationalNumberInput: { flexGrow: 1 },
  inputError: { border: '1px solid red' },
  errorText: { color: 'red', fontSize: '0.8rem', marginTop: '-0.5rem' },
  buttonContainer: { display: 'flex', gap: '1rem', justifyContent: 'flex-end', marginTop: '1rem' },
  button: { padding: '0.5rem 1rem', border: 'none', borderRadius: '4px', cursor: 'pointer' },
  submitButton: { backgroundColor: '#007bff', color: 'white' },
  cancelButton: { backgroundColor: '#f0f0f0', color: '#333' },
};

const ContactForm = ({ existingContact, onSubmitSuccess, onCancel }) => {
  const [formData, setFormData] = useState(initialFormData);
  const [phoneState, setPhoneState] = useState({ code: countryCodes[0].code, number: '' });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (existingContact) {
      const { code, number } = parsePhoneNumber(existingContact.phone);
      setFormData({
        firstName: existingContact.firstName || '',
        lastName: existingContact.lastName || '',
        email: existingContact.email || '',
        address: existingContact.address || initialFormData.address,
      });
      setPhoneState({ code, number });
    } else {
      setFormData(initialFormData);
      setPhoneState({ code: countryCodes[0].code, number: '' });
    }
    setErrors({});
  }, [existingContact]);

  const validateNationalNumber = (number) => {
    // Basic validation: check for minimum length. 
    // A more complex solution would use a library like libphonenumber-js for country-specific length validation.
    const cleanedNumber = number.replace(/[\s-]/g, '');
    if (cleanedNumber.length < 5) {
      return 'Number seems too short.';
    }
    if (!/^\d+$/.test(cleanedNumber)) {
        return 'Phone number can only contain digits.'
    }
    return '';
  };

  const handleValidationBlur = () => {
    if (phoneState.number) {
      const errorMsg = validateNationalNumber(phoneState.number);
      setErrors((prev) => ({ ...prev, nationalNumber: errorMsg }));
    } else {
      setErrors((prev) => ({ ...prev, nationalNumber: 'Phone number is required.' }));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  
  const handlePhoneChange = (e) => {
    const { name, value } = e.target;
    setPhoneState(prev => ({...prev, [name]: value}));
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
    const errorMsg = validateNationalNumber(phoneState.number);
    if (errorMsg) {
      setErrors({ nationalNumber: errorMsg });
      return;
    }

    // Combine code and number into a single string for submission
    const finalPhoneNumber = `${phoneState.code}${phoneState.number.replace(/[\s-]/g, '')}`;
    const submissionData = { ...formData, phone: finalPhoneNumber };

    onSubmitSuccess(submissionData, existingContact ? existingContact._id : null);
  };

  return (
    <div style={styles.modalOverlay}>
      <div style={styles.modalContent}>
        <form onSubmit={handleSubmit} style={styles.form}>
          <h3>{existingContact ? 'Edit Contact' : 'Add New Contact'}</h3>
          <input type="text" name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleChange} required style={styles.input} />
          <input type="text" name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleChange} required style={styles.input} />

          {/* --- Phone Input Group --- */}
          <div>
            <div style={styles.phoneInputContainer}>
              <select
                name="code"
                value={phoneState.code}
                onChange={handlePhoneChange}
                style={styles.countryCodeSelect}
              >
                {countryCodes.map((country) => (
                  <option key={country.name} value={country.code}>
                    {country.name} ({country.code})
                  </option>
                ))}
              </select>
              <input
                type="tel"
                name="number"
                placeholder="National Number"
                value={phoneState.number}
                onChange={handlePhoneChange}
                onBlur={handleValidationBlur}
                required
                style={{ ...styles.input, ...styles.nationalNumberInput, ...(errors.nationalNumber && styles.inputError) }}
              />
            </div>
            {errors.nationalNumber && <small style={styles.errorText}>{errors.nationalNumber}</small>}
          </div>

          <input type="email" name="email" placeholder="Email (Optional)" value={formData.email} onChange={handleChange} style={styles.input} />
          <input type="text" name="street" placeholder="Street Address" value={formData.address.street} onChange={handleAddressChange} style={styles.input} />
          <input type="text" name="city" placeholder="City" value={formData.address.city} onChange={handleAddressChange} style={styles.input} />
          <input type="text" name="state" placeholder="State" value={formData.address.state} onChange={handleAddressChange} style={styles.input} />
          <input type="text" name="zipCode" placeholder="Zip Code" value={formData.address.zipCode} onChange={handleAddressChange} style={styles.input} />

          <div style={styles.buttonContainer}>
            <button type="button" onClick={onCancel} style={{...styles.button, ...styles.cancelButton}}>Cancel</button>
            <button type="submit" style={{...styles.button, ...styles.submitButton}}>Save Contact</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;