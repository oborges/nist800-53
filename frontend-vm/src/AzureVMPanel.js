import React, { useState, useEffect } from 'react';
import axios from 'axios';
import azureLogo from './images/azure.svg';


const AzurePanel = () => {
  const [ips, setIps] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://azurevm.10dwywumq902.us-south.codeengine.appdomain.cloud/azure_open_ips');
        if (response.data && response.data.length > 0) {
          const ipsList = response.data.map((item) => item.IP);
          setIps(ipsList);
        }
      } catch (error) {
        console.log(error);
      }
      setIsLoading(false);
    };
    fetchData();
  }, []);

  const displayIps = ips.join(', ');

  return (
    <div className="panel">
         <div className="logo">
            <img src={azureLogo} alt="Azure Logo" width={50}/>
        </div>
      <h2>Azure Virtual Machines {ips.length > 0 ? <span className="red-flag">🚩</span> : <span className="green-check">✓</span>}</h2>
      {ips.length > 0 && <p style={{color: 'red'}}>Recomendation: Remove worldwide access to remote protocols on port 22 (SSH) or 3389 (RDP) from these IP addresses:</p>}
      {isLoading ? <p>Loading...</p> : <p>{displayIps}</p>}
    </div>
  );
};

export default AzurePanel;
