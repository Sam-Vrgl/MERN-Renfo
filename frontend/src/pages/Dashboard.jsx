import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import apiService from '../api/apiService';
import ContactCard from '../components/ContactCard';
import ContactForm from '../components/ContactForm';

const styles = {
  container: { padding: '2rem', fontFamily: 'Arial, sans-serif' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', marginBottom: '1rem' },
  actionsContainer: { display: 'flex', gap: '1rem' },
  button: { padding: '0.7rem 1rem', border: 'none', borderRadius: '4px', cursor: 'pointer' },
  addButton: { backgroundColor: '#28a745', color: 'white' },
  logoutButton: { backgroundColor: '#dc3545', color: 'white' },
  contactList: { marginTop: '2rem' },
};

const Dashboard = () => {
  const { logoutAction } = useAuth();
  const [contacts, setContacts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // State for form modal and editing logic
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentContactToEdit, setCurrentContactToEdit] = useState(null);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const response = await apiService.get('/contacts');
      setContacts(response.data);
    } catch (err) {
      setError('Failed to fetch contacts.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  // --- CRUD Handlers ---

  const handleAddNewClick = () => {
    setCurrentContactToEdit(null);
    setIsModalOpen(true);
  };

  const handleEditClick = (contact) => {
    setCurrentContactToEdit(contact);
    setIsModalOpen(true);
  };

  const handleDeleteContact = async (id) => {
    if (window.confirm('Are you sure you want to delete this contact?')) {
      try {
        await apiService.delete(`/contacts/${id}`);
        setContacts(contacts.filter((contact) => contact._id !== id));
      } catch (err) {
        setError('Failed to delete contact.');
        console.error(err);
      }
    }
  };

  const handleFormSubmit = async (formData, contactId) => {
    try {
      if (contactId) {
        // Update logic
        const response = await apiService.patch(`/contacts/${contactId}`, formData);
        setContacts(contacts.map((c) => (c._id === contactId ? response.data : c)));
      } else {
        // Create logic
        const response = await apiService.post('/contacts', formData);
        setContacts([response.data, ...contacts]);
      }
      setIsModalOpen(false);
    } catch (err) {
      setError('Failed to save contact. Check required fields.');
      console.error(err.response?.data?.message || err);
    }
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1>Your Contacts Dashboard</h1>
        <div style={styles.actionsContainer}>
          <button onClick={handleAddNewClick} style={{...styles.button, ...styles.addButton}}>Add New Contact</button>
          <button onClick={logoutAction} style={{...styles.button, ...styles.logoutButton}}>Logout</button>
        </div>
      </header>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {/* Render Contact Form Modal */}
      {isModalOpen && (
        <ContactForm
          existingContact={currentContactToEdit}
          onSubmitSuccess={handleFormSubmit}
          onCancel={() => setIsModalOpen(false)}
        />
      )}

      {/* Render Contact List */}
      <div style={styles.contactList}>
        {isLoading && <p>Loading contacts...</p>}
        {!isLoading && contacts.length === 0 && <p>You haven't added any contacts yet.</p>}
        {contacts.map((contact) => (
          <ContactCard
            key={contact._id}
            contact={contact}
            onEdit={handleEditClick}
            onDelete={handleDeleteContact}
          />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;