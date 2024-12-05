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
    IonText, IonSelectOption, IonSelect,
} from '@ionic/react';
import './Tab2.css';

const Tab2: React.FC = () => {
    const [form, setForm] = useState<{
        itemName: string;
        category: string;
        description: string;
        locationLost: string;
        dateLost: string;
        contactInfo: string;
        image: File | null; // Image field added here
    }>({
        itemName: '',
        category: '',
        description: '',
        locationLost: '',
        dateLost: '',
        contactInfo: '',
        image: null, // Initialize image as null
    });

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
        console.log('Submitted Form Data:', form);

        // Check if an image was selected and create FormData
        if (form.image) {
            const formData = new FormData();
            formData.append('name', form.itemName);
            formData.append('category', form.category);
            formData.append('description', form.description);
            formData.append('location', form.locationLost);
            formData.append('dateLost', form.dateLost);
            formData.append('email', form.contactInfo);
            formData.append('image', form.image);

            try {
                const response = await fetch('/api/report_lost', {
                    method: 'POST',
                    body: formData,
                });

                const data = await response.json();
                if (data.success) {
                    alert('Report submitted successfully!');
                    console.log('Inserted Item ID:', data.itemId);
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

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Report Lost Item</IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonContent className="ion-padding">
                <IonCard>
                    <IonCardHeader>
                        <IonCardTitle>Report Lost Item</IonCardTitle>
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
                                <IonSelectOption value="charger">Electronics</IonSelectOption>
                                <IonSelectOption value="backpack">Clothes</IonSelectOption>
                                <IonSelectOption value="keys">Keys</IonSelectOption>
                                <IonSelectOption value="wallet">Wallets</IonSelectOption>
                                <IonSelectOption value="IDCard">ID Cards</IonSelectOption>
                                <IonSelectOption value="other">Other</IonSelectOption>
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
                            <IonLabel position="stacked">Location Lost</IonLabel>
                            <IonSelect
                                name="locationLost"
                                value={form.locationLost}
                                placeholder="Select location"
                                onIonChange={(e) => handleInputChange(e)}
                            >
                                <IonSelectOption value="blockA">A Block</IonSelectOption>
                                <IonSelectOption value="blockB">B Block</IonSelectOption>
                                <IonSelectOption value="blockC">C Block</IonSelectOption>
                                <IonSelectOption value="blockD">D Block</IonSelectOption>
                                <IonSelectOption value="blockE">E Block</IonSelectOption>
                                <IonSelectOption value="blockF">F Block</IonSelectOption>
                                <IonSelectOption value="sportsBlock">Sports Block</IonSelectOption>
                                <IonSelectOption value="other">Other</IonSelectOption>
                            </IonSelect>
                        </IonItem>

                        <IonItem>
                            <IonLabel position="stacked">Date Lost</IonLabel>
                            <IonDatetime
                                display-format="MM/DD/YYYY"
                                name="dateLost"
                                value={form.dateLost}
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
            </IonContent>
        </IonPage>
    );
};

export default Tab2;  //cecd