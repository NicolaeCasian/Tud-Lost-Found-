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
import { useHistory } from 'react-router-dom';

const Tab1: React.FC = () => {
  const { instance } = useMsal();
  const history = useHistory(); // Use navigate for routing

  const logout = async () => {
    try {
      console.log('Logging out...');
      await instance.logoutPopup();
      console.log('Logout successful.');

      // Redirect to login page after logout
      history.push('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Tab 1</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <div style={{ padding: '16px', textAlign: 'center' }}>
          <IonButton onClick={logout}>Logout</IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
