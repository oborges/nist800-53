import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ibmCloudLogo from './images/ibm-cloud.svg';

const IBMIAMPanel = () => {
  const [admins, setAdmins] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://ibmadministrators.10dwywumq902.us-south.codeengine.appdomain.cloud/ibm_administrators');
        if (response.data && response.data.length > 0) {
          setAdmins(response.data);
        }
      } catch (error) {
        console.log(error);
      }
      setIsLoading(false);
    };
    fetchData();
  }, []);

  const displayAdmins = admins ? admins.join(', ') : '';

  return (
    <div className="panel">
      <div className="logo">
        <img src={ibmCloudLogo} alt="IBM Cloud Logo" width={200}/>
      </div>
      <h2>IBM Cloud Administrators {admins && admins.length >= 2 ? <span className="red-flag">🚩</span> : <span className="green-check">✓</span>}</h2>
      {admins && admins.length >= 2 && <p style={{color: 'red'}}>Recomendation: You must have only one single administrator in your IBM Cloud account.</p>}
      <p>{isLoading ? 'Loading...' : displayAdmins}</p>
    </div>
  );
};

export default IBMIAMPanel;
