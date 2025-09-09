import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import apiService from '../api/apiService';

const styles = {
  container: { display: 'flex', flexDirection: 'column', width: '300px', margin: '5rem auto', padding: '2rem', border: '1px solid var(--color-border)', borderRadius: '8px', boxShadow: 'var(--shadow-md)', backgroundColor: 'var(--color-surface)' },
  form: { display: 'flex', flexDirection: 'column', gap: '1rem' },
  input: { padding: '0.5rem', fontSize: '1rem', border: '1px solid var(--color-border)', borderRadius: '4px', backgroundColor: 'var(--color-background)', color: 'var(--color-text)' },
  button: { padding: '0.7rem', fontSize: '1rem', backgroundColor: 'var(--color-primary)', color: '#FFFFFF', border: 'none', borderRadius: '4px', cursor: 'pointer' },
  toggleButton: { background: 'none', border: 'none', color: 'var(--color-primary)', cursor: 'pointer', marginTop: '1rem', textAlign: 'center' },
  error: { color: 'var(--color-error)', fontSize: '0.9rem', textAlign: 'center' }
};

const LoginPage = () => {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const { loginAction } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const credentials = { email, password };
    const endpoint = isLoginMode ? '/auth/login' : '/auth/register';

    try {
      const response = await apiService.post(endpoint, credentials);

      if (isLoginMode) {
        loginAction(response.data);
        navigate('/dashboard');
      } else {
        setIsLoginMode(true);
        alert('Registration successful! Please log in.');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'An unexpected error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <h2>{isLoginMode ? 'Login' : 'Register'}</h2>
        {error && <p style={styles.error}>{error}</p>}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={styles.input}
        />
        <input
          type="password"
          placeholder="Password (min 10 characters)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength={10}
          style={styles.input}
        />
        <button type="submit" disabled={isLoading} style={styles.button}>
          {isLoading ? 'Loading...' : (isLoginMode ? 'Login' : 'Create Account')}
        </button>
      </form>
      <button onClick={() => setIsLoginMode(!isLoginMode)} style={styles.toggleButton}>
        {isLoginMode ? 'Need an account? Register here.' : 'Already have an account? Login here.'}
      </button>
    </div>
  );
};

export default LoginPage;