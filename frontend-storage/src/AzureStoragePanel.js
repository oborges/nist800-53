import React, { useState, useEffect } from 'react';
import axios from 'axios';
import azureLogo from './images/azure.svg';

const AzureVMPanel = () => {
  const [blobs, setBlobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        
        const response = await axios.get('https://azurestorage.10dwywumq902.us-south.codeengine.appdomain.cloud/list_blobs');
        
        if (response.data && response.data.length > 0) {
          const blobList = response.data.map((item) => `${item.blob} - ${item.container} - ${item.storage_account}`);
          setBlobs(blobList);
        }
      } catch (error) {
        console.log(error);
      }
      setIsLoading(false);
    };
    fetchData();
  }, []);

  const displayBlobs = blobs.join('\n');

  return (
    <div className="panel">
      <div className="logo">
        <img src={azureLogo} alt="Azure Logo" width={50}/>
      </div>
      <h2>Azure Virtual Machines {blobs.length > 0 ? <span className="red-flag">🚩</span> : <span className="green-check">✓</span>}</h2>
      {blobs.length > 0 && <p style={{color: 'red'}}>Recomendation: Remove public access in these blobs:</p>}
      {isLoading ? <p>Loading...</p> : <pre>{displayBlobs}</pre>}
    </div>
  );
};

export default AzureVMPanel;

