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
            <IonContent className="ion-padding">
                {status === "loading" && <p>Loading...</p>}
                {status === "error" && <p>Invalid or expired link.</p>}
                {status === "ready" && item && (
                    <IonCard>
                        <IonCardHeader>
                            <IonCardTitle>{item.name}</IonCardTitle>
                        </IonCardHeader>
                        <IonCardContent>
                            <p><strong>Description:</strong> {item.description}</p>
                            <p><strong>Date Lost:</strong> {new Date(item.dateLost).toLocaleDateString()}</p>
                            <IonButton expand="block" color="success" onClick={handleProlong}>Prolong</IonButton>
                            <IonButton expand="block" color="danger" onClick={handleRemove}>Remove</IonButton>
                        </IonCardContent>
                    </IonCard>
                )}
            </IonContent>
            <Footer/>
        </IonPage>
    );
};

export default ManageItemPage;