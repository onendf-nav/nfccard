import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Navbar from './components/Navbar';
import { Homepage } from './components/Homepage';

import { Profileshow } from './components/Profileshow';
import {Login} from './components/Login';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme';
import {Signup} from "./components/Signup"

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
      <div>

        <Navbar />
        <Routes>
          <Route path='/' element={<Homepage/>} />
          <Route path='/login' element={<Login/>} />
          <Route path='/signup' element={<Signup/>} />
          <Route path='/:id/:name' element={<Profileshow/>} />
        </Routes>
      </div>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
