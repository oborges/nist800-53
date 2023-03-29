import React from 'react';
import { Link } from 'react-router-dom';
import './App.css';
import TravelExploreIcon from './images/travelexplore.svg';
import FolderSupervisedIcon from './images/foldersupervised.svg';
import AdminPanelSettingsIcon from './images/adminpanel.svg';

function App() {
  return (
    <div className="App">
      <header>
        <h1>Open-source multi-cloud solution to check subset of NIST 800-53 controls compliance</h1>
      </header>
      <main>
        <div className="square light">
          <a href="https://frontend-vm.10dwywumq902.us-south.codeengine.appdomain.cloud/" target="_blank" rel="noopener noreferrer">
            <img src={TravelExploreIcon} alt="Virtual Machines"/>
            <h2>Virtual Machines</h2>
            <div className="overlay"></div>
          </a>
        </div>
        <div className="square light">
          <a href="https://frontend-storage.10dwywumq902.us-south.codeengine.appdomain.cloud/" target="_blank" rel="noopener noreferrer">
            <img src={FolderSupervisedIcon} alt="Object Storage"/>
            <h2>Object Storage</h2>
            <div className="overlay"></div>
          </a>
        </div>
        <div className="square light">
          <a href="https://frontend-iam.10dwywumq902.us-south.codeengine.appdomain.cloud/" target="_blank" rel="noopener noreferrer">
            <img src={AdminPanelSettingsIcon} alt="Identity and Access Management"/>
            <h2>Identity and Access Management</h2>
            <div className="overlay"></div>
          </a>
        </div>
      </main>
    </div>
  );
}

export default App;

