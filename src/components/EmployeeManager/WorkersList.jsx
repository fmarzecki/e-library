import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { List, ListItem, ListItemText, IconButton, TextField, Typography, CircularProgress, Button, ListItemSecondaryAction } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import Notification from '../Alert/Notification';

const WorkersList = () => {
  const [workers, setWorkers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState(null);
  const [editedWorker, setEditedWorker] = useState({
    workerId: '',
    pesel: '',
    payAccountNumber: '',
    address: ''
  });
  let apiKey = localStorage.getItem('apiKey')

  useEffect(() => {
    const fetchWorkers = async () => {
      try {

        const response = await axios.get(`http://localhost:8080/employeeManager/getAllWorkers/apiKey=${apiKey}`);
        setWorkers(response.data.data.Workers);
      } catch (error) {
        setNotification({ message: 'Failed to fetch workers', severity: 'error' });
      } finally {
        setLoading(false);
      }
    };
    fetchWorkers();
  }, []);

  const handleEdit = (worker) => {
    setEditedWorker(worker);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedWorker(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSave = async () => {
    try {
      await axios.patch(`http://localhost:8080/employeeManager/updateWorker/apiKey=${apiKey}`, editedWorker);
      setNotification({ message: 'Worker updated successfully', severity: 'success' });

      setWorkers(workers.map(worker => worker.workerId === editedWorker.workerId ? editedWorker : worker));
      setEditedWorker({
        workerId: '',
        pesel: '',
        payAccountNumber: '',
        address: ''
      });
    } catch (error) {
      setNotification({ message: 'Failed to update worker', severity: 'error' });
    }
  };

  const handleDelete = async (workerId) => {
    try {
      await axios({
        method: 'delete',
        url: `http://localhost:8080/employeeManager/deleteWorker/apiKey=${apiKey}`,
        data: {
          workerId: workerId
        }
      });
      setNotification({ message: 'Worker deleted successfully', severity: 'success' });
      setWorkers(workers.filter(worker => worker.workerId !== workerId));
    } catch (error) {
      setNotification({ message: 'Failed to delete worker', severity: 'error' });
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
      <Typography variant="h5" gutterBottom>Workers List</Typography>
      <List>
        {workers.map((worker) => (
          <ListItem key={worker.workerId}>
            {editedWorker.workerId === worker.workerId ? (
              <>
                <TextField
                  fullWidth
                  label="PESEL"
                  name="pesel"
                  value={editedWorker.pesel}
                  onChange={handleChange}
                />
                <TextField
                  fullWidth
                  label="Pay Account Number"
                  name="payAccountNumber"
                  value={editedWorker.payAccountNumber}
                  onChange={handleChange}
                />
                <TextField
                  fullWidth
                  label="Address"
                  name="address"
                  value={editedWorker.address}
                  onChange={handleChange}
                />
                <IconButton onClick={handleSave}>
                  <SaveIcon />
                </IconButton>
              </>
            ) : (
              <>
                <ListItemText
                  primary={`${worker.user.name} ${worker.user.surname}`}
                  secondary={`ID: ${worker.workerId}, Email: ${worker.user.email}, Phone: ${worker.user.phoneNumber}, Address: ${worker.address}, Monthly Pay: ${worker.monthlyPay}`}
                />
                <ListItemSecondaryAction>
                  <IconButton onClick={() => handleEdit(worker)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(worker.workerId)}>
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

export default WorkersList;
