import React, { useState } from 'react';
import { Grid, TextField, Button, Menu, MenuItem } from '@mui/material';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

import zdj_test from './coby.jpg';

const Catalog = () => {
  const [books, setBooks] = useState([
    { id: 1, title: 'Książka 1', author: 'Autor 1', category: 'Kategoria 1' },
    { id: 2, title: 'Książka 2', author: 'Autor 2', category: 'Kategoria 2' },
    { id: 3, title: 'Książka 3', author: 'Autor 1', category: 'Kategoria 1' },
    { id: 4, title: 'Książka 4', author: 'Autor 3', category: 'Kategoria 3' },
    { id: 5, title: 'Książka 5', author: 'Autor 4', category: 'Kategoria 2' },
    { id: 6, title: 'Książka 6', author: 'Autor 5', category: 'Kategoria 3' },
    { id: 7, title: 'Książka 7', author: 'Autor 1', category: 'Kategoria 1' },
    { id: 8, title: 'Książka 8', author: 'Autor 2', category: 'Kategoria 2' },
    { id: 9, title: 'Książka 9', author: 'Autor 3', category: 'Kategoria 3' },
    { id: 10, title: 'Książka 10', author: 'Autor 1', category: 'Kategoria 1' },
    { id: 11, title: 'Książka 11', author: 'Autor 3', category: 'Kategoria 3' }
  ]);

  const [filteredBooks, setFilteredBooks] = useState(books);
  const [filterColumn, setFilterColumn] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);

  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'title', headerName: 'Tytuł', width: 130 },
    { field: 'author', headerName: 'Autor', width: 130 },
    { field: 'category', headerName: 'Kategoria', width: 130 },
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
    handleMenuClose();
  };

  return (
    <Grid container spacing={4} padding={5}>
      <Grid item xs={12} md={12} >
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
            <MenuItem key={column.field} onClick={() => handleMenuItemClick(column.field)}>
              {column.headerName}
            </MenuItem>
          ))}
        </Menu>
      </Grid>
      {filteredBooks.map((book) => (
        <Grid item xs={12} sm={6} md={4} lg={2} key={book.id}>
          <Card sx={{ maxWidth: 400 }}>
            <CardMedia component="img" alt="book_image" height="140" image={zdj_test} />
            <CardContent>
              <Typography variant="h6" component="div">
                {book.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Autor: {book.author}
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
