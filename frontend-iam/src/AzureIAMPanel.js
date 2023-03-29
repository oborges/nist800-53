import React, { useState, useEffect } from 'react';
import axios from 'axios';
import azureLogo from './images/azure.svg';

const AzureIAMPanel = () => {
  const [admins, setAdmins] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://azureadministrators.10dwywumq902.us-south.codeengine.appdomain.cloud/azureadministrators');
        if (response.data && response.data.azure_administrators && response.data.azure_administrators.length > 0) {
          setAdmins(response.data.azure_administrators);
        }
      } catch (error) {
        console.log(error);
      }
      setIsLoading(false);
    };
    fetchData();
  }, []);

  const displayAdmins = admins.join(', ');

  return (
    <div className="panel">
      <div className="logo">
        <img src={azureLogo} alt="Azure Logo" width={50}/>
      </div>
      <h2>Azure Subscription Administrators {admins.length >= 2 ? <span className="red-flag">🚩</span> : <span className="green-check">✓</span>}</h2>
      {admins.length >= 2 && <p style={{color: 'red'}}>Recomendation: You must have only one single administrator in your Azure Subscription.</p>}
      <p>{isLoading ? 'Loading...' : displayAdmins}</p>
    </div>
  );
};

export default AzureIAMPanel;
