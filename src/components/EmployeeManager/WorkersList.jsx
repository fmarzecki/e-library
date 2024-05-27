import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { List, ListItem, ListItemText, Typography, CircularProgress } from '@mui/material';
import Notification from '../Alert/Notification';

const WorkersList = () => {
  const [workers, setWorkers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    const fetchWorkers = async () => {
      try {
        const response = await axios.get('http://localhost:8080/employeeManager/getAllWorkers');
        setWorkers(response.data.data.Workers);
      } catch (error) {
        setNotification({ message: 'Failed to fetch workers', severity: 'error' });
      } finally {
        setLoading(false);
      }
    };
    fetchWorkers();
  }, []);

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <>
      {notification && (
        <Notification message={notification.message} severity={notification.severity} setOpenProp={setNotification} />
      )}
      <Typography variant="h5" gutterBottom>Workers List</Typography>
      <List>
        {workers.map(worker => (
          <ListItem key={worker.workerId}>
            <ListItemText 
              primary={`${worker.user.name} ${worker.user.surname}`}
              secondary={`ID: ${worker.workerId}, Email: ${worker.user.email}, Phone: ${worker.user.phoneNumber}, Address: ${worker.address}, Monthly Pay: ${worker.monthlyPay}`}
            />
          </ListItem>
        ))}
      </List>
    </>
  );
};

export default WorkersList;
