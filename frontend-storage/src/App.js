import React from 'react';
import IBMStoragePanel from './IBMStoragePanel';
import AzureStoragePanel from './AzureStoragePanel';
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
        <h1>AC-3: Access Enforcement</h1>
        <p>Enforces authorization for logical access to information and system resources</p>
      </div>
      <IBMStoragePanel />
      <AzureStoragePanel />
    </div>
  );
};

export default App;

