from flask import Flask, jsonify
from flask_cors import CORS
import requests
import os

app = Flask(__name__)
CORS(app)

# get credentials from environment variables
apikey = os.environ['IBM_API_KEY']
account_id = os.environ['IBM_ACCOUNT_ID']

@app.route('/ibm_administrators', methods=['GET'])
def get_filtered_policies():
    # Authenticate and get access token
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
    access_token = auth_response.json()['access_token']

    # Call the IAM Policies API
    iam_policies_url = f'https://iam.cloud.ibm.com/v1/policies?account_id={account_id}'
    iam_policies_headers = {
        'Authorization': f'Bearer {access_token}',
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
    iam_policies_response = requests.get(iam_policies_url, headers=iam_policies_headers)
    iam_policies = iam_policies_response.json()

    # Filter the output
    filtered_policies = []
    for policy in iam_policies['policies']:
        for role in policy['roles']:
            if role['role_id'] == 'crn:v1:bluemix:public:iam::::role:Administrator':
                for subject in policy['subjects']:
                    for attribute in subject['attributes']:
                        if attribute['name'] == 'iam_id':
                            filtered_policies.append(attribute['value'])

    filtered_policies = list(dict.fromkeys(filtered_policies))
    return jsonify(filtered_policies)

if __name__ == '__main__':
    app.run()

