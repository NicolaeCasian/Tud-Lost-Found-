import React from 'react';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButton,
} from '@ionic/react';
import { useMsal } from '@azure/msal-react';
import { loginRequest } from './authConfig';

const Login: React.FC = () => {
  const { instance } = useMsal();

  const login = async () => {
    try {
      console.log('Triggering login with popup...');
      const response = await instance.loginPopup(loginRequest);

      // Set active account and navigate to tab1
      const account = response.account;
      if (account) {
        console.log('Login successful. Setting active account:', account);
        instance.setActiveAccount(account);

        const userEmail = account.username; // The 'username' field typically contains the email address
        console.log('User email:', userEmail);

        // Redirect to /tab1 after login
        window.location.href = '/tab1';
      } else {
        console.warn('No account found after login.');
      }
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Login</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <div style={{ padding: '16px', textAlign: 'center' }}>
          <IonButton onClick={login}>Login with Microsoft</IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Login;
