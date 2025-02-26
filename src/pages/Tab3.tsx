import React, {useState} from 'react';
import {
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    IonItem,
    IonLabel,
    IonInput,
    IonTextarea,
    IonDatetime,
    IonButton,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonFooter,
    IonText, IonSelectOption, IonSelect, IonAlert,
} from '@ionic/react';
import { useHistory } from 'react-router-dom';
import './Tab3.css';

import Header from '../components/Header';
import Footer from '../components/Footer';

const Tab3: React.FC = () => {
  return (
    <IonPage>
      <Header/>  
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Tab 3</IonTitle>
          </IonToolbar>
        </IonHeader>
        <ExploreContainer name="Tab 3 page" />
      </IonContent>
      <Footer/>
    </IonPage>
  );
};

export default Tab3;
