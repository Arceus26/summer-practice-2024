import React from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material';
import CleaningServicesIcon from '@mui/icons-material/CleaningServices';

import useAuth from '../../utils/Authentication';

const Navigation = () => {

  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();

  console.log(`Navigation rendering. Authenticated: ${isAuthenticated}`);
  const handleLogInClick = () => {
    navigate('/login');
  };

  const handleLogOutClick = () => {
    logout();
    navigate('/');  
  };

  const handleNavigateHome = () => {
    navigate('/');
  };

  const handleNavigateFirst = () => {
    navigate('/first');
  };

  const handleNavigateRegister = () => {
    navigate('/register');
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
          <CleaningServicesIcon style={{ marginRight: '20px', height: '50px', width: '50px' }} />
          <Box onClick={handleNavigateHome} sx={{ cursor: 'pointer' }}>
            <Typography variant="h6" component="div">
              Filmtext
            </Typography>
          </Box>
        </Box>
        <Button color="inherit" sx={{ margin: '0 10px' }} onClick={handleNavigateFirst}>
          Convert
        </Button>
        {isAuthenticated ? (
          <Button color="inherit" sx={{ margin: '0 10px' }} onClick={handleLogOutClick}>
            Log Out
          </Button>
        ) : (
          <Button color="inherit" sx={{ margin: '0 10px' }} onClick={handleLogInClick}>
            Log In
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navigation;
