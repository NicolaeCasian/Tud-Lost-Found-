import React, {useEffect, useState} from 'react';

import {
    IonAccordion,
    IonAccordionGroup,
    IonButton,
    IonButtons, IonCheckbox,
    IonCol,
    IonContent,
    IonGrid,
    IonHeader, IonItem,
    IonLabel, IonList,
    IonMenu, IonMenuButton, IonMenuToggle,
    IonPage, IonRouterLink,
    IonRow,
    IonSplitPane,
    IonTitle,
    IonToolbar,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardSubtitle,
    IonCardTitle
} from '@ionic/react';
import {useMsal} from '@azure/msal-react';
import {useHistory} from 'react-router-dom';
import axios from 'axios';

import './Tab1.css';

const Tab1: React.FC = () => {
    const {instance} = useMsal();
    const history = useHistory();
    const [lostItems, setLostItems] = useState<any[]>([]);

    useEffect(() => {
        const fetchLostItems = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/lost_items');
                if (response.data.success) {
                    setLostItems(response.data.items);
                }
            } catch (error) {
                console.error('Error fetching lost items:', error);
            }
        };
        fetchLostItems();
    }, []);

    const logout = async () => {
        try {
            console.log('Logging out...');
            await instance.logoutPopup();
            console.log('Logout successful.');

            history.push('/login');
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    return (
        <IonPage className={"tab1"}>
            <IonSplitPane contentId="main-content">
                {/* Side Navigation (Filters) */}
                <IonMenu contentId="main-content" type="overlay">
                    <IonHeader>
                        <IonToolbar>
                            <IonTitle>Filters</IonTitle>
                        </IonToolbar>
                    </IonHeader>
                    <IonContent>
                        <IonList>
                            <IonAccordionGroup>
                                <IonAccordion value="type">
                                    <IonItem slot="header">
                                        <IonLabel>Type</IonLabel>
                                    </IonItem>
                                    <div slot="content">
                                        <IonItem lines="none">
                                            <IonLabel>Jackets</IonLabel>
                                            <IonCheckbox slot="end"/>
                                        </IonItem>
                                        <IonItem lines="none">
                                            <IonLabel>Keys</IonLabel>
                                            <IonCheckbox slot="end"/>
                                        </IonItem>
                                        <IonItem lines="none">
                                            <IonLabel>Chargers</IonLabel>
                                            <IonCheckbox slot="end"/>
                                        </IonItem>
                                    </div>
                                </IonAccordion>

                                {/* Location Filter Accordion */}
                                <IonAccordion value="location">
                                    <IonItem slot="header">
                                        <IonLabel>Location</IonLabel>
                                    </IonItem>
                                    <div slot="content">
                                        <IonItem lines="none">
                                            <IonLabel>Block A</IonLabel>
                                            <IonCheckbox slot="end"/>
                                        </IonItem>
                                        <IonItem lines="none">
                                            <IonLabel>Block B</IonLabel>
                                            <IonCheckbox slot="end"/>
                                        </IonItem>
                                        <IonItem lines="none">
                                            <IonLabel>Block C</IonLabel>
                                            <IonCheckbox slot="end"/>
                                        </IonItem>
                                        <IonItem lines="none">
                                            <IonLabel>Block D</IonLabel>
                                            <IonCheckbox slot="end"/>
                                        </IonItem>
                                        <IonItem lines="none">
                                            <IonLabel>Block E</IonLabel>
                                            <IonCheckbox slot="end"/>
                                        </IonItem>
                                        <IonItem lines="none">
                                            <IonLabel>Block F</IonLabel>
                                            <IonCheckbox slot="end"/>
                                        </IonItem>
                                    </div>
                                </IonAccordion>
                            </IonAccordionGroup>
                        </IonList>
                    </IonContent>
                </IonMenu>

                {/* Main Content */}
                <IonPage id="main-content">
                    {/* Top Navigation */}
                    <IonHeader>
                        <IonToolbar>
                            {/* Burger Button for Medium/Small Screens */}
                            <IonButtons slot="start">
                                <IonMenuButton/>
                            </IonButtons>
                            <IonTitle>Lost Items</IonTitle>
                            <IonButtons slot={"end"}>
                                <IonRouterLink href={"/Tab2"}>
                                    <IonButton>
                                        Report Lost Item
                                    </IonButton>
                                    <IonButton onClick={logout}>Logout</IonButton>
                                </IonRouterLink>
                            </IonButtons>
                        </IonToolbar>
                    </IonHeader>

                    <IonContent fullscreen>
                        {/* Card Grid */}
                        <IonGrid>
                            <IonRow>
                                {lostItems.length > 0 ? (
                                    lostItems.map((item, index) => (
                                        <IonCol
                                            size="12"
                                            sizeLg="6"
                                            sizeMd="6"
                                            sizeXl="4"
                                            key={index}
                                        >
                                            <IonCard>
                                                <img
                                                    alt={item.name}
                                                    src={item.image}
                                                />
                                                <IonCardHeader style={{ borderBottom: '1px solid #ddd', marginBottom: '10px'}}>
                                                    <IonCardTitle>{item.name}</IonCardTitle>
                                                    <IonCardSubtitle>{item.category}</IonCardSubtitle>
                                                </IonCardHeader>
                                                <IonCardContent>
                                                    <p style={{ marginBottom: '8px' }}>{item.description}</p>
                                                    <p style={{ fontWeight: 'bold', fontSize:'1.1rem' }}>Location lost: {item.location}</p>
                                                </IonCardContent>
                                                <IonButton>View Item</IonButton>
                                            </IonCard>
                                        </IonCol>
                                    ))
                                ) : (
                                    <IonCol size="12">
                                        <p>No lost items found.</p>
                                    </IonCol>
                                )}
                            </IonRow>
                        </IonGrid>
                    </IonContent>
                </IonPage>
            </IonSplitPane>
        </IonPage>
    );
};

export default Tab1;

//Aaron was here