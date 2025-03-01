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
} from '@ionic/react';
import { useMsal } from '@azure/msal-react';
import { loginRequest } from './authConfig';
import './Login.css'

const Login: React.FC = () => {
  const { instance } = useMsal();
  const login = async () => {
    try {
      console.log('Triggering login with popup...');
      const response = await instance.loginPopup(loginRequest);

      const account = response.account;
      if (account) {
        const userEmail = account.username; // Get the user's email
        console.log('User email:', userEmail);

        // Check if the email ends with @mytudublin.ie
        // if (!userEmail.endsWith('@mytudublin.ie')) {
        //   console.warn('Unauthorized email. Logging out...');
        //   alert('Access denied! You must use a @mytudublin.ie email to log in.');
        //   await instance.logoutPopup(); // Log out unauthorized users
        //   return;
        // }

        console.log('Login successful. Setting active account:', account);
        instance.setActiveAccount(account);

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
          <IonTitle>TUD Lost & Found</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <div style={{ padding: '16px', textAlign: 'center' }}>
          {/* Login Requirement Message */}
          {/* Welcome Section */}
          <IonCard>
            <IonCardHeader>
              <IonText color="primary" style={{ fontSize: '18px', fontWeight: 'bold' }}>
                <p>You must log in to access the app features.</p>
              </IonText>
              <IonCardTitle>Welcome to TUD Lost & Found</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              TUD Lost & Found helps you report and recover lost items within the university. Easily log in and access features like:
              <ul style={{ textAlign: 'left', marginTop: '10px' }}>
                <li>Browse lost items</li>
                <li>Report an item you've lost</li>
                <li>Manage your account</li>
              </ul>
            </IonCardContent>
          </IonCard>

          <IonButton
            onClick={login}
            style={{
              marginTop: '20px',
              padding: '10px 20px',
              fontSize: '16px',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
            }}
          >
            <svg
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

          <div style={{ marginTop: '30px', textAlign: 'center', padding: '10px' }}>
            <IonText color="medium" style={{ fontSize: '14px' }}>
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
