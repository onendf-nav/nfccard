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

import { Link } from "react-router-dom"
import logo from "../SVGOneNDFLogo.svg"

const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

function ResponsiveAppBar() {
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const [isLogin, setisLogin] = React.useState(false)

    useEffect(() => {
        if (localStorage.getItem("token")) {
            setisLogin(false)
        }
        else {
            setisLogin(true)
        }
    }, [])
    


    

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
                                    <button id='save-btn' >
                                        <Typography textAlign="center">Edit profile</Typography>
                                    </button>
                                </MenuItem>
                                <MenuItem onClick={handleCloseUserMenu}>
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
