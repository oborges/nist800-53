import React from 'react';
import IBMVSIPanel from './IBMVSIPanel';
import AzureVMPanel from './AzureVMPanel';
import './styles.css';
import logo from './images/networksecurity.jpg';
import './App.css';

const App = () => {
  return (
    <div className="app">
      <header className="App-header">
       <img className="img-logo" src={logo} alt="Network Security banner"></img>
       </header>
       <div classname="panel">
       <h1> Control SC-7 - Boundary Control</h1>
       <p>Make sure the external network communications to the virtual machine is limited</p>
       </div>
      <IBMVSIPanel />
      <AzureVMPanel />
    </div>
  );
};

export default App;

