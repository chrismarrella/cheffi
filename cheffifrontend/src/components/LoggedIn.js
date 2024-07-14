import * as React from 'react';
import Box from '@mui/material/Box';
import {Paper, Button} from '@mui/material';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';



export default function LoggedIn({ username }) {
    const paperStyle = { padding: '50px 20px', width: 800, margin: "20px auto" };
    const location = useLocation();
    username = location.state.username;
    console.log(location.state.username);
    const navigate = useNavigate();


    const handleClickInventory = (e) => {
      e.preventDefault()
      console.log('button clicked')
      navigate('/inventoryview', { state: { username } })
    };
    const handleClickRecipe = (e) => {
      e.preventDefault()
      console.log('button clicked')

    };
    const handleClickRestriction = (e) => {
      e.preventDefault()
      console.log('button clicked')
      navigate('/dietaryrestrictionsview', { state: { username } })
    };



    return (
      <Paper elevation={3} style={paperStyle}>
        {username ? (
          <h1>Logged In As {username}</h1>
        ) : (
          <h1>Logged In As *</h1>
        )}
              <Box
        component="form"
        sx={{
          '& > :not(style)': { m: 1, width: '25ch' },
        }}
        noValidate
        autoComplete="off"
      >
        
        <Button variant="contained" onClick={handleClickRecipe}> Go To Get Recipes </Button>

        <Button variant="contained" onClick={handleClickRestriction}> Update Dietary Restrictions </Button>

        <Button variant="contained" onClick={handleClickInventory}> Go To Inventory </Button>

          
      </Box>
      </Paper>
    );
  }
  