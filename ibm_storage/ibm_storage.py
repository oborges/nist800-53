import requests
from flask import Flask, jsonify
from flask_cors import CORS
import os


app = Flask(__name__)
CORS(app)

def get_access_token(apikey):
    auth_url = 'https://iam.cloud.ibm.com/identity/token'
    auth_data = {
        'grant_type': 'urn:ibm:params:oauth:grant-type:apikey',
        'apikey': apikey
    }
    auth_headers = {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json'
    }
    auth_response = requests.post(auth_url, data=auth_data, headers=auth_headers)
    return auth_response.json()['access_token']

def fetch_iam_policies(account_id, access_token):
    iam_policies_url = f'https://iam.cloud.ibm.com/v1/policies?account_id={account_id}'
    iam_policies_headers = {
        'Authorization': f'Bearer {access_token}',
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
    iam_policies_response = requests.get(iam_policies_url, headers=iam_policies_headers)
    return iam_policies_response.json()

def has_public_access(subject):
    for attribute in subject['attributes']:
        if attribute['name'] == 'access_group_id' and attribute['value'] == 'AccessGroupId-PublicAccess':
            return True
    return False

@app.route('/public_buckets', methods=['GET'])
def get_resource_values():
    apikey = os.environ['IBM_API_KEY']
    account_id = os.environ['IBM_ACCOUNT_ID']

    access_token = get_access_token(apikey)
    iam_policies = fetch_iam_policies(account_id, access_token)

    filtered_iam_policies = [
        policy for policy in iam_policies['policies']
        if policy['type'] == 'access' and
        any(has_public_access(subject) for subject in policy['subjects'])
    ]

    resource_values = []
    for policy in filtered_iam_policies:
        for resource in policy['resources']:
            for attribute in resource['attributes']:
                if attribute['name'] == 'resource':
                    resource_values.append(attribute['value'])

    return jsonify(resource_values)

if __name__ == "__main__":
    app.run(host='0.0.0.0')