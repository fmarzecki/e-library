import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { List, ListItem, ListItemText, Typography, CircularProgress, Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import Notification from '../Alert/Notification';

const ManageRentals = () => {
  const [readers, setReaders] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [borrowings, setBorrowings] = useState([]);
  const [loading, setLoading] = useState(true);
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
        setLoading(false);
      }
    };
    fetchReaders();
  }, []);

  const handleUserClick = async (userEmail) => {
    setLoading(true);
    try {
        console.log(userEmail)
      const response = await axios.get(`http://localhost:8080/worker/getRentalsForUser/email=${userEmail}`);
      setBorrowings(response.data);
      setSelectedUser(userEmail);
    } catch (error) {
      setNotification({ message: 'Nie udało się pobrać wypożyczeń.', severity: 'warning' });
    } finally {
      setLoading(false);
    }
  };

  const handleBorrowingReturn = async (borrowingId) => {
    setLoading(true);
    try {
      await axios.post(`http://localhost:8080/borrowings/${borrowingId}/return`);
      setNotification({ message: 'Borrowing marked as returned', severity: 'success' });
      setBorrowings(borrowings.filter(borrowing => borrowing.id !== borrowingId));
    } catch (error) {
      setNotification({ message: 'Failed to mark borrowing as returned', severity: 'error' });
    } finally {
      setLoading(false);
      setDialogOpen(false);
    }
  };

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <>
      {notification && (
        <Notification message={notification.message} severity={notification.severity} setOpenProp={setNotification} />
      )}
      <Typography variant="h5" gutterBottom>User List</Typography>
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
      {selectedUser && (
        <>
          <Typography variant="h6" gutterBottom>Borrowings of Selected User</Typography>
          <List>
            {borrowings.map((borrowing) => (
              <ListItem key={borrowing.id}>
                <ListItemText 
                  primary={`Book: ${borrowing.bookTitle}`}
                  secondary={`Borrowed on: ${borrowing.borrowDate}`}
                />
                <Button variant="contained" color="primary" onClick={() => { setSelectedBorrowing(borrowing.id); setDialogOpen(true); }}>
                  Mark as Returned
                </Button>
              </ListItem>
            ))}
          </List>
        </>
      )}
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
