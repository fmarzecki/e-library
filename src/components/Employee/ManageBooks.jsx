import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {Typography, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, TextField, Button, Menu, MenuItem } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import Notification from '../Alert/Notification';

const BookList = () => {
  const [numberOfCopies, setNumberOfCopies] = useState();
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedMenuItem, setSelectedMenuItem] = useState('');
  const [books, setBooks] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [filterText, setFilterText] = useState('');
  const [notification, setNotification] = useState(null);
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
  });
  let apiKey = localStorage.getItem('apiKey')
  let user = JSON.parse(localStorage.getItem('user'))

  const fetchBooks = async () => {
    try {
      const response = await axios.post(`http://localhost:8080/book/getAllPaginated/apiKey=${apiKey}`, pagination);
      setBooks(response.data.data.Books.content); // Save fetched books
      setTotalPages(response.data.data.Books.totalPages); // Save total number of pages
    } catch (error) {
      setBooks([]); // Reset state if there are no books matching the search
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
      await axios.delete(`http://localhost:8080/book/delete/apiKey=${apiKey}`, { data: { bookId } });
      setNotification({ message: 'Udało się usunąć książke.', severity: 'success' });

      fetchBooks(); // Refresh the list after deleting a book
    } catch (error) {
      setNotification({ message: 'Nie udało się usunąć książki.', severity: 'warning' });
    }
  };

  const handleSave = async () => {
    try {
      await axios.post(`http://localhost:8080/book/save/apiKey=${apiKey}`, editedBook);
      setNotification({ message: 'Udało się zaktualizować książke.', severity: 'success' });

      if (numberOfCopies > 0) {
        const addCopiesEndpoint = `http://localhost:8080/warehouseManager/addBookCopy/copies=${numberOfCopies}/apiKey=${apiKey}`;
        const bookCopyPayload = {
          bookId: editedBook.bookId,
          shelfPlace: '10', // Set the appropriate shelf place
          workerId: 1, // Set the appropriate workerId
        };
        await axios.post(addCopiesEndpoint, bookCopyPayload);
      }

      fetchBooks(); // Refresh the list after saving the book and adding copies
      setEditedBook({ // Exit edit mode, reset state
        bookId: '',
        title: '',
        releaseDate: '',
        bookAuthor: ''
      });

      setNumberOfCopies(0); // Reset the number of copies
    } catch (error) {
      setNotification({ message: 'Nie udało się zaktualizować książki.', severity: 'warning' });
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

  const handleCopiesChange = (e) => {
    setNumberOfCopies(Number(e.target.value));
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
      page: value - 1
    }));
  };

  const handleFilterBy = (e) => {
    setPagination(prevState => ({
      ...prevState,
      filterBy: selectedMenuItem,
      filter: filterText,
      page: 0
    }));
  };

  return (
    <>
      {notification && (
        <Notification message={notification.message} severity={notification.severity} setOpenProp={setNotification} />
      )}

      <TextField
        label="Filtruj"
        variant="outlined"
        sx={{ width: { xs: '70%' } }}
        onChange={(e) => { setFilterText(e.target.value); }}
      />
      <TextField
        sx={{ width: { xs: '30%' } }}
        type="submit"
        value="Wyślij"
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
            selected={selectedMenuItem === column.field} // Highlight the selected item
            sx={{ '&.Mui-selected': { backgroundColor: 'rgba(0, 0, 255, 0.18)' } }} // Change highlight color
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
                <TextField
                  fullWidth
                  label="Dodaj Kopie"
                  type="number"
                  name="numberOfCopies"
                  value={numberOfCopies}
                  onChange={handleCopiesChange}
                />
                <IconButton onClick={handleSave}>
                  <SaveIcon />
                </IconButton>
              </>
            ) : (
              <>
                <ListItemText
                  primaryTypographyProps={{ fontWeight: 'bold', maxWidth: '60%' }}
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
        <Pagination count={totalPages} page={pagination.page + 1} color="primary" onChange={handlePageChange} />
      </Stack>
    </>
  );
};

export default BookList;
