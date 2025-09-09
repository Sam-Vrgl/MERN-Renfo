import React from 'react';
import { Link } from 'react-router-dom';

const styles = {
  container: {
    padding: '0 2rem',
    textAlign: 'center'
  },
  hero: {
    padding: '4rem 0',
    backgroundColor: 'var(--color-surface)',
    borderRadius: '8px',
    marginBottom: '2rem'
  },
  header: {
    fontSize: '3rem',
    fontWeight: 'bold',
    marginBottom: '1rem',
    color: 'var(--color-text)'
  },
  paragraph: {
    fontSize: '1.2rem',
    color: 'var(--color-text-secondary)',
    marginBottom: '2rem'
  },
  ctaButton: {
    padding: '1rem 2rem',
    fontSize: '1.2rem',
    color: '#FFFFFF',
    backgroundColor: 'var(--color-primary)',
    border: 'none',
    borderRadius: '5px',
    textDecoration: 'none',
    cursor: 'pointer'
  },
  features: {
    display: 'flex',
    justifyContent: 'space-around',
    padding: '2rem 0',
    flexWrap: 'wrap'
  },
  featureCard: {
    flex: '1 1 300px',
    padding: '2rem',
    margin: '1rem',
    backgroundColor: 'var(--color-background)',
    borderRadius: '8px',
    boxShadow: 'var(--shadow-md)'
  },
  featureTitle: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    marginBottom: '1rem',
    color: 'var(--color-text)'
  },
  testimonials: {
    padding: '4rem 0',
    backgroundColor: 'var(--color-surface)',
    borderRadius: '8px',
    margin: '2rem 0'
  },
  testimonialCard: {
    maxWidth: '600px',
    margin: '0 auto',
    fontStyle: 'italic',
    color: 'var(--color-text-secondary)'
  },
  testimonialAuthor: {
    marginTop: '1rem',
    fontWeight: 'bold'
  }
};

const HomePage = () => {
  return (
    <div style={styles.container}>
      <div style={styles.hero}>
        <header style={styles.header}>Your Contacts, Reimagined</header>
        <p style={styles.paragraph}>
          The simplest way to manage your professional and personal network.
        </p>
        <Link to="/login" style={styles.ctaButton}>
          Get Started for Free
        </Link>
      </div>

      <div style={styles.features}>
        <div style={styles.featureCard}>
          <h3 style={styles.featureTitle}>Secure & Private</h3>
          <p>Your data is yours. We'll never share it with third parties.</p>
        </div>
        <div style={styles.featureCard}>
          <h3 style={styles.featureTitle}>Always Accessible</h3>
          <p>Access your contacts from anywhere, on any device.</p>
        </div>
        <div style={styles.featureCard}>
          <h3 style={styles.featureTitle}>Easy to Use</h3>
          <p>A clean, intuitive interface that you'll love.</p>
        </div>
      </div>

      <div style={styles.testimonials}>
        <h2>What Our Users Say</h2>
        <div style={styles.testimonialCard}>
          <p>"ContactManager has revolutionized how I manage my client list. It's a game-changer!"</p>
          <p style={styles.testimonialAuthor}>- Alex, Freelance Designer</p>
        </div>
      </div>

      <div style={styles.hero}>
        <header style={styles.header}>Ready to Get Organized?</header>
        <Link to="/login" style={styles.ctaButton}>
          Sign Up Now
        </Link>
      </div>
    </div>
  );
};

export default HomePage;