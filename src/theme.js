import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#000000', // Set primary color to black
    },
    background: {
      default: '#000000', // Set default background color to black
      paper: '#000000',   // Set paper background color to black
    },
    text: {
      primary: '#ffffff', // Set primary text color to white
      secondary: '#ffffff', // Set secondary text color to white
    },
  },
});

export default theme;
