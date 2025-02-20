import React from 'react';
import { IonHeader, 
         IonToolbar, 
         IonTitle, 
         IonButtons, 
         IonButton } from '@ionic/react';

const Header: React.FC = () => {
  return (
    <IonHeader>
      <IonToolbar color="primary">
        <IonTitle slot="start">TUD Lost & Found</IonTitle>
        <IonButtons slot="end">
          <IonButton routerLink="/home">Home</IonButton>
          <IonButton routerLink="/report">Report Item</IonButton>
          <IonButton routerLink="/search">Search</IonButton>
          <IonButton routerLink="/contact">Contact</IonButton>
        </IonButtons>
      </IonToolbar>
    </IonHeader>
  );
};

export default Header;
