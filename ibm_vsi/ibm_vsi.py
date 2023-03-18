from flask import Flask, jsonify
from ibm_cloud_sdk_core.authenticators import IAMAuthenticator
from ibm_vpc import VpcV1
import os

app = Flask(__name__)

#get credentials from os environment
API_KEY = os.environ['IBM_API_KEY']

# Create an IAM authenticator
authenticator = IAMAuthenticator(API_KEY)

# Instantiate the VpcV1 service
vpc_service = VpcV1(authenticator=authenticator)

# List all VPC Virtual Server Instances (VSIs)
def list_vpc_vs_instances():
    response = vpc_service.list_instances()
    return response.result['instances']

@app.route('/vpc_instances')
def vpc_instances():
    instances = list_vpc_vs_instances()
    instances_data = [
        {"name": instance["name"], "id": instance["id"]} for instance in instances
    ]
    return jsonify(instances_data)

if __name__ == '__main__':
    app.run(debug=True)

