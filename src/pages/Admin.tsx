import React, { useEffect, useState } from "react";
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
  IonCol,
} from "@ionic/react";
import axios from "axios";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Admin: React.FC = () => {
  const [users, setUsers] = useState<any[]>([]);

  const API_URL = "https://tudlnf-serverv2-90ee51882713.herokuapp.com";

  // Fetch users with their items
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${API_URL}/users-with-items`);
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  // Update user details
  const updateUser = async (email: string, updatedData: { fullName?: string; newEmail?: string; phone?: string }) => {
    try {
      await axios.put(`${API_URL}/update-user/${email}`, updatedData);
      setUsers(prevUsers =>
        prevUsers.map(user => (user.email === email ? { ...user, ...updatedData } : user))
      );
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  // Delete user
  const deleteUser = async (email: string) => {
    try {
      await axios.delete(`${API_URL}/delete-user/${email}`);
      setUsers(prevUsers => prevUsers.filter(user => user.email !== email));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  // Delete lost item
  const deleteLostItem = async (itemId: string) => {
    try {
      await axios.delete(`${API_URL}/delete-lost-item/${itemId}`);
      setUsers(prevUsers =>
        prevUsers.map(user => ({
          ...user,
          lostItems: user.lostItems?.filter(item => item.id !== itemId) || [],
        }))
      );
    } catch (error) {
      console.error("Error deleting lost item:", error);
    }
  };

  // Delete found item
  const deleteFoundItem = async (itemId: string) => {
    try {
      await axios.delete(`${API_URL}/delete-found-item/${itemId}`);
      setUsers(prevUsers =>
        prevUsers.map(user => ({
          ...user,
          foundItems: user.foundItems?.filter(item => item.id !== itemId) || [],
        }))
      );
    } catch (error) {
      console.error("Error deleting found item:", error);
    }
  };

  return (
    <IonPage>
      <Header />
      <IonHeader>
        <IonToolbar>
          <IonTitle>Admin - Manage Users</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <IonGrid>
          <IonRow>
            {users.map(user => (
              <IonCol size="12" size-md="6" size-lg="4" key={user.email}>
                <IonCard>
                  <IonCardHeader>
                    <IonCardTitle>{user.fullName || "No Name"}</IonCardTitle>
                  </IonCardHeader>
                  <IonCardContent>
                    <p>
                      <strong>Email:</strong> {user.email}
                    </p>
                    <p>
                      <strong>Phone:</strong> {user.phone || "N/A"}
                    </p>
                    <p>
                      <strong>Student ID:</strong> {user.studentId || "N/A"}
                    </p>
                    <IonButton color="danger" onClick={() => deleteUser(user.email)}>
                      Delete
                    </IonButton>
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
