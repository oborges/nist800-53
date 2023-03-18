from flask import Flask, jsonify
from azure.identity import ClientSecretCredential
from azure.mgmt.resource import ResourceManagementClient
from azure.mgmt.compute import ComputeManagementClient
import os

app = Flask(__name__)

#get credentials from environment variables
client_id = os.environ['AZURE_CLIENT_ID']
client_secret = os.environ['AZURE_CLIENT_SECRET']
tenant_id = os.environ['AZURE_TENANT_ID']
subscription_id = os.environ['AZURE_SUBSCRIPTION_ID']

# Create a credential object with the app credentials
credential = ClientSecretCredential(
    tenant_id=tenant_id,
    client_id=client_id,
    client_secret=client_secret
)

# Create a ResourceManagementClient and ComputeManagementClient with the provided subscription ID and credentials
resource_client = ResourceManagementClient(credential, subscription_id)
compute_client = ComputeManagementClient(credential, subscription_id)

@app.route('/list_vms', methods=['GET'])
def list_vms():
    vm_list = []

    # Iterate through all resource groups in the subscription
    for resource_group in resource_client.resource_groups.list():
        # Get all virtual machines within the current resource group
        vms = compute_client.virtual_machines.list(resource_group.name)

        # Add the name and ID of each virtual machine to the vm_list
        for vm in vms:
            vm_list.append({"name": vm.name, "id": vm.id})

    return jsonify(vm_list)

if __name__ == '__main__':
    app.run(debug=True)

