import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Typography, Snackbar } from '@mui/material';

const AddWorker = () => {

  let apiKey = localStorage.getItem('apiKey')
  let user = JSON.parse(localStorage.getItem('user'))
  
  const [workerData, setWorkerData] = useState({
    workerType: 'worker',
    name: '',
    phoneNumber: '',
    email: '',
    password: 'test',
    surname: '',
    payAccountNumber: '',
    address: '',
    pesel: '',
    monthlyPay: 0,
    employerId: user.user.empManId
  });
  const [notification, setNotification] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setWorkerData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  console.log(apiKey)
  console.log(user.user.empManId)
  const handleSubmit = async () => {
    try {
      await axios.post(`http://localhost:8080/user/registerWorker/apiKey=${apiKey}`, workerData);
      setNotification({ message: 'Worker added successfully', severity: 'success' });
      setWorkerData({
        workerType: 'worker',
        name: '',
        phoneNumber: '',
        email: '',
        password: 'test',
        surname: '',
        payAccountNumber: '',
        address: '',
        pesel: '',
        monthlyPay: 0,
        employerId: 0
      });

    } catch (error) {
      setNotification({ message: 'Failed to add worker', severity: 'error' });
    }
  };

  const handleClose = () => {
    setNotification(null);
  };

  return (
    <>
      <Typography variant="h5" gutterBottom>Add Worker</Typography>
      <TextField
        fullWidth
        label="Name"
        name="name"
        value={workerData.name}
        onChange={handleChange}
      />
      <TextField
        fullWidth
        label="Surname"
        name="surname"
        value={workerData.surname}
        onChange={handleChange}
      />
      <TextField
        fullWidth
        label="Phone Number"
        name="phoneNumber"
        value={workerData.phoneNumber}
        onChange={handleChange}
      />
      <TextField
        fullWidth
        label="Email"
        name="email"
        value={workerData.email}
        onChange={handleChange}
      />
      <TextField
        fullWidth
        label="Address"
        name="address"
        value={workerData.address}
        onChange={handleChange}
      />
      <TextField
        fullWidth
        label="PESEL"
        name="pesel"
        value={workerData.pesel}
        onChange={handleChange}
      />
      <TextField
        fullWidth
        label="Pay Account Number"
        name="payAccountNumber"
        value={workerData.payAccountNumber}
        onChange={handleChange}
      />
      <TextField
        fullWidth
        type="number"
        label="Monthly Pay"
        name="monthlyPay"
        value={workerData.monthlyPay}
        onChange={handleChange}
      />
      <Button variant="contained" onClick={handleSubmit}>Add Worker</Button>
      <Snackbar
        open={notification !== null}
        autoHideDuration={6000}
        onClose={handleClose}
        message={notification ? notification.message : ''}
      />
    </>
  );
};

export default AddWorker;
