import React, { useState, useEffect } from 'react';
import { Grid, TextField, Button, Menu, MenuItem } from '@mui/material';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import axios from 'axios';

const Catalog = () => {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [filterColumn, setFilterColumn] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedMenuItem, setSelectedMenuItem] = useState(null); // Nowy stan dla zaznaczonego elementu w menu

  useEffect(() => {
    axios.get('http://localhost:8080/book/getAll')
      .then(response => {
        setBooks(response.data.data.Books);
        setFilteredBooks(response.data.data.Books)
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  const columns = [
    { field: 'title', headerName: 'Tytuł', width: 130 },
    { field: 'bookAuthor', headerName: 'Autor', width: 130 },
    { field: 'bookCategory', headerName: 'Kategoria', width: 130 },
  ];

  const handleFilter = (event) => {
    const keyword = event.target.value.toLowerCase();
    let filtered = books;
    if (filterColumn) {
      filtered = books.filter((book) =>
        book[filterColumn].toLowerCase().includes(keyword)
      );
    }
    setFilteredBooks(filtered);
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (column) => {
    setFilterColumn(column);
    setSelectedMenuItem(column); // Ustawienie zaznaczonego elementu w menu
    handleMenuClose();
  };

  return (
    <Grid container justifyContent="center" alignItems="center" spacing={3} >
      <Grid item xs={12}>
        <TextField
          label="Filtruj"
          variant="outlined"
          fullWidth
          onChange={handleFilter}
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
      {filteredBooks.map((book) => (
        <Grid item xs={12} sm={4} md={2} key={book.bookId} minWidth={200} >
          <Card >
            <CardMedia component="img" alt="book_image" sx={{ objectFit: 'contain', height: '340px' }} image={book.imageUrl} />
            <CardContent>
              <Typography variant="h6" component="div">
                {book.title}
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
    </Grid>
  );
};

export default Catalog;
