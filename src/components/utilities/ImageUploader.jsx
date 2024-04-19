import React, { useState } from 'react';
import { Button } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import axios from 'axios';

const ImageUploader = ({ onImageUrlChange }) => {
    const [imageUrl, setImageUrl] = useState('');

    const uploadImage = async (imageFile) => {
        const formData = new FormData();
        formData.append('image', imageFile);

        try {
            const response = await axios.post('https://api.imgbb.com/1/upload?key=b36b30164835e5f2799f91b0fc4f8acc', formData);
            const imageUrl = response.data.data.url;
            setImageUrl(imageUrl);
            // Wywołanie funkcji przekazanej przez props, aby przekazać imageUrl do komponentu nadrzędnego
            onImageUrlChange(imageUrl);
        } catch (error) {
            console.error('Error uploading image:', error);
        }
    };

    const handleImageUpload = async (event) => {
        const imageFile = event.target.files[0];
        await uploadImage(imageFile);
    };

    return (
        <div>
            <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                style={{ display: 'none' }}
                id="imageInput"
            />
            <label htmlFor="imageInput">
                <Button
                    variant="contained"
                    component="span"
                    startIcon={<CloudUploadIcon />}
                >
                    Wybierz zdjęcie
                </Button>
            </label>
        </div>
    );
};

export default ImageUploader;
