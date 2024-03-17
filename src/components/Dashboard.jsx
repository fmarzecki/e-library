import React from 'react';
import { Grid, Button, Typography, ThemeProvider, createTheme } from '@mui/material';
import BookIcon from '@mui/icons-material/Book';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CircleNotificationsIcon from '@mui/icons-material/CircleNotifications';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import BookmarkAddedIcon from '@mui/icons-material/BookmarkAdded';
import { Outlet,useLocation, NavLink } from 'react-router-dom';
import ResponsiveAppBar from './ResponsiveAppBar';
import { StyledLink } from './StyledLink';
import { Style } from '@mui/icons-material';

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
          ":hover":{
            backgroundColor: "rgb(37, 54, 81)",
            color: 'rgb(216, 226, 239)'
          },
          '&.active': {
            backgroundColor:"rgb(37, 54, 81)",
            color: 'rgb(216, 226, 239)'
          }
        },
      },
    },
  },
});

const Dashboard = () => {
  const location = useLocation();

  return (
      <>
        <Grid container sx={{bgcolor: "rgb(219, 223, 234)"}}>
        <Grid item xs={12} sm={1.5} minWidth={200} sx={{margin: "10px", height: {xs: "100%", sm: "100vh"}}}>
            <Typography gutterBottom variant='h5' align='center' sx={{marginBottom: '60px'}}>
              <BookIcon fontSize='large' sx={{marginTop: '20px'}}></BookIcon><br/>
              Biblioteka
            </Typography>
            <ThemeProvider theme={theme}>
                {/* component = https://mui.com/material-ui/guides/composition/ */}

                {/* Nie jestem pewny czy trzeba bylo uzyc teog NavLink ale tak jeden gosc mial na tutorialu i dziala
                Ogolnie to tam na gorze zmienilem i dodalem &.active dzieku czemu dziala */}
                
              <Button component={NavLink} to={"/dashboard/rentals"} fullWidth><BookmarkAddedIcon/>&nbsp; Wypożyczenia</Button>
              <Button component={NavLink} to={"/dashboard/catalog"} fullWidth><MenuBookIcon/>&nbsp; Katalog</Button>
              <Button component={NavLink} to={"/dashboard/news"} fullWidth><CircleNotificationsIcon/>&nbsp; Ogłoszenia</Button>
              <Button component={NavLink} to={"/dashboard/account"} fullWidth><AccountCircleIcon/>&nbsp; Konto</Button>
            </ThemeProvider>
          </Grid>
          <Grid item xs={12} sm sx={{ bgcolor: "rgb(255, 255, 255)", borderRadius: "20px", margin: "40px 20px"}}>
            <ResponsiveAppBar/>
            <Outlet ></Outlet>
          </Grid>
        </Grid>
      </>
  );
}

export default Dashboard