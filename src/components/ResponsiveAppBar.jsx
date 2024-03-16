import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
<<<<<<< HEAD
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { StyledLink } from './StyledLink';
=======
>>>>>>> fm

const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

function ResponsiveAppBar() {

  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [user, setUser] = React.useState({imie: "Kamil", nazwisko: "Rojek"})


  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
<<<<<<< HEAD
    <AppBar position="static" sx={{bgcolor: "white", borderRadius: "10px", color: "black" , mb: '10px'}}>
=======
    <AppBar position="static" sx={{bgcolor: "white", borderRadius: "10px", color: "black" }}>
>>>>>>> fm
      <Container maxWidth="xl" >
        <Toolbar disableGutters sx={{display: 'flex', justifyContent: "space-between", }}>
            <Typography> Witaj {user.imie} {user.nazwisko} </Typography>
          <Box >
<<<<<<< HEAD
            {/* ToolTip - po najechaniu na element wyswietla sie informacja*/}
            <Tooltip title="Open settings"> 
=======
            <Tooltip title="Open settings">
>>>>>>> fm
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt={user.imie} src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
<<<<<<< HEAD

=======
>>>>>>> fm
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >

<<<<<<< HEAD
            <MenuItem id="account" onClick={handleCloseUserMenu}>
                <Typography component={StyledLink} to={"/"} textAlign="center">Konto</Typography>
            </MenuItem>

            <MenuItem id="logout" onClick={handleCloseUserMenu}>
                    <Typography component={StyledLink} to={"/"} textAlign="center">Wyloguj</Typography>
            </MenuItem>
=======
                <MenuItem id="account" onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">Konto</Typography>
                </MenuItem>

                <MenuItem id="logout" onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">Wyloguj</Typography>
                </MenuItem>
>>>>>>> fm

            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;