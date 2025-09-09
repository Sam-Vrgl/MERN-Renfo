import React from 'react';

const styles = {
  container: { maxWidth: '800px', margin: '0 auto', padding: '2rem', lineHeight: '1.6' },
  heading: { borderBottom: '2px solid #eee', paddingBottom: '0.5rem', marginBottom: '1rem' },
  section: { marginBottom: '1.5rem' },
  disclaimer: { fontStyle: 'italic', color: '#dc3545', border: '1px solid #dc3545', padding: '1rem', borderRadius: '5px' }
};

const LegalNotice = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Mentions Légales (Legal Notice)</h1>

      <p style={styles.disclaimer}>
        <strong>Disclaimer:</strong> This is a template. You must replace the placeholder text with your actual information and consult a legal professional to ensure compliance.
      </p>

      <div style={styles.section}>
        <h2>1. Éditeur du Site (Site Publisher)</h2>
        <p><strong>Nom de l'entreprise / Nom Prénom :</strong> [Your Company Name or Full Name]</p>
        <p><strong>Adresse :</strong> [Your Address]</p>
        <p><strong>Téléphone :</strong> [Your Phone Number]</p>
        <p><strong>Email :</strong> [Your Email Address]</p>
        <p><strong>Forme juridique :</strong> [e.g., SAS, SARL, Entrepreneur Individuel]</p>
        <p><strong>Capital social :</strong> [e.g., €1,000.00]</p>
        <p><strong>RCS :</strong> [Your RCS Number, e.g., Paris B 123 456 789]</p>
        <p><strong>Numéro de TVA intracommunautaire :</strong> [Your VAT Number]</p>
        <p><strong>Directeur de la publication :</strong> [Name of the person responsible for publication]</p>
      </div>

      <div style={styles.section}>
        <h2>2. Hébergeur du Site (Hosting Provider)</h2>
        <p><strong>Nom de l'hébergeur :</strong> [Name of your hosting company, e.g., Vercel, Netlify, AWS]</p>
        <p><strong>Adresse :</strong> [Address of the hosting company]</p>
        <p><strong>Téléphone :</strong> [Phone number of the hosting company]</p>
      </div>

      <div style={styles.section}>
        <h2>3. Propriété Intellectuelle (Intellectual Property)</h2>
        <p>
          L'ensemble de ce site relève de la législation française et internationale sur le droit d'auteur et la propriété intellectuelle. Tous les droits de reproduction sont réservés, y compris pour les documents téléchargeables et les représentations iconographiques et photographiques.
        </p>
      </div>
    </div>
  );
};

export default LegalNotice;