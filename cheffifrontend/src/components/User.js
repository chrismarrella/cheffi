import * as React from 'react';
import Box from '@mui/material/Box';
import {Paper, Button, TextField} from '@mui/material';

export default function User() {
    const paperStyle = { padding: '50px 20px', width: 800, margin: "20px auto" }
    const[username, setUsername] = React.useState('')
    const[firstname, setFirstname] = React.useState('')
    const[lastname, setLastname] = React.useState('')
    const handleClick = (e) => {
        e.preventDefault()
        const student={username, firstname, lastname}
        console.log(student)
    }

  return (
    <Paper elevation={3} style={paperStyle}>
        <h1 style={{color:'orange'}}>Register User</h1>
      <Box
        component="form"
        sx={{
          '& > :not(style)': { m: 1, width: '25ch' },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField id="outlined-basic" label="Username" variant="outlined" fullWidth 
        value = {username}
        onChange={(e) => setUsername(e.target.value)}
        />
        <TextField id="outlined-basic" label="Firstname" variant="outlined" fullWidth 
        value = {firstname}
        onChange={(e) => setFirstname(e.target.value)}
        />
        <TextField id="outlined-basic" label="Lastname" variant="outlined" fullWidth 
        value = {lastname}
        onChange={(e) => setLastname(e.target.value)}
        />
        <Button variant="contained" onClick={handleClick}>
        Register
        </Button>
      </Box>
    </Paper>
  );
}
