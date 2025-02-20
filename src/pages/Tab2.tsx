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
import Footer from '../components/Footer';
import Header from '../components/Header';
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
    <Header />

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

      </IonContent>
      <Footer />
    </IonPage>
  );
};

export default Tab2;
