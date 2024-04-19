import React, { useState } from 'react';
import axios from 'axios';
import Notification from '../Alert/Notification';
import { TextField, Button, Typography } from '@mui/material';
import ImageUploader from "../utilities/ImageUploader"

const AddBookForm = () => {
  const [imageUrl, setImageUrl] = useState('');

  const handleImageUrlChange = (url) => {
    setImageUrl(url);
    setBookData(prevState => ({
      ...prevState,
      imageUrl: url
    }));
  };

  const [bookData, setBookData] = useState({
    title: '',
    bookType: '',
    releaseDate: '',
    bookCategory: '',
    averageBookRating: '',
    imageUrl: '',
    bookAuthor: '',
    description: ''
  });
  const [notification, setNotification] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBookData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8080/book/save', bookData);
      setImageUrl(null);

      setBookData({                           // Reset form after successful submission
        bookId: '',
        bookType: '',
        title: '',
        releaseDate: '',
        bookCategory: '',
        averageBookRating: '',
        imageUrl: '',
        bookAuthor: '',
        description: ''
      });
      setNotification({ message: 'Udało się dodać książke.', severity: 'success' });
    } catch (error) {
      setNotification({ message: 'Nie udało się dodać książki.', severity: 'warning' });
    }
  };

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
        />
        <TextField
          margin="dense"
          fullWidth
          label="Typ Książki"
          name="bookType"
          value={bookData.bookType}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          fullWidth
          name="releaseDate"
          type="date"
          value={bookData.releaseDate}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          fullWidth
          label="Kategoria"
          name="bookCategory"
          value={bookData.bookCategory}
          onChange={handleChange}
        />
        {/* <TextField
          margin="dense"
          fullWidth
          label="URL okładki"
          name="imageUrl"
          value={bookData.imageUrl}
          onChange={handleChange}
        /> */}
        <ImageUploader onImageUrlChange={handleImageUrlChange} />
        <br></br>
        {imageUrl && <img src={imageUrl} style={{ maxWidth: '200px', maxHeight: '200px' }} alt="Uploaded" />}
        <TextField
          fullWidth
          margin="dense"
          width="30px"
          label="Autor"
          name="bookAuthor"
          value={bookData.bookAuthor}
          onChange={handleChange}
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
        />
        <Button type="submit" variant="contained" color="primary" sx={{ marginTop: '10px' }}>
          Dodaj książke
        </Button>
      </form>
    </>
  );
};

export default AddBookForm;
