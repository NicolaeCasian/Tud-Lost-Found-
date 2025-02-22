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
    image: null as File | null,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleDateChange = (e: any) => {
    setForm({ ...form, dateLost: e.detail.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setForm({ ...form, image: e.target.files[0] });
    }
  };

  const handleSubmit = async () => {
    if (!form.itemName || !form.category || !form.description || !form.locationLost || !form.dateLost || !form.contactInfo) {
      alert('Please fill in all fields!');
      return;
    }

    const formData = new FormData();
    formData.append('itemName', form.itemName);
    formData.append('category', form.category);
    formData.append('description', form.description);
    formData.append('locationLost', form.locationLost);
    formData.append('dateLost', form.dateLost);
    formData.append('contactInfo', form.contactInfo);
    if (form.image) {
      formData.append('image', form.image);
    }

    try {
      const response = await fetch('https://tudlnf-serverv2-90ee51882713.herokuapp.com/api/report_lost', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      if (data.success) {
        alert('Your report has been submitted successfully. We will notify you if someone finds your lost item.');
      } else {
        alert('Something went wrong!');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Failed to submit the report!');
    }
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
                onChange={handleFileChange}
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
