import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { List, ListItem, ListItemText, Typography, Button, Dialog, DialogTitle, DialogContent, DialogActions, Grid, Paper, TextField } from '@mui/material';
import Notification from '../Alert/Notification';

const ManageReservations = () => {
  const [readers, setReaders] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [reservations, setReservations] = useState([]);
  const [notification, setNotification] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedReservation, setSelectedReservation] = useState(null);
  const [rentalWeeks, setRentalWeeks] = useState('');

  useEffect(() => {
    const fetchReaders = async () => {
      try {
        let apiKey = localStorage.getItem('apiKey');
        const response = await axios.get(`http://localhost:8080/worker/getReaders/apiKey=${apiKey}`);
        setReaders(response.data.data["Readers: "]);
      } catch (error) {
        setNotification({ message: 'Nie udało się pobrać użytkowników.', severity: 'warning' });
      }
    };
    fetchReaders();
  }, []);

  const handleUserClick = async (readerId) => {
    try {
      let apiKey = localStorage.getItem('apiKey');
      console.log({readerId: readerId})
      const response = await axios.post(`http://localhost:8080/book/getAllReserved/apiKey=${apiKey}`, { readerId: readerId });
      setReservations(response.data.data["Copy list"]);
      setSelectedUser(readerId);
    } catch (error) {
      setNotification({ message: 'Nie udało się pobrać rezerwacji.', severity: 'warning' });
    }
  };

  const handleReservationRent = async (reservation) => {
    try {
      let apiKey = localStorage.getItem('apiKey');
      const rentalForm = {
        workerId: JSON.parse(localStorage.getItem('user')).user.workerId,
        readerEmail: reservation.reader.user.email,
        bookId: reservation.book.bookId,
        rentalInWeeks: parseInt(rentalWeeks)
      };
      console.log(rentalForm)
      await axios.post(`http://localhost:8080/worker/rent/apiKey=${apiKey}`, rentalForm);
      setNotification({ message: 'Udało się wypożyczyć książkę', severity: 'success' });
      setReservations(prevReservations => prevReservations.filter(res => res.reservationId !== reservation.reservationId));
    } catch (error) {
      setNotification({ message: 'Nie udało się wypożyczyć książki', severity: 'warning' });
    } finally {
      setDialogOpen(false);
    }
  };

  const handleWeeksChange = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value) && value !== '0') {
      setRentalWeeks(value);
    }
  };

  return (
    <>
      {notification && (
        <Notification message={notification.message} severity={notification.severity} setOpenProp={setNotification} />
      )}
      <Grid container>
        <Grid item xs={12} sm={12} md={12} sx={{ marginBottom: "20px" }} minWidth={200}>
          <Paper sx={{ padding: "1rem", margin: 'auto', width: "80%", }}>
            <Typography variant="h5" gutterBottom>Lista czytelników:</Typography>
            <List>
              {readers.map((reader) => (
                <ListItem key={reader.readerId} button onClick={() => handleUserClick(reader.readerId)}>
                  <ListItemText
                    primary={`${reader.user.name} ${reader.user.surname}`}
                    secondary={`Email: ${reader.user.email}`}
                  />
                </ListItem>
              ))}
            </List>
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
                        //secondary={`Data rezerwacji: ${reservation.reservationDate}`}
                      />
                      <TextField
                        label="Liczba tygodni"
                        variant="outlined"
                        value={rentalWeeks}
                        onChange={handleWeeksChange}
                        sx={{ marginRight: "10px" }}
                        inputProps={{ inputMode: 'numeric', pattern: '[1-9]*' }}
                      />
                      <Button 
                        variant="outlined" 
                        color="secondary" 
                        onClick={() => { setSelectedReservation(reservation); setDialogOpen(true); }} 
                        disabled={!rentalWeeks || rentalWeeks <= 0 || rentalWeeks > 8}
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
