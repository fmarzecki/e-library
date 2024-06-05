import React, { useState } from 'react';
import axios from 'axios';
import Notification from '../Alert/Notification';
import { TextField, Button, Typography, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import ImageUploader from "../utilities/ImageUploader";

const AddBookForm = () => {
  const [imageUrl, setImageUrl] = useState('');
  const [notification, setNotification] = useState(null);

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

  let apiKey = localStorage.getItem('apiKey')
  let user = JSON.parse(localStorage.getItem('user'))
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(bookData)
      await axios.post(`http://localhost:8080/book/save/apiKey=${apiKey}`, bookData);
      setImageUrl(null);

      setBookData({                           // Reset form after successful submission
        bookType: '',
        title: '',
        releaseDate: '',
        bookCategory: '',
        averageBookRating: '',
        imageUrl: '',
        bookAuthor: '',
        description: ''
      });

      setNotification({ message: 'Udało się dodać książkę.', severity: 'success' });
    } catch (error) {
      setNotification({ message: 'Nie udało się dodać książki.', severity: 'warning' });
    }
  };

  const bookCategories = ["fantasy", "science_fiction", "romance", "thriller", "drama", "horror", "crime", "education"];
  const bookTypes = ["paperback", "hardcover", "ebook", "audiobook"];

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
        <FormControl fullWidth margin="dense">
          <InputLabel>Typ Książki</InputLabel>
          <Select
            name="bookType"
            value={bookData.bookType}
            onChange={handleChange}
          >
            {bookTypes.map((type) => (
              <MenuItem key={type} value={type}>
                {type}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          margin="dense"
          fullWidth
          name="releaseDate"
          type="date"
          value={bookData.releaseDate}
          onChange={handleChange}
        />
        <FormControl fullWidth margin="dense">
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
          Dodaj książkę
        </Button>
      </form>
    </>
  );
};

export default AddBookForm;
