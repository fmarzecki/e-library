import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { List, ListItem, ListItemText, Typography, Button, Dialog, DialogTitle, DialogContent, DialogActions, Grid, Paper, TextField, Menu, MenuItem, Pagination } from '@mui/material';
import Notification from '../Alert/Notification';

const ManageReservations = () => {
  const [readers, setReaders] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [reservations, setReservations] = useState([]);
  const [notification, setNotification] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedReservation, setSelectedReservation] = useState(null);
  const [rentalWeeks, setRentalWeeks] = useState({});
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
      let apiKey = localStorage.getItem('apiKey');
      const response = await axios.post(`http://localhost:8080/worker/getReadersPaginated/apiKey=${apiKey}`, pagination);
      setReaders(response.data.data["Reader"].content);
      setTotalPages(response.data.data["Reader"].totalPages);
    } catch (error) {
      setNotification({ message: 'Nie udało się pobrać użytkowników.', severity: 'warning' });
    }
  };

  useEffect(() => {
    fetchReaders();
  }, [pagination]);

  const handleUserClick = async (readerEmail) => {
    try {
      let apiKey = localStorage.getItem('apiKey');
      const response = await axios.post(`http://localhost:8080/book/getAllReserved/apiKey=${apiKey}`, { readerEmail: readerEmail });
      setReservations(response.data.data["Copy list"]);
      setSelectedUser(readerEmail);
      setRentalWeeks({});
    } catch (error) {
      setNotification({ message: 'Nie udało się pobrać rezerwacji.', severity: 'warning' });
    }
  };

  const handleReservationRent = async (reservation) => {
    try {
      let apiKey = localStorage.getItem('apiKey');
      const rentalForm = {
        readerEmail: reservation.reader.user.email,
        bookId: reservation.book.bookId,
        rentalInWeeks: parseInt(rentalWeeks[reservation.copyId]) || 0
      };
      await axios.post(`http://localhost:8080/worker/rent/apiKey=${apiKey}`, rentalForm);
      setNotification({ message: 'Udało się wypożyczyć książkę', severity: 'success' });
      setReservations(prevReservations => prevReservations.filter(res => res.reservationId !== reservation.reservationId));
    } catch (error) {
      setNotification({ message: 'Nie udało się wypożyczyć książki', severity: 'warning' });
    } finally {
      setDialogOpen(false);
    }
  };

  // Obsługa zmiany wartości liczby tygodni dla wypożyczenia
  // /^\d*$/.test(value) - wyrażenie reguralne sprawdzajace czy wartosc jest liczba
  // value !== 0 - sprawdzenie czy liczba tygodni nie jest 0
  const handleWeeksChange = (reservationId, value) => {
    if (/^\d*$/.test(value) && value !== '0') {
      setRentalWeeks(prevState => ({
        ...prevState,
        [reservationId]: value
      }));
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
            Rezerwacje
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
          <>
            <Grid item xs={12} sm={12} md={12} sx={{ marginBottom: "20px" }} minWidth={200}>
              <Paper sx={{ padding: "1rem", margin: 'auto', width: "80%", }}>
                <Typography variant="h6" gutterBottom>Rezerwacje czytelnika:</Typography>
                <List>
                  {reservations.map((reservation) => (
                    <ListItem key={reservation.copyId}>
                      <ListItemText
                        primary={`Tytuł: ${reservation.book.title}`}
                      />
                      <TextField
                        key={'Field' + reservation.copyId}
                        label="Liczba tygodni"
                        variant="outlined"
                        value={rentalWeeks[reservation.copyId] || ''}
                        onChange={(e) => handleWeeksChange(reservation.copyId, e.target.value)}
                        sx={{ marginRight: "10px" }}
                        inputProps={{ inputMode: 'numeric', pattern: '[1-9]*' }}
                      />
                      <Button
                        key={'Button' + reservation.copyId}
                        variant="outlined" 
                        color="secondary" 
                        onClick={() => { setSelectedReservation(reservation); setDialogOpen(true); }} 
                        disabled={!rentalWeeks[reservation.copyId] || rentalWeeks[reservation.copyId] <= 0 || rentalWeeks[reservation.copyId] > 8}
                      >
                        Wypożycz
                      </Button>
                    </ListItem>
                  ))}
                </List>
              </Paper>
            </Grid>
          </>
        )}
      </Grid>

      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <DialogTitle>Potwierdzenie wypożyczenia</DialogTitle>
        <DialogContent>
          <Typography>Proszę potwierdź swoje działanie</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)} color="primary">Anuluj</Button>
          <Button onClick={() => handleReservationRent(selectedReservation)} color="primary">Potwierdź</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ManageReservations;
