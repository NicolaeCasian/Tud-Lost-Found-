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
        "A Block": "https://use.mazemap.com/embed.html#v=1&config=TUDUBLIN&zlevel=1&center=-6.376608,53.406412&zoom=18&campusid=736&sharepoitype=poi&sharepoi=1000954451&utm_medium=iframe",
        "B Block": "https://use.mazemap.com/embed.html#v=1&config=TUDUBLIN&zlevel=1&center=-6.379801,53.406413&zoom=18&campusid=736&sharepoitype=poi&sharepoi=1000954452&utm_medium=iframe",
        "C Block": "https://use.mazemap.com/embed.html#v=1&config=TUDUBLIN&zlevel=1&center=-6.378812,53.405410&zoom=18&campusid=736&sharepoitype=poi&sharepoi=1000954453&utm_medium=iframe",
        "D Block": "https://use.mazemap.com/embed.html#v=1&config=TUDUBLIN&zlevel=1&center=-6.376794,53.405619&zoom=18.2&campusid=736&sharepoitype=poi&sharepoi=1000954458&utm_medium=iframe",
        "E Block": "https://use.mazemap.com/embed.html#v=1&config=TUDUBLIN&zlevel=1&center=-6.377395,53.405211&zoom=18&campusid=736&sharepoitype=poi&sharepoi=1000954459&utm_medium=iframe",
        "F Block": "https://use.mazemap.com/embed.html#v=1&config=TUDUBLIN&zlevel=1&center=-6.378331,53.404717&zoom=18&campusid=736&sharepoitype=poi&sharepoi=1000954460&utm_medium=iframe",
        "G Block": "https://use.mazemap.com/embed.html#v=1&config=TUDUBLIN&zlevel=1&center=-6.379114,53.404456&zoom=18&campusid=736&sharepoitype=poi&sharepoi=1002536126&utm_medium=iframe",
        "H Block": "https://use.mazemap.com/embed.html#v=1&config=TUDUBLIN&zlevel=1&center=-6.382013,53.404626&zoom=18&campusid=736&sharepoitype=poi&sharepoi=1000954462&utm_medium=iframe",
        "S Block": "https://use.mazemap.com/embed.html#v=1&config=TUDUBLIN&zlevel=1&center=-6.381390,53.405789&zoom=18&campusid=736&sharepoitype=poi&sharepoi=1000821154&utm_medium=iframe",
        "Connect Building": "https://use.mazemap.com/embed.html#v=1&config=TUDUBLIN&zlevel=1&center=-6.379618,53.404711&zoom=18&campusid=736&sharepoitype=poi&sharepoi=1000954461&utm_medium=iframe",
    };

    const MapEmbed = ({location}: { location: string }) => {
        const mapUrl = blockMapUrls[location];

        if (!mapUrl) {
            return <p>❌ No map available for this location.</p>;
        }

        return (
            <iframe
                width="600"
                height="420"
                src={mapUrl}
                style={{border: "1px solid grey"}}
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
                    <h1 style={{fontSize: '3rem', fontWeight: 'bold'}}>{item.name}</h1>
                    <p>{item.location}</p>
                    <MapEmbed location={item.location}/>
                </IonText>
                <Footer/>
            </IonContent>


        </IonPage>
    );
};

export default LostItem;
