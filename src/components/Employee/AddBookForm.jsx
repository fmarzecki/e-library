import React, { useState } from 'react';
import axios from 'axios';
import Notification from '../Alert/Notification';
import { TextField, Button, Typography, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import ImageUploader from "../utilities/ImageUploader";

const AddBookForm = () => {
  const [imageUrl, setImageUrl] = useState('');
  const [notification, setNotification] = useState(null);
  const [errors, setErrors] = useState({}); // Definition of error state

  const [bookData, setBookData] = useState({
    title: '',
    bookCategory: '',
    imageUrl: '',
    bookAuthor: '',
    description: ''
  });

  const handleImageUrlChange = (url) => {
    setImageUrl(url);
    setBookData(prevState => ({
      ...prevState,
      imageUrl: url
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBookData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const validateForm = () => {
    let valid = true;
    const errors = {};

    // Validation for description
    if (bookData.description.length < 30) {
      errors.description = "Opis musi mieć co najmniej 30 znaków.";
      valid = false;
    }

    setErrors(errors);
    return valid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    try {
      const apiKey = localStorage.getItem('apiKey'); // Ensure you have an API key stored
      await axios.post(`http://localhost:8080/books/save`, {
        title: bookData.title,
        bookCategory: bookData.bookCategory,
        imageUrl: bookData.imageUrl,
        bookAuthor: bookData.bookAuthor,
        description: bookData.description
      }, {
        headers: {
          'Authorization': `Bearer ${apiKey}` // Include the API key if needed
        }
      });
      
      // Reset form after successful submission
      setBookData({
        title: '',
        bookCategory: '',
        imageUrl: '',
        bookAuthor: '',
        description: ''
      });
      setImageUrl(''); // Reset the image URL
      setNotification({ message: 'Udało się dodać książkę.', severity: 'success' });
    } catch (error) {
      console.error('Error adding book:', error);
      setNotification({ message: 'Nie udało się dodać książki.', severity: 'warning' });
    }
  };

  const bookCategories = ["fantasy", "science_fiction", "romance", "thriller", "drama", "horror", "crime", "education"];

  return (
    <>
      {notification && (
        <Notification message={notification.message} severity={notification.severity} setOpenProp={setNotification} />
      )}
      <Typography variant="h4" gutterBottom>Dodaj książkę</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          margin="dense"
          fullWidth
          label="Tytuł"
          name="title"
          value={bookData.title}
          onChange={handleChange}
          error={!!errors.title}
          helperText={errors.title}
          required
        />
        <FormControl fullWidth margin="dense" required>
          <InputLabel>Kategoria</InputLabel>
          <Select
            name="bookCategory"
            value={bookData.bookCategory}
            onChange={handleChange}
          >
            {bookCategories.map((category) => (
              <MenuItem key={category} value={category}>
                {category}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <ImageUploader onImageUrlChange={handleImageUrlChange} />
        <br />
        {imageUrl && <img src={imageUrl} style={{ maxWidth: '200px', maxHeight: '200px' }} alt="Uploaded" />}
        <TextField
          fullWidth
          margin="dense"
          label="Autor"
          name="bookAuthor"
          value={bookData.bookAuthor}
          onChange={handleChange}
          error={!!errors.bookAuthor}
          helperText={errors.bookAuthor}
          required
        />
        <TextField
          margin="dense"
          fullWidth
          label="Opis"
          name="description"
          value={bookData.description}
          onChange={handleChange}
          multiline
          rows={4}
          error={!!errors.description}
          helperText={errors.description}
          required
        />
        <Button type="submit" variant="contained" color="primary" sx={{ marginTop: '10px' }}>
          Dodaj książkę
        </Button>
      </form>
    </>
  );
};

export default AddBookForm;
