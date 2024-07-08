import * as React from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import {Paper, Button, TextField} from '@mui/material';
import FormHelperText from '@mui/material/FormHelperText';


export default function User() {
    const paperStyle = { padding: '50px 20px', width: 800, margin: "20px auto" }
    const[username, setUsername] = React.useState('')
    const[firstname, setFirstname] = React.useState('')
    const[lastname, setLastname] = React.useState('')
    const[user, setUser] = React.useState([])
    const navigate = useNavigate();
    const [error, setError] = React.useState(false);
    const[helperText, setHelperText] = React.useState('')


    const handleClick = (e) => {
        e.preventDefault()
        const user={username, firstname, lastname}
        console.log(user)
        fetch("http://localhost:8080/api/v1/user", {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(user)
        })
          .then(response => {
            if (!response.ok) {
              throw new Error(`HTTP error! Status: ${response.status}`);
            }
            console.log('new user added');
            navigate('/loggedin', { state: { username } });
          })
          .catch(error => {
            console.error('Error:', error);
            setError(true);
            setHelperText('Username Taken!');
          });
      };

useEffect(() => {
  fetch("http://localhost:8080/api/v1/user")
    .then(response => response.json())
    .then(result => {
      setUser(result);
    });
}, []);



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
        <FormHelperText style={{color:'red'}}>{helperText}</FormHelperText>

        <Button variant="contained" onClick={handleClick}>
        Register
        </Button>

      </Box>
    </Paper>
  );
}
