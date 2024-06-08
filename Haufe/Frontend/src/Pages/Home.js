import React from 'react';
import { Container, Typography, Box, Grid, Card, CardContent, CardMedia } from '@mui/material';

const Home = () => {
  const recommendations = JSON.parse(localStorage.getItem('recommendations')) || [];

  return (
    <Container maxWidth="md">
      <Box sx={{ paddingY: 4 }}>
        <Typography variant="h2" align="center" gutterBottom>
          Welcome to Filmtext App
        </Typography>
        <Typography variant="h4" align="center" gutterBottom>
          Recommendations:
        </Typography>
        <Grid container spacing={4}>
          {recommendations.map((recommendation, index) => (
            <Grid item key={index} xs={12} sm={6} md={4}>
              <Card>
                <CardMedia
                  component="img"
                  height="200"
                  image={recommendation.image}
                  alt={recommendation.title}
                />
                <CardContent>
                  <Typography variant="h6" align="center" gutterBottom>{recommendation.title}</Typography>
                  <Typography variant="body1" align="center" gutterBottom>{recommendation.description}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default Home;
