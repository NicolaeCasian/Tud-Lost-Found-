import React from 'react';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonAccordion,
  IonAccordionGroup,
  IonItem,
  IonLabel,
  IonFooter,
  IonList,
  IonInput,
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
} from '@ionic/react';
import Footer from '../components/Footer';
import Header from '../components/Header';

const Faq: React.FC = () => {
  return (
    <IonPage>
      <Header/>

      <IonContent fullscreen className="ion-padding">
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Frequently Asked Questions</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonAccordionGroup>
          <IonAccordion value="report">
            <IonItem slot="header">
              <IonLabel>How do I report a lost item?</IonLabel>
            </IonItem>
            <div slot="content" className="ion-padding">
              To report a lost item, click on the "Report Lost" button in the navigation menu. Fill out the form with detailed information about your lost item, including description, date, and location where you last saw it.
            </div>
          </IonAccordion>

          <IonAccordion value="retrieve">
            <IonItem slot="header">
              <IonLabel>How can I retrieve a found item?</IonLabel>
            </IonItem>
            <div slot="content" className="ion-padding">
              If you spot your item in the "Browse Items" section, click on it and follow the claim process. You'll need to provide proof of ownership and arrange pickup at the designated location.
            </div>
          </IonAccordion>

          <IonAccordion value="account">
            <IonItem slot="header">
              <IonLabel>How do I set up an account?</IonLabel>
            </IonItem>
            <div slot="content" className="ion-padding">
              Click the "Sign In" button and select "Create Account". You'll need to provide your TUD email address and create a password. Verify your email to activate your account.
            </div>
          </IonAccordion>
        </IonAccordionGroup>
      </IonContent>

    <Footer />
    </IonPage>
  );
};

export default Faq;
