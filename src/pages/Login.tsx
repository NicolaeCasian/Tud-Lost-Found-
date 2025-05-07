// src/pages/Login.tsx

import React from 'react';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButton,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonText,
  isPlatform,                      // ← added
} from '@ionic/react';
import { useMsal } from '@azure/msal-react';
import { PopupRequest, RedirectRequest } from '@azure/msal-browser';  // ← added
import { loginRequest } from './authConfig';
import './css/login.css';

const Login: React.FC = () => {
  const { instance } = useMsal();

  const login = async () => {
    try {
      console.log('Triggering login...');
      if (isPlatform('capacitor')) {
        // On device/emulator: use redirect flow
        await instance.loginRedirect(loginRequest as RedirectRequest);
      } else {
        // In browser: use popup flow
        await instance.loginPopup(loginRequest as PopupRequest);
      }

      // After login completes, get the active account
      const accounts = instance.getAllAccounts();
      if (accounts.length === 0) {
        console.warn('No account found after login.');
        return;
      }
      const account = accounts[0];
      console.log(account);
      instance.setActiveAccount(account);

      const userEmail = account.username;
      console.log('User email:', userEmail);

      // Redirect based on user email
      if (userEmail === 'crudtud@gmail.com') {
        console.log('Admin account detected. Redirecting to /admin app...');
        window.location.href = '/admin';
      } else {
        console.log('Regular user login. Redirecting to main app...');
        window.location.href = '/tab1';
      }
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  // another function to just log in using dummy account.
  const signInUsingDummyAccount = () => {
    addAccountToLocalStorage({ email: 'dummy@gmail.com' });
    window.location.href = '/tab1';
  };

  // function to add account to localStorage
  const addAccountToLocalStorage = (account: any) => {
    localStorage.setItem('account', JSON.stringify(account));
  };

  return (
    <IonPage className="login-page">
      <IonHeader className="login-header">
        <IonTitle className="login-title">Welcome to TUD Lost &amp; Found !</IonTitle>
      </IonHeader>
      <IonContent fullscreen className="login-content">
        <div className="login-container" style={{ padding: '16px', textAlign: 'center' }}>
          <IonCard className="login-card">
            <IonCardHeader className="login-card-header">
              <IonText className="login-card-text" style={{ fontSize: '20px' }}>
                <p>You must log in to access the app features!</p>
              </IonText>
            </IonCardHeader>
            <IonCardContent className="login-card-content">
              <p>
                TUD Lost &amp; Found helps you report and recover lost items within the university.
                Easily log in and access features like:
              </p>
              <ul className="login-features" style={{ textAlign: 'center', marginTop: '20px' }}>
                <li>Browse lost items</li>
                <li>Report an item you've lost</li>
                <li>Manage your account</li>
              </ul>
            </IonCardContent>
          </IonCard>

          <IonButton
            onClick={login}
            className="login-button"
            style={{
              marginTop: '20px',
              padding: '10px 20px',
              fontSize: '16px',
              alignItems: 'center',
              gap: '10px',
            }}
          >
            <svg
              className="login-svg"
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 512 512"
              style={{ marginRight: '10px' }}
            >
              <path
                fill="currentColor"
                d="M31.87 30.58H244.7v212.81H31.87Zm235.02 0H479.7v212.81H266.89ZM31.87 265.61H244.7v212.8H31.87Zm235.02 0H479.7v212.8H266.89Z"
              />
            </svg>
            Login with Microsoft
          </IonButton>
          <IonButton
            onClick={signInUsingDummyAccount}
            className="login-button"
            style={{ marginTop: '10px', padding: '10px 20px', fontSize: '16px' }}
          >
            Use Dummy Account
          </IonButton>

          <div className="login-disclaimer" style={{ marginTop: '30px', textAlign: 'center', padding: '10px' }}>
            <IonText color="medium" className="disclaimer-text" style={{ fontSize: '14px' }}>
              <p>
                <strong>Disclaimer:</strong> This app is meant to be used by students and lecturers on campus.
              </p>
            </IonText>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Login;
