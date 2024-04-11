import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {Typography, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, TextField, Button, Menu, MenuItem } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

const BookList = () => {

  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedMenuItem, setSelectedMenuItem] = useState(''); 
  const [books, setBooks] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [filterText, setFilterText] = useState('');
  const [editedBook, setEditedBook] = useState({
    bookId: '',
    title: '',
    releaseDate: '',
    bookAuthor: ''
  });
  const [pagination, setPagination] = useState({
    filter: '',
    filterBy: '',
    page: 0,
    size: 4,
})

  const fetchBooks = async () => {
    try {
      const response = await axios.post('http://localhost:8080/book/getAllPaginated', pagination);
      setBooks(response.data.data.Books.content);
      setTotalPages(response.data.data.Books.totalPages);
      console.log(response.data.data.Books.content);
    } catch (error) {
      console.error('Error fetching books:', error);
      setBooks([]);
      setTotalPages(1);
      setPagination(prevState => ({
        ...prevState,
        page: 0
      }));
    }
  };

  useEffect(() => {
    fetchBooks();
  }, [pagination]);

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

  const handleSave = async () => {
    try {
      await axios.post('http://localhost:8080/book/save', editedBook);
      alert('Zaktualizowano książke!');
      // Refresh the list after update
      fetchBooks();
      // Exit edit mode
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

  const handleEdit = (book) => {
    setEditedBook(book);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedBook(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const columns = [
    { field: 'title', headerName: 'Tytuł', width: 130 },
    { field: 'bookAuthor', headerName: 'Autor', width: 130 },
  ];


  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (column) => {
    setSelectedMenuItem(column);
    handleMenuClose();
  };

  const handlePageChange = (event, value) => {
    setPagination(prevState => ({
      ...prevState,
      page: value-1
    }));
    console.log(pagination);
  }

  const handleFilterBy = (e) => {
    setPagination(prevState => ({
        ...prevState,
        filterBy: selectedMenuItem,
        filter: filterText,
        page: 0
      }));
  }
  return (
        <>
        <TextField
          label="Filtruj"
          variant="outlined"
          sx={{width: '80%'}}
          onChange={ (e) => {setFilterText(e.target.value)}}
        />
        <TextField 
        sx={{width: '20%'}}
        type="submit"
        onClick={handleFilterBy}
        />
        <Button variant="outlined" onClick={handleMenuOpen}>Filtruj według</Button>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          {columns.map((column) => (
            <MenuItem
              key={column.field}
              onClick={() => handleMenuItemClick(column.field)}
              selected={selectedMenuItem === column.field} // Podświetlenie wybranego elementu
              sx={{ '&.Mui-selected': { backgroundColor: 'rgba(0, 0, 255, 0.18)' } }} // Zmiana koloru podświetlenia
            >
              {column.headerName}
            </MenuItem>
          ))}
        </Menu>
      <Typography m={2} variant="h4" gutterBottom>Lista książek</Typography>
      <List>
        {books.map((book) => (
          <ListItem key={book.bookId}>
            {editedBook.bookId === book.bookId ? (
              <>
                <TextField
                  fullWidth
                  label="Tytuł"
                  name="title"
                  value={editedBook.title}
                  onChange={handleChange}
                />
                <TextField
                  fullWidth
                  type="date"
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
                  
                  primaryTypographyProps={{fontWeight: 'bold', maxWidth: '60%' }}
                  primary={book.title}
                  secondary={`Author: ${book.bookAuthor}`}
                  
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
      <Stack spacing={2}>
        <Pagination count={totalPages} page={pagination.page+1} color="primary" onChange={handlePageChange} />
    </Stack>
      </>
  );
};

export default BookList;
