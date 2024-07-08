import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import Box from '@mui/material/Box';
import { Paper, Button, TextField } from '@mui/material';
import FormHelperText from '@mui/material/FormHelperText';

export default function Login() {
  const paperStyle = { padding: '50px 20px', width: 800, margin: "20px auto" };
  const [username, setUsername] = React.useState('');
  const [users, setUsers] = React.useState([]);
  const navigate = useNavigate();
  const [helperText, setHelperText] = React.useState('');

  const handleClick = (e) => {
    e.preventDefault();
    const userExists = users.some(u => u.username === username);
    if (userExists) {
      console.log('Logged in As', username);
      setHelperText('');
      setUsername(username);
      navigate('/loggedin', { state: { username } }); // Pass username in state (unchanged)
    } else {
      setHelperText('User does not exist');
    }
  };

  useEffect(() => {
    fetch("http://localhost:8080/api/v1/user")
      .then(response => response.json())
      .then(result => {
        setUsers(result);
      });
  }, []);

  return (
    <Paper elevation={3} style={paperStyle}>
      <h1 style={{ color: 'orange' }}>Login</h1>
      <Box
        component="form"
        sx={{
          '& > :not(style)': { m: 1, width: '25ch' },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          id="outlined-basic"
          label="Username"
          variant="outlined"
          fullWidth
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <FormHelperText style={{ color: 'red' }}>{helperText}</FormHelperText>

        <Button variant="contained" onClick={handleClick}>
          Login
        </Button>
      </Box>
    </Paper>
  );
}