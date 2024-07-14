import * as React from 'react';
import Box from '@mui/material/Box';
import {Paper, Button, TextField} from '@mui/material';


export default function MainMenu() {
    const paperStyle = { padding: '50px 20px', width: 800, margin: "20px auto" }


  return (
    <Paper elevation={3} style={paperStyle}>
        <h1 style={{color:'orange'}}>Welcome To CHEFFI!</h1>
      <Box
        component="form"
        sx={{
          '& > :not(style)': { m: 1, width: '25ch' },
        }}
        noValidate
        autoComplete="off"
      >
      </Box>
    </Paper>
  );
}
