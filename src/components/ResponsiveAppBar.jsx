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
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { StyledLink } from './StyledLink';

const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

function ResponsiveAppBar() {

  const [anchorElUser, setAnchorElUser] = React.useState(null);
  let apiKey = localStorage.getItem('apiKey')
  let user = JSON.parse(localStorage.getItem('user'))

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static" sx={{bgcolor: "white", borderRadius: "10px", color: "black" , mb: '10px'}}>
      <Container maxWidth="xl" >
        <Toolbar disableGutters sx={{display: 'flex', justifyContent: "space-between", }}>
            <Typography> Witaj {user.user.user.name} {user.user.user.surname} </Typography>
          <Box >
            {/* ToolTip - po najechaniu na element wyswietla sie informacja*/}
            <Tooltip title="Open settings"> 
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt={user.user.user.name} src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
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

            <MenuItem id="account" onClick={handleCloseUserMenu}>
                <Typography component={StyledLink} to={"/"} textAlign="center">Konto</Typography>
            </MenuItem>

            <MenuItem id="logout" onClick={handleCloseUserMenu}>
                    <Typography component={StyledLink} to={"/"} textAlign="center">Wyloguj</Typography>
            </MenuItem>

            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;