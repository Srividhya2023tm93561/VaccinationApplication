import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Header: React.FC = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('authToken');
    navigate('/login');
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          KDARFS School Vaccination Portal
        </Typography>
        <Button color="inherit" onClick={handleLogout}>Logout</Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;