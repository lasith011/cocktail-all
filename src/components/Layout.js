import React from 'react';
import {
    AppBar,
    Toolbar,
    Typography,
    IconButton,
    Menu,
    MenuItem,
    Box,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

const Layout = ({ children }) => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [selectedKey, setSelectedKey] = React.useState('home');
    const navigate = useNavigate();

    const handleMenuClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleMenuItemClick = (item) => {
        setSelectedKey(item);
        handleMenuClose();
        navigate(`/${item}`);
    };

    return (
        <div>
            <AppBar
                position="static"
                sx={{
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    boxShadow: 'none',
                    padding: '0.5rem 1rem',
                }}
            >
                <Toolbar
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                    }}
                >
                    {/* Logo */}
                    <Box
                        component="img"
                        src="/logo.png"
                        alt="Logo"
                        sx={{ height: 40, mr: 2 }}
                    />

                    <Typography variant="h6" sx={{ flexGrow: 1 }}>
                        Cocktail App
                    </Typography>

                    {/* Horizontal Menu using Box */}
                    <Box
                        sx={{
                            display: { xs: 'none', md: 'flex' },
                            flexGrow: 1,
                            justifyContent: 'flex-end',
                        }}
                    >
                        <MenuItem
                            onClick={() => handleMenuItemClick('home')}
                            sx={{
                                color:
                                    selectedKey === 'home' ? 'yellow' : 'white',
                            }}
                        >
                            <HomeIcon sx={{ mr: 1 }} />
                            Home
                        </MenuItem>
                        <MenuItem
                            onClick={() => handleMenuItemClick('search')}
                            sx={{
                                color:
                                    selectedKey === 'search'
                                        ? 'yellow'
                                        : 'white',
                            }}
                        >
                            <SearchIcon sx={{ mr: 1 }} />
                            Search
                        </MenuItem>
                        <MenuItem
                            onClick={() => handleMenuItemClick('favorites')}
                            sx={{
                                color:
                                    selectedKey === 'favorites'
                                        ? 'yellow'
                                        : 'white',
                            }}
                        >
                            <FavoriteIcon sx={{ mr: 1 }} />
                            Favorites
                        </MenuItem>
                    </Box>

                    {/* Icon button to open the menu on mobile */}
                    <IconButton
                        color="inherit"
                        onClick={handleMenuClick}
                        sx={{ display: { xs: 'block', md: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>

                    {/* Mobile Menu */}
                    <Menu
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={handleMenuClose}
                    >
                        <MenuItem onClick={() => handleMenuItemClick('/')}>
                            <HomeIcon sx={{ mr: 1 }} />
                            Home
                        </MenuItem>
                        <MenuItem onClick={() => handleMenuItemClick('search')}>
                            <SearchIcon sx={{ mr: 1 }} />
                            Search
                        </MenuItem>
                        <MenuItem
                            onClick={() => handleMenuItemClick('favorites')}
                        >
                            <FavoriteIcon sx={{ mr: 1 }} />
                            Favorites
                        </MenuItem>
                    </Menu>
                </Toolbar>
            </AppBar>

            {/* Content Box with side gaps */}
            <Box
                sx={{
                    mx: 2, // Horizontal margin (left and right)
                    my: 2, // Vertical margin (top and bottom)
                    p: 2, // Padding inside the content box
                    bgcolor: '#f5f5f5', // Optional background color for the content box
                    borderRadius: 2, // Optional rounded corners
                }}
            >
                {children}
            </Box>
        </div>
    );
};
Layout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default Layout;
