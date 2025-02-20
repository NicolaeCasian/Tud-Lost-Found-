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

const FAQ: React.FC = () => {
  return (
    <IonPage>
      {/* Updated Header with Navigation Buttons */}
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

      {/* Footer with Tips and Contact Info */}
      <IonFooter className="footer-tips">
        <IonCard className="tips-card">
          <IonCardContent>
            <h4>Tips for Reporting Lost Items</h4>
            <ul>
              <li>Be as specific as possible in your description</li>
              <li>Include any unique identifying features</li>
              <li>Report the loss as soon as possible</li>
              <li>Check the found items section regularly</li>
            </ul>
          </IonCardContent>
        </IonCard>

        <div className="main-footer">
          <div className="footer-container">
            <div className="footer-section">
              <h4>TUD Lost & Found</h4>
              <p>Helping students recover lost items across campus.</p>
            </div>

            <div className="footer-section">
              <h4>Contact Us</h4>
              <p>Email: lost.found@tudublin.ie</p>
              <p>Phone: (01) 323-5041</p>
            </div>

            <div className="footer-section">
              <h4>Quick Links</h4>
              <p><a href="http://localhost:8100/faq">FAQ</a></p>
              <p><a href="#">Terms of Service</a></p>
              <p><a href="#">Privacy Policy</a></p>
            </div>
          </div>

          <div className="footer-bottom">
            &copy; 2024 TUD Lost & Found. All rights reserved.
          </div>
        </div>
      </IonFooter>
    </IonPage>
  );
};

export default FAQ;
