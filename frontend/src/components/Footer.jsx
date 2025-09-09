import React from 'react';
 import { Link } from 'react-router-dom';

 const styles = {
   footer: {
     backgroundColor: 'var(--color-surface)',
     padding: '2rem 1rem',
     textAlign: 'center',
     borderTop: '1px solid var(--color-border)',
     color: 'var(--color-text-secondary)',
     fontSize: '0.9rem',
     marginTop: 'auto'
   },
   legalLinks: {
     display: 'flex',
     justifyContent: 'center',
     gap: '1rem',
     listStyle: 'none',
     padding: '0',
     margin: '0 0 1rem 0'
   },
   link: {
     color: 'var(--color-text-secondary)',
     textDecoration: 'none'
   }
 };

 const Footer = () => {
   return (
     <footer style={styles.footer}>
       <ul style={styles.legalLinks}>
         <li><Link to="/legal" style={styles.link}>Mentions Légales</Link></li>
         <li><Link to="/privacy" style={styles.link}>Politique de Confidentialité</Link></li>
         <li><Link to="/terms" style={styles.link}>Conditions d'Utilisation</Link></li>
       </ul>
       <p>&copy; {new Date().getFullYear()} ContactManager. All Rights Reserved.</p>
     </footer>
   );
 };

 export default Footer;