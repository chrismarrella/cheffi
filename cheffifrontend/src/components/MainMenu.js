import * as React from 'react';
import Box from '@mui/material/Box';
import {Paper, Button, TextField} from '@mui/material';


export default function MainMenu() {
    const paperStyle = { padding: '50px 20px', width: 800, margin: "20px auto" }
    const[username, setUsername] = React.useState('')
    const[firstname, setFirstname] = React.useState('')
    const[lastname, setLastname] = React.useState('')
    const[user, setUser] = React.useState([])
    const [error, setError] = React.useState(false);
    const[helperText, setHelperText] = React.useState('')


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
