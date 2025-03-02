import React, { useState } from 'react';
import { IonItem, IonLabel, IonButton } from '@ionic/react';

interface ImageUploaderProps {
  imagePreview: string | null;
  onImageUpload: (file: File) => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ imagePreview, onImageUpload }) => {
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const validTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/heic'];
      if (!validTypes.includes(file.type)) {
        alert('Only JPEG and PNG images are allowed.');
        return;
      }
      onImageUpload(file);
    }
  };

  return (
    <IonItem>
      <IonLabel position="stacked">Upload Image</IonLabel>
      <input
        type="file"
        accept="image/png, image/jpeg, image/jpg, image/heic"
        style={{ display: 'none' }}
        id="upload-image"
        onChange={handleImageUpload}
      />
      <IonButton expand="block" color="success" className="image-button"
        onClick={() => document.getElementById('upload-image')?.click()}>
        Insert Image
      </IonButton>

      {/* Display the image preview if it exists */}
      {imagePreview && (
        <div>
          <p>Image Preview:</p>
          <img src={imagePreview} alt="Image Preview" style={{ width: '200px', height: 'auto' }} />
        </div>
      )}
    </IonItem>
  );
};

export default ImageUploader;
