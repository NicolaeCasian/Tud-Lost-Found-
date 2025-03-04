import React, {useEffect, useState} from 'react';
import {
    IonContent,
    IonPage, IonText,
} from '@ionic/react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import {useParams} from "react-router-dom";
import axios from "axios";

const LostItem: React.FC = () => {
    const {id} = useParams<{ id: string }>(); // Get the item ID from the URL
    const [item, setItem] = useState<any>(null);
    const API_URL = import.meta.env.VITE_API_URL || "https://tudlnf-serverv2-90ee51882713.herokuapp.com";

    const blockMapUrls: { [key: string]: string } = {
        "D Block": "https://use.mazemap.com/embed.html#v=1&campusid=736&zlevel=1&center=-6.376823,53.405642&zoom=18&sharepoitype=poi&sharepoi=1000954458",
    };

    const MapEmbed = ({ location }: { location: string }) => {
        const mapUrl = blockMapUrls[location];

        if (!mapUrl) {
            return <p>❌ No map available for this location.</p>;
        }

        return (
            <iframe
                width="600"
                height="420"
                src={mapUrl}
                style={{ border: "1px solid grey" }}
                allow="geolocation"
            ></iframe>
        );
    };

    useEffect(() => {
        const fetchItem = async () => {
            try {
                const response = await axios.get(`${API_URL}/api/lost_items/${id}`);
                if (response.data.success) {
                    setItem(response.data.item);
                }
            } catch (error) {
                console.error('Error fetching item:', error);
            }
        };

        if (id) {
            fetchItem();
        }
    }, [id]);

    if (!item) {
        return <div>Loading...</div>; // Show a loading message while fetching
    }

    return (
        <IonPage>
            <Header/>

            <IonContent fullscreen className="ion-padding">
                <IonText>
                    <h1 style={{ fontSize: '3rem', fontWeight: 'bold' }}>{item.name}</h1>
                    <p>{item.location}</p>
                    <MapEmbed location={item.location} />
                </IonText>
            </IonContent>

            <Footer/>
        </IonPage>
    );
};

export default LostItem;
