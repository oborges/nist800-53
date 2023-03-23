import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ibmCloudLogo from './images/ibm-cloud.svg';


const IBMPanel = () => {
  const [ips, setIps] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://ibmvsi.10dwywumq902.us-south.codeengine.appdomain.cloud/open_ips');
        if (response.data && response.data.open_ips && response.data.open_ips.length > 0) {
          setIps(response.data.open_ips);
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
        <img src={ibmCloudLogo} alt="IBM Cloud Logo" width={200}/>
      </div>
      <h2>IBM Cloud VSI {ips.length > 0 ? <span className="red-flag">🚩</span> : <span className="green-check">✓</span>}</h2>
      {ips.length > 0 && <p style={{color: 'red'}}>Recomendation: Remove worldwide access to remote protocols on port 22 (SSH) or 3389 (RDP) from these IP addresses:</p>}
      {isLoading ? <p>Loading...</p> : <p>{displayIps}</p>}
    </div>
  );
};

export default IBMPanel;
