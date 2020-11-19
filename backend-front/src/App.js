import React, {useState} from 'react';
import { Button } from 'react-bootstrap';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {backend} from './components/variables';
import LoginScreen from './components/LoginScreen';
import FileUploader from './components/FileUploader'
function App() {
  const [loginShow, setLoginShow] = useState(false)
  return (
    <div className="App">
      <Button variant="primary" onClick={()=>{setLoginShow(true)}}>Test Login</Button>
      <LoginScreen show={loginShow} setShow={(show)=>{setLoginShow(show)}}/>
      <FileUploader/>
    </div>
  );
}

export default App;
