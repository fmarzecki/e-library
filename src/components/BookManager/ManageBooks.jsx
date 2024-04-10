import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Typography, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, TextField } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [editMode, setEditMode] = useState(null);
  const [editedBook, setEditedBook] = useState({
    bookId: '',
    title: '',
    releaseDate: '',
    bookAuthor: ''
  });

  const fetchBooks = async () => {
    try {
      const response = await axios.get('http://localhost:8080/book/getAll');
      setBooks(response.data.data.Books);
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleDelete = async (bookId) => {
    try {
      await axios.delete('http://localhost:8080/book/delete', { data: { bookId } });
      alert('Usunięto książke!');
      // Refresh the list after deletion
      fetchBooks();
    } catch (error) {
      console.error('Error deleting book:', error);
      alert('Nie udało się usunąć książki``.');
    }
  };

  const handleEdit = (book) => {
    setEditedBook(book);
    setEditMode(book.bookId);
  };

  const handleSave = async () => {
    try {
      await axios.post('http://localhost:8080/book/save', editedBook);
      alert('Zaktualizowano książke!');
      // Refresh the list after update
      fetchBooks();
      // Exit edit mode
      setEditMode(null);
      setEditedBook({
        bookId: '',
        title: '',
        releaseDate: '',
        bookAuthor: ''
      });
    } catch (error) {
      console.error('Error updating book:', error);
      alert('Nie udało sie zaktualizować książki.');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedBook(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  return (
        <>
      <Typography variant="h4" gutterBottom>Lista książek</Typography>
      <List>
        {books.map((book) => (
          <ListItem key={book.bookId}>
            {editMode === book.bookId ? (
              <>
                <TextField
                  fullWidth
                  label="Title"
                  name="title"
                  value={editedBook.title}
                  onChange={handleChange}
                />
                <TextField
                  fullWidth
                  label="Release Date"
                  name="releaseDate"
                  value={editedBook.releaseDate}
                  onChange={handleChange}
                />
                <TextField
                  fullWidth
                  label="Book Author"
                  name="bookAuthor"
                  value={editedBook.bookAuthor}
                  onChange={handleChange}
                />
                <TextField
                  fullWidth
                  label="URL"
                  name="imageUrl"
                  value={editedBook.imageUrl}
                  onChange={handleChange}
                />
                <IconButton onClick={handleSave}>
                  <SaveIcon />
                </IconButton>
              </>
            ) : (
              <>
                <ListItemText
                  primaryTypographyProps={{fontWeight: 'bold' }}
                  primary={book.title}
                  secondary={`Author: ${book.bookAuthor}, Release Date: ${book.releaseDate}`}
                />
                <ListItemSecondaryAction>
                  <IconButton onClick={() => handleDelete(book.bookId)}>
                    <DeleteIcon />
                  </IconButton>
                  <IconButton onClick={() => handleEdit(book)}>
                    <EditIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </>
            )}
          </ListItem>
        ))}
      </List>
      </>
  );
};

export default BookList;
