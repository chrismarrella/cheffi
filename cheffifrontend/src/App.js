import './App.css';
import * as React from 'react';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import Appbar from './components/Appbar';
import User from './components/User';
import Login from './components/Login';
import MainMenu from './components/MainMenu';
import LoggedIn from './components/LoggedIn';
import InventoryView from './components/InventoryView';
import DietaryRestrictionsView from './components/DietaryRestrictionsView';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Appbar />
        <Routes>
          <Route index element={<MainMenu />} />
          <Route path="/login" element={<Login />} /> 
          <Route path="/user" element={<User />} />
          <Route path="/loggedin" element={<LoggedIn />} />
          <Route path="/inventoryview" element={<InventoryView />} />
          <Route path="/dietaryrestrictionsview" element={<DietaryRestrictionsView />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
