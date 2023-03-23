from flask import Flask, jsonify
from azure.identity import ClientSecretCredential
from azure.mgmt.resource import ResourceManagementClient
from azure.mgmt.compute import ComputeManagementClient
from azure.mgmt.network import NetworkManagementClient
import os
import socket

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

network_client = NetworkManagementClient(credential, subscription_id)

@app.route('/azure_open_ips', methods=['GET'])
def azure_open_ips():
    # Get all public IP addresses in the subscription
    public_ips = network_client.public_ip_addresses.list_all()
    results = []

    for public_ip in public_ips:
        ip_address = public_ip.ip_address
        ports_to_check = [22, 3389]
        open_ports = []
        for port in ports_to_check:
            with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
                s.settimeout(1)
                try:
                    s.connect((ip_address, port))
                    open_ports.append(port)
                except:
                    pass
        if open_ports:
            results.append({
                "IP": ip_address
            })

    return jsonify(results)

if __name__ == '__main__':
    app.run()
