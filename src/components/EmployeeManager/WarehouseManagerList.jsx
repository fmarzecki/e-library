import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { List, ListItem, ListItemText, IconButton, TextField, Typography, CircularProgress, ListItemSecondaryAction } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import Notification from '../Alert/Notification';

const WarehouseManagersList = () => {
  const [managers, setManagers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState(null);
  const [editedManager, setEditedManager] = useState({
    wareManId: '',
    pesel: '',
    payAccountNumber: '',
    address: ''
  });
  let apiKey = localStorage.getItem('apiKey')
  useEffect(() => {
    const fetchManagers = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/employeeManager/getAllWarehouseManagers/apiKey=${apiKey}`);
        setManagers(response.data.data.WarehouseManagers);
      } catch (error) {
        setNotification({ message: 'Failed to fetch warehouse managers', severity: 'error' });
      } finally {
        setLoading(false);
      }
    };
    fetchManagers();
  }, []);

  const handleEdit = (manager) => {
    setEditedManager(manager);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedManager(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSave = async () => {
    try {
      await axios.patch(`http://localhost:8080/employeeManager/updateWarehouseManager/apiKey=${apiKey}`, editedManager);
      setNotification({ message: 'Manager updated successfully', severity: 'success' });

      setManagers(managers.map(manager => manager.wareManId === editedManager.wareManId ? editedManager : manager));
      setEditedManager({
        wareManId: '',
        pesel: '',
        payAccountNumber: '',
        address: ''
      });
    } catch (error) {
      setNotification({ message: 'Failed to update manager', severity: 'error' });
    }
  };

  const handleDelete = async (wareManId) => {
    try {
      await axios({
        method: 'delete',
        url: `http://localhost:8080/employeeManager/deleteWorker/apiKey=${apiKey}`,
        data: { workerId: wareManId } // Correctly formatted request payload
      });
      setNotification({ message: 'Manager deleted successfully', severity: 'success' });
      setManagers(managers.filter(manager => manager.wareManId !== wareManId));
    } catch (error) {
      setNotification({ message: 'Failed to delete manager', severity: 'error' });
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
      <Typography variant="h5" gutterBottom>Warehouse Managers List</Typography>
      <List>
        {managers.map(manager => (
          <ListItem key={manager.wareManId}>
            {editedManager.wareManId === manager.wareManId ? (
              <>
                <TextField
                  fullWidth
                  label="PESEL"
                  name="pesel"
                  value={editedManager.pesel}
                  onChange={handleChange}
                />
                <TextField
                  fullWidth
                  label="Pay Account Number"
                  name="payAccountNumber"
                  value={editedManager.payAccountNumber}
                  onChange={handleChange}
                />
                <TextField
                  fullWidth
                  label="Address"
                  name="address"
                  value={editedManager.address}
                  onChange={handleChange}
                />
                <IconButton onClick={handleSave}>
                  <SaveIcon />
                </IconButton>
              </>
            ) : (
              <>
                <ListItemText
                  primary={`${manager.user.name} ${manager.user.surname}`}
                  secondary={`ID: ${manager.wareManId}, Email: ${manager.user.email}, Phone: ${manager.user.phoneNumber}, Address: ${manager.address}, Monthly Pay: ${manager.monthlyPay}`}
                />
                <ListItemSecondaryAction>
                  <IconButton onClick={() => handleEdit(manager)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(manager.wareManId)}>
                    <DeleteIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </>
            )}
          </ListItem>
        ))}
      </List>
    </>
  );
};

export default WarehouseManagersList;
