import './App.css';
import * as React from 'react';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import Appbar from './components/Appbar';
import User from './components/User';
import Login from './components/Login';
import MainMenu from './components/MainMenu';
import LoggedIn from './components/LoggedIn';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Appbar />
        <Routes>
          <Route index element={<MainMenu />} />
          <Route path="/login" element={<Login />} />  {/* Pass setUsername prop */}
          <Route path="/user" element={<User />} />
          <Route path="/loggedin" element={<LoggedIn />} /> {/* Pass username from state */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
