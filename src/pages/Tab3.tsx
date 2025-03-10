import React, { useState, useEffect } from 'react';
import { 
  IonContent, 
  IonPage, 
  IonItem, 
  IonLabel, 
  IonInput, 
  IonCard, 
  IonCardHeader, 
  IonCardTitle, 
  IonCardContent, 
  IonButton, 
  IonCol, 
  IonGrid, 
  IonRow, 
  IonList 
} from '@ionic/react';
import { useMsal } from '@azure/msal-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Tab3: React.FC = () => {
  const { accounts, instance } = useMsal();
  // Basic user info from MSAL
  const userEmail = accounts.length > 0 ? accounts[0].username : '';
  const userName = accounts.length > 0 ? accounts[0].name : '';

  // State for additional info provided by the user
  const [phone, setPhone] = useState('');
  const [studentId, setStudentId] = useState('');

  // Store basic login info in the database as soon as the user logs in
  useEffect(() => {
    if (userEmail && userName) {
      // Call your backend API to create a new user or update an existing one
      fetch('https://tudlnf-serverv2-90ee51882713.herokuapp.com/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: userEmail, name: userName })
      })
        .then(response => response.json())
        .then(data => {
          console.log('User record created/updated:', data);
        })
        .catch(error => console.error('Error storing user info:', error));
    }
  }, [userEmail, userName]);

  // Function to update additional info (phone number and student ID)
  const handleSaveChanges = async () => {
    const updatedData = { phone, studentId };
    try {
      const response = await fetch(`https://tudlnf-serverv2-90ee51882713.herokuapp.com/api/users/${encodeURIComponent(userEmail)}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData)
      });
      if (response.ok) {
        console.log('User additional information updated successfully.');
      } else {
        console.error('Error updating user additional info.');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  // Example logout function (you can modify as needed)
  const handleLogout = () => {
    instance.logoutRedirect();
  };

  return (
    <IonPage>
      <Header />
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
                    <IonLabel position="stacked">Full Name</IonLabel>
                    <IonInput value={userName} readonly />
                  </IonItem>
                  <IonItem>
                    <IonLabel position="stacked">Email Address</IonLabel>
                    <IonInput value={userEmail} readonly />
                  </IonItem>
                  <IonItem>
                    <IonLabel position="stacked">Phone Number</IonLabel>
                    <IonInput 
                      value={phone} 
                      placeholder="Enter phone number" 
                      onIonChange={e => setPhone(e.detail.value!)} 
                    />
                  </IonItem>
                  <IonItem>
                    <IonLabel position="stacked">Student ID</IonLabel>
                    <IonInput 
                      value={studentId} 
                      placeholder="Enter student ID" 
                      onIonChange={e => setStudentId(e.detail.value!)} 
                    />
                  </IonItem>
                  <IonButton expand="full" color="primary" onClick={handleSaveChanges}>
                    Save Changes
                  </IonButton>
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
                  </IonList>
                  <IonButton expand="full" color="danger" onClick={handleLogout}>
                    Logout
                  </IonButton>
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
        <Footer />
      </IonContent>
    </IonPage>
  );
};

export default Tab3;