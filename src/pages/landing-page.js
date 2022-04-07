import React, { useEffect, useState } from "react";
import background from "../assets/background.jpg";
import { HeaderComponent } from "../components/header-component"
import Button from '@mui/material/Button';
import { createTheme, ThemeProvider } from '@mui/material/styles';

localStorage.clear();

const theme = createTheme({
  status: {
    danger: '#e53e3e',
  },
  palette: {
    primary: {
      main: '#0971f1',
      darker: '#053e85',
    },
    neutral: {
      main: '#FFFF',
      contrastText: '#fff',
    },
  },
});

export const LandingPage = () => {

  return (
    <div style={{
      backgroundImage: `url(${background})`,
      backgroundRepeat: 'no-repeat',
      height: '100vh',
    }}>
      <HeaderComponent islogged={false} backgroundColor={'white'} iscontacted={true} isabout={true} textColor={'blue'} />
      <div style={{ width: "15%", position: "absolute", justifyContent: 'space-between', display: 'flex', flexDirection: "row", top: "50%", right: "45%" }}>
        <ThemeProvider theme={theme}>
          <Button href="./sign-up-page" variant="outlined" color="neutral" style={{ fontWeight: "bold", borderWidth: 3, borderRadius: 20 }}>
            Sign-Up
          </Button>
          <Button href="./sign-in-page" variant="outlined" color="neutral" style={{ fontWeight: "bold", borderWidth: 3, borderRadius: 20 }}>
            Sign-In
          </Button>
        </ThemeProvider>


      </div>
    </div>
  )
};