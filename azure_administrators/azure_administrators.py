from azure.identity import ClientSecretCredential
from azure.mgmt.authorization import AuthorizationManagementClient
from msgraph.core import GraphClient
import json
from flask import Flask
import os

app = Flask(__name__)

@app.route('/azureadministrators')
def get_azure_administrators_api():
    # get Azure credentials from OS environment
    client_id = os.environ['AZURE_CLIENT_ID']
    client_secret = os.environ['AZURE_CLIENT_SECRET']
    tenant_id = os.environ['AZURE_TENANT_ID']
    subscription_id = os.environ['AZURE_SUBSCRIPTION_ID']
    
    # Create a credential object with the app credentials
    credentials = ClientSecretCredential(
        tenant_id=tenant_id,
        client_id=client_id,
        client_secret=client_secret
    )

    # create an AuthorizationManagementClient object using the credentials and subscription ID
    authorization_client = AuthorizationManagementClient(credentials, subscription_id)

    # get the list of role assignments for the subscription
    role_assignments = authorization_client.role_assignments.list_for_subscription()

    # create an empty list to hold the administrators
    administrators = []
    
    #create an empty list to hold principal ids
    principal_ids = []

    # Initialize Graph API client
    graph_client = GraphClient(credential=credentials)

    # loop through the role assignments and add any that have the "Owner" role to the administrators list
    for role_assignment in role_assignments:
        if '8e3af657-a8ff-443c-a75c-2fe8c4bcb635' in role_assignment.role_definition_id: #owner id as described here: https://learn.microsoft.com/en-us/azure/role-based-access-control/built-in-roles
            principal_ids.append(role_assignment.principal_id)

            user_id = role_assignment.principal_id
            user = graph_client.get('/users/'+user_id)
            username = json.loads(json.dumps(user.json()))

            administrators.append(username["userPrincipalName"])

    return {"azure_administrators": administrators}

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=False)
