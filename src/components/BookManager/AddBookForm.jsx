import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Container, Typography } from '@mui/material';

const AddBookForm = () => {
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
      alert('Book added successfully!');
      // Reset form after successful submission
      setBookData({
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
    } catch (error) {
      console.error('Error adding book:', error);
      alert('Failed to add book. Please try again later.');
    }
  };

  return (
    <>
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
        <TextField
          margin="dense"
          fullWidth
          label="URL okładki"
          name="imageUrl"
          value={bookData.imageUrl}
          onChange={handleChange}
        />
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
        <Button type="submit" variant="contained" color="primary" sx={{marginTop: '10px'}}>
          Dodaj książke
        </Button>
      </form>
    </>
  );
};

export default AddBookForm;
