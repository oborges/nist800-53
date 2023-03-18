from azure.identity import ClientSecretCredential
from azure.mgmt.storage import StorageManagementClient
from azure.storage.blob import BlobServiceClient, PublicAccess
from flask import Flask, jsonify
import re
import os

app = Flask(__name__)

#get credentials from environment variables
client_id = os.environ['AZURE_CLIENT_ID']
client_secret = os.environ['AZURE_CLIENT_SECRET']
tenant_id = os.environ['AZURE_TENANT_ID']
subscription_id = os.environ['AZURE_SUBSCRIPTION_ID']

credential = ClientSecretCredential(tenant_id, client_id, client_secret)
storage_client = StorageManagementClient(credential, subscription_id)

def get_resource_group_name(resource_id):
    match = re.search("resourceGroups/([^/]+)", resource_id)
    return match.group(1) if match else None

@app.route('/list_blobs', methods=['GET'])
def list_blobs():
    results = []

    for storage_account in storage_client.storage_accounts.list():
        resource_group = get_resource_group_name(storage_account.id)
        keys = storage_client.storage_accounts.list_keys(resource_group, storage_account.name)
        storage_account_key = keys.keys[0].value

        connection_string = f"DefaultEndpointsProtocol=https;AccountName={storage_account.name};AccountKey={storage_account_key};EndpointSuffix=core.windows.net"
        blob_service_client = BlobServiceClient.from_connection_string(connection_string)

        for container in blob_service_client.list_containers():
            container_client = blob_service_client.get_container_client(container.name)
            container_properties = container_client.get_container_properties()

            if container_properties.public_access == PublicAccess.CONTAINER or container_properties.public_access == PublicAccess.BLOB:
                for blob in container_client.list_blobs():
                    results.append({
                        "storage_account": storage_account.name,
                        "container": container.name,
                        "blob": blob.name
                    })

    return jsonify(results)

if __name__ == '__main__':
    app.run(host="0.0.0.0", port=8000)
