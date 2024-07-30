import * as React from 'react';
import Box from '@mui/material/Box';
import { Paper, Button } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const presetDietaryRestrictions = {
  "minCarbs": 10,
  "maxCarbs": 100,
  "minProtein": 10,
  "maxProtein": 100,
  "minCalories": 200,
  "maxCalories": 2000,
  "minSaturatedFat": 1,
  "maxSaturatedFat": 20
};

export default function LoggedIn({ username }) {
  const paperStyle = { padding: '50px 20px', width: 800, margin: "20px auto" };
  const location = useLocation();
  username = location.state.username;
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/v1/user");
        const result = await response.json();
        setUsers(result);

        const user = result.find(user => user.username === username);
        if (user) {
          console.log("User ID:", user.id);
          console.log("User restrictions:", user.restrictionMap);
          setUserId(user.id);

          // Check if dietary restrictions are empty
          if (user.restrictionMap && Object.keys(user.restrictionMap).length === 0) {
            // Add the preset dietary restrictions
            for (const [key, val] of Object.entries(presetDietaryRestrictions)) {
              const dietaryRestriction = { restriction: key, value: val.toString() };

              try {
                const response = await fetch(`http://localhost:8080/api/v1/user/${user.id}/dietaryRestrictions`, {
                  method: 'PATCH',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify(dietaryRestriction)
                });

                if (!response.ok) {
                  console.error('Failed to update dietary restrictions');
                }
              } catch (error) {
                console.error('Error occurred while updating dietary restrictions:', error);
              }
            }
          }
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [username]);

  const handleClickInventory = (e) => {
    e.preventDefault();
    console.log('button clicked');
    navigate('/inventoryview', { state: { username } });
  };

  const handleClickRecipe = (e) => {
    e.preventDefault();
    console.log('button clicked');
    navigate('/getrecipes', { state: { username } });
  };

  const handleClickRestriction = (e) => {
    e.preventDefault();
    navigate('/dietaryrestrictionsview', { state: { username } });
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
        <Button variant="contained" onClick={handleClickRecipe}>Go To Get Recipes</Button>
        <Button variant="contained" onClick={handleClickRestriction}>Update Dietary Restrictions</Button>
        <Button variant="contained" onClick={handleClickInventory}>Go To Inventory</Button>
      </Box>
    </Paper>
  );
}