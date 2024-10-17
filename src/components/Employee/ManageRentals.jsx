import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { List, ListItem, ListItemText, Typography, Button, Dialog, DialogTitle, DialogContent, DialogActions, Grid, Paper, TextField, Menu, MenuItem, Pagination } from '@mui/material';
import Notification from '../Alert/Notification';
import { postRequest, putRequest } from '../utilities/api';

const ManageRentals = () => {
  const [readers, setReaders] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [borrowings, setBorrowings] = useState([]);
  const [notification, setNotification] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedBorrowing, setSelectedBorrowing] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedMenuItem, setSelectedMenuItem] = useState('');
  const [filterText, setFilterText] = useState('');
  const [pagination, setPagination] = useState({
    filter: '',
    filterBy: '',
    page: 0,
    size: 3,
  });
  const [totalPages, setTotalPages] = useState(0);

  const fetchReaders = async () => {
    try {
      const endpoint = '/readers/getReadersPaginated';
      const response = await postRequest(endpoint, pagination);

      setReaders(response.data.data.readers);
      setTotalPages(response.data.data.totalPages);
    } catch (error) {
      setNotification({ message: 'Nie udało się pobrać użytkowników.', severity: 'warning' });
    }
  };

  useEffect(() => {
    fetchReaders();
  }, [pagination]);

  const handleUserClick = async (readerEmail) => {
    try {
      const endpoint = '/rentals/getRentalsForUser';
      let requestBody = { email: readerEmail };

      const response = await postRequest(endpoint, requestBody);

      setBorrowings(response.data.data);
      setSelectedUser(readerEmail);
    } catch (error) {
      setNotification({ message: 'Nie udało się pobrać wypożyczeń.', severity: 'warning' });
    }
  };

  const handleBorrowingReturn = async (borrowingId) => {
    try {
      const endpoint = '/rentals/returnBook';
      let requestBody = { rentalId: borrowingId };

      await putRequest(endpoint, requestBody);

      setNotification({ message: 'Udało się zwrócić książke', severity: 'success' });
    }
    catch (error) {
      setNotification({ message: 'Nie udało się zwrócić książki', severity: 'warning' });
    }
    finally {
      setDialogOpen(false);
    }
  };

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
      page: value - 1,
    }));
  };

  const handleFilterBy = () => {
    setPagination(prevState => ({
      ...prevState,
      filterBy: selectedMenuItem,
      filter: filterText,
      page: 0,
    }));
  };

  const columns = [
    { field: 'email', headerName: 'Email', width: 130 },
    { field: 'surname', headerName: 'Nazwisko', width: 130 },
  ];

  return (
    <>
      {notification && (
        <Notification message={notification.message} severity={notification.severity} setOpenProp={setNotification} />
      )}
      <Grid container justifyContent="center" alignItems="center" spacing={3}>
        <Grid item xs={12}>
          <Typography
            variant="h5"
            sx={{ width: '80%' }}
          >
            Wypożyczenia
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Filtruj"
            variant="outlined"
            sx={{ width: '80%' }}
            onChange={(e) => setFilterText(e.target.value)}
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
        <Grid item xs={12} sm={12} md={12} sx={{ marginBottom: "20px" }} minWidth={200}>
          <Paper elevation={5} sx={{ padding: "1rem", margin: 'auto', width: "80%", }}>
            <Typography variant="h5" gutterBottom>Lista czytelników:</Typography>
            <List>
              {readers.map((reader) => (
                <ListItem key={reader.readerId} button onClick={() => handleUserClick(reader.user.email)} sx={{
                  backgroundColor: selectedUser === reader.user.email ? 'rgba(227, 229, 255, 0.78)' : 'inherit'
                }}>
                  <ListItemText
                    primary={`${reader.user.name} ${reader.user.surname}`}
                    secondary={`Email: ${reader.user.email}`}
                  />
                </ListItem>
              ))}
            </List>
            <Pagination count={totalPages} page={pagination.page + 1} color="primary" onChange={handlePageChange} />
          </Paper>
        </Grid>
        {selectedUser && (
          <Grid item xs={12} sm={12} md={12} sx={{ marginBottom: "20px" }} minWidth={200}>
            <Paper sx={{ padding: "1rem", margin: 'auto', width: "80%", }}>
              <Typography variant="h6" gutterBottom>Wypożyczenia czytelnika:</Typography>
              <List>
                {borrowings.map((borrowing) => (
                  <ListItem key={borrowing.rentalId}>
                    <ListItemText
                      primary={`Tytuł: ${borrowing.book.title}`}
                      secondary={`Data wypożyczenia: ${new Date(borrowing.rentalDate).toISOString().split('T')[0]}`}
                    />
                    <Button variant="outlined" color="secondary" onClick={() => { setSelectedBorrowing(borrowing.rentalId); setDialogOpen(true); }}>
                      Zwrot
                    </Button>
                  </ListItem>
                ))}
              </List>
            </Paper>
          </Grid>
        )}
      </Grid>
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <DialogTitle>Potwierdzenie zwrotu</DialogTitle>
        <DialogContent>
          <Typography>Proszę potwierdź swoje działanie</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)} color="primary">Anuluj</Button>
          <Button onClick={() => handleBorrowingReturn(selectedBorrowing)} color="primary">Potwierdź</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ManageRentals;
