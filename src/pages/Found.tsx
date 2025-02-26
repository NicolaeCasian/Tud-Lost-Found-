import React, { useState } from 'react';
import {
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    IonItem,
    IonLabel,
    IonInput,
    IonTextarea,
    IonDatetime,
    IonButton,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonFooter,
    IonText, IonSelectOption, IonSelect, IonAlert,
} from '@ionic/react';
import { useHistory } from 'react-router-dom';
import './Found.css';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Found: React.FC = () => {
    
    const [form, setForm] = useState({
        itemName: '',
        category: '',
        description: '',
        locationFound: '',
        dateLost: '',
        contactInfo: '',
        image: null,
    });
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const history = useHistory();
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const validTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/heic'];
            if (!validTypes.includes(file.type)) {
                alert('Only JPEG, PNG, and HEIC images are allowed.');
                return;
            }

            setImagePreview(URL.createObjectURL(file));
            setForm((prevForm) => ({ ...prevForm, image: file }));
        }
    };

    const handleInputChange = (e: any) => {
        const { name, value } = e.target;
        setForm(prevForm => ({ ...prevForm, [name]: value }));
    };

    const handleSubmit = async () => {
        if (!form.image) {
            alert('Please upload an image!');
            return;
        }

        const formData = new FormData();
        formData.append('name', form.itemName);
        formData.append('category', form.category);
        formData.append('description', form.description);
        formData.append('location', form.locationFound);
        formData.append('dateLost', new Date(form.dateLost).toLocaleDateString('en-US'));
        formData.append('email', form.contactInfo);
        formData.append('image', form.image);

        try {
            const response = await fetch('https://tudlnf-serverv2-90ee51882713.herokuapp.com/api/report_lost', {
                method: 'POST',
                body: formData,
            });
            const data = await response.json();
            if (data.success) {
                setAlertMessage('Your report has been submitted successfully. We will notify you if someone claims the item.');
                setShowAlert(true);
            } else {
                alert(data.message || 'Something went wrong!');
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            alert('Failed to submit the report!');
        }
    };

    return (
        <IonPage>
            <Header />
            <IonContent className="ion-padding">
                <IonCard>
                    <IonCardHeader>
                        <IonCardTitle>Report Found Item</IonCardTitle>
                    </IonCardHeader>
                    <IonCardContent>
                        <IonItem>
                            <IonLabel position="stacked">Item Name</IonLabel>
                            <IonInput name="itemName" value={form.itemName} placeholder="Enter item name" onIonChange={handleInputChange} />
                        </IonItem>

                        <IonItem>
                            <IonLabel position="stacked">Category</IonLabel>
                            <IonSelect name="category" value={form.category} placeholder="Select category" onIonChange={(e) => setForm(prevForm => ({ ...prevForm, category: e.detail.value }))}>
                                <IonSelectOption value="Electronics">Electronics</IonSelectOption>
                                <IonSelectOption value="Clothes">Clothes</IonSelectOption>
                                <IonSelectOption value="Backpacks">Backpacks</IonSelectOption>
                                <IonSelectOption value="Keys">Keys</IonSelectOption>
                                <IonSelectOption value="Wallets">Wallets</IonSelectOption>
                                <IonSelectOption value="ID Cards">ID Cards</IonSelectOption>
                                <IonSelectOption value="Other">Other</IonSelectOption>
                            </IonSelect>
                        </IonItem>

                        <IonItem>
                            <IonLabel position="stacked">Location Found</IonLabel>
                            <IonSelect name="locationFound" value={form.locationFound} placeholder="Select location" onIonChange={(e) => setForm(prevForm => ({ ...prevForm, locationFound: e.detail.value }))}>
                                <IonSelectOption value="A Block">A Block</IonSelectOption>
                                <IonSelectOption value="B Block">B Block</IonSelectOption>
                                <IonSelectOption value="C Block">C Block</IonSelectOption>
                                <IonSelectOption value="D Block">D Block</IonSelectOption>
                                <IonSelectOption value="E Block">E Block</IonSelectOption>
                                <IonSelectOption value="F Block">F Block</IonSelectOption>
                                <IonSelectOption value="Sports Block">Sports Block</IonSelectOption>
                                <IonSelectOption value="Other">Other</IonSelectOption>
                            </IonSelect>
                        </IonItem>

                        <IonItem>
                            <IonLabel position="stacked">Date Found</IonLabel>
                            <IonDatetime displayFormat="MM/DD/YYYY" name="dateLost" value={form.dateLost} onIonChange={(e) => setForm(prevForm => ({ ...prevForm, dateLost: e.detail.value }))} />
                        </IonItem>

                        <IonItem>
                            <IonLabel position="stacked">Upload Image</IonLabel>
                            <input type="file" accept="image/png, image/jpeg, image/jpg, image/heic" style={{ display: 'none' }} id="upload-image" onChange={handleImageUpload} />
                            <IonButton expand="block" color="success" onClick={() => document.getElementById('upload-image')?.click()}>
                                Insert Image
                            </IonButton>
                        </IonItem>

                        {imagePreview && <img src={imagePreview} alt="Image Preview" style={{ width: '200px', height: 'auto' }} />}

                        <IonButton expand="block" color="primary" onClick={handleSubmit}>Submit Report</IonButton>
                    </IonCardContent>
                </IonCard>
                <IonAlert isOpen={showAlert} onDidDismiss={() => setShowAlert(false)} header={'Success!'} message={alertMessage} buttons={[{ text: 'Okay', role: 'cancel' }]} />
                <Footer />
            </IonContent>
        </IonPage>
    );
};

export default Found;
