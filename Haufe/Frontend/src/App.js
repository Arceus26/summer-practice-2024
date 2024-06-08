import './App.css';
import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import First from './Pages/First';
import Home from "./Pages/Home";
import Login from './Pages/LoginPage';
import Navigation from './components/Navigation/Navigation';
import Register from "./utils/Authentication";

const theme = createTheme({
  palette: {
    primary: {
      main: '#3f3f4f',
    },
    secondary: {
      main: '#yourSecondaryColor',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <BrowserRouter>
          <Navigation />
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/first" element={<First />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </BrowserRouter>
      </div>
    </ThemeProvider>
  );
}

export default App;
