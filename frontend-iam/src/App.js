import React from 'react';
import IBMIAMPanel from './IBMIAMPanel';
import AzureIAMPanel from './AzureIAMPanel';
import './styles.css';
import logo from './images/storagesecurity.jpg';
import './App.css';

const App = () => {
  return (
    <div className="app">
      <header className="App-header">
        <img className="img-logo" src={logo} alt="Storage Security banner"></img>
      </header>
      <div className="panel">
        <h1>AC-2: Account Management</h1>
        <p>Account management best practices</p>
      </div>
      <IBMIAMPanel />
      <AzureIAMPanel />
    </div>
  );
};

export default App;
