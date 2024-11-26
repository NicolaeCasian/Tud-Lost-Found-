import {IonCol, IonContent, IonGrid, IonHeader, IonPage, IonRow, IonTitle, IonToolbar} from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import React from 'react';
import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle } from '@ionic/react';

import './Tab1.css';

const Tab1: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Lost items</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Lost items</IonTitle>
          </IonToolbar>
        </IonHeader>
          <IonGrid>
              <IonRow>
                  {Array.from({ length: 4 }).map((_, index) => (
                      <IonCol
                          size="12" // Full-width on small screens
                          sizeMd="6" // Half-width on medium+ screens
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
  );
};

export default Tab1;
