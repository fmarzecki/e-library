import React, { useState } from 'react';
import { postRequest } from '../utilities/api';
import Notification from '../Alert/Notification';
import { TextField, Button, Typography } from '@mui/material';

const AddWorker = () => {
    const [workerData, setWorkerData] = useState({
        name: '',
        surname: '',
        phoneNumber: '',
        email: '',
        monthlyPay: 0,
    });

    const [notification, setNotification] = useState(null);
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setWorkerData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const validateForm = () => {
        let valid = true;
        const errors = {};

        if (!workerData.name) {
            errors.name = "Imię jest wymagane.";
            valid = false;
        }
        if (!workerData.surname) {
            errors.surname = "Nazwisko jest wymagane.";
            valid = false;
        }
        if (!workerData.phoneNumber) {
            errors.phoneNumber = "Numer telefonu jest wymagany.";
            valid = false;
        }
        if (!workerData.email) {
            errors.email = "Email jest wymagany.";
            valid = false;
        }
        if (workerData.monthlyPay <= 0) {
            errors.monthlyPay = "Miesięczna płaca musi być większa od 0.";
            valid = false;
        }

        setErrors(errors);
        return valid;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        try {
            const response = await postRequest("/admin/addWorker", workerData);
            setWorkerData({ name: '', surname: '', phoneNumber: '', email: '', monthlyPay: 0 });
            setNotification({ message: 'Pracownik został dodany pomyślnie.', severity: 'success' });
        } catch (error) {
            console.error('Error adding worker:', error);
            
            // Check if the error response contains the message "User already exists"
            if (error.response && error.response.data && error.response.data.message === 'User already exists') {
                setNotification({ message: 'Użytkownik już istnieje.', severity: 'error' });
            } else {
                setNotification({ message: 'Nie udało się dodać pracownika.', severity: 'error' });
            }
        }
    };

    const handleClose = () => {
        setNotification(null);
    };

    return (
        <>
            {notification && <Notification message={notification.message} severity={notification.severity} setOpenProp={setNotification} />}
            <Typography variant="h5" gutterBottom>Dodaj Pracownika</Typography>
            <form onSubmit={handleSubmit}>
                <TextField fullWidth label="Imię" name="name" value={workerData.name} onChange={handleChange} error={!!errors.name} helperText={errors.name} required />
                <TextField fullWidth label="Nazwisko" name="surname" value={workerData.surname} onChange={handleChange} error={!!errors.surname} helperText={errors.surname} required />
                <TextField fullWidth label="Numer Telefonu" name="phoneNumber" value={workerData.phoneNumber} onChange={handleChange} error={!!errors.phoneNumber} helperText={errors.phoneNumber} required />
                <TextField fullWidth label="Email" name="email" value={workerData.email} onChange={handleChange} error={!!errors.email} helperText={errors.email} required />
                <TextField fullWidth type="number" label="Miesięczna Płaca" name="monthlyPay" value={workerData.monthlyPay} onChange={handleChange} error={!!errors.monthlyPay} helperText={errors.monthlyPay} required />
                <Button type="submit" variant="contained" color="primary" sx={{ marginTop: '10px' }}>Dodaj Pracownika</Button>
            </form>
        </>
    );
};

export default AddWorker;
