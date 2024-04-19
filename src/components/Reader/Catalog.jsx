import React, { useState, useEffect } from 'react';
import { Grid, TextField, Button, Menu, MenuItem } from '@mui/material';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

const Catalog = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedMenuItem, setSelectedMenuItem] = useState('');
  const [books, setBooks] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [filterText, setFilterText] = useState('');
  const [pagination, setPagination] = useState({
    filter: '',
    filterBy: '',
    page: 0,
    size: 8,
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
    <Grid container justifyContent="center" alignItems="center" spacing={3} >
      <Grid item xs={12}>
        <TextField
          label="Filtruj"
          variant="outlined"
          sx={{ width: '80%' }}
          onChange={(e) => { setFilterText(e.target.value) }}
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
              selected={selectedMenuItem === column.field} // Podświetlenie wybranego elementu
              sx={{ '&.Mui-selected': { backgroundColor: 'rgba(0, 0, 255, 0.18)' } }} // Zmiana koloru podświetlenia
            >
              {column.headerName}
            </MenuItem>
          ))}
        </Menu>
      </Grid>
      {books.map((book) => (
        <Grid item xs={12} sm={4} md={2} key={book.bookId} minWidth={300} >
          <Card>
            <CardMedia component="img" alt="book_image" sx={{ objectFit: 'contain', height: '340px' }} image={book.imageUrl} />
            <CardContent>
              <Typography variant="h6" component="div">
                {book.title.length > 20 ? `${book.title.slice(0, 20)}...` : book.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Autor: {book.bookAuthor}
              </Typography>
              <Button size="small">Zarezerwuj</Button>
              <Button size="small">Informacje</Button>
            </CardContent>
          </Card>
        </Grid>
      ))}
      <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
        <Pagination count={totalPages} page={pagination.page + 1} color="primary" onChange={handlePageChange} />
      </Grid>

    </Grid>
  );
};

export default Catalog;
