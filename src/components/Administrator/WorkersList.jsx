import React, { useState, useEffect } from 'react';
import { List, ListItem, ListItemText, IconButton, TextField, Typography, CircularProgress, ListItemSecondaryAction } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import Notification from '../Alert/Notification';
import { getRequest, putRequest } from '../utilities/api'; // Update the path as necessary

const ManagerList = () => {
  const [managers, setManagers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState(null);
  const [editedManager, setEditedManager] = useState({
    workerId: '',
    phoneNumber: '',
    monthlyPay: ''
  });

  useEffect(() => {
    const fetchManagers = async () => {
      try {
        const response = await getRequest('/admin/getAllWorkers');
        
        // Assuming the backend returns an array of arrays as mentioned
        const transformedData = response.data.map(manager => ({
          workerId: manager[0],  // ID
          name: manager[1],      // Name
          surname: manager[2],   // Surname
          phoneNumber: manager[3], // Phone number
          monthlyPay: manager[4] // Monthly pay
        }));
        
        setManagers(transformedData);
      } catch (error) {
        setNotification({ message: 'Failed to fetch managers', severity: 'error' });
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
      await putRequest(`/admin/updateWorker`, editedManager);
      setNotification({ message: 'Manager updated successfully', severity: 'success' });

      setManagers(managers.map(manager => manager.workerId === editedManager.workerId ? editedManager : manager));
      setEditedManager({
        workerId: '',
        phoneNumber: '',
        monthlyPay: ''
      });
    } catch (error) {
      setNotification({ message: 'Failed to update manager', severity: 'error' });
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
      <Typography variant="h5" gutterBottom>Managers List</Typography>
      <List>
        {managers.map((manager) => (
          <ListItem key={manager.workerId}>
            {editedManager.workerId === manager.workerId ? (
              <>
                <TextField
                  fullWidth
                  label="Phone Number"
                  name="phoneNumber"
                  value={editedManager.phoneNumber}
                  onChange={handleChange}
                />
                <TextField
                  fullWidth
                  label="Monthly Pay"
                  name="monthlyPay"
                  value={editedManager.monthlyPay}
                  onChange={handleChange}
                />
                <IconButton onClick={handleSave}>
                  <SaveIcon />
                </IconButton>
              </>
            ) : (
              <>
                <ListItemText
                  primary={`${manager.name} ${manager.surname}`}
                  secondary={`Phone Number: ${manager.phoneNumber}, Monthly Pay: ${manager.monthlyPay}`}
                />
                <ListItemSecondaryAction>
                  <IconButton onClick={() => handleEdit(manager)}>
                    <EditIcon />
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

export default ManagerList;
