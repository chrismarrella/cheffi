import * as React from 'react';
import { useState } from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import FormHelperText from '@mui/material/FormHelperText';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';

export default function GetRecipes() {
  const [helperText, setHelperText] = useState('');
  const [recipe, setRecipe] = useState('');
  const paperStyle = { padding: '50px 20px', width: 800, margin: "20px auto" };
  const [userId, setUserId] = useState(null);
  const [users, setUsers] = React.useState([]);
  const location = useLocation();
  const navigate = useNavigate();

  const { username } = location.state || {};


  useEffect(() => {
    fetch("http://localhost:8080/api/v1/user")
      .then(response => response.json())
      .then(result => {
        setUsers(result);
  
        const user = result.find(user => user.username === username);
        if (user) {
          console.log("User ID:", user.id);
          setUserId(user.id);
        }
      })
      .catch(error => {
        console.error("Error fetching user data:", error);
      });
  }, [username]);

  const handleClickMainMenu = (e) => {
    e.preventDefault();
    console.log('button clicked');
    navigate('/loggedin', { state: { username } });
  };

  const handleClick = () => {
    fetch(`http://localhost:8080/api/v1/user/${userId}/recipes`)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.text(); // Note the use of response.text() instead of response.json()
      })
      .then(data => {
        setRecipe(data); // Set the plain string recipe in state
        console.log('Recipe:', data);
      })
      .catch(error => {
        console.error('Error fetching recipe:', error);
        setHelperText(`Failed to fetch the recipe. ${error.message}`);
      });
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
        <Paper elevation={3} style={paperStyle}>
          <Box component="form" sx={{ '& > :not(style)': { m: 1, width: '25ch' } }} noValidate autoComplete="off">
            <FormHelperText style={{ color: 'red' }}>{helperText}</FormHelperText>
            <Button variant="contained" onClick={handleClick}>
              Get A Recipe
            </Button>
          </Box>
          <Paper>
            <Box component="form" sx={{ '& > :not(style)': { m: 1, width: '25ch' } }} noValidate autoComplete="off">
              Recipe goes here<br />
              <div>{recipe}</div> {/* Display the plain string recipe here */}
            </Box>
          </Paper>
        </Paper>
      </Box>
      <Button variant="contained" onClick={handleClickMainMenu}>
        Back to Menu
      </Button>
    </Box>
  );
}
