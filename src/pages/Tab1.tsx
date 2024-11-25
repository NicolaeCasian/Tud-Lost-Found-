import React, { useEffect } from 'react';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButton,
} from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import * as msal from '@azure/msal-browser';
import './Tab1.css';

const msalInstance = new msal.PublicClientApplication({
  auth: {
    clientId: '45b8f383-951a-43a7-9793-00fd52492c9d', //client id
    authority: 'https://login.microsoftonline.com/9b43a4f8-f425-4e4a-a11d-c36ea42ca7a3', //with tenant id
    redirectUri: 'http://localhost:8100/tab1', //redirect URI
  },
});

const Tab1: React.FC = () => {
  useEffect(() => {
    const initializeMsal = async () => {
      try {
        console.log('Initializing MSAL...');
        await msalInstance.initialize();
        console.log('MSAL initialized successfully');
      } catch (error) {
        console.error('MSAL initialization failed:', error);
      }
    };

    initializeMsal();
  }, []);

  const login = async () => {
    try {
      console.log('Login function triggered');
      const response = await msalInstance.loginPopup({
        scopes: ['user.read'], // Specify the permissions/scopes you need
      });
      console.log('Login success:', response);
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  const logout = async () =>{
    await msalInstance.logoutPopup({
    
    })
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Tab 1</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Tab 1</IonTitle>
          </IonToolbar>
        </IonHeader>
        <ExploreContainer name="Tab 1 page" />
        <div style={{ padding: '16px', textAlign: 'center' }}>
          <IonButton onClick={login}>Login with Microsoft</IonButton>
          <IonButton onClick={logout}>Logout</IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
