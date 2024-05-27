import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { List, ListItem, ListItemText, Typography, CircularProgress } from '@mui/material';
import Notification from '../Alert/Notification';

const WarehouseManagersList = () => {
  const [managers, setManagers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    const fetchManagers = async () => {
      try {
        const response = await axios.get('http://localhost:8080/employeeManager/getAllWarehouseManagers');
        setManagers(response.data.data.WarehouseManagers);
      } catch (error) {
        setNotification({ message: 'Failed to fetch warehouse managers', severity: 'error' });
      } finally {
        setLoading(false);
      }
    };
    fetchManagers();
  }, []);

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
            <ListItemText 
              primary={`${manager.user.name} ${manager.user.surname}`}
              secondary={`ID: ${manager.wareManId}, Email: ${manager.user.email}, Phone: ${manager.user.phoneNumber}, Address: ${manager.address}, Monthly Pay: ${manager.monthlyPay}`}
            />
          </ListItem>
        ))}
      </List>
    </>
  );
};

export default WarehouseManagersList;
