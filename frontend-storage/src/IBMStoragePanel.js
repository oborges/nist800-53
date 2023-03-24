import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ibmCloudLogo from './images/ibm-cloud.svg';

const IBMPanel = () => {
  const [ips, setIps] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://ibmstorage.10dwywumq902.us-south.codeengine.appdomain.cloud/public_buckets');
        if (response.data && response.data.length > 0) {
          setIps(response.data);
        }
      } catch (error) {
        console.log(error);
      }
      setIsLoading(false);
    };
    fetchData();
  }, []);

  const displayIps = ips ? ips.join(', ') : '';

  return (
    <div className="panel">
      <div className="logo">
        <img src={ibmCloudLogo} alt="IBM Cloud Logo" width={200}/>
      </div>
      <h2>IBM Cloud Public Buckets {ips ? <span className="red-flag">🚩</span> : <span className="green-check">✓</span>}</h2>
      {ips && ips.length > 0 && <p style={{color: 'red'}}>Recomendation: Remove public access in these buckets: </p>}
      {!ips ? <p>No public buckets found.</p> : <p> {displayIps}</p>}
    </div>
  );
};

export default IBMPanel;

