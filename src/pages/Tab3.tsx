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
  IonList,
  IonAlert 
} from '@ionic/react';
import { useMsal } from '@azure/msal-react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { getAccountFromLocalStorage } from '../utils/auth';

const Tab3: React.FC = () => {
  const { accounts, instance } = useMsal();
  const history = useHistory();
  
  // Extract and normalize user information
  const rawUserEmail = accounts[0]?.username || getAccountFromLocalStorage()?.email || '';
  const userEmail = rawUserEmail.trim().toLowerCase();
  const userName = accounts[0]?.name || getAccountFromLocalStorage()?.name || '';

  // State for additional user info
  const [phone, setPhone] = useState('');
  const [studentId, setStudentId] = useState('');
  
  // State for storing the user's reports (lost and found items)
  const [reports, setReports] = useState<any[]>([]);
  
  // State for alert message
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  const API_URL = import.meta.env.VITE_API_URL || "https://tudlnf-serverv2-90ee51882713.herokuapp.com";

  useEffect(() => {
    if (userEmail && userName) {
      fetch(`${API_URL}/api/users`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: userEmail, name: userName })
      })
        .then(response => response.json())
        .then(data => console.log('User record created/updated:', data))
        .catch(error => console.error('Error storing user info:', error));
    }
  }, [userEmail, userName]);

  const handleSaveChanges = async () => {
    const updatedData = { phone, studentId };
    try {
      const response = await fetch(`${API_URL}/api/users/${encodeURIComponent(userEmail)}`, {
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

  useEffect(() => {
    if (userEmail) {
      Promise.all([
        fetch(`${API_URL}/api/lost_items?email=${encodeURIComponent(userEmail)}`).then(res => res.json()),
        fetch(`${API_URL}/api/found_items?email=${encodeURIComponent(userEmail)}`).then(res => res.json())
      ])
      .then(([lostItemsResponse, foundItemsResponse]) => {
        const lostItems = lostItemsResponse.items || [];
        const foundItems = foundItemsResponse.items || [];
        const combinedReports = [...lostItems, ...foundItems];
        const userReports = combinedReports.filter(report => 
          report.email && report.email.trim().toLowerCase() === userEmail
        );
        setReports(userReports);
      })
      .catch(err => console.error('Error fetching reports:', err));
    }
  }, [userEmail]);

  const handleDelete = async (report: any) => {
    try {
      let endpoint = "";
      if (report.type.toLowerCase() === "lost") {
        endpoint = `${API_URL}/api/lost_items/${report._id}`;
      } else {
        endpoint = `${API_URL}/api/found_items/${report._id}`;
      }
      const response = await fetch(endpoint, { method: 'DELETE' });
      
      if (response.ok) {
        setReports(prevReports => prevReports.filter(r => r._id !== report._id));
        setAlertMessage("Item Deleted");
        setShowAlert(true);
      } else {
        const errorText = await response.text();
        console.error('Error deleting report:', errorText);
      }
    } catch (error) {
      console.error('Error deleting report:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('account');
    instance.logoutRedirect();
    window.location.href = '/login';
  };

  const handleItemClick = (id: string) => {
    history.push(`/item/${id}`);
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
                    {reports.length > 0 ? (
                      reports.map((report, index) => (
                        <IonItem key={index}>
                          <IonLabel>
                            {report.name} - <strong>{report.status || report.type}</strong>
                          </IonLabel>
                          <IonButton fill="outline" slot="end" onClick={() => handleDelete(report)}>
                            Delete
                          </IonButton>
                          <IonButton fill="outline" slot="end" onClick={() => handleItemClick(report._id)}>
                            View Details
                          </IonButton>
                        </IonItem>
                      ))
                    ) : (
                      <IonItem>
                        <IonLabel>No reports found.</IonLabel>
                      </IonItem>
                    )}
                  </IonList>
                </IonCardContent>
              </IonCard>
            </IonCol>
          </IonRow>
        </IonGrid>
        <IonAlert
          isOpen={showAlert}
          onDidDismiss={() => setShowAlert(false)}
          header="Notification"
          message={alertMessage}
          buttons={["OK"]}
        />
      <Footer />
      </IonContent>
    </IonPage>
  );
};

export default Tab3;
