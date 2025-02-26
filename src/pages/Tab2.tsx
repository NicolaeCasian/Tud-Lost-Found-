import React, { useState } from 'react';
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonContent,
  IonPage,
  IonLabel,
  IonItem,
  IonInput,
  IonTextarea,
  IonSelect,
  IonSelectOption,
  IonDatetime,
} from '@ionic/react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Tab2: React.FC = () => {
  const [form, setForm] = useState({
    itemName: '',
    category: '',
    description: '',
    locationLost: '',
    dateLost: '',
    contactInfo: '',
    image: null,
  });
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isFormView, setIsFormView] = useState(true);
  const history = useHistory();

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && ['image/jpeg', 'image/png', 'image/jpg'].includes(file.type)) {
      setImagePreview(URL.createObjectURL(file));
      setForm((prevForm) => ({ ...prevForm, image: file }));
    } else {
      alert('Only JPEG and PNG images are allowed.');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prevForm) => ({ ...prevForm, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async () => {
    if (!form.image) return alert('Please upload an image!');
    
    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      if (value) formData.append(key, value as string | Blob);
    });

    try {
      const response = await fetch('https://tudlnf-serverv2-90ee51882713.herokuapp.com/api/report_lost', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      if (data.success) alert('Your report has been submitted successfully.');
      else alert('Something went wrong!');
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Failed to submit the report!');
    }
  };

  return (
    <IonPage>
      <Header />
      <IonContent className="ion-padding">
        <IonButton expand="block" color="secondary" onClick={() => history.push('/Found')}>
          Go to Found Form
        </IonButton>
        
        <IonButton expand="block" color="secondary" onClick={() => setIsFormView(!isFormView)}>
          {isFormView ? 'Go to Lost Items' : 'Go to Report Form'}
        </IonButton>

        {isFormView ? (
          <IonCard>
            <IonCardHeader>
              <IonCardTitle>Report Lost Item</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <IonItem>
                <IonLabel position="stacked">Item Name</IonLabel>
                <IonInput name="itemName" value={form.itemName} onIonChange={handleInputChange} />
              </IonItem>
              <IonItem>
                <IonLabel position="stacked">Category</IonLabel>
                <IonSelect name="category" value={form.category} onIonChange={handleInputChange}>
                  {['Electronics', 'Clothes', 'Backpacks', 'Keys', 'Wallets', 'ID Cards', 'Other'].map((cat) => (
                    <IonSelectOption key={cat} value={cat}>{cat}</IonSelectOption>
                  ))}
                </IonSelect>
              </IonItem>
              <IonItem>
                <IonLabel position="stacked">Description</IonLabel>
                <IonTextarea name="description" value={form.description} onIonChange={handleInputChange} />
              </IonItem>
              <IonItem>
                <IonLabel position="stacked">Contact Information</IonLabel>
                <IonInput name="contactInfo" value={form.contactInfo} type="email" onIonChange={handleInputChange} />
              </IonItem>
              <IonItem>
                <IonLabel position="stacked">Location Lost</IonLabel>
                <IonSelect name="locationLost" value={form.locationLost} onIonChange={handleInputChange}>
                  {['A Block', 'B Block', 'C Block', 'D Block', 'E Block', 'F Block', 'Sports Block', 'Other'].map((loc) => (
                    <IonSelectOption key={loc} value={loc}>{loc}</IonSelectOption>
                  ))}
                </IonSelect>
              </IonItem>
              <IonItem>
                <IonLabel position="stacked">Date Lost</IonLabel>
                <IonDatetime display-format="MM/DD/YYYY" name="dateLost" value={form.dateLost} onIonChange={handleInputChange} />
              </IonItem>
              <IonItem>
                <IonLabel position="stacked">Upload Image</IonLabel>
                <input type="file" accept="image/png, image/jpeg, image/jpg" style={{ display: 'none' }} id="upload-image" onChange={handleImageUpload} />
                <IonButton expand="block" color="success" onClick={() => document.getElementById('upload-image')?.click()}>
                  Insert Image
                </IonButton>
              </IonItem>
              {imagePreview && <img src={imagePreview} alt="Preview" style={{ width: '200px', height: 'auto' }} />}
              <IonButton expand="block" color="primary" onClick={handleSubmit}>
                Submit Report
              </IonButton>
            </IonCardContent>
          </IonCard>
        ) : (
          <div>
            <h2>Lost Items Overview</h2>
            <IonButton expand="block" color="primary" onClick={() => history.push('/tab1')}>
              Go to Lost Items List
            </IonButton>
          </div>
        )}
      </IonContent>
      <Footer />
    </IonPage>
  );
};

export default Tab2;
