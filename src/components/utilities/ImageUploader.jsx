import React, { useState } from 'react';
import { Button, IconButton } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import axios from 'axios';

const ImageUploader = () => {
    const [imageUrl, setImageUrl] = useState('');

    const uploadImage = async (imageFile) => {
        const formData = new FormData();
        formData.append('image', imageFile);

        try {
            const response = await axios.post('https://api.imgbb.com/1/upload?key=b36b30164835e5f2799f91b0fc4f8acc', formData);
            return response.data.data.url;
        } catch (error) {
            console.error('Error uploading image:', error);
            return null;
        }
    };

    const handleImageUpload = async (event) => {
        const imageFile = event.target.files[0];
        const imageUrl = await uploadImage(imageFile);
        if (imageUrl) {
            setImageUrl(imageUrl);
        }
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
            {imageUrl && <img src={imageUrl} alt="Uploaded" />}
        </div>
    );
}

export default ImageUploader