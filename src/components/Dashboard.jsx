import React, { useEffect } from 'react';
import { Grid, Button, Typography, ThemeProvider, createTheme } from '@mui/material';
import { Outlet, NavLink } from 'react-router-dom';
import ResponsiveAppBar from './ResponsiveAppBar';
import { useNavigate } from 'react-router-dom';
import BookIcon from '@mui/icons-material/Book';

const theme = createTheme({
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: "2px 10px 10px 2px",
                    color: "rgb(42, 55, 73)",
                    fontSize: '1rem',
                    fontWeight: "normal",
                    textAlign: "left",
                    textTransform: "none",
                    justifyContent: "flex-start",
                    marginBottom: "10px",
                    transition: 'color 0.3s ease-in, background-color 0.3s ease-in',
                    ":hover": {
                        backgroundColor: "rgb(37, 54, 81)",
                        color: 'rgb(216, 226, 239)'
                    },
                    '&.active': {
                        backgroundColor: "rgb(37, 54, 81)",
                        color: 'rgb(216, 226, 239)'
                    }
                },
            },
        },
    },
});

const Dashboard = ({ buttons }) => {

    return (
        <Grid container sx={{ bgcolor: "rgb(219, 223, 234)" }}>
            <Grid item xs={12} sm={12} md={1.5} minWidth={200} sx={{ margin: "10px" }}>
                <Typography gutterBottom variant='h5' align='center' sx={{ marginBottom: '60px' }}>
                    <BookIcon fontSize='large' sx={{ marginTop: '20px' }} /><br />
                    Biblioteka
                </Typography>
                <ThemeProvider theme={theme}>
                    {buttons.map((button, index) => (
                        <Button key={index} component={NavLink} to={button.to} fullWidth>
                            <button.icon /> &nbsp; {button.label}
                        </Button>
                    ))}
                </ThemeProvider>
            </Grid>
            <Grid item xs={12} md sx={{ bgcolor: "rgb(255, 255, 255)", borderRadius: "20px", margin: "40px 20px" }}>
                <Grid container spacing={4} padding={4}>
                    {/* <Grid item xs={12}>
                        <ResponsiveAppBar />
                    </Grid> */}
                    <Grid item xs={12}>
                        <Outlet />
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
}

export default Dashboard;