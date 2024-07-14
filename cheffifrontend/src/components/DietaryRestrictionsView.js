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
import FormatBoldIcon from '@mui/icons-material/FormatBold';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';
import FormatUnderlinedIcon from '@mui/icons-material/FormatUnderlined';
import FormatColorFillIcon from '@mui/icons-material/FormatColorFill';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';



export default function DietaryRestrictionsView() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [helperText, setHelperText] = useState('');
  const paperStyle = { padding: '50px 20px', width: 800, margin: "20px auto" };
  const location = useLocation();
  const navigate = useNavigate();

  const [formats, setFormats] = React.useState(() => ['bold', 'italic']);
  
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

  const handleFormat = (event, newFormats) => {
    setFormats(newFormats);
  };

  return (
    <Box>
<Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
  <Paper elevation={3} style={paperStyle}>
    
  <ToggleButtonGroup
      value={formats}
      onChange={handleFormat}
      aria-label="text formatting"
    >
      <ToggleButton value="bold">
        Ketogenic
      </ToggleButton>
      <ToggleButton value="italic">
        Vegan
      </ToggleButton>
      <ToggleButton value="underlined">
        Vegetarian
      </ToggleButton>
    </ToggleButtonGroup>

    <TextField
        id="outlined-basic"
        label="Enter Restricted Food"
        variant="outlined"
        fullWidth
        value={firstname}
        onChange={(e) => setFirstname(e.target.value)}
      />
      <FormHelperText style={{ color: 'red' }}>{helperText}</FormHelperText>
      <Button variant="contained" onClick={handleClick}>
        Add Restriction
      </Button>

    <Box component="form" sx={{ '& > :not(style)': { m: 1, width: '25ch' } }} noValidate autoComplete="off">
      <TextField
        id="outlined-basic"
        label="Enter Calorie Maximum"
        variant="outlined"
        fullWidth
        value={firstname}
        onChange={(e) => setFirstname(e.target.value)}
      />
      <TextField
        id="outlined-basic"
        label="Enter Calorie Minimum"
        variant="outlined"
        fullWidth
        value={firstname}
        onChange={(e) => setFirstname(e.target.value)}
      />
      <FormHelperText style={{ color: 'red' }}>{helperText}</FormHelperText>
      <Button variant="contained" onClick={handleClick}>
        Set Max Calories
      </Button>
      <Button variant="contained" onClick={handleClick}>
        Set Min Calories
      </Button>

    </Box>
    <Box component="form" sx={{ '& > :not(style)': { m: 1, width: '25ch' } }} noValidate autoComplete="off">
      <TextField
        id="outlined-basic"
        label="Enter Fat Maximum"
        variant="outlined"
        fullWidth
        value={firstname}
        onChange={(e) => setFirstname(e.target.value)}
      />
      <TextField
        id="outlined-basic"
        label="Enter Fat Minimum"
        variant="outlined"
        fullWidth
        value={firstname}
        onChange={(e) => setFirstname(e.target.value)}
      />
      <FormHelperText style={{ color: 'red' }}>{helperText}</FormHelperText>
      <Button variant="contained" onClick={handleClick}>
        Set Max Fat
      </Button>
      <Button variant="contained" onClick={handleClick}>
        Set Min Fat
      </Button>

    </Box>
    <Box component="form" sx={{ '& > :not(style)': { m: 1, width: '25ch' } }} noValidate autoComplete="off">
      <TextField
        id="outlined-basic"
        label="Enter Carb Maximum"
        variant="outlined"
        fullWidth
        value={firstname}
        onChange={(e) => setFirstname(e.target.value)}
      />
      <TextField
        id="outlined-basic"
        label="Enter Carb Minimum"
        variant="outlined"
        fullWidth
        value={firstname}
        onChange={(e) => setFirstname(e.target.value)}
      />
      <FormHelperText style={{ color: 'red' }}>{helperText}</FormHelperText>
      <Button variant="contained" onClick={handleClick}>
        Set Max Carbs
      </Button>
      <Button variant="contained" onClick={handleClick}>
        Set Min Carbs
      </Button>

    </Box>
    <Box component="form" sx={{ '& > :not(style)': { m: 1, width: '25ch' } }} noValidate autoComplete="off">
      <TextField
        id="outlined-basic"
        label="Enter Protein Maximum"
        variant="outlined"
        fullWidth
        value={firstname}
        onChange={(e) => setFirstname(e.target.value)}
      />
      <TextField
        id="outlined-basic"
        label="Enter Protein Minimum"
        variant="outlined"
        fullWidth
        value={firstname}
        onChange={(e) => setFirstname(e.target.value)}
      />
      <FormHelperText style={{ color: 'red' }}>{helperText}</FormHelperText>
      <Button variant="contained" onClick={handleClick}>
        Set Max Protein
      </Button>
      <Button variant="contained" onClick={handleClick}>
        Set Min Protein
      </Button>

    </Box>

  </Paper>
  
</Box>
<Button variant="contained" onClick={handleClickMainMenu}>
        Back to Menu
        </Button>
    </Box>
    );
    }