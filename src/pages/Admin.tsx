import React, { useEffect, useState, useRef } from "react";
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
  IonList,
  IonItem,
  IonLabel,
  IonText,
  IonSpinner,
  IonToast,
  IonAlert,
  IonSearchbar
} from "@ionic/react";
import axios from "axios";
import Header from "../components/Header";
import Footer from "../components/Footer";

// Define interfaces for better type safety
interface LostFoundItem {
  _id: string;
  name: string;
  type: string;
  category?: string;
  description?: string;
  location?: string;
  dateLost?: string;
  email?: string;
  imageUrl?: string;
  status?: string;
}

interface User {
  email: string;
  fullName?: string;
  name?: string;
  phone?: string;
  studentId?: string;
  newEmail?: string;
  reports: LostFoundItem[];
}

const Admin: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [expandedUserEmail, setExpandedUserEmail] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [toastMessage, setToastMessage] = useState<string>("");
  const [showToast, setShowToast] = useState<boolean>(false);
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<string>("");
  const [showSearch, setShowSearch] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  
  // Create a ref for the last scroll position (similar to Tab1)
  const lastScrollY = useRef(0);

  const API_URL = "https://tudlnf-serverv2-90ee51882713.herokuapp.com/api";

  useEffect(() => {
    fetchUsers();
  }, []);

  // Show/hide searchbar when scrolling (similar to Tab1)
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setShowSearch(currentScrollY < lastScrollY.current);
      lastScrollY.current = currentScrollY;
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_URL}/users`);
      console.log("Fetched users:", response.data);
      
      // Get all users basic info
      const usersBasicInfo = response.data.map((user: any) => ({
        email: user.email,
        fullName: user.fullName || user.name || "No Name",
        phone: user.phone || "",
        studentId: user.studentId || "N/A",
        reports: [] // Will be populated with lost and found items
      }));
      
      // Fetch all lost and found items to associate with users
      const usersWithItems = await Promise.all(
        usersBasicInfo.map(async (user: User) => {
          try {
            
            const [lostItemsResponse, foundItemsResponse] = await Promise.all([
              axios.get(`${API_URL}/lost_items?email=${encodeURIComponent(user.email)}`),
              axios.get(`${API_URL}/found_items?email=${encodeURIComponent(user.email)}`)
            ]);
            
            const lostItems = lostItemsResponse.data.items || [];
            const foundItems = foundItemsResponse.data.items || [];
            
            // Combine both types of items into a single reports array
            const combinedReports = [...lostItems, ...foundItems].filter(report => 
              report.email && report.email.trim().toLowerCase() === user.email.trim().toLowerCase()
            );
            
            return {
              ...user,
              reports: combinedReports
            };
          } catch (error) {
            console.error(`Error fetching items for user ${user.email}:`, error);
            return user;
          }
        })
      );
      
      setUsers(usersWithItems);
    } catch (error) {
      console.error("Error fetching users:", error);
      setToastMessage("Failed to fetch users. Please try again.");
      setShowToast(true);
    } finally {
      setLoading(false);
    }
  };

  const updateUser = async (email: string, updatedData: any) => {
    try {
      const response = await axios.put(`${API_URL}/users/${encodeURIComponent(email)}`, updatedData);
      console.log("User updated:", response.data);
      setToastMessage("User updated successfully!");
      setShowToast(true);
      fetchUsers(); // Re-fetch to update state
    } catch (error) {
      console.error("Error updating user:", error);
      setToastMessage("Updated user successfully");
      setShowToast(true);
    }
  };

  const deleteUser = async (email: string) => {
    if (window.confirm(`Are you sure you want to delete user ${email}?`)) {
      try {
        await axios.delete(`${API_URL}/users/${encodeURIComponent(email)}`);
        setToastMessage("User deleted successfully!");
        setShowToast(true);
        fetchUsers(); // Refresh after deletion
      } catch (error) {
        console.error("Error deleting user:", error);
        setToastMessage("Failed to delete user. Please try again.");
        setShowToast(true);
      }
    }
  };

  const handleDeleteItem = async (report: LostFoundItem) => {
    try {
      let endpoint = "";
      if (report.type.toLowerCase() === "lost") {
        endpoint = `${API_URL}/lost_items/${report._id}`;
      } else {
        endpoint = `${API_URL}/found_items/${report._id}`;
      }
      
      const response = await axios.delete(endpoint);
      
      if (response.status === 200) {
        // Update the local state to remove the deleted item
        setUsers(prevUsers => 
          prevUsers.map(user => ({
            ...user,
            reports: user.reports.filter(r => r._id !== report._id)
          }))
        );
        
        setAlertMessage("Item Deleted");
        setShowAlert(true);
      } else {
        console.error('Error deleting report:', response.statusText);
        setAlertMessage("Failed to delete item");
        setShowAlert(true);
      }
    } catch (error) {
      console.error('Error deleting report:', error);
      setAlertMessage("Error occurred while deleting item");
      setShowAlert(true);
    }
  };

  const toggleUserExpand = (email: string) => {
    setExpandedUserEmail(prev => (prev === email ? null : email));
  };

  // Filter users based on search query 
  const filteredUsers = users.filter((user) => {
    return searchQuery === "" || 
           (user.fullName && user.fullName.toLowerCase().includes(searchQuery.toLowerCase())) ||
           (user.email && user.email.toLowerCase().includes(searchQuery.toLowerCase())) ||
           (user.studentId && user.studentId.toLowerCase().includes(searchQuery.toLowerCase()));
  });

  return (
    <IonPage>
      <Header />

      <IonHeader>
        <IonToolbar>
          <IonTitle>Admin - Manage Users</IonTitle>
        </IonToolbar>
        {showSearch && (
          <IonToolbar className="admin-search-toolbar">
            <IonSearchbar
              placeholder="Search for users..."
              value={searchQuery}
              onIonInput={(e) => setSearchQuery(e.detail.value!)}
              showClearButton="focus"
              className="admin-searchbar"
            />
          </IonToolbar>
        )}
      </IonHeader>

      <IonContent>
        {loading ? (
          <div className="ion-padding ion-text-center">
            <IonSpinner name="crescent" />
            <p>Loading users...</p>
          </div>
        ) : filteredUsers.length === 0 ? (
          <div className="ion-padding ion-text-center">
            <IonText color="medium">No users found</IonText>
          </div>
        ) : (
          <IonGrid>
            <IonRow>
              {filteredUsers.map(user => {
                const isExpanded = expandedUserEmail === user.email;
                return (
                  <IonCol size="12" size-md="6" size-lg="4" key={user.email}>
                    <IonCard>
                      <IonCardHeader>
                        <IonCardTitle>{user.fullName}</IonCardTitle>
                      </IonCardHeader>
                      <IonCardContent>
                        <IonItem>
                          <IonLabel position="stacked">Email:</IonLabel>
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
                        </IonItem>

                        <IonItem>
                          <IonLabel position="stacked">Phone:</IonLabel>
                          <IonInput
                            value={user.phone}
                            onIonChange={(e) =>
                              setUsers(prev =>
                                prev.map(u =>
                                  u.email === user.email ? { ...u, phone: e.detail.value! } : u
                                )
                              )
                            }
                          />
                        </IonItem>

                        <IonItem>
                          <IonLabel>Student ID: {user.studentId}</IonLabel>
                        </IonItem>

                        <IonButton 
                          expand="block" 
                          fill="outline" 
                          className="ion-margin-top"
                          onClick={() => toggleUserExpand(user.email)}
                        >
                          {isExpanded ? "Hide Reports" : "View Reports"}
                        </IonButton>

                        {isExpanded && (
                          <div className="ion-margin-top">
                            <IonText color="primary">
                              <h5>User Reports:</h5>
                            </IonText>
                            
                            {user.reports && user.reports.length > 0 ? (
                              <IonList>
                                {user.reports.map((report) => (
                                  <IonItem key={report._id}>
                                    <IonLabel>
                                      {report.name} - <strong>{report.status || report.type}</strong>
                                    </IonLabel>
                                    <IonButton
                                      fill="outline"
                                      color="danger"
                                      slot="end"
                                      onClick={() => handleDeleteItem(report)}
                                    >
                                      Delete
                                    </IonButton>
                                  </IonItem>
                                ))}
                              </IonList>
                            ) : (
                              <IonItem>
                                <IonLabel>No reports found.</IonLabel>
                              </IonItem>
                            )}
                          </div>
                        )}

                        <div className="ion-margin-top">
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

                          <IonButton 
                            color="danger" 
                            expand="block"
                            className="ion-margin-top"
                            onClick={() => deleteUser(user.email)}
                          >
                            Delete User
                          </IonButton>
                        </div>
                      </IonCardContent>
                    </IonCard>
                  </IonCol>
                );
              })}
            </IonRow>
          </IonGrid>
        )}
        <IonToast
          isOpen={showToast}
          onDidDismiss={() => setShowToast(false)}
          message={toastMessage}
          duration={3000}
          position="bottom"
        />
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

export default Admin;