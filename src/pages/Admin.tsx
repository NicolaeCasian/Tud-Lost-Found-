import React, { useEffect, useState } from 'react';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonButton,
  IonGrid,
  IonRow,
  IonCol
} from '@ionic/react';
import axios from "axios";
import Header from '../components/Header';
import Footer from '../components/Footer';

const Admin: React.FC = () => {
  const [users, setUsers] = useState<any[]>([]);
  
  const API_URL = 'https://tudlnf-serverv2-90ee51882713.herokuapp.com/api/admin/users';

  // Fetch users from API
  useEffect(() => {
    fetchUsers(); 
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(API_URL);
      setUsers(response.data.users); // Ensure you're accessing the correct key in the response
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  // Delete user function
  const deleteUser = async (email: string) => {
    try {
      await axios.delete(`${API_URL}/${email}`);
      setUsers(users.filter(user => user.email !== email));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <IonPage>
      <Header/>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Admin - Manage Users</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <IonGrid>
          <IonRow>
            {users.map((user) => (
              <IonCol size="12" size-md="6" size-lg="4" key={user.email}>
                <IonCard>
                  <IonCardHeader>
                    <IonCardTitle>{user.name}</IonCardTitle>
                  </IonCardHeader>
                  <IonCardContent>
                    <p><strong>Email:</strong> {user.email}</p>
                    <p><strong>Phone:</strong> {user.phone || "N/A"}</p>
                    <p><strong>Student ID:</strong> {user.studentId || "N/A"}</p>
                    <IonButton color="danger" onClick={() => deleteUser(user.email)}>Delete</IonButton>
                  </IonCardContent>
                </IonCard>
              </IonCol>
            ))}
          </IonRow>
        </IonGrid>
      </IonContent>
      <Footer />
    </IonPage>
  );
};

export default Admin;
