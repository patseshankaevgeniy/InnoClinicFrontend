import React, { useState } from 'react';
import { useAuth } from '../../hoocks/use-auth';
import { authService } from '../../api/auth-service'; // Импорт сервиса
import styles from './login-form.module.scss';

export const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); 
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const data = await authService.login(email, password);
      
      login(data); 
      
      console.log('Data successfully sent to context');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Login error. Please check your details.');
    }
  };

  return (
    <div className={styles.loginCard}>
      <h1 className={styles.title}>InnoClinic</h1>
      
      {error && <p style={{ color: 'red', textAlign: 'center', fontSize: '14px' }}>{error}</p>}
      
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.inputGroup}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            placeholder="doctor@innoclinic.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" className={styles.submitBtn}>
          Sign in
        </button>
      </form>
    </div>
  );
};
