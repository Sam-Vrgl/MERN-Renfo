import React from 'react';
import { Link } from 'react-router-dom';

// Basic styling for demonstration purposes
const styles = {
  container: { padding: '2rem', textAlign: 'center', fontFamily: 'Arial, sans-serif' },
  header: { fontSize: '2.5rem', marginBottom: '1rem' },
  paragraph: { fontSize: '1.2rem', color: '#555', marginBottom: '2rem' },
  ctaButton: {
    padding: '0.8rem 1.5rem',
    fontSize: '1rem',
    color: '#fff',
    backgroundColor: '#007bff',
    border: 'none',
    borderRadius: '5px',
    textDecoration: 'none',
    cursor: 'pointer',
  }
};

const HomePage = () => {
  return (
    <div style={styles.container}>
      <header style={styles.header}>Welcome to Contact Manager Pro</header>
      <p style={styles.paragraph}>
        All your contacts, securely organized in one place. Access them anytime, anywhere.
      </p>
      <Link to="/login" style={styles.ctaButton}>
        Get Started
      </Link>
    </div>
  );
};

export default HomePage;