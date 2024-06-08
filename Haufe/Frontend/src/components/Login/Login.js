import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Container, Typography, TextField, Button, Grid, Paper } from '@mui/material';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const credentials = {
      email: email,
      password: password,
    };

    try {
      const response = await axios.post('http://localhost:5000/api/login', credentials);
      console.log('Login successful:', response.data.token);

      const token = response.data.token;

      if (token) {
        localStorage.setItem('token', token);
        navigate('/Home');
        window.location.reload();
      } else {
        console.error('Token not provided in response.');
      }
    } catch (error) {
      console.error('Login error:', error.response || error.message);
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ padding: 3, marginTop: 10 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Login
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Email"
                variant="outlined"
                value={email}
                onChange={handleEmailChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Password"
                variant="outlined"
                type="password"
                value={password}
                onChange={handlePasswordChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="primary" fullWidth>
                Login
              </Button>
            </Grid>
          </Grid>       
        </form>
        <Typography variant="body1" align="center" style={{ marginTop: 10 }}>
          Don't have an account? <Link to="/register">Register here</Link>.
        </Typography>
      </Paper>
    </Container>
  );
};

export default Login;
