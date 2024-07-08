import * as React from 'react';
import Box from '@mui/material/Box';
import { Paper } from '@mui/material';
import { useLocation } from 'react-router-dom';

export default function LoggedIn({ username }) {
    const paperStyle = { padding: '50px 20px', width: 800, margin: "20px auto" };
    const location = useLocation();
    console.log(location.state.username);
    username = location.state.username;
    return (
      <Paper elevation={3} style={paperStyle}>
        {username ? (
          <h1>Logged In As {username}</h1>
        ) : (
          <h1>Logged In As *</h1>
        )}
      </Paper>
    );
  }