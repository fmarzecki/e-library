import React from 'react';
import { Grid, Button, Typography, ThemeProvider, createTheme } from '@mui/material';
import BookIcon from '@mui/icons-material/Book';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CircleNotificationsIcon from '@mui/icons-material/CircleNotifications';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import BookmarkAddedIcon from '@mui/icons-material/BookmarkAdded';
import { Outlet, NavLink } from 'react-router-dom';
import ResponsiveAppBar from '../ResponsiveAppBar';
import HistoryIcon from '@mui/icons-material/History';

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

const EmployeeDashboard = () => {

  return (
    <>
      <Grid container sx={{ bgcolor: "rgb(219, 223, 234)" }}>
        <Grid item xs={12} sm={12} md={1.5} minWidth={200} sx={{ margin: "10px", height: { md: "100vh" } }}>
          <Typography gutterBottom variant='h5' align='center' sx={{ marginBottom: '60px' }}>
            <BookIcon fontSize='large' sx={{ marginTop: '20px' }}></BookIcon><br />
            Biblioteka
          </Typography>
          <ThemeProvider theme={theme}>
            {/* <Button component={NavLink} to={"/readerDashboard/rentals"} fullWidth><BookmarkAddedIcon />&nbsp; Wypożyczenia</Button>
            <Button component={NavLink} to={"/readerDashboard/history"} fullWidth ><HistoryIcon />&nbsp; Historia</Button>
            <Button component={NavLink} to={"/readerDashboard/account"} fullWidth><AccountCircleIcon />&nbsp; Konto</Button>
            <Button component={NavLink} to={"/readerDashboard/catalog"} fullWidth><MenuBookIcon />&nbsp; Katalog</Button> */}
            <Button component={NavLink} to={"/employeeDashboard/manageNews"} fullWidth><CircleNotificationsIcon />&nbsp; Ogłoszenia</Button>
          </ThemeProvider>
        </Grid>
        <Grid item xs={12} sm={12} md sx={{ bgcolor: "rgb(255, 255, 255)", borderRadius: "20px", margin: "40px 20px" }}>
          <Grid container spacing={4} padding={4}>
            <Grid item xs={12}>
              <ResponsiveAppBar />
            </Grid>
            <Grid item xs={12}>
              <Outlet ></Outlet>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}

export default EmployeeDashboard