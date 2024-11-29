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
import { useHistory } from 'react-router-dom'; 

const Login: React.FC = () => {
  const { instance } = useMsal();
  const navigate = useHistory(); 

  const login = async () => {
    try {
      console.log('Triggering login with popup...');
      const response = await instance.loginPopup(loginRequest);

      // Set active account and navigate to tab1
      const account = response.account;
      if (account) {
        console.log('Login successful. Setting active account:', account);
        instance.setActiveAccount(account);

        // Redirect to /tab1 after login
        navigate.push('/tab1');
      } else {
        console.warn('No account found after login.');
      }
    } catch (error) {
      console.error('Login failed:', error);
    }
  };
  const logout = async () => {
    try {
      console.log('Logging out...');
      await instance.logoutPopup();
      console.log('Logout successful.');

      // Redirect to login page after logout
      navigate.push('/login');
    } catch (error) {
      console.error('Logout failed:', error);
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
