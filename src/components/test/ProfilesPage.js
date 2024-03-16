import React from 'react'
import { Link } from 'react-router-dom';
import { Box, Grid,Paper   } from '@mui/material';
import logo from './l.jpg';
import Typography from '@mui/material/Typography';

const profiles = [1, 2, 3, 4, 5, 6];

function ProfilesPage() {
  return (
    <Grid container minWidth={350} justifyContent="center" alignItems="center" spacing={1}> 
    {profiles.map( (profil) =>  (
                 <Grid item   xs={11} sm={5.5} md={4}>
                    <Paper elevation={3}>
                        <Box sx={{textAlign: 'center'}}>
                            <Link key={profil} to={`/profiles/${profil}`} >
                            Profile {profil} 
                            </Link>
                        </Box >
                       
                        <Box sx={{bgcolor: 'grey'}}>
                            <img src={logo} style={{
                                                maxHeight: '160px',
                                                minHeight: '160px',
                                                height: '100%',
                                                maxWidth: '100%',
                                                width: '100%',
                                                objectFit: 'cover'}}/>
                        </Box>

                        <Typography>
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
                        </Typography>
                    </Paper>
                </Grid>
            ))}
    </Grid>
  )
}

export default ProfilesPage;