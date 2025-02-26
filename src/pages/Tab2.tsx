import React, { useState } from 'react';
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonContent,
  IonHeader,
  IonPage,
  IonToolbar,
  IonTitle,
  IonLabel,
  IonItem,
  IonInput,
  IonTextarea,
  IonSelect,
  IonSelectOption,
  IonDatetime,
  IonAlert,
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
  const [isFormView, setIsFormView] = useState(true); // Toggle view state
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const history = useHistory();

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const validTypes = ['image/jpeg', 'image/png', 'image/jpg'];
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const handleSubmit = async () => {
    if (form.image) {
      const formData = new FormData();
      formData.append('name', form.itemName);
      formData.append('category', form.category);
      formData.append('description', form.description);
      formData.append('location', form.locationLost);
      formData.append('dateLost', form.dateLost);
      formData.append('email', form.contactInfo);
      formData.append('image', form.image);

      try {
        const response = await fetch('https://tudlnf-serverv2-90ee51882713.herokuapp.com/api/report_lost', {
          method: 'POST',
          body: formData,
        });
        const data = await response.json();
        if (data.success) {
          setAlertMessage('Your report has been submitted successfully.');
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
    history.push('/tab1'); // Navigate to the Lost Items page
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Report Lost Item</IonTitle>
        </IonToolbar>
      </IonHeader>
      <Header />

      <IonContent className="ion-padding">
        {/* Always visible toggle button */}
        <IonButton expand="block" color="secondary" onClick={() => setIsFormView(!isFormView)}>
          {isFormView ? 'Go to Lost Items' : 'Go to Report Form'}
        </IonButton>

        {isFormView ? (
          // Display the form
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
                  value={form.contactInfo}
                  type="email"
                  placeholder="Enter email"
                  onIonChange={(e) => handleInputChange(e)}
                />
              </IonItem>

              <IonItem>
                <IonLabel position="stacked">Location Lost</IonLabel>
                <IonSelect
                  name="locationLost"
                  value={form.locationLost}
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
                <IonLabel position="stacked">Date Lost</IonLabel>
                <IonDatetime
                  display-format="MM/DD/YYYY"
                  name="dateLost"
                  value={form.dateLost}
                  onIonChange={(e) => handleInputChange(e)}
                />
              </IonItem>

              <IonItem>
                <IonLabel position="stacked">Upload Image</IonLabel>
                <input
                  type="file"
                  accept="image/png, image/jpeg, image/jpg"
                  style={{ display: 'none' }}
                  id="upload-image"
                  onChange={(e) => handleImageUpload(e)}
                />
                <IonButton
                  expand="block"
                  color="success"
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

              <IonButton expand="block" color="primary" onClick={handleSubmit}>
                Submit Report
              </IonButton>
            </IonCardContent>
          </IonCard>
        ) : (
          // Display the "Lost Items" view or another page
          <div>
            <h2>Lost Items Overview</h2>
            <IonButton expand="block" color="primary" onClick={navigateToLostItems}>
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
