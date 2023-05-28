import React from 'react';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material';
import theme from './theme';
import RootLayout from './screens/RootLayout';

function App() {
  return (
	  <BrowserRouter>
		  <ThemeProvider theme={theme} >
			  <RootLayout />
		  </ThemeProvider>
	  </BrowserRouter>
  );
}

export default App;
