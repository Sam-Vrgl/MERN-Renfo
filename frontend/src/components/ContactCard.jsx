import React from 'react';

const styles = {
  card: { padding: '1rem', border: '1px solid #eee', borderRadius: '8px', marginBottom: '1rem', backgroundColor: '#f9f9f9', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' },
  name: { fontSize: '1.2rem', fontWeight: 'bold', margin: '0 0 0.5rem 0' },
  details: { margin: '0.25rem 0', color: '#333' },
  address: { fontStyle: 'italic', color: '#555', marginTop: '0.5rem' },
  buttonContainer: { display: 'flex', gap: '0.5rem', marginTop: '1rem' },
  button: { padding: '0.4rem 0.8rem', border: 'none', borderRadius: '4px', cursor: 'pointer' },
  editButton: { backgroundColor: '#ffc107' },
  deleteButton: { backgroundColor: '#dc3545', color: 'white' },
};

const ContactCard = ({ contact, onEdit, onDelete }) => {
  const { firstName, lastName, phone, email, address } = contact;

  return (
    <div style={styles.card}>
      <h4 style={styles.name}>{firstName} {lastName}</h4>
      <p style={styles.details}>Phone: {phone}</p>
      {email && <p style={styles.details}>Email: {email}</p>}
      {address && (address.street || address.city) && (
        <p style={styles.address}>
          {address.street}, {address.city}, {address.state} {address.zipCode}
        </p>
      )}
      <div style={styles.buttonContainer}>
        <button onClick={() => onEdit(contact)} style={{...styles.button, ...styles.editButton}}>Edit</button>
        <button onClick={() => onDelete(contact._id)} style={{...styles.button, ...styles.deleteButton}}>Delete</button>
      </div>
    </div>
  );
};

export default ContactCard;