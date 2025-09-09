import React from 'react';

const styles = {
  card: { padding: '1rem', border: '1px solid var(--color-border)', borderRadius: '8px', marginBottom: '1rem', backgroundColor: 'var(--color-surface)', boxShadow: 'var(--shadow-sm)' },
  name: { fontSize: '1.2rem', fontWeight: 'bold', margin: '0 0 0.5rem 0', color: 'var(--color-text)' },
  details: { margin: '0.25rem 0', color: 'var(--color-text)' },
  address: { fontStyle: 'italic', color: 'var(--color-text-secondary)', marginTop: '0.5rem' },
  buttonContainer: { display: 'flex', gap: '0.5rem', marginTop: '1rem' },
  button: { padding: '0.4rem 0.8rem', border: 'none', borderRadius: '4px', cursor: 'pointer', color: 'var(--color-text)' },
  editButton: { backgroundColor: 'var(--color-warning)' },
  deleteButton: { backgroundColor: 'var(--color-error)', color: '#FFFFFF' },
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