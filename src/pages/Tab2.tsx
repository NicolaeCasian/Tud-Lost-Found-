import React, { useState } from 'react';
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
  IonText,
  IonButtons,
} from '@ionic/react';
import './Tab2.css';

const Tab2: React.FC = () => {
  const [form, setForm] = useState({
    itemName: '',
    category: '',
    description: '',
    locationLost: '',
    dateLost: '',
    contactInfo: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleDateChange = (e: any) => {
    setForm({ ...form, dateLost: e.detail.value });
  };

  const handleSubmit = () => {
    console.log('Submitted Form Data:', form);
    alert('Report submitted successfully!');
  };

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

      <IonContent className="ion-padding">
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>Report Lost Item</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <IonItem>
              <IonLabel position="stacked">Item Name</IonLabel>
              <IonInput
                name="itemName"
                value={form.itemName}
                placeholder="Enter item name"
                onIonChange={handleInputChange}
              />
            </IonItem>

            <IonItem>
              <IonLabel position="stacked">Category</IonLabel>
              <IonInput
                name="category"
                value={form.category}
                placeholder="Enter category"
                onIonChange={handleInputChange}
              />
            </IonItem>

            <IonItem>
              <IonLabel position="stacked">Description</IonLabel>
              <IonTextarea
                name="description"
                value={form.description}
                placeholder="Describe the item"
                onIonChange={handleInputChange}
              />
            </IonItem>

            <IonItem>
              <IonLabel position="stacked">Location Lost</IonLabel>
              <IonInput
                name="locationLost"
                value={form.locationLost}
                placeholder="Enter location"
                onIonChange={handleInputChange}
              />
            </IonItem>

            <IonItem>
              <IonLabel position="stacked">Date Lost</IonLabel>
              <IonDatetime
                display-format="MM/DD/YYYY"
                name="dateLost"
                value={form.dateLost}
                onIonChange={handleDateChange}
              />
            </IonItem>

            <IonItem>
              <IonLabel position="stacked">Contact Information</IonLabel>
              <IonInput
                name="contactInfo"
                value={form.contactInfo}
                type="email"
                placeholder="Enter email"
                onIonChange={handleInputChange}
              />
            </IonItem>

            <IonItem>
              <IonLabel position="stacked">Upload Image</IonLabel>
              <input
                type="file"
                accept="image/*"
                style={{ display: 'none' }}
                id="upload-image"
                onChange={(e) => console.log(e.target.files)}
              />
              <IonButton expand="block" color="success" onClick={() => document.getElementById('upload-image')?.click()}>
                Insert Image
              </IonButton>
            </IonItem>

            <IonButton expand="block" color="primary" onClick={handleSubmit}>
              Submit Report
            </IonButton>
          </IonCardContent>
        </IonCard>

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
      </IonContent>
    </IonPage>
  );
};

export default Tab2;
