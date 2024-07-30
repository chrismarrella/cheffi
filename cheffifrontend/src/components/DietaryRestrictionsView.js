import * as React from 'react';
import { useState } from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import TablePagination from '@mui/material/TablePagination';
import TextField from '@mui/material/TextField';
import FormHelperText from '@mui/material/FormHelperText';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { useEffect } from 'react';

function createData(name, amount) {
  return { name, amount};
}

export default function DietaryRestrictionsView() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [users, setUsers] = React.useState([]);
  const [userId, setUserId] = useState(null);
  const [rows, setRows] = React.useState([]);

  const [foodName, setFoodname] = useState('');
  const [calorieMax, setCalorieMax] = useState('');
  const [calorieMin, setCalorieMin] = useState('');
  const [fatMax, setFatMax] = useState('');
  const [fatMin, setFatMin] = useState('');
  const [carbMax, setCarbMax] = useState('');
  const [carbMin, setCarbMin] = useState('');
  const [proteinMax, setProteinMax] = useState('');
  const [proteinMin, setProteinMin] = useState('');



  const [helperText, setHelperText] = useState('');


  const paperStyle = { padding: '50px 20px', width: 800, margin: "20px auto" };
  const location = useLocation();
  const navigate = useNavigate();

  const [formats, setFormats] = React.useState(() => ['bold', 'italic']);
  
  const { username } = location.state || {};

  useEffect(() => {
    fetch("http://localhost:8080/api/v1/user")
      .then(response => response.json())
      .then(result => {
        setUsers(result);
  
        const user = result.find(user => user.username === username);
        if (user) {
          console.log("User ID:", user.id);
          console.log("User restrictions:", user.restrictionMap);
          setUserId(user.id);
  
          const rows = Object.entries(user.restrictionMap).map(([name, amount]) =>
            createData(name, amount)
          ) || [];
          setRows(rows);

          setExistingRestrictions(Object.entries(user.restrictionMap).map(([name, value]) => ({ restriction: name, value })));

        }
      })
      .catch(error => {
        console.error("Error fetching user data:", error);
      });
  }, [username]);


  const handleClickMainMenu = (e) => {
    e.preventDefault();
    console.log('button clicked')
    navigate('/loggedin', { state: { username } })
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };



  const handleButtonClickRemoveRestriction = async (row) => {
    const restr = row.name;
    const val = 0
    
    if (!userId) {
      console.error('User ID is not set');
      return;
    }

    try {
      const dietaryRestriction = { restriction: restr, value: val.toString()};
      console.log(JSON.stringify(dietaryRestriction));
  
      const response = await fetch(`http://localhost:8080/api/v1/user/${userId}/dietaryRestrictions`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dietaryRestriction)
      });
  
      if (!response.ok) {
        throw new Error(`Error updating user inventory: ${response.statusText}`);
      }
  
      setHelperText('User inventory item removed successfully, please refresh the page to see changes.');
    } catch (error) {
      console.error('Error:', error);
    }  
  };

  const handleClickAddRestriction = async (e) => {
    e.preventDefault();
    if (!userId) {
      console.error('User ID is not set');
      return;
    }

    if (!foodName) {
      console.error('Food name is not set');
      setHelperText('Cannot leave textbox empty');
      return;
    }
  
    try {
      const dietaryRestriction = { restriction: foodName, value: "1" };
      console.log(JSON.stringify(dietaryRestriction));
  
      const response = await fetch(`http://localhost:8080/api/v1/user/${userId}/dietaryRestrictions`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dietaryRestriction)
      });
  
      if (!response.ok) {
        throw new Error(`Error updating user inventory: ${response.statusText}`);
      }
  
      console.log('User inventory updated successfully!');
      setHelperText('User Restriction added successfully, please refresh the page to see changes.');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleClickSetRestrictionMaxMin = async (e, restriction ,val) => {
    e.preventDefault();
    if (!userId) {
      console.error('User ID is not set');
      return;
    }
    if (!val) {
      console.error('Food name is not set');
      setHelperText('Cannot leave textbox empty');
      return;
    }
    try {
      const dietaryRestriction = { restriction: restriction, value: val };
      console.log(JSON.stringify(dietaryRestriction));
  
      const response = await fetch(`http://localhost:8080/api/v1/user/${userId}/dietaryRestrictions`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dietaryRestriction)
      });
  
      if (!response.ok) {
        throw new Error(`Error updating user inventory: ${response.statusText}`);
      }
  
      console.log('User inventory updated successfully!');
      setHelperText('User Restriction added successfully, please refresh the page to see changes.');
    } catch (error) {
      console.error('Error:', error);
    }
  };


  const handleClickSetRestrictionToggle = async (restriction ,val) => {
    if (!userId) {
      console.error('User ID is not set');
      return;
    }
    if (!val) {
      console.error('Food name is not set');
      setHelperText('Cannot leave textbox empty');
      return;
    }
    try {
      const dietaryRestriction = { restriction: restriction, value: val };
      console.log(JSON.stringify(dietaryRestriction));
  
      const response = await fetch(`http://localhost:8080/api/v1/user/${userId}/dietaryRestrictions`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dietaryRestriction)
      });
  
      if (!response.ok) {
        throw new Error(`Error updating user inventory: ${response.statusText}`);
      }
  
      console.log('User inventory updated successfully!');
      setHelperText('User Restriction added successfully, please refresh the page to see changes.');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const setExistingRestrictions = (data) => {
    const newFormats = [];
    data.forEach(restriction => {
      switch (restriction.restriction) {
        case 'Ketogenic':
          newFormats.push('bold');
          break;
        case 'Vegan':
          newFormats.push('italic');
          break;
        case 'Vegetarian':
          newFormats.push('underlined');
          break;
      }
    });
    setFormats(newFormats);
  };

  
  const handleFormat = (event, newFormats) => {
    setFormats(newFormats);
  };

  return (
    <Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Restriction</TableCell>
              <TableCell align="right">Amount (kcal/grams)</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
              <TableRow key={row.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.amount}</TableCell>
                <TableCell align="right">
                  <Button variant="contained" color="primary" onClick={() => handleButtonClickRemoveRestriction(row)}>
                    Clear / Reset
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
  
      <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
        <Paper elevation={3} style={paperStyle}>
          <ToggleButtonGroup
            value={formats}
            onChange={handleFormat}
            aria-label="text formatting"
          >
          <ToggleButton value="ketogenic" onClick={() => handleClickSetRestrictionToggle('Ketogenic', '1')}>Ketogenic</ToggleButton>
          <ToggleButton value="vegan" onClick={() => handleClickSetRestrictionToggle('Vegan', '1')}>Vegan</ToggleButton>
          <ToggleButton value="vegetarian" onClick={() => handleClickSetRestrictionToggle('Vegetarian', '1')}>Vegetarian</ToggleButton>
          </ToggleButtonGroup>
  
          <TextField
            id="outlined-basic"
            label="Enter Restricted Food"
            variant="outlined"
            fullWidth
            value={foodName}
            onChange={(e) => setFoodname(e.target.value)}
          />
          <FormHelperText style={{ color: 'red' }}>{helperText}</FormHelperText>
          <Button variant="contained" onClick={handleClickAddRestriction}>
            Add Restriction
          </Button>
          <Box component="form" sx={{ '& > :not(style)': { m: 1, width: '25ch' } }} noValidate autoComplete="off"> 
            <TextField
              id="outlined-basic"
              label="Enter Calorie Maximum"
              variant="outlined"
              fullWidth
              value={calorieMax}
              onChange={(e) => {
              const value = e.target.value;
              const intValue = parseInt(value, 10);
              if (/^\d*$/.test(value)) {
                setCalorieMax(value);
                setHelperText('');
            } else {
                setHelperText('Please enter a valid whole number.');
            }
            }}
          />
            <Button variant="contained" onClick={(e) => handleClickSetRestrictionMaxMin(e, 'maxCalories', calorieMax)}>
              Set Max Calories
            </Button>
          </Box>
          
          <Box component="form" sx={{ '& > :not(style)': { m: 1, width: '25ch' } }} noValidate autoComplete="off">
            <TextField
              id="outlined-basic"
              label="Enter Calorie Minimum"
              variant="outlined"
              fullWidth
              value={calorieMin}
              onChange={(e) => {
              const value = e.target.value;
              const intValue = parseInt(value, 10);
              if (/^\d*$/.test(value)) {
                setCalorieMin(value);
                setHelperText('');
            } else {
                setHelperText('Please enter a valid whole number.');
            }
            }}
          />
            <Button variant="contained" onClick={(e) => handleClickSetRestrictionMaxMin(e, 'minCalories', calorieMin)}>
              Set Min Calories
            </Button>
          </Box>
  
          <Box component="form" sx={{ '& > :not(style)': { m: 1, width: '25ch' } }} noValidate autoComplete="off">
            <TextField
              id="outlined-basic"
              label="Enter Fat Maximum"
              variant="outlined"
              fullWidth
              value={fatMax}
              onChange={(e) => {
                const value = e.target.value;
                const intValue = parseInt(value, 10);
                if (/^\d*$/.test(value)) {
                  setFatMax(value);
                  setHelperText('');
              } else {
                  setHelperText('Please enter a valid whole number.');
              }
              }}
            />
            <Button variant="contained" onClick={(e) => handleClickSetRestrictionMaxMin(e, 'maxSaturatedFat', fatMax)}>
              Set Max Fat
            </Button>
          </Box>
  
          <Box component="form" sx={{ '& > :not(style)': { m: 1, width: '25ch' } }} noValidate autoComplete="off">
            <TextField
              id="outlined-basic"
              label="Enter Fat Minimum"
              variant="outlined"
              fullWidth
              value={fatMin}
              onChange={(e) => {
                const value = e.target.value;
                const intValue = parseInt(value, 10);
                if (/^\d*$/.test(value)) {
                  setFatMin(value);
                  setHelperText('');
              } else {
                  setHelperText('Please enter a valid whole number.');
              }
              }}
            />
            <Button variant="contained" onClick={(e) => handleClickSetRestrictionMaxMin(e, 'minSaturatedFat', fatMin)}>
              Set Min Fat
            </Button>
          </Box>
  
          <Box component="form" sx={{ '& > :not(style)': { m: 1, width: '25ch' } }} noValidate autoComplete="off">
            <TextField
              id="outlined-basic"
              label="Enter Carb Maximum"
              variant="outlined"
              fullWidth
              value={carbMax}
              onChange={(e) => {
                const value = e.target.value;
                const intValue = parseInt(value, 10);
                if (/^\d*$/.test(value)) {
                  setCarbMax(value);
                  setHelperText('');
              } else {
                  setHelperText('Please enter a valid whole number.');
              }
              }}
            />
            <Button variant="contained" onClick={(e) => handleClickSetRestrictionMaxMin(e, 'maxCarbs', carbMax)}>
              Set Max Carbs
            </Button>
          </Box>
  
          <Box component="form" sx={{ '& > :not(style)': { m: 1, width: '25ch' } }} noValidate autoComplete="off">
            <TextField
              id="outlined-basic"
              label="Enter Carb Minimum"
              variant="outlined"
              fullWidth
              value={carbMin}
              onChange={(e) => {
                const value = e.target.value;
                const intValue = parseInt(value, 10);
                if (/^\d*$/.test(value)) {
                  setCarbMin(value);
                  setHelperText('');
              } else {
                  setHelperText('Please enter a valid whole number.');
              }
              }}
            />
            <Button variant="contained" onClick={(e) => handleClickSetRestrictionMaxMin(e, 'minCarbs', carbMin)}>
              Set Min Carbs
            </Button>
          </Box>
  
          <Box component="form" sx={{ '& > :not(style)': { m: 1, width: '25ch' } }} noValidate autoComplete="off">
            <TextField
              id="outlined-basic"
              label="Enter Protein Maximum"
              variant="outlined"
              fullWidth
              value={proteinMax}
              onChange={(e) => {
                const value = e.target.value;
                const intValue = parseInt(value, 10);
                if (/^\d*$/.test(value)) {
                  setProteinMax(value);
                  setHelperText('');
              } else {
                  setHelperText('Please enter a valid whole number.');
              }
              }}
            />
            <Button variant="contained" onClick={(e) => handleClickSetRestrictionMaxMin(e, 'maxProtein', proteinMax)}>
              Set Max Protein
            </Button>
          </Box>
  
          <Box component="form" sx={{ '& > :not(style)': { m: 1, width: '25ch' } }} noValidate autoComplete="off">
            <TextField
              id="outlined-basic"
              label="Enter Protein Minimum"
              variant="outlined"
              fullWidth
              value={proteinMin}
              onChange={(e) => {
                const value = e.target.value;
                const intValue = parseInt(value, 10);
                if (/^\d*$/.test(value)) {
                  setProteinMin(value);
                  setHelperText('');
              } else {
                  setHelperText('Please enter a valid whole number.');
              }
              }}
            />
            <Button variant="contained" onClick={(e) => handleClickSetRestrictionMaxMin(e, 'minProtein', proteinMin)}>
              Set Min Protein
            </Button>
          </Box>
        </Paper>
      </Box>
  
      <Button variant="contained" onClick={handleClickMainMenu}>
        Back to Menu
      </Button>
      <Box></Box>
    </Box>
  );
}