import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import logo from './cheffilogo.png';
import { Link } from 'react-router-dom';



export default function Appbar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <img src={logo} alt="Logo" style={{ marginRight: 16, height: 40 }} />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            CHEFFI
          </Typography>
          <Button component={Link} to="/login" color="inherit">Login</Button>
          <Button component={Link} to="/user" color="inherit">Sign Up</Button>

        </Toolbar>
      </AppBar>
    </Box>
  );
}
