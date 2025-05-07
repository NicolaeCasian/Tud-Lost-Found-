import React, { useEffect, useState } from 'react'; 
import { Redirect, Route } from 'react-router-dom';
import {
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
import ManageItemPage from "./pages/ManageItemPage";
import Found from './pages/Found';
import LostItem from './pages/LostItem';
import Admin from './pages/Admin';
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

  useEffect(() => {
    const account = msalInstance.getActiveAccount();
    setIsAuthenticated(!!account);
  }, []);

  return (
    <MsalProvider instance={msalInstance}>
      {/* The background is set using the CSS variable for the entire app */}
      <IonApp style={{ "--background": "#274156" }}>
        <IonReactRouter>
          <IonRouterOutlet>
            {/* Public Routes */}
            <Route exact path="/login" component={Login} />
            <Route exact path="/faq" component={Faq} />
            <Route exact path="/manage-item" component={ManageItemPage}/>

            {/* Authenticated Routes */}
            {isAuthenticated ? (
              <Route
                path="/"
                render={() => (
                  <IonTabs>
                    <IonRouterOutlet>
                      <Route exact path="/tab1" component={Tab1} />
                      <Route exact path="/found" component={Found} />
                      <Route exact path="/tab2" component={Tab2} />
                      <Route exact path="/tab3" component={Tab3} />
                      <Route exact path="/Admin" component={Admin} />
                      {/* The item details route is placed here so that when a user on Tab1 clicks "View Item",
                          the LostItem page is rendered within the tab structure */}
                      <Route exact path="/item/:id" component={LostItem} />
                      <Redirect exact from="/" to="/tab1" />
                    </IonRouterOutlet>
                    <IonTabBar
                      slot="bottom"
                      style={{
                        "--background": "#274156",
                        "--border-color": "#ccc"
                      }}
                    >
                      <IonTabButton tab="tab1" href="/tab1" style={{ color: '#f5f5f5' }}>
                        <IonIcon aria-hidden="true" icon={searchOutline} />
                        <IonLabel>Items</IonLabel>
                      </IonTabButton>
                      <IonTabButton tab="tab2" href="/tab2" style={{ color: '#f5f5f5' }}>
                        <IonIcon aria-hidden="true" icon={addCircleOutline} />
                        <IonLabel>Report Items</IonLabel>
                      </IonTabButton>
                      <IonTabButton tab="tab3" href="/tab3" style={{ color: '#f5f5f5' }}>
                        <IonIcon aria-hidden="true" icon={personCircleOutline} />
                        <IonLabel>Account</IonLabel>
                      </IonTabButton>
                    </IonTabBar>
                  </IonTabs>
                )}
              />
            ) : (
              // If not authenticated, redirect to /login
              <Redirect exact from="/" to="/login" />
            )}
          </IonRouterOutlet>
        </IonReactRouter>
      </IonApp>
    </MsalProvider>
  );
};

export default App;
