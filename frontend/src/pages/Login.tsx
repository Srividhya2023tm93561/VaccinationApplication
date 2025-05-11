import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/api';
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Snackbar,
  Alert,
} from '@mui/material';
import schoolImg from '../components/images/vaccinationCamp.png';

const Login: React.FC = () => {
  const [token, setToken] = useState('');
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'info' as 'success' | 'error' });
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (token === 'Admin') {
      setSnackbar({ open: true, message: 'Login successful!', severity: 'success' });
      await login(token);
      setTimeout(() => navigate('/dashboard'), 1500);
    } else {
      setSnackbar({ open: true, message: 'Invalid Password. Please try again.', severity: 'error' });
    }
  };

  return (
    <Box
      sx={{
        backgroundImage: `url(${schoolImg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        pt: 10,
      }}
    >
      <Container maxWidth="sm" sx={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', borderRadius: 2, padding: 4 }}>
        <Box textAlign="center">
          <Typography variant="h4" gutterBottom>KDARFS School Vaccination Portal</Typography>
          <TextField
            fullWidth
            label="Enter Access Password"
            value={token}
            onChange={(e) => setToken(e.target.value)}
            margin="normal"
          />
          <Button variant="contained" color="primary" onClick={handleLogin} fullWidth>
            Login
          </Button>
        </Box>
      </Container>

      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert
          severity={snackbar.severity}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          variant="filled"
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Login;
