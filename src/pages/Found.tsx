import React, {useState} from 'react';
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
    IonCol,
    IonGrid,
    IonRow,
} from '@ionic/react';
import { useHistory } from 'react-router-dom';
import './Tab2.css';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Found: React.FC = () => {
    const [form, setForm] = useState<{
        itemName: string;
        category: string;
        description: string;
        locationFound: string;
        dateFound: string;
        contactInfo: string;
        image: File | null; // Image field added here
    }>({
        itemName: '',
        category: '',
        description: '',
        locationFound: '',
        dateFound: '',
        contactInfo: '',
        image: null, // Initialize image as null
    });
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const history = useHistory();

    const [imagePreview, setImagePreview] = useState<string | null>(null); // Store the image preview URL

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]; // Use optional chaining to avoid null issues
        if (file) {
            const validTypes = ['image/jpeg', 'image/png', 'image/jpg, image/heic'];
            if (!validTypes.includes(file.type)) {
                alert('Only JPEG and PNG images are allowed.');
                return;
            }

            const imageURL = URL.createObjectURL(file);
            setImagePreview(imageURL); // Update the preview state

            // Update the form state with the image file
            setForm((prevForm) => ({
                ...prevForm,
                image: file,
            }));
        }
    };


    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setForm(prevForm => ({ ...prevForm, [name]: value }));
    };

    const handleSubmit = async () => {

        // Check if an image was selected and create FormData
        if (form.image) {
            const formData = new FormData();
            formData.append('type', 'found');
            formData.append('name', form.itemName);
            formData.append('category', form.category);
            formData.append('description', form.description);
            formData.append('location', form.locationFound);
            formData.append('dateLost', form.dateFound);
            formData.append('email', form.contactInfo);
            formData.append('image', form.image);

            try {
                const response = await fetch('https://tudlnf-serverv2-90ee51882713.herokuapp.com/api/report_lost', {
                    method: 'POST',
                    body: formData,
                });
                const data = await response.json();
                if (data.success) {
                    setAlertMessage('Your report has been submitted successfully. We will notify you if someone finds your lost item.');
                    setShowAlert(true);
                    // console.log('Inserted Item ID:', data.itemId);
                } else {
                    alert('Something went wrong!');
                }
            } catch (error) {
                console.error('Error submitting form:', error);
                alert('Failed to submit the report!');
            }
        } else {
            alert('Please upload an image!');
        }
    };

    const navigateToLostItems = () => {
        history.push('/tab1'); // Navigate to the Lost Items page
    };

    return (
        <IonPage>
            <Header />

            <IonContent className="ion-padding">
                <IonGrid>
                                <IonRow className="ion-justify-content-center">
                                    <IonCol size="6">
                                      <IonButton expand="full" color="primary" routerLink='/tab2'>Report Lost Item</IonButton>
                                 </IonCol>
                                    <IonCol size="6">
                                  <IonButton expand="full" color="secondary" routerLink='found'>Report Found Item</IonButton>
                                 </IonCol>
                                </IonRow>
                             </IonGrid>
                <IonCard>
                    <IonCardHeader>
                        <IonCardTitle>Report Found Item</IonCardTitle>
                    </IonCardHeader>
                    <IonCardContent>
                        <IonItem>
                            <IonLabel position="stacked">Item Name</IonLabel>
                            <IonInput
                                name="itemName"
                                value={form.itemName}
                                placeholder="Enter item name"
                                onIonChange={(e) => handleInputChange(e)}
                            />
                        </IonItem>

                        <IonItem>
                            <IonLabel position="stacked">Category</IonLabel>
                            <IonSelect
                                name="category"
                                value={form.category}
                                placeholder="Select category"
                                onIonChange={(e) => handleInputChange(e)}
                            >
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
                            <IonLabel position="stacked">Description</IonLabel>
                            <IonTextarea
                                name="description"
                                value={form.description}
                                placeholder="Describe the item"
                                onIonChange={(e) => handleInputChange(e)}
                            />
                        </IonItem>

                        <IonItem>
                            <IonLabel position="stacked">Contact Information</IonLabel>
                            <IonInput
                                name="contactInfo"
                                value={form.contactInfo}
                                type="email"
                                placeholder="Enter email"
                                onIonChange={(e) => handleInputChange(e)}
                            />
                        </IonItem>

                        <IonItem>
                            <IonLabel position="stacked">Location Found</IonLabel>
                            <IonSelect
                                name="locationFound"
                                value={form.locationFound}
                                placeholder="Select location"
                                onIonChange={(e) => handleInputChange(e)}
                            >
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
                            <IonDatetime
                                display-format="MM/DD/YYYY"
                                name="dateFound"
                                value={form.dateFound}
                                onIonChange={(e) => handleInputChange(e)}
                            />
                        </IonItem>

                        <IonItem>
                            <IonLabel position="stacked">Upload Image</IonLabel>
                            <input
                                type="file"
                                accept="image/png, image/jpeg, image/jpg, image/heic"
                                style={{display: 'none'}}
                                id="upload-image"
                                onChange={(e) => handleImageUpload(e)}
                            />
                            <IonButton expand="block" color="success" className="image-button"
                                       onClick={() => document.getElementById('upload-image')?.click()}>
                                Insert Image
                            </IonButton>
                        </IonItem>

                        {/* Display the image preview if it exists */}
                        {imagePreview && (
                            <div>
                                <p>Image Preview:</p>
                                <img src={imagePreview} alt="Image Preview" style={{ width: '200px', height: 'auto' }} />
                            </div>
                        )}

                        <IonButton expand="block" color="primary" onClick={handleSubmit} className="submit-button">
                            Submit Report
                        </IonButton>
                    </IonCardContent>
                </IonCard>

                <IonFooter className="footer-tips">
                    <IonCard>
                        <IonCardHeader>
                            <IonCardTitle>Tips for Reporting Lost Items:</IonCardTitle>
                        </IonCardHeader>
                        <IonCardContent>
                            <IonText>
                                <h4></h4>
                                <ul>
                                    <li>Be specific in your description.</li>
                                    <li>Include identifying features.</li>
                                    <li>Report the loss quickly.</li>
                                    <li>Check the found items section regularly.</li>
                                </ul>
                            </IonText>
                        </IonCardContent>
                    </IonCard>
                </IonFooter>
                <IonAlert
                    isOpen={showAlert}
                    onDidDismiss={() => setShowAlert(false)}
                    header={'Success!'}
                    message={alertMessage}
                    buttons={[
                        {
                            text: 'Go to Lost Items',
                            handler: () => navigateToLostItems(),
                        },
                        {
                            text: 'Okay',
                            role: 'cancel',
                        },
                    ]}
                />
                <Footer></Footer>
            </IonContent>
        </IonPage>
    );
};

export default Found;  