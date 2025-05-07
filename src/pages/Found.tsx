import React, { useState, useEffect } from 'react';
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
  IonSelectOption,
  IonSelect,
  IonAlert,
  IonCol,
  IonGrid,
  IonRow,
} from '@ionic/react';
import { useHistory } from 'react-router-dom';
import './Tab2.css';
import Header from '../components/Header';
import { useMsal } from '@azure/msal-react';
import Footer from '../components/Footer';

const Found: React.FC = () => {
  const [form, setForm] = useState<{
    type: string;
    itemName: string;
    category: string;
    description: string;
    locationFound: string;
    dateFound: string;
    contactInfo: string;
    image: File | null;
  }>({
    type: 'found',
    itemName: '',
    category: '',
    description: '',
    locationFound: '',
    dateFound: '',
    contactInfo: '',
    image: null,
  });
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const history = useHistory();
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const { accounts } = useMsal();
  // Get the user's email from MSAL
  const userEmail = accounts.length > 0 ? accounts[0].username : '';

  // Pre-populate contactInfo with userEmail if it's empty
  useEffect(() => {
    if (!form.contactInfo && userEmail) {
      setForm((prevForm) => ({ ...prevForm, contactInfo: userEmail }));
    }
  }, [userEmail, form.contactInfo]);

  // Updated event handler to check for e.detail.value if available
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> & { detail?: { value: any } }
  ) => {
    const { name } = e.target;
    const value = e.detail?.value ?? e.target.value;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Allow only valid image types
      const validTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/heic'];
      if (!validTypes.includes(file.type)) {
        alert('Only JPEG and PNG images are allowed.');
        return;
      }
      const imageURL = URL.createObjectURL(file);
      setImagePreview(imageURL);
      setForm((prevForm) => ({
        ...prevForm,
        image: file,
      }));
    }
  };

  const handleSubmit = async () => {
    if (form.image) {
      const formData = new FormData();
      formData.append('type', 'found');
      formData.append('name', form.itemName);
      formData.append('category', form.category);
      formData.append('description', form.description);
      formData.append('location', form.locationFound);
      // Use "dateFound" for found items instead of "dateLost"
      formData.append('dateFound', form.dateFound);
      // Use form.contactInfo or fall back to userEmail
      formData.append('email', form.contactInfo || userEmail);
      formData.append('image', form.image);

      try {
        const response = await fetch('https://tudlnf-serverv2-90ee51882713.herokuapp.com/api/report_found', {
          method: 'POST',
          body: formData,
        });
        const data = await response.json();
        if (data.success) {
          setAlertMessage(
            'Your report has been submitted successfully. We will notify you if someone finds your item.'
          );
          setShowAlert(true);
        } else {
          alert('Something went wrong!');
        }
      } catch (error) {
        console.error('Error submitting form:', error);
        alert('Failed to submit the report!');
      }
    } else {
      alert('Please upload an image!');
    }
  };

  const navigateToLostItems = () => {
    history.push('/tab1');
  };

  return (
    <IonPage>
      <Header />
      <IonContent className="ion-padding">
        <IonGrid>
          <IonRow className="ion-justify-content-center">
            <IonCol size="6">
              <IonButton expand="full" color="primary" routerLink="/tab2">
                Report Lost 
              </IonButton>
            </IonCol>
            <IonCol size="6">
              <IonButton expand="full" color="secondary" routerLink="/found">
                Report Found 
              </IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>Report Found Item</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <IonItem>
              <IonLabel position="stacked">Item Name</IonLabel>
              <IonInput
                name="itemName"
                value={form.itemName}
                placeholder="Enter item name"
                onIonChange={(e) => handleInputChange(e)}
              />
            </IonItem>
            <IonItem>
              <IonLabel position="stacked">Category</IonLabel>
              <IonSelect
                name="category"
                value={form.category}
                placeholder="Select category"
                onIonChange={(e) => handleInputChange(e)}
              >
                <IonSelectOption value="Electronics">Electronics</IonSelectOption>
                <IonSelectOption value="Clothes">Clothes</IonSelectOption>
                <IonSelectOption value="Backpacks">Backpacks</IonSelectOption>
                <IonSelectOption value="Keys">Keys</IonSelectOption>
                <IonSelectOption value="Wallets">Wallets</IonSelectOption>
                <IonSelectOption value="ID Cards">ID Cards</IonSelectOption>
                <IonSelectOption value="Other">Other</IonSelectOption>
              </IonSelect>
            </IonItem>
            <IonItem>
              <IonLabel position="stacked">Description</IonLabel>
              <IonTextarea
                name="description"
                value={form.description}
                placeholder="Describe the item"
                onIonChange={(e) => handleInputChange(e)}
              />
            </IonItem>
            <IonItem>
              <IonLabel position="stacked">Contact Information</IonLabel>
              <IonInput
                name="contactInfo"
                value={form.contactInfo || userEmail}
                readonly
                type="email"
                placeholder="Enter email"
                onIonChange={(e) => handleInputChange(e)}
              />
            </IonItem>
            <IonItem>
              <IonLabel position="stacked">Location Found</IonLabel>
              <IonSelect
                name="locationFound"
                value={form.locationFound}
                placeholder="Select location"
                onIonChange={(e) => handleInputChange(e)}
              >
                <IonSelectOption value="A Block">A Block</IonSelectOption>
                <IonSelectOption value="B Block">B Block</IonSelectOption>
                <IonSelectOption value="C Block">C Block</IonSelectOption>
                <IonSelectOption value="D Block">D Block</IonSelectOption>
                <IonSelectOption value="E Block">E Block</IonSelectOption>
                <IonSelectOption value="F Block">F Block</IonSelectOption>
                <IonSelectOption value="Sports Block">Sports Block</IonSelectOption>
                <IonSelectOption value="Other">Other</IonSelectOption>
              </IonSelect>
            </IonItem>
            <IonItem>
              <IonLabel position="stacked">Date Found</IonLabel>
              <IonDatetime
                display-format="MM/DD/YYYY"
                name="dateFound"
                value={form.dateFound}
                onIonChange={(e) => handleInputChange(e)}
              />
            </IonItem>
            <IonItem>
              <IonLabel position="stacked">Upload Image</IonLabel>
              <input
                type="file"
                accept="image/png, image/jpeg, image/jpg, image/heic"
                style={{ display: 'none' }}
                id="upload-image"
                onChange={(e) => handleImageUpload(e)}
              />
              <IonButton
                expand="block"
                color="success"
                className="image-button"
                onClick={() => document.getElementById('upload-image')?.click()}
              >
                Insert Image
              </IonButton>
            </IonItem>
            {imagePreview && (
              <div>
                <p>Image Preview:</p>
                <img src={imagePreview} alt="Image Preview" style={{ width: '200px', height: 'auto' }} />
              </div>
            )}
            <IonButton expand="block" color="primary" onClick={handleSubmit} className="submit-button">
              Submit Report
            </IonButton>
          </IonCardContent>
        </IonCard>
        <IonFooter className="footer-tips">
          <IonCard>
            <IonCardHeader>
              <IonCardTitle>Tips for Reporting Lost Items:</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
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
          isOpen={showAlert}
          onDidDismiss={() => setShowAlert(false)}
          header={'Success!'}
          message={alertMessage}
          buttons={[
            {
              text: 'Go to Lost Items',
              handler: () => navigateToLostItems(),
            },
            {
              text: 'Okay',
              role: 'cancel',
            },
          ]}
        />
        <Footer />
      </IonContent>
    </IonPage>
  );
};

export default Found;
