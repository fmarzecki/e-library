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
        const response = await axios.get('http://localhost:8080/worker/getReaders');
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
      const response = await axios.get(`http://localhost:8080/worker/getRentalsForUser/email=${userEmail}`);
      setBorrowings(response.data.data["Rentals: "]);
      setSelectedUser(userEmail);
    } catch (error) {
      setNotification({ message: 'Nie udało się pobrać wypożyczeń.', severity: 'warning' });
    } finally {
    }
  };

  const handleBorrowingReturn = async (borrowingId) => {
    try {
      await axios.post(`http://localhost:8080/borrowings/${borrowingId}/return`);
      setNotification({ message: 'Borrowing marked as returned', severity: 'success' });
      setBorrowings(borrowings.filter(borrowing => borrowing.id !== borrowingId));
    } catch (error) {
      setNotification({ message: 'Failed to mark borrowing as returned', severity: 'error' });
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
                        primary={`Book: ${borrowing.bookCopy.book.title}`}
                        secondary={`Borrowed on: ${borrowing.rentalDate}`}
                      />
                      <Button variant="contained" color="primary" onClick={() => { setSelectedBorrowing(borrowing.rentalId); setDialogOpen(true); }}>
                        Mark as Returned
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
        <DialogTitle>Confirm Return</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to mark this borrowing as returned?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)} color="primary">Cancel</Button>
          <Button onClick={() => handleBorrowingReturn(selectedBorrowing)} color="primary">Confirm</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ManageRentals;
