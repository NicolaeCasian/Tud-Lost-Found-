import React, {useEffect, useState} from 'react';
import {
    IonAlert,
    IonButton,
    IonCol,
    IonContent, IonGrid, IonImg,
    IonPage, IonRow, IonText,
} from '@ionic/react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import {useParams} from "react-router-dom";
import axios from "axios";
import moment from "moment";

const LostItem: React.FC = () => {
    const {id} = useParams<{ id: string }>(); // Get the item ID from the URL
    const [item, setItem] = useState<any>(null);
    const [showAlert, setShowAlert] = useState(false);
    const [dateLabel, setDateLabel] = useState('');
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
                width="100%"
                height="400px"
                src={mapUrl}
                style={{border: "1px solid grey"}}
                allow="geolocation"
            ></iframe>
        );
    };

    const getFormattedDate = (dateString: string) => {
        return moment(dateString).format('LLLL')
    }

    useEffect(() => {
        const fetchItem = async () => {
            try {
                const response = await axios.get(`${API_URL}/api/lost_items/${id}`);
                if (response.data.success) {
                    setItem(response.data.item);
                    setDateLabel('Date Lost');
                    return;
                }
            } catch (error) {
                console.warn('Item not found in lost items, checking found items...');
            }

            try {
                const response = await axios.get(`${API_URL}/api/found_items/${id}`);
                if (response.data.success) {
                    setItem(response.data.item);
                    setDateLabel('Date Found');
                }
            } catch (error) {
                console.error('Error fetching item from found items:', error);
            }
        };

        if (id) {
            fetchItem();
        }
    }, [id]);

    if (!item) {
        return <div>Loading...</div>;
    }

    return (
        <IonPage>
            <Header/>

            <IonContent fullscreen className="ion-padding">
                <div style={{maxWidth: '1500px', margin: '0 auto', padding: '0 1rem'}}>
                    <IonGrid>
                        <IonRow>
                            <IonCol size="12">
                                <div style={{
                                    backgroundColor: '#333',
                                    borderRadius: '12px',
                                    padding: '1.5rem',
                                    color: 'white',
                                    textAlign: 'center'
                                }}>
                                    <IonText style={{textAlign: 'left'}}>
                                        <h1 style={{fontSize: '2.5rem', fontWeight: 'bold'}}>{item.name}</h1>
                                        <p><strong style={{display: 'block'}}>Location:</strong> {item.location}</p>
                                        <p><strong style={{display: 'block'}}>Description:</strong> {item.description}
                                        </p>
                                        <p><strong style={{display: 'block'}}>Category:</strong> {item.category}</p>
                                        <p><strong
                                            style={{display: 'block'}}>{dateLabel}:</strong> {getFormattedDate(item.dateLost)}
                                        </p>
                                        <div style={{
                                            backgroundColor: '#555',
                                            height: '4px',
                                            margin: '1rem 0',
                                            borderRadius: '2px'
                                        }}></div>
                                        <IonButton expand="block" color="primary" style={{
                                            fontSize: '1rem',
                                            fontWeight: 'bold',
                                            padding: '.8rem',
                                            borderRadius: '8px',
                                            marginLeft: '15px',
                                            marginRight: '15px',
                                            minHeight: '45px'
                                        }}
                                                   onClick={() => setShowAlert(true)}
                                        >
                                            Show Contact Information
                                        </IonButton>
                                        <IonAlert
                                            isOpen={showAlert}
                                            onDidDismiss={() => setShowAlert(false)}
                                            header="Finder Contact"
                                            message={`Contact details: ${item.email}`}
                                            buttons={['OK']}
                                        />
                                    </IonText>
                                </div>
                            </IonCol>
                        </IonRow>

                        {/* Middle Section: Map & Image Side-by-Side */}
                        <IonRow>
                            {/* Map (Left) with Right Margin */}
                            <IonCol size="12" sizeMd="6">
                                <div style={{marginLeft: '20px'}}>
                                    <h2 style={{
                                        textAlign: 'center',
                                        marginBottom: '10px',
                                        fontWeight: 'bold'
                                    }}>Location</h2>
                                    <MapEmbed location={item.location}/>
                                </div>
                            </IonCol>

                            {/* Image (Right) with Left Margin */}
                            <IonCol size="12" sizeMd="6">
                                <div style={{
                                    marginRight: '20px',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center'
                                }}>
                                    <h2 style={{textAlign: 'center', marginBottom: '10px'}}>Item Image</h2>
                                    <IonImg
                                        src={item.image}
                                        alt={item.name}
                                        style={{
                                            height: '400px',
                                            maxWidth: '100%',
                                            objectFit: 'cover',
                                            display: 'block'
                                        }}
                                    />
                                </div>
                            </IonCol>
                        </IonRow>

                        {/* Bottom Section: Finding Tips (Full Width) */}
                        <IonRow>
                            <IonCol size="12">
                                <div style={{
                                    backgroundColor: '#333',
                                    borderRadius: '12px',
                                    padding: '1.5rem',
                                    color: 'white',
                                    textAlign: 'center',
                                    marginTop: '20px',
                                    marginBottom: '20px'
                                }}>
                                    <IonText style={{textAlign: 'left'}}>
                                        <h2 style={{fontSize: '2rem', fontWeight: 'bold', marginTop: '0'}}>Important
                                            Information</h2>
                                    </IonText>

                                    <IonGrid>
                                        <IonRow>
                                            {/* Left - Claiming Process */}
                                            <IonCol size="12" sizeMd={"6"}>
                                                <div style={{
                                                    backgroundColor: '#C49A3A', // Mustard Yellow
                                                    borderRadius: '12px',
                                                    padding: '.8rem',
                                                    color: 'white',
                                                    textAlign: 'left'
                                                }}>
                                                    <h3 style={{color: '#8A6E2F', fontWeight: 'bold'}}>Claiming
                                                        Process</h3>
                                                    <ul style={{paddingLeft: '1rem'}}>
                                                        <li>Provide valid proof of ownership.</li>
                                                        <li>Contact the finder within 3 days.</li>
                                                    </ul>
                                                </div>
                                            </IonCol>

                                            {/* Right - Collection Information */}
                                            <IonCol size="12" sizeMd={"6"}>
                                                <div style={{
                                                    backgroundColor: '#3A9A3F', // Green
                                                    borderRadius: '12px',
                                                    padding: '.8rem',
                                                    color: 'white',
                                                    textAlign: 'left'
                                                }}>
                                                    <h3 style={{color: '#276C2B', fontWeight: 'bold'}}>Collection
                                                        Information</h3>
                                                    <ul style={{paddingLeft: '1rem'}}>
                                                        <li>Meet in a safe, public place.</li>
                                                        <li>Bring identification if required.</li>
                                                    </ul>
                                                </div>
                                            </IonCol>
                                        </IonRow>
                                    </IonGrid>
                                </div>
                            </IonCol>
                        </IonRow>
                    </IonGrid>
                </div>

                <Footer/>
            </IonContent>
        </IonPage>
    );
};

export default LostItem;
