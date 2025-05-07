import React, {useState} from 'react';
import {
    IonButton,
    IonCard, IonCardContent,
    IonCardHeader, IonCardTitle,
    IonContent, IonImg,
    IonPage,
} from '@ionic/react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import {useEffect} from "react";
import {useLocation} from "react-router-dom";
import axios from "axios";

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

const ManageItemPage: React.FC = () => {
    const query = useQuery();
    const token = query.get("token");
    const [item, setItem] = useState<any>(null);
    const [status, setStatus] = useState("loading");
    const API_URL = import.meta.env.VITE_API_URL || "https://tudlnf-serverv2-90ee51882713.herokuapp.com";

    useEffect(() => {
        if (!token) {
            setStatus("error");
            return;
        }

        const fetchItem = async () => {
            try {
                const response = await axios.post(`${API_URL}/api/manage-item`, {token});

                if (response.data.success) {
                    setItem(response.data.item);
                    setStatus("ready");
                } else {
                    setStatus("error");
                }
            } catch (error) {
                console.error("Error verifying token:", error);
                setStatus("error");
            }
        };

        fetchItem();
    }, [token]);

    const handleProlong = async () => {
        try {
            await axios.post(`${API_URL}/api/manage-item/prolong`, {token});
            alert("Item prolonged by 1 week.");
        } catch (err) {
            alert("Failed to prolong item.");
        }
    };

    const handleRemove = async () => {
        try {
            await axios.post(`${API_URL}/api/manage-item/remove`, {token});
            alert("Item removed.");
        } catch (err) {
            alert("Failed to remove item.");
        }
    };
    axios.post

    return (
        <IonPage>
            <Header/>
            <IonContent fullscreen>
                {status === "loading" && <p>Loading...</p>}
                {status === "error" && <p>Invalid or expired link.</p>}
                {status === "ready" && item && (
                    <IonCard style={{
                        backgroundColor: '#F8F8F8',
                        width: '90%',
                        maxWidth: '1200px',
                        margin: '1rem auto',
                        padding: '1rem',
                    }}
                    >
                        <IonCardHeader>
                            <IonCardTitle style={{
                                fontSize: '1.5rem',
                                fontWeight: 'bold',
                                textAlign: 'center',
                            }}>{item.name}</IonCardTitle>
                        </IonCardHeader>
                        <IonCardContent>
                            <hr style={{border: 'none', borderTop: '1px solid #ccc', margin: '1rem 0'}}/>
                            <IonImg style={{
                                height: '400px',
                                width: '100%',
                                marginBottom: '1rem',
                            }} src={item.image} alt={item.name}/>
                            <hr style={{border: 'none', borderTop: '1px solid #ccc', margin: '1rem 0'}}/>
                            <p style={{margin: '0.75rem 0 1.2rem'}}><strong>Description:</strong> {item.description}</p>
                            <p style={{margin: '0.75rem 0 1.2rem'}}><strong>Date
                                Lost:</strong> {new Date(item.dateLost).toLocaleDateString()}</p>
                            <IonButton style={{height: '44px'}} expand="block" color="success"
                                       onClick={handleProlong}>Prolong</IonButton>
                            <IonButton style={{height: '44px'}} expand="block" color="danger"
                                       onClick={handleRemove}>Remove</IonButton>
                        </IonCardContent>
                    </IonCard>
                )}
                <Footer/>
            </IonContent>
        </IonPage>
    );
};

export default ManageItemPage;