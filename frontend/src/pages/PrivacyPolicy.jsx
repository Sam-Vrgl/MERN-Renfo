import React from 'react';

const styles = {
  container: { maxWidth: '800px', margin: '0 auto', padding: '2rem', lineHeight: '1.6' },
  heading: { borderBottom: '2px solid #eee', paddingBottom: '0.5rem', marginBottom: '1rem' },
  section: { marginBottom: '1.5rem' },
   disclaimer: { fontStyle: 'italic', color: '#dc3545', border: '1px solid #dc3545', padding: '1rem', borderRadius: '5px' }
};

const PrivacyPolicy = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Politique de Confidentialité (Privacy Policy)</h1>

       <p style={styles.disclaimer}>
        <strong>Disclaimer:</strong> This is a template compliant with GDPR/RGPD. You must adapt it to your specific data collection practices and consult a legal professional.
      </p>

      <div style={styles.section}>
        <h2>1. Collecte des données personnelles</h2>
        <p>
          Nous collectons les données suivantes : nom, prénom, adresse email, numéro de téléphone, adresse postale. Ces données sont collectées lorsque vous créez un compte ou ajoutez un contact.
        </p>
      </div>

      <div style={styles.section}>
        <h2>2. Utilisation des données</h2>
        <p>
          Vos données sont utilisées pour la gestion de votre compte, la fourniture de nos services et la communication avec vous.
        </p>
      </div>

      <div style={styles.section}>
        <h2>3. Vos droits</h2>
        <p>
          Conformément au RGPD, vous disposez d'un droit d'accès, de rectification, de suppression et de portabilité de vos données. Vous pouvez exercer ces droits en nous contactant à [Your Contact Email].
        </p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;