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




function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
  createData('Jelly Bean', 375, 0, 94, 0),
  createData('Lollipop', 392, 0.2, 98, 0),
  createData('Honeycomb', 408, 3.2, 87, 6.5),
  createData('Donut', 452, 25.0, 51, 4.9),
  createData('KitKat', 518, 26.0, 65, 7),
];

export default function InventoryView() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [helperText, setHelperText] = useState('');
  const paperStyle = { padding: '50px 20px', width: 800, margin: "20px auto" };
  const location = useLocation();
  const navigate = useNavigate();
  const { username } = location.state || {};
  console.log("logged in as", username)


  const handleClickMainMenu = (e) => {
    e.preventDefault()
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

  const handleButtonClick = (row) => {
    console.log('Button clicked for:', row);
    // Add your custom logic here
  };

  const handleClick = () => {
    // Add your registration logic here
    console.log('Register clicked');
  };

  return (
    <Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Dessert (100g serving)</TableCell>
              <TableCell align="right">Calories</TableCell>
              <TableCell align="right">Fat&nbsp;(g)</TableCell>
              <TableCell align="right">Carbs&nbsp;(g)</TableCell>
              <TableCell align="right">Protein&nbsp;(g)</TableCell>
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
                <TableCell align="right">{row.calories}</TableCell>
                <TableCell align="right">{row.fat}</TableCell>
                <TableCell align="right">{row.carbs}</TableCell>
                <TableCell align="right">{row.protein}</TableCell>
                <TableCell align="right">
                  <Button variant="contained" color="primary" onClick={() => handleButtonClick(row)}>
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
        value={firstname}
        onChange={(e) => setFirstname(e.target.value)}
      />
      <TextField
        id="outlined-basic"
        label="Amount"
        variant="outlined"
        fullWidth
        value={firstname}
        onChange={(e) => setFirstname(e.target.value)}
      />
      <TextField
        id="outlined-basic"
        label="Year of Expiration"
        variant="outlined"
        fullWidth
        value={lastname}
        onChange={(e) => setLastname(e.target.value)}
      />
      <TextField
        id="outlined-basic"
        label="Month of Expiration"
        variant="outlined"
        fullWidth
        value={firstname}
        onChange={(e) => setFirstname(e.target.value)}
      />
      <TextField
        id="outlined-basic"
        label="Day of Expiration"
        variant="outlined"
        fullWidth
        value={lastname}
        onChange={(e) => setLastname(e.target.value)}
      />
      <FormHelperText style={{ color: 'red' }}>{helperText}</FormHelperText>
      <Button variant="contained" onClick={handleClick}>
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