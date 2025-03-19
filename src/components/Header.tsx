import React from 'react';
import { 
  IonHeader, 
  IonToolbar, 
  IonTitle, 
  IonButtons, 
  IonButton, 
  IonMenuButton 
} from '@ionic/react';
import './Header.css';

const Header: React.FC = () => {
  return (
    <IonHeader>
      <IonToolbar className="custom-toolbar">
        {/* App title */}
        <IonTitle className="header-title">TUD L&F</IonTitle>
        {/* Navigation buttons */}
        <IonButtons slot="end" className="nav-buttons">
          <IonButton routerLink="/tab1" className="nav-button">Home</IonButton>
          <IonButton routerLink="/tab2" className="nav-button">Report</IonButton>
          <IonButton routerLink="/tab3" className="nav-button">Contact</IonButton>
        </IonButtons>
      </IonToolbar>
    </IonHeader>
  );
};

export default Header;
