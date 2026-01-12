import React from 'react';
import { LoginForm } from '../../modules/auth/components/login-form/login-form';
import styles from './LoginPage.module.css';

const LoginPage: React.FC = () => {
  return (
    <div className={styles.wrapper}>
      <section className={styles.card}>
        <h1 className={styles.title}>Вход в систему</h1>
        <LoginForm />
      </section>
    </div>
  );
};

export default LoginPage;