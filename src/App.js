import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Navbar from './components/Navbar';
import { Homepage } from './components/Homepage';

import { Profileshow } from './components/Profileshow';
import { EditProfile } from './components/EditProfile';
import { Login } from './components/Login';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme';
import { Signup } from "./components/Signup"
import { Notfound } from './components/Notfound';
import { Toaster } from 'sonner';


function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <div>
          <Navbar />
          <Toaster toastOptions={{
            style: {
              background: 'black',
              color:'white',
              borderColor:'white'
            },
            
          }} position="top-center" />
          <div className='back-image'>
            <Routes>
              <Route path='/' element={<Homepage />} />
              <Route path='/login' element={<Login />} />
              <Route path='/signup' element={<Signup />} />
              <Route path='/editprofile' element={<EditProfile />} />
              <Route path='/:id/:name' element={<Profileshow />} />
              <Route path='/notfound' element={<Notfound />} />
              <Route path='*' element={<Notfound />} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
