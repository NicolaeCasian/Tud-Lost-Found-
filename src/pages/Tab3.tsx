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
    IonCol,
    IonGrid,
    IonRow,
    IonList,
    
} from '@ionic/react';
import { useHistory } from 'react-router-dom';
import './Tab3.css';

import Header from '../components/Header';
import Footer from '../components/Footer';
import ExploreContainer from '../components/ExploreContainer';

const Tab3: React.FC = () => {
  return (
    <IonPage>
      <Header/>  
      <IonContent fullscreen>
        <IonGrid>
          <IonRow className="ion-justify-content-center">
            <IonCol size="12" size-md="8" className="ion-text-center">
              <h2>My Account</h2>
            </IonCol>
          </IonRow>

          <IonRow>
            <IonCol size="12" size-md="6">
              <IonCard>
                <IonCardHeader>
                  <IonCardTitle>Personal Information</IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                  <IonItem>
                    <IonLabel position="floating">Full Name</IonLabel>
                    <IonInput></IonInput>
                  </IonItem>
                  <IonItem>
                    <IonLabel position="floating">Email Address</IonLabel>
                    <IonInput ></IonInput>
                  </IonItem>
                  <IonItem>
                    <IonLabel position="floating">Phone Number</IonLabel>
                    <IonInput value=""></IonInput>
                  </IonItem>
                  <IonItem>
                    <IonLabel position="floating">Student ID</IonLabel>
                    <IonInput></IonInput>
                  </IonItem>
                  <IonButton expand="full" color="primary">Save Changes</IonButton>
                </IonCardContent>
              </IonCard>
            </IonCol>

            <IonCol size="12" size-md="6">
              <IonCard>
                <IonCardHeader>
                  <IonCardTitle>Account Settings</IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                  <IonList>
                    <IonItem button>Notification Preferences</IonItem>
                    <IonItem button color="danger">Delete Account</IonItem>
                  </IonList>
                </IonCardContent>
              </IonCard>
            </IonCol>
          </IonRow>

          <IonRow>
            <IonCol>
              <IonCard>
                <IonCardHeader>
                  <IonCardTitle>My Reports</IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                  <IonList>
                    <IonItem>
                      <IonLabel>Blue Backpack - <strong>Pending</strong></IonLabel>
                      <IonButton fill="outline" slot="end">View Details</IonButton>
                    </IonItem>
                    <IonItem>
                      <IonLabel>Laptop Charger - <strong>Found</strong></IonLabel>
                      <IonButton fill="outline" slot="end">View Details</IonButton>
                    </IonItem>
                    <IonItem>
                      <IonLabel>Student ID Card - <strong>Claimed</strong></IonLabel>
                      <IonButton fill="outline" slot="end">View Details</IonButton>
                    </IonItem>
                    <IonItem>
                      <IonLabel>Car Keys - <strong>Unclaimed</strong></IonLabel>
                      <IonButton fill="outline" slot="end">View Details</IonButton>
                    </IonItem>
                  </IonList>
                </IonCardContent>
              </IonCard>
            </IonCol>
          </IonRow>
        </IonGrid>
        <Footer></Footer>
      </IonContent>
      <Footer/>
    </IonPage>
  );
};

export default Tab3;