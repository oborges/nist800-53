import React from 'react';
import Panel from './components/Panel';
import './styles.css';

function App() {
  return (
    <div className="container">
      <Panel title="Virtual Machines - SC-7: Boundary Control (IBM Cloud)" endpoint="https://ibmvsi.10dwywumq902.us-south.codeengine.appdomain.cloud/open_ips" />
      <Panel title="Object Storage - AC-3: Access Enforcement (IBM Cloud)" endpoint="https://ibmstorage.10dwywumq902.us-south.codeengine.appdomain.cloud/public_buckets" />
      <Panel title="IAM - AC-2: Account Management (IBM Cloud)" endpoint="https://ibmadministrators.10dwywumq902.us-south.codeengine.appdomain.cloud/ibm_administrators" />
      <Panel title="Virtual Machines - SC-7: Boundary Control (Azure)" endpoint="https://azurevm.10dwywumq902.us-south.codeengine.appdomain.cloud/azure_open_ips" />
      <Panel title="Object Storage - AC-3: Access Enforcement (Azure)" endpoint="https://azurestorage.10dwywumq902.us-south.codeengine.appdomain.cloud/list_blobs" />
      <Panel title="IAM - AC-2: Account Management (Azure)" endpoint="https://azureadministrators.10dwywumq902.us-south.codeengine.appdomain.cloud/azureadministrators" />
    </div>
  );
}

export default App;

