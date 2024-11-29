import React from 'react';
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
import { useMsal } from '@azure/msal-react';
import { useHistory } from 'react-router-dom';

import './Tab1.css';

const Tab1: React.FC = () => {
    const { instance } = useMsal();
    const history = useHistory(); // Use navigate for routing

    const logout = async () => {
        try {
            console.log('Logging out...');
            await instance.logoutPopup();
            console.log('Logout successful.');

            // Redirect to login page after logout
            history.push('/login');
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    return (
        <IonPage>
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
                                            <IonCheckbox slot="end" />
                                        </IonItem>
                                        <IonItem lines="none">
                                            <IonLabel>Keys</IonLabel>
                                            <IonCheckbox slot="end" />
                                        </IonItem>
                                        <IonItem lines="none">
                                            <IonLabel>Chargers</IonLabel>
                                            <IonCheckbox slot="end" />
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
                                            <IonCheckbox slot="end" />
                                        </IonItem>
                                        <IonItem lines="none">
                                            <IonLabel>Block B</IonLabel>
                                            <IonCheckbox slot="end" />
                                        </IonItem>
                                        <IonItem lines="none">
                                            <IonLabel>Block C</IonLabel>
                                            <IonCheckbox slot="end" />
                                        </IonItem>
                                        <IonItem lines="none">
                                            <IonLabel>Block D</IonLabel>
                                            <IonCheckbox slot="end" />
                                        </IonItem>
                                        <IonItem lines="none">
                                            <IonLabel>Block E</IonLabel>
                                            <IonCheckbox slot="end" />
                                        </IonItem>
                                        <IonItem lines="none">
                                            <IonLabel>Block F</IonLabel>
                                            <IonCheckbox slot="end" />
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
                                <IonMenuButton />
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
                                {Array.from({ length: 6 }).map((_, index) => (
                                    <IonCol
                                        size="12"
                                        sizeMd="6"
                                        sizeLg="4"
                                        key={index}
                                    >
                                        <IonCard>
                                            <img
                                                alt="Silhouette of mountains"
                                                src="https://ionicframework.com/docs/img/demos/card-media.png"
                                            />
                                            <IonCardHeader>
                                                <IonCardTitle>Card Title {index + 1}</IonCardTitle>
                                                <IonCardSubtitle>Card Subtitle {index + 1}</IonCardSubtitle>
                                            </IonCardHeader>
                                            <IonCardContent>
                                                I'm baby knausgaard brunch jianbing, butcher literally food truck palo santo gastropub irony lomo ugh shaman af roof party dolore.
                                            </IonCardContent>
                                        </IonCard>
                                    </IonCol>
                                ))}
                            </IonRow>
                        </IonGrid>
                    </IonContent>
                </IonPage>
            </IonSplitPane>
        </IonPage>
    );
};

export default Tab1;
