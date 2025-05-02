import React, { useState, useEffect } from 'react';
import {
  IonContent,
  IonPage,
  IonGrid,
  IonRow,
  IonCol,
  IonButton,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonItem,
  IonLabel,
  IonInput,
  IonTextarea,
  IonSelect,
  IonSelectOption,
  IonDatetime,
  IonFooter,
  IonText,
  IonAlert,
} from '@ionic/react';
import { useHistory } from 'react-router-dom';
import { useMsal } from '@azure/msal-react';
import './css/lost.css';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Tab2: React.FC = () => {
  const [form, setForm] = useState<{
    type: string;
    itemName: string;
    category: string;
    description: string;
    locationLost: string;
    dateLost: string;
    contactInfo: string;
    image: File | null;
  }>({
    type: 'lost',
    itemName: '',
    category: '',
    description: '',
    locationLost: '',
    dateLost: '',
    contactInfo: '',
    image: null,
  });
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const history = useHistory();
  const API_URL = import.meta.env.VITE_API_URL || 'https://tudlnf-serverv2-90ee51882713.herokuapp.com';
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const { accounts } = useMsal();
  const userEmail = accounts.length > 0 ? accounts[0].username : '';

  useEffect(() => {
    if (!form.contactInfo && userEmail) {
      setForm((prev) => ({ ...prev, contactInfo: userEmail }));
    }
  }, [userEmail, form.contactInfo]);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | CustomEvent<any>
    >
  ) => {
    const { name, value } = (e.target as HTMLInputElement);
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      const validTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/heic'];
      if (!validTypes.includes(file.type)) {
        alert('Only JPEG and PNG images are allowed.');
        return;
      }
      setImagePreview(URL.createObjectURL(file));
      setForm((prev) => ({ ...prev, image: file }));
    }
  };

  const handleSubmit = async () => {
    if (!form.image) {
      alert('Please upload an image!');
      return;
    }
    const formData = new FormData();
    formData.append('type', form.type);
    formData.append('name', form.itemName);
    formData.append('category', form.category);
    formData.append('description', form.description);
    formData.append('location', form.locationLost);
    formData.append('dateLost', form.dateLost);
    formData.append('email', form.contactInfo || userEmail);
    formData.append('image', form.image);

    try {
      const res = await fetch(`${API_URL}/api/report_lost`, {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (data.success) {
        setAlertMessage(
          'Your report has been submitted successfully. We will notify you if someone finds your lost item.'
        );
        setShowAlert(true);
      } else {
        alert('Something went wrong!');
      }
    } catch (err) {
      console.error(err);
      alert('Failed to submit the report!');
    }
  };

  const navigateToLostItems = () => history.push('/tab1');

  return (
    <IonPage className="tab2-page">
      <Header  />
      <IonContent className="tab2-content ion-padding">
        <IonGrid className="button-grid">
          <IonRow className="button-row ion-justify-content-center">
            <IonCol size="6" className="button-col">
              <IonButton
                expand="full"
                color="secondary"
                routerLink="/tab2"
                className="tab2-button lost-button"
              >
                Report Lost
              </IonButton>
            </IonCol>
            <IonCol size="6" className="button-col">
              <IonButton
                expand="full"
                color="primary"
                routerLink="/Found"
                className="tab2-button found-button"
              >
                Report Found
              </IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>

        <IonCard className="report-card">
          <IonCardHeader className="report-card-header">
            <IonCardTitle className="report-card-title">
              Report Lost Item
            </IonCardTitle>
          </IonCardHeader>
          <IonCardContent className="report-card-content">
            <IonItem className="form-item">
              <IonLabel position="stacked" className="form-label">
                Item Name
              </IonLabel>
              <IonInput
                className="form-input"
                name="itemName"
                value={form.itemName}
                placeholder="Enter item name"
                onIonChange={handleInputChange}
              />
            </IonItem>

            <IonItem className="form-item">
              <IonLabel position="stacked" className="form-label">
                Category
              </IonLabel>
              <IonSelect
                className="form-select"
                name="category"
                value={form.category}
                placeholder="Select category"
                onIonChange={handleInputChange}
              >
                <IonSelectOption value="Electronics">
                  Electronics
                </IonSelectOption>
                <IonSelectOption value="Clothes">Clothes</IonSelectOption>
                <IonSelectOption value="Backpacks">Backpacks</IonSelectOption>
                <IonSelectOption value="Keys">Keys</IonSelectOption>
                <IonSelectOption value="Wallets">Wallets</IonSelectOption>
                <IonSelectOption value="ID Cards">ID Cards</IonSelectOption>
                <IonSelectOption value="Other">Other</IonSelectOption>
              </IonSelect>
            </IonItem>

            <IonItem className="form-item">
              <IonLabel position="stacked" className="form-label">
                Description
              </IonLabel>
              <IonTextarea
                className="form-textarea"
                name="description"
                value={form.description}
                placeholder="Describe the item"
                onIonChange={handleInputChange}
              />
            </IonItem>

            <IonItem className="form-item">
              <IonLabel position="stacked" className="form-label">
                Contact Information
              </IonLabel>
              <IonInput
                className="form-input"
                name="contactInfo"
                value={form.contactInfo || userEmail}
                readonly
                type="email"
              />
            </IonItem>

            <IonItem className="form-item">
              <IonLabel position="stacked" className="form-label">
                Location Lost
              </IonLabel>
              <IonSelect
                className="form-select"
                name="locationLost"
                value={form.locationLost}
                placeholder="Select location"
                onIonChange={handleInputChange}
              >
                <IonSelectOption value="A Block">A Block</IonSelectOption>
                <IonSelectOption value="B Block">B Block</IonSelectOption>
                <IonSelectOption value="C Block">C Block</IonSelectOption>
                <IonSelectOption value="D Block">D Block</IonSelectOption>
                <IonSelectOption value="E Block">E Block</IonSelectOption>
                <IonSelectOption value="F Block">F Block</IonSelectOption>
                <IonSelectOption value="G Block">G Block</IonSelectOption>
                <IonSelectOption value="H Block">H Block</IonSelectOption>
                <IonSelectOption value="S Block">
                  S Block | Sports Pavilion
                </IonSelectOption>
                <IonSelectOption value="Connect Building">
                  Connect Building
                </IonSelectOption>
              </IonSelect>
            </IonItem>

            <IonItem className="form-item">
              <IonLabel position="stacked" className="form-label">
                Date Lost
              </IonLabel>
              <IonDatetime
                className="form-datetime"
                display-format="MM/DD/YYYY"
                name="dateLost"
                value={form.dateLost}
                onIonChange={handleInputChange}
              />
            </IonItem>

            <IonItem className="form-item">
              <IonLabel position="stacked" className="form-label">
                Upload Image
              </IonLabel>
              <input
                type="file"
                accept="image/png, image/jpeg, image/jpg, image/heic"
                style={{ display: 'none' }}
                id="upload-image"
                onChange={handleImageUpload}
              />
              <IonButton
                className="form-image-button"
                expand="block"
                color="success"
                onClick={() => document.getElementById('upload-image')?.click()}
              >
                Insert Image
              </IonButton>
            </IonItem>

            {imagePreview && (
              <div className="image-preview-container">
                <p>Image Preview:</p>
                <img
                  src={imagePreview}
                  alt="Image Preview"
                  className="image-preview"
                />
              </div>
            )}

            <IonButton
              className="submit-button"
              expand="block"
              color="primary"
              onClick={handleSubmit}
            >
              Submit Report
            </IonButton>
          </IonCardContent>
        </IonCard>

        <IonFooter className="footer-tips">
          <IonCard className="tips-card">
            <IonCardHeader className="tips-card-header">
              <IonCardTitle className="tips-card-title">
                Tips for Reporting Lost Items:
              </IonCardTitle>
            </IonCardHeader>
            <IonCardContent className="tips-card-content">
              <IonText>
                <ul>
                  <li>Be specific in your description.</li>
                  <li>Include identifying features.</li>
                  <li>Report the loss quickly.</li>
                  <li>Check the found items section regularly.</li>
                </ul>
              </IonText>
            </IonCardContent>
          </IonCard>
        </IonFooter>

        <IonAlert
          className="submit-alert"
          isOpen={showAlert}
          onDidDismiss={() => setShowAlert(false)}
          header="Success!"
          message={alertMessage}
          buttons={[
            { text: 'Go to Lost Items', handler: navigateToLostItems },
            { text: 'Okay', role: 'cancel' },
          ]}
        />

        <Footer />
      </IonContent>
    </IonPage>
  );
};

export default Tab2;
