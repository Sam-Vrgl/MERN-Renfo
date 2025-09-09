import React from 'react';

const styles = {
  container: { maxWidth: '800px', margin: '0 auto', padding: '2rem', lineHeight: '1.6' },
  heading: { borderBottom: '2px solid #eee', paddingBottom: '0.5rem', marginBottom: '1rem' },
  section: { marginBottom: '1.5rem' },
   disclaimer: { fontStyle: 'italic', color: '#dc3545', border: '1px solid #dc3545', padding: '1rem', borderRadius: '5px' }
};

const TermsOfUse = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Conditions Générales d'Utilisation (Terms of Use)</h1>

       <p style={styles.disclaimer}>
        <strong>Disclaimer:</strong> This is a template. You must adapt it to your service and consult a legal professional.
      </p>

      <div style={styles.section}>
        <h2>1. Objet</h2>
        <p>
          Les présentes CGU ont pour objet de définir les modalités de mise à disposition des services du site ContactManager et leurs conditions d'utilisation par l'Utilisateur.
        </p>
      </div>

      <div style={styles.section}>
        <h2>2. Accès au service</h2>
        <p>
          L'accès au service est réservé aux utilisateurs inscrits. L'éditeur se réserve le droit de suspendre ou de refuser l'accès au service, unilatéralement et sans préavis, à tout utilisateur ne respectant pas les présentes conditions.
        </p>
      </div>

      <div style={styles.section}>
        <h2>3. Responsabilité</h2>
        <p>
         L'éditeur ne pourra être tenu responsable des dommages directs et indirects causés au matériel de l’utilisateur, lors de l’accès au site ContactManager.
        </p>
      </div>
    </div>
  );
};

export default TermsOfUse;