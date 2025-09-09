import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext'; // Import useTheme

const styles = {
  header: {
    backgroundColor: 'var(--color-surface)',
    padding: '1rem 2rem',
    borderBottom: '1px solid var(--color-border)',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    boxShadow: 'var(--shadow-sm)',
    position: 'sticky', // Make header sticky
    top: 0,
    zIndex: 10
  },
  logo: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: 'var(--color-text)',
    textDecoration: 'none'
  },
  nav: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem'
  },
  navLink: {
    textDecoration: 'none',
    color: 'var(--color-text-secondary)',
    fontWeight: '500',
    padding: '0.5rem 1rem',
    borderRadius: '5px',
  }
};

const Header = () => {
  const { token } = useAuth();
  const { theme, toggleTheme } = useTheme(); // Use theme context

  return (
    <header style={styles.header}>
      <Link to="/" style={styles.logo}>ContactManager</Link>
      <nav style={styles.nav}>
         <button onClick={toggleTheme} style={{...styles.navLink, border: 'none', background: 'none', cursor: 'pointer', fontSize: '1.2rem'}}>
           {theme === 'light' ? '🌙' : '☀️'}
        </button>
        {token ? (
          <>
            <Link to="/dashboard" style={styles.navLink}>Dashboard</Link>
          </>
        ) : (
          <Link to="/login" style={styles.navLink}>Login</Link>
        )}
      </nav>
    </header>
  );
};

export default Header;