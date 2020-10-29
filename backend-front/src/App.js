import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {backend} from './components/variables';
import LoginScreen from './components/LoginScreen';

function App() {
  return (
    <div className="App">
      <LoginScreen show={true}/>
    </div>
  );
}

export default App;
