import React, { useEffect, useState } from 'react';
import {
  IonAlert,
  IonButton,
  IonCol,
  IonContent, IonFooter,
  IonGrid,
  IonImg,
  IonPage,
  IonRow,
  IonText, IonToolbar,
} from '@ionic/react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';

const LostItem: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [item, setItem] = useState<any>(null);
  const [showAlert, setShowAlert] = useState(false);
  const [dateLabel, setDateLabel] = useState('');
  const API_URL = import.meta.env.VITE_API_URL || 'https://tudlnf-serverv2-90ee51882713.herokuapp.com';

  const blockMapUrls: { [key: string]: string } = {
    'A Block': 'https://use.mazemap.com/embed.html#v=1&config=TUDUBLIN&zlevel=1&center=-6.376608,53.406412&zoom=18&campusid=736&sharepoitype=poi&sharepoi=1000954451&utm_medium=iframe',
    'B Block': 'https://use.mazemap.com/embed.html#v=1&config=TUDUBLIN&zlevel=1&center=-6.379801,53.406413&zoom=18&campusid=736&sharepoitype=poi&sharepoi=1000954452&utm_medium=iframe',
    'C Block': 'https://use.mazemap.com/embed.html#v=1&config=TUDUBLIN&zlevel=1&center=-6.378812,53.405410&zoom=18&campusid=736&sharepoitype=poi&sharepoi=1000954453&utm_medium=iframe',
    'D Block': 'https://use.mazemap.com/embed.html#v=1&config=TUDUBLIN&zlevel=1&center=-6.376794,53.405619&zoom=18.2&campusid=736&sharepoitype=poi&sharepoi=1000954458&utm_medium=iframe',
    'E Block': 'https://use.mazemap.com/embed.html#v=1&config=TUDUBLIN&zlevel=1&center=-6.377395,53.405211&zoom=18&campusid=736&sharepoitype=poi&sharepoi=1000954459&utm_medium=iframe',
    'F Block': 'https://use.mazemap.com/embed.html#v=1&config=TUDUBLIN&zlevel=1&center=-6.378331,53.404717&zoom=18&campusid=736&sharepoitype=poi&sharepoi=1000954460&utm_medium=iframe',
    'G Block': 'https://use.mazemap.com/embed.html#v=1&config=TUDUBLIN&zlevel=1&center=-6.379114,53.404456&zoom=18&campusid=736&sharepoitype=poi&sharepoi=1002536126&utm_medium=iframe',
    'H Block': 'https://use.mazemap.com/embed.html#v=1&config=TUDUBLIN&zlevel=1&center=-6.382013,53.404626&zoom=18&campusid=736&sharepoitype=poi&sharepoi=1000954462&utm_medium=iframe',
    'S Block': 'https://use.mazemap.com/embed.html#v=1&config=TUDUBLIN&zlevel=1&center=-6.381390,53.405789&zoom=18&campusid=736&sharepoitype=poi&sharepoi=1000821154&utm_medium=iframe',
    'Connect Building': 'https://use.mazemap.com/embed.html#v=1&config=TUDUBLIN&zlevel=1&center=-6.379618,53.404711&zoom=18&campusid=736&sharepoitype=poi&sharepoi=1000954461&utm_medium=iframe',
  };

  const MapEmbed = React.memo(({ location }: { location: string }) => {
    const mapUrl = blockMapUrls[location];
    if (!mapUrl) return <p>❌ No map available for this location.</p>;
    return (
      <div style={{ width: '100%', maxWidth: '850px', height: '350px', overflow: 'hidden', borderRadius: '8px', margin: '0 auto' }}>
        <iframe
          width="100%"
          height="100%"
          src={mapUrl}
          style={{ border: 'none' }}
          allow="geolocation"
        />
      </div>
    );
  });

  const getFormattedDate = (dateString: string) => moment(dateString).format('LLLL');

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/lost_items/${id}`);
        if (response.data.success) {
          setItem(response.data.item);
          setDateLabel('Date Lost');
          return;
        }
      } catch {
        console.warn('Not in lost; checking found...');
      }
      try {
        const response = await axios.get(`${API_URL}/api/found_items/${id}`);
        if (response.data.success) {
          setItem(response.data.item);
          setDateLabel('Date Found');
        }
      } catch (error) {
        console.error(error);
      }
    };
    if (id) fetchItem();
  }, [id, API_URL]);

  if (!item) return <div>Loading...</div>;

  return (
    <IonPage>
      <Header />
      <IonContent fullscreen>
        <div style={{ maxWidth: '850px', margin: '0 auto', padding: '0 1rem'}}>
          <IonGrid>
            {/* Top Section: Image First & Description */}
            <IonRow>
              <IonCol size="12" style={{ textAlign: 'center' }}>
                <div style={{ width: '100%', maxWidth: '850px', height: '350px', overflow: 'hidden', borderRadius: '8px', margin: '0 auto 1rem' }}>
                  <IonImg
                    src={item.image}
                    alt={item.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                  />
                </div>
                <div
                  style={{
                    backgroundColor: '#F8F8F8',
                    borderRadius: '12px',
                    padding: '1rem',
                    color: 'black',
                    textAlign: 'left',
                  }}
                >
                  <h1 style={{ fontSize: '2rem', fontWeight: 'bold' }}>{item.name}</h1>
                  <p><strong>Location:</strong> {item.location}</p>
                  <p><strong>Description:</strong> {item.description}</p>
                  <p><strong>Category:</strong> {item.category}</p>
                  <p><strong>{dateLabel}:</strong> {getFormattedDate(item.dateLost)}</p>
                  <div
                    style={{
                      backgroundColor: '#555',
                      height: '3px',
                      width: '100%',
                      margin: '1rem 0',
                      borderRadius: '2px',
                    }}
                  />
                  <IonButton expand="block" color="primary" onClick={() => setShowAlert(true)}>
                    Show Contact Information
                  </IonButton>
                  <IonAlert
                    isOpen={showAlert}
                    onDidDismiss={() => setShowAlert(false)}
                    header="Finder Contact"
                    message={`Contact details: ${item.email}`}
                    buttons={['OK']}
                  />
                </div>
              </IonCol>
            </IonRow>

            {/* Middle Section: Map Only */}
            <IonRow>
              <IonCol size="12">
                <h2 style={{ textAlign: 'center', margin: '1rem 0', fontWeight: 'bold' }}>
                  Location
                </h2>
                <MapEmbed location={item.location} />
              </IonCol>
            </IonRow>

            {/* Bottom Section: Finding Tips */}
            <IonRow>
              <IonCol size="12">
                <div
                  style={{
                    backgroundColor: '#F8F8F8',
                    borderRadius: '12px',
                    padding: '1rem',
                    color: 'black',
                    textAlign: 'left',
                    marginTop: '20px',
                  }}
                >
                  <h2 style={{ fontSize: '1.75rem', fontWeight: 'bold', marginTop: '0' }}>
                    Important Information
                  </h2>
                  <IonGrid>
                    <IonRow>
                      {/* Claiming Process */}
                      <IonCol size="12" sizeMd="6">
                        <div
                          style={{
                            backgroundColor: '#C49A3A',
                            borderRadius: '12px',
                            padding: '0.75rem',
                            color: 'white',
                            textAlign: 'left',
                          }}
                        >
                          <h3 style={{ color: '#8A6E2F', fontWeight: 'bold' }}>
                            Claiming Process
                          </h3>
                          <ul style={{ paddingLeft: '1rem', margin: 0 }}>
                            <li>Provide valid proof of ownership.</li>
                            <li>Contact the finder within 3 days.</li>
                          </ul>
                        </div>
                      </IonCol>
                      {/* Collection Information */}
                      <IonCol size="12" sizeMd="6">
                        <div
                          style={{
                            backgroundColor: '#3A9A3F',
                            borderRadius: '12px',
                            padding: '0.75rem',
                            color: 'white',
                            textAlign: 'left',
                          }}
                        >
                          <h3 style={{ color: '#276C2B', fontWeight: 'bold' }}>
                            Collection Information
                          </h3>
                          <ul style={{ paddingLeft: '1rem', margin: 0 }}>
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
        <IonFooter>
          <Footer/>
        </IonFooter>
      </IonContent>
    </IonPage>
  );
};

export default LostItem;
