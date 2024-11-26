import {
    IonCol,
    IonContent,
    IonGrid,
    IonHeader, IonItem,
    IonLabel, IonList,
    IonMenu, IonMenuToggle,
    IonPage,
    IonRow,
    IonSplitPane,
    IonTitle,
    IonToolbar
} from '@ionic/react';
import React from 'react';
import {IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle} from '@ionic/react';

import './Tab1.css';

const Tab1: React.FC = () => {
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
                            <IonMenuToggle auto-hide="false">
                                <IonItem button>
                                    <IonLabel>Category 1</IonLabel>
                                </IonItem>
                                <IonItem button>
                                    <IonLabel>Category 2</IonLabel>
                                </IonItem>
                                <IonItem button>
                                    <IonLabel>Category 3</IonLabel>
                                </IonItem>
                                <IonItem button>
                                    <IonLabel>Category 4</IonLabel>
                                </IonItem>
                            </IonMenuToggle>
                        </IonList>
                    </IonContent>
                </IonMenu>

                {/* Main Content */}
                <IonPage id="main-content">
                    {/* Top Navigation */}
                    <IonHeader>
                        <IonToolbar>
                            <IonTitle>Lost Items</IonTitle>
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
