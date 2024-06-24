import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { useEffect } from 'react';
import { toast } from 'sonner';

import { Link, useNavigate } from "react-router-dom"
import logo from "../SVGOneNDFLogo.svg"

const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

function ResponsiveAppBar() {

    const navigate = useNavigate()

    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const [isLogin, setisLogin] = React.useState(!!localStorage.getItem('token'))

    useEffect(() => {
        if (localStorage.getItem("token")) {
            setisLogin(false)
        }
        else {
            setisLogin(true)
        }
    }, [])

    useEffect(() => {
        const handleStorageChange = () => {
            setisLogin(!!localStorage.getItem('token'));
            window.location.reload()
            navigate("/" + localStorage.getItem("user_id") + "/user")
        };

        // Listen for the custom event
        window.addEventListener('storageChange', handleStorageChange);

    }, []);



    const handleLogout = () => {
        localStorage.removeItem('token');

        fetch("http://127.0.0.1:3000/api/nfc_users", {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'X-CSRF-Token': localStorage.getItem("token")
            },
            mode: 'cors',
            credentials: 'include',
        }).then(res => res.json()).then(res => {
            console.log(res)
            localStorage.setItem("user_id", res.user.id)
            navigate(`/${res.user.id}/${res.user.first_name}`)
        }).catch(err => {
            toast.error('Unable to edit user. Try Again!');
        })

        // Emit custom event
        const event = new Event('storageChange');
        window.dispatchEvent(event);

        navigate('/login');
    };



    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <img src={logo} width="80px" alt="" sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />

                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                    </Box>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>

                    </Box>

                    {isLogin ?
                        <>
                            <MenuItem>
                                <Link to="/login" >
                                    <Typography textAlign="center">Login</Typography>
                                </Link>
                            </MenuItem>
                            <MenuItem>
                                <Link to="/signup" >
                                    <Typography textAlign="center">Signup</Typography>
                                </Link>
                            </MenuItem>
                        </>
                        :

                        <Box sx={{ flexGrow: 0 }}>
                            <Tooltip title="Open settings">
                                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                    <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                                </IconButton>
                            </Tooltip>
                            <Menu
                                sx={{ mt: '45px' }}
                                id="menu-appbar"
                                anchorEl={anchorElUser}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorElUser)}
                                onClose={handleCloseUserMenu}
                            >
                                <MenuItem>
                                    <Link to="/editprofile" >
                                        <button id='save-btn' >
                                            <Typography textAlign="center">Edit profile</Typography>
                                        </button>
                                    </Link>
                                </MenuItem>
                                <MenuItem onClick={handleLogout}>
                                    <Typography textAlign="center">Log-out</Typography>
                                </MenuItem>


                            </Menu>
                        </Box>
                    }
                </Toolbar>
            </Container>
        </AppBar>
    );
}
export default ResponsiveAppBar;
