import React, {useState} from 'react';
import './App.css';
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import About from './Components/About';
import Login from './Components/Login';
import Signup from './Components/Signup';
import NoteState from './Context-Notes/NoteState';
import Alert from './Components/Alert';

import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

function App() {
  const [alert, setAlert] = useState(null);

  const showAlert = (type,message)=>{
    setAlert({
      type:type,
      message:message
    })

    setTimeout(()=>{
      setAlert(null);
    },1500);
  }

  return (
    <NoteState>
      <BrowserRouter>
        <Navbar showAlert={showAlert} />
        <Alert alert = {alert}/>
        <div className="container">
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="about" element={<About />} />
            <Route exact path="/login" element={<Login showAlert={showAlert} />} />
            <Route exact path="/signup" element={<Signup showAlert={showAlert} />} />
          </Routes>
        </div>
      </BrowserRouter>
    </NoteState>
  );
}

export default App;
