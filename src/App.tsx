import React, { useEffect, useState } from 'react';
import { Redirect, Route } from 'react-router-dom';
import {
  IonAlert,
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact,
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { searchOutline, addCircleOutline, personCircleOutline } from 'ionicons/icons';
import Tab1 from './pages/Tab1';
import Tab2 from './pages/Tab2';
import Tab3 from './pages/Tab3';
import Login from './pages/Login';
import Faq from './pages/faq';
import Found from './pages/Found'; // Import the Found component
import { MsalProvider } from "@azure/msal-react";
import { PublicClientApplication } from "@azure/msal-browser";
import { msalConfig } from './pages/authConfig';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';
import './theme/variables.css';
import '@ionic/react/css/palettes/dark.system.css';

setupIonicReact();

// Initialize MSAL instance
const msalInstance = new PublicClientApplication(msalConfig);

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!msalInstance.getActiveAccount()
  );
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    const account = msalInstance.getActiveAccount();
    setIsAuthenticated(!!account);
  }, []);

  return (
    <MsalProvider instance={msalInstance}>
      <IonApp>
        <IonReactRouter>
          <IonRouterOutlet>
            <Route exact path="/login">
              <Login />
            </Route>
            <Route exact path="/faq">
              <Faq />
            </Route>
            {isAuthenticated ? (
              <IonTabs>
                <IonRouterOutlet>
                  <Route exact path="/tab1">
                    <Tab1 />
                  </Route>
                  <Route exact path="/found">
                    <Found />
                  </Route>
                  <Route exact path="/tab2">
                    <Tab2 />
                  </Route>
                  <Route exact path="/tab3">
                    <Tab3 />
                  </Route>
                  <Route exact path="/">
                    <Redirect to="/tab1" />
                  </Route>
                </IonRouterOutlet>

                <IonTabBar slot="bottom">
                  <IonTabButton tab="tab1" href="/tab1">
                    <IonIcon icon={searchOutline} />
                    <IonLabel>Items</IonLabel>
                  </IonTabButton>
                  <IonTabButton tab="tab2" href="/tab2">
                    <IonIcon icon={addCircleOutline} />
                    <IonLabel>Report Items</IonLabel>
                  </IonTabButton>
                  <IonTabButton tab="tab3" href="/tab3">
                    <IonIcon icon={personCircleOutline} />
                    <IonLabel>Account</IonLabel>
                  </IonTabButton>
                </IonTabBar>
              </IonTabs>
            ) : (
              <Redirect to="/login" />
            )}
            <IonAlert
              isOpen={showAlert}
              onDidDismiss={() => setShowAlert(false)}
              header={'Alert'}
              message={'This is an alert message.'}
              buttons={['OK']}
            />
          </IonRouterOutlet>
        </IonReactRouter>
      </IonApp>
    </MsalProvider>
  );
};

export default App;
