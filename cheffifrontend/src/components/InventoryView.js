import * as React from 'react';
import { useState } from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import TablePagination from '@mui/material/TablePagination';
import TextField from '@mui/material/TextField';
import FormHelperText from '@mui/material/FormHelperText';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';



function createData(name, expirationDate, amount) {
  return { name, expirationDate, amount};
}

export default function InventoryView() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);


  const [helperText, setHelperText] = useState('');
  const paperStyle = { padding: '50px 20px', width: 800, margin: "20px auto" };

  const [users, setUsers] = React.useState([]);
  const [userId, setUserId] = useState(null);

  const [rows, setRows] = React.useState([]);
  const [foodName, setFoodname] = useState('');
  const [foodAmount, setFoodamount] = useState(0);
  const [expireYear, setFoodexpirationyear] = useState('');
  const [expireMonth, setFoodexpirationmonth] = useState('');
  const [expireDay, setFoodexpirationday] = useState('');

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
  
          const rows = user.inventory.queue.map(item =>
            createData(item.name, item.expirationDate, item.amount)
          ) || [];
          setRows(rows);
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

  function parseData(data) {
    const { name, expirationDate, amount } = data;
    const [removeexpireYear, removeexpireMonth, removeexpireDay] = expirationDate.split('/');
    const remove = "True"
  
    return {
      foodName: name,
      foodAmount: amount.toString(),
      expireYear: removeexpireYear,
      expireMonth: removeexpireMonth,
      expireDay: removeexpireDay,
      removeItem: remove

    };
  }

const handleRemoveInventoryItem = async (row) => {

  if (!userId) {
    console.error('User ID is not set');
    return;
  }
  
  
  try {
    const foodItem = parseData(row);
    console.log(JSON.stringify( foodItem ));
  
    const response = await fetch(`http://localhost:8080/api/v1/user/${userId}`, {
      method: 'PATCH', 
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify( foodItem )
    });
  
    if (!response.ok) {
      throw new Error(`Error updating user inventory: ${response.statusText}`);
    }
  
    console.log('User inventory item removed successfully!');
    setHelperText('User inventory item removed successfully, please refresh the page to see changes.');
  } catch (error) {
    console.error('Error:', error);
  }
};
  

const handleClickInventoryAdd = async (e) => {
  e.preventDefault();

  if (!userId) {
    console.error('User ID is not set');
    return;
  }


  try {
    const foodItem = {foodName, foodAmount, expireYear, expireMonth, expireDay};
    console.log(JSON.stringify( foodItem ));

    const response = await fetch(`http://localhost:8080/api/v1/user/${userId}`, {
      method: 'PATCH', 
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify( foodItem )
    });

    if (!response.ok) {
      throw new Error(`Error updating user inventory: ${response.statusText}`);
    }

    console.log('User inventory updated successfully!');
    setHelperText('User inventory item added successfully, please refresh the page to see changes.');
  } catch (error) {
    console.error('Error:', error);
  }
};




  return (
    <Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Food Item</TableCell>
              <TableCell align="right">Expiration Date</TableCell>
              <TableCell align="right">Amount&nbsp;</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
              <TableRow
                key={row.name}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.expirationDate}</TableCell>
                <TableCell align="right">{row.amount}</TableCell>
                <TableCell align="right">
                  <Button variant="contained" color="primary" onClick={() => handleRemoveInventoryItem(row)}>
                    Remove
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
    <Box component="form" sx={{ '& > :not(style)': { m: 1, width: '25ch' } }} noValidate autoComplete="off">
      <TextField
        id="outlined-basic"
        label="New Food Item Name"
        variant="outlined"
        fullWidth
        value={foodName}
        onChange={(e) => setFoodname(e.target.value)}
      />
  <TextField
    id="outlined-basic"
    label="Amount"
    variant="outlined"
    fullWidth
    value={foodAmount}
    onChange={(e) => {
        const value = e.target.value;
        const validDecimal = /^\d*\.?\d*$/;
        
        if (validDecimal.test(value)) {
            setFoodamount(value);
            setHelperText('');
        } else {
            setHelperText('Please enter a valid number.');
        }
    }}
  />
    <TextField
      id="outlined-basic"
      label="Year of Expiration"
      variant="outlined"
      fullWidth
      value={expireYear}
      onChange={(e) => {
      const value = e.target.value;
      const intValue = parseInt(value, 10);
      if (/^\d*$/.test(value)) {
        setFoodexpirationyear(value);
        setHelperText('');
    } else {
        setHelperText('Please enter a valid whole number.');
    }
    }}
    />
    <TextField
      id="outlined-basic"
      label="Month of Expiration"
      variant="outlined"
      fullWidth
      value={expireMonth}
      onChange={(e) => {
      const value = e.target.value;
      if (/^\d*$/.test(value)) {
        setFoodexpirationmonth(value);
        setHelperText('');
    } else {
        setHelperText('Please enter a valid whole number.');
    }
    }}
    />
    <TextField
      id="outlined-basic"
      label="Day of Expiration"
      variant="outlined"
      fullWidth
      value={expireDay}
      onChange={(e) => {
          const value = e.target.value;

          if (/^\d*$/.test(value)) {
              setFoodexpirationday(value);
              setHelperText('');
          } else {
              setHelperText('Please enter a valid whole number.');
          }
      }}
    />
      <FormHelperText style={{ color: 'red' }}>{helperText}</FormHelperText>
      <Button variant="contained" onClick={handleClickInventoryAdd}>
        Add Food Item
      </Button>
      <Button variant="contained" onClick={handleClickMainMenu}>
        Back to Menu
        </Button>
    </Box>
  </Paper>
</Box>
    </Box>
    );
    }