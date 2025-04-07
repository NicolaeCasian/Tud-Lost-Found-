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
  IonInput,
} from "@ionic/react";
import axios from "axios";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Admin: React.FC = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [expandedUserEmail, setExpandedUserEmail] = useState<string | null>(null);

  const API_URL = "https://tudlnf-serverv2-90ee51882713.herokuapp.com/api";

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${API_URL}/users`);
      console.log("Fetched users:", response.data); // 👈 LOG TO DEBUG STRUCTURE
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const updateUser = async (email: string, updatedData: any) => {
    try {
      const response = await axios.put(`${API_URL}/users/${encodeURIComponent(email)}`, updatedData);
      console.log("User updated:", response.data);
      fetchUsers(); // ✅ Re-fetch to update state
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const deleteUser = async (email: string) => {
    try {
      await axios.delete(`${API_URL}/users/${encodeURIComponent(email)}`);
      fetchUsers(); // ✅ Refresh after deletion
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const deleteLostItem = async (itemId: string) => {
    try {
      await axios.delete(`${API_URL}/lost_items/${itemId}`);
      fetchUsers(); // ✅ Refresh after deletion
    } catch (error) {
      console.error("Error deleting lost item:", error);
    }
  };

  const deleteFoundItem = async (itemId: string) => {
    try {
      await axios.delete(`${API_URL}/found_items/${itemId}`);
      fetchUsers(); // ✅ Refresh after deletion
    } catch (error) {
      console.error("Error deleting found item:", error);
    }
  };

  const toggleUserExpand = (email: string) => {
    setExpandedUserEmail(prev => (prev === email ? null : email));
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
            {users.map(user => {
              const isExpanded = expandedUserEmail === user.email;
              const lostItems = user.lostItems || user.lost || []; // fallback if backend uses "lost"
              const foundItems = user.foundItems || user.found || [];

              return (
                <IonCol size="12" size-md="6" size-lg="4" key={user.email}>
                  <IonCard>
                    <IonCardHeader>
                      <IonCardTitle>{user.fullName || "No Name"}</IonCardTitle>
                    </IonCardHeader>
                    <IonCardContent>
                      <p><strong>Email:</strong></p>
                      <IonInput
                        value={user.newEmail ?? user.email}
                        onIonChange={(e) =>
                          setUsers(prev =>
                            prev.map(u =>
                              u.email === user.email ? { ...u, newEmail: e.detail.value! } : u
                            )
                          )
                        }
                      />

                      <p><strong>Phone:</strong></p>
                      <IonInput
                        value={user.phone ?? ""}
                        onIonChange={(e) =>
                          setUsers(prev =>
                            prev.map(u =>
                              u.email === user.email ? { ...u, phone: e.detail.value! } : u
                            )
                          )
                        }
                      />

                      <p><strong>Student ID:</strong> {user.studentId || "N/A"}</p>

                      <IonButton expand="block" fill="outline" onClick={() => toggleUserExpand(user.email)}>
                        {isExpanded ? "Hide Items" : "View Items"}
                      </IonButton>

                      {isExpanded && (
                        <>
                          {lostItems.length > 0 && (
                            <>
                              <h5>Lost Items:</h5>
                              <ul>
                                {lostItems.map((item: any) => (
                                  <li key={item.id}>
                                    {item.name || "Unnamed"}{" "}
                                    <IonButton
                                      size="small"
                                      color="danger"
                                      onClick={() => deleteLostItem(item.id)}
                                    >
                                      Delete
                                    </IonButton>
                                  </li>
                                ))}
                              </ul>
                            </>
                          )}

                          {foundItems.length > 0 && (
                            <>
                              <h5>Found Items:</h5>
                              <ul>
                                {foundItems.map((item: any) => (
                                  <li key={item.id}>
                                    {item.name || "Unnamed"}{" "}
                                    <IonButton
                                      size="small"
                                      color="danger"
                                      onClick={() => deleteFoundItem(item.id)}
                                    >
                                      Delete
                                    </IonButton>
                                  </li>
                                ))}
                              </ul>
                            </>
                          )}

                          {lostItems.length === 0 && foundItems.length === 0 && (
                            <p>No lost or found items.</p>
                          )}
                        </>
                      )}

                      <IonButton
                        color="primary"
                        expand="block"
                        onClick={() =>
                          updateUser(user.email, {
                            email: user.newEmail ?? user.email,
                            phone: user.phone,
                          })
                        }
                      >
                        Update User
                      </IonButton>

                      <IonButton color="danger" expand="block" onClick={() => deleteUser(user.email)}>
                        Delete User
                      </IonButton>
                    </IonCardContent>
                  </IonCard>
                </IonCol>
              );
            })}
          </IonRow>
        </IonGrid>
      </IonContent>
      <Footer />
    </IonPage>
  );
};

export default Admin;
