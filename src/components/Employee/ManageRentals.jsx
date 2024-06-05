import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { List, ListItem, ListItemText, Typography, CircularProgress, Button, Dialog, DialogTitle, DialogContent, DialogActions, Grid, Paper } from '@mui/material';
import Notification from '../Alert/Notification';

const ManageRentals = () => {
  const [readers, setReaders] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [borrowings, setBorrowings] = useState([]);
  const [notification, setNotification] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedBorrowing, setSelectedBorrowing] = useState(null);

  useEffect(() => {
    const fetchReaders = async () => {
      try {
        let apiKey = localStorage.getItem('apiKey')
        const response = await axios.get(`http://localhost:8080/worker/getReaders/apiKey=${apiKey}`);
        setReaders(response.data.data["Readers: "]);
      } catch (error) {
        setNotification({ message: 'Nie udało się pobrać użytkowników.', severity: 'warning' });
      } finally {
      }
    };
    fetchReaders();
  }, []);

  const handleUserClick = async (userEmail) => {
    try {
        console.log(userEmail)
        let apiKey = localStorage.getItem('apiKey')
        const response = await axios.get(`http://localhost:8080/worker/getRentalsForUser/email=${userEmail}/apiKey=${apiKey}`);
        setBorrowings(response.data.data["Rentals: "]);
        setSelectedUser(userEmail);
    } 
    catch (error) {
      setNotification({ message: 'Nie udało się pobrać wypożyczeń.', severity: 'warning' });
    } 
    finally {
    }
  };

  const handleBorrowingReturn = async (borrowingId) => {
    try {
      let apiKey = localStorage.getItem('apiKey')
      await axios.patch(`http://localhost:8080/worker/return/apiKey=${apiKey}`, {rentalId: borrowingId});
      setNotification({ message: 'Udało się zwrócić książke', severity: 'success' });
    } catch (error) {
      setNotification({ message: 'Nie udało się zwrócić książki', severity: 'warning' });
    } finally {
      setDialogOpen(false);
    }
  };


  return (
    <>
      {notification && (
        <Notification message={notification.message} severity={notification.severity} setOpenProp={setNotification} />
      )}
       <Grid container>
        <Grid item xs={12} sm={12} md={12} sx={{ marginBottom: "20px"}} minWidth={200}>
          <Paper sx={{ padding: "1rem", margin: 'auto', width: "80%", }}>
          <Typography variant="h5" gutterBottom>Lista czytelników:</Typography>
            <List>
                {readers.map((reader) => (
                <ListItem key={reader.readerId} button onClick={() => handleUserClick(reader.user.email)}>
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
            <Grid item xs={12} sm={12} md={12} sx={{ marginBottom: "20px"}} minWidth={200}>
              <Paper sx={{ padding: "1rem", margin: 'auto', width: "80%", }}>
                <Typography variant="h6" gutterBottom>Wypożyczenia czytelnika:</Typography>
                <List>
                  {borrowings.map((borrowing) => (
                    <ListItem key={borrowing.rentalId}>
                      <ListItemText 
                        primary={`Tytuł: ${borrowing.bookCopy.book.title}`}
                        secondary={`Data wypożyczenia: ${borrowing.rentalDate}`}
                      />
                      <Button variant="outlined" color="secondary" onClick={() => { setSelectedBorrowing(borrowing.rentalId); setDialogOpen(true); }}>
                        Zwrot
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
