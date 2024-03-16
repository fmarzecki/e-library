import React from 'react';
import { Grid, Button, Typography, ThemeProvider, createTheme } from '@mui/material';
import BookIcon from '@mui/icons-material/Book';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CircleNotificationsIcon from '@mui/icons-material/CircleNotifications';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import BookmarkAddedIcon from '@mui/icons-material/BookmarkAdded';
import { Outlet } from 'react-router-dom';
import ResponsiveAppBar from './ResponsiveAppBar';
<<<<<<< HEAD
import { StyledLink } from './StyledLink';
import { Style } from '@mui/icons-material';
=======
>>>>>>> fm

const theme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "2px 10px 10px 2px", // Przykładowa wartość
          color: "rgb(42, 55, 73)",
          fontSize: '1rem', // Przykładowa wartość
          fontWeight: "normal",
          textAlign: "left",
          textTransform: "none",
          justifyContent: "flex-start",
          marginBottom: "10px",
          transition: 'color 0.3s ease-in, background-color 0.3s ease-in',
          ":hover":{
            backgroundColor: "rgb(37, 54, 81)",
            color: 'rgb(216, 226, 239)',
          }
        },
      },
    },
  },
});

const Dashboard = () => {
  return (
      <>
        <Grid container sx={{bgcolor: "rgb(219, 223, 234)"}}>
        <Grid item xs={12} sm={1.5} minWidth={200} sx={{margin: "10px", height: {xs: "100%", sm: "100vh"}}}>
            <Typography gutterBottom variant='h5' align='center' sx={{marginBottom: '60px'}}>
              <BookIcon fontSize='large' sx={{marginTop: '20px'}}></BookIcon><br/>
              Biblioteka
            </Typography>
            <ThemeProvider theme={theme}>
<<<<<<< HEAD
                {/* component = https://mui.com/material-ui/guides/composition/ */}

                {/* TODO
                    Kiedy wchodzimy na jakis link np. account, zeby wtedy ten button odpowiadajacy za account sie świecił cały czas
                    wtedy fajnie widać na jakiej zakładce jestesmy
                */}
                
              <Button component={StyledLink} to={"/dashboard/news"}  fullWidth><BookmarkAddedIcon/>&nbsp; Wypożyczenia</Button>
              <Button component={StyledLink} to={"/dashboard/news"} fullWidth><MenuBookIcon/>&nbsp; Katalog</Button>
              <Button component={StyledLink} to={"/dashboard/news"} fullWidth><CircleNotificationsIcon/>&nbsp; Ogłoszenia</Button>
              <Button component={StyledLink} to={"/dashboard/account"} fullWidth><AccountCircleIcon/>&nbsp; Konto</Button>
=======
              <Button fullWidth><BookmarkAddedIcon/>&nbsp;Wypożyczenia</Button>
              <Button fullWidth><MenuBookIcon/>&nbsp;Katalog</Button>
              <Button fullWidth><CircleNotificationsIcon/>&nbsp;Ogłoszenia</Button>
              <Button fullWidth><AccountCircleIcon/>&nbsp;Konto</Button>
>>>>>>> fm
            </ThemeProvider>
          </Grid>
          <Grid item xs={12} sm sx={{ bgcolor: "rgb(255, 255, 255)", borderRadius: "20px", margin: "40px 20px"}}>
            <ResponsiveAppBar/>
<<<<<<< HEAD
            <Outlet ></Outlet>
=======
>>>>>>> fm
          </Grid>
        </Grid>
      </>
  );
}

export default Dashboard