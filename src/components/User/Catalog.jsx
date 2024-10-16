import React, { useState, useEffect } from 'react';
import { Grid, TextField, Button, Menu, MenuItem, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Pagination from '@mui/material/Pagination';
import Notification from '../Alert/Notification';
import { postRequest } from '../utilities/api';

const Catalog = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedMenuItem, setSelectedMenuItem] = useState('');
  const [books, setBooks] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [filterText, setFilterText] = useState('');
  const [notification, setNotification] = useState(null);
  const [pagination, setPagination] = useState({
    filter: '',
    filterBy: '',
    page: 0,
    size: 8,
  });
  const [openInfoDialog, setOpenInfoDialog] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);

  const fetchBooks = async () => {
    try {
      const endpoint = '/books/getAllPaginated'
      const response = await postRequest(endpoint, pagination);
      setBooks(response.data.data.books);
      setTotalPages(response.data.data.totalPages);
    }
    catch (error) {
      console.error('Error fetching books:', error);
      setBooks([]);
      setTotalPages(1);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, [pagination]);

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

  const handleFilterBy = () => {
    setPagination(prevState => ({
      ...prevState,
      filterBy: selectedMenuItem,
      filter: filterText,
      page: 0
    }));
  };

  const handleInfoOpen = (book) => {
    setSelectedBook(book);
    setOpenInfoDialog(true);
  };

  const handleInfoClose = () => {
    setOpenInfoDialog(false);
    setSelectedBook(null);
  };

  return (
    <Grid container justifyContent="center" alignItems="center" spacing={3}>
      {notification && (
        <Notification message={notification.message} severity={notification.severity} setOpenProp={setNotification} />
      )}
      <Grid item xs={12}>
        <TextField
          label="Filtruj"
          variant="outlined"
          sx={{ width: '80%' }}
          onChange={(e) => { setFilterText(e.target.value); }}
        />
        <TextField
          sx={{ width: '20%' }}
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
              selected={selectedMenuItem === column.field}
              sx={{ '&.Mui-selected': { backgroundColor: 'rgba(0, 0, 255, 0.18)' } }}
            >
              {column.headerName}
            </MenuItem>
          ))}
        </Menu>
      </Grid>
      {books.map((book) => (
        <Grid item xs={12} sm={4} md={2} key={book.bookId} minWidth={300}>
          <Card>
            <CardMedia component="img" alt="book_image" sx={{ objectFit: 'contain', height: '340px' }} image={book.imageUrl} />
            <CardContent>
              <Typography variant="h6" component="div">
                {book.title.length > 20 ? `${book.title.slice(0, 20)}...` : book.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Autor: {book.bookAuthor}
              </Typography>
              <Button size="small" onClick={() => handleInfoOpen(book)}>Informacje</Button>
            </CardContent>
          </Card>
        </Grid>
      ))}
      <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
        <Pagination count={totalPages} page={pagination.page + 1} color="primary" onChange={handlePageChange} />
      </Grid>

      {selectedBook && (
        <Dialog open={openInfoDialog} onClose={handleInfoClose}>
          <DialogTitle>Informacje o książce</DialogTitle>
          <DialogContent>
            <Typography variant="h6" gutterBottom>
              Tytuł: {selectedBook.title}
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              Autor: {selectedBook.bookAuthor}
            </Typography>
            <Typography variant="body1" gutterBottom>
              Opis: {selectedBook.description}
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleInfoClose} color="primary">Zamknij</Button>
          </DialogActions>
        </Dialog>
      )}
    </Grid>
  );
};

export default Catalog;
