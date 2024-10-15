import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Typography, Container } from '@mui/material';

const NoAccess = () => {
    const navigate = useNavigate();

    const goBack = () => {
        navigate(-1);
    };

    const goToLogin = () => {
        navigate('/authentication');
    };

    return (
        <Container
            style={{
                textAlign: 'center',
                marginTop: '100px',
                padding: '20px',
                border: '1px solid #ccc',
                borderRadius: '10px',
                backgroundColor: '#f9f9f9',
                maxWidth: '500px',
            }}
        >
            <Typography variant="h4" component="h1" gutterBottom>
                Brak Dostępu
            </Typography>
            <Typography variant="body1" gutterBottom>
                Nie masz odpowiednich uprawnień, aby uzyskać dostęp do tej strony.
            </Typography>

            <Button
                variant="contained"
                color="primary"
                onClick={goBack}
                style={{ marginRight: '10px' }}
            >
                Wróć do poprzedniej strony
            </Button>

            <Button
                variant="outlined"
                color="secondary"
                onClick={goToLogin}
            >
                Przejdź do logowania/rejestracji
            </Button>
        </Container>
    );
};

export default NoAccess;
