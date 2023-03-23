import os
import time
import socket
from flask import Flask, jsonify
from ibm_cloud_sdk_core.authenticators import IAMAuthenticator
from ibm_vpc import VpcV1
from threading import Thread

# Global variable to store the open IPs
open_ips = []

app = Flask(__name__)

def capture_floating_ips():
    api_key = os.environ['IBM_API_KEY']
    authenticator = IAMAuthenticator(api_key)
    vpc_service = VpcV1(authenticator=authenticator)

    response = vpc_service.list_floating_ips()
    floating_ips = [floating_ip for floating_ip in response.result['floating_ips']]
    return floating_ips

def test_admin_open(floating_ips):
    open_ips = []

    def is_port_open(ip, port):
        sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        sock.setblocking(True)
        sock.settimeout(10)
        result = sock.connect_ex((ip, port))
        return result == 0

    def check_ports(ip_address):
        if is_port_open(ip_address, 22) or is_port_open(ip_address, 3389):
            return ip_address
        return None

    ip_addresses = [floating_ip['address'] for floating_ip in floating_ips]

    for ip_address in ip_addresses:
        result = check_ports(ip_address)
        if result is not None:
            open_ips.append(result)

    return open_ips

def periodic_test_admin_open():
    global open_ips
    while True:
        floating_ips = capture_floating_ips()
        open_ips = test_admin_open(floating_ips)
        time.sleep(30 * 60)  # Sleep for 30 minutes

@app.route("/open_ips", methods=["GET"])
def get_open_ips():
    return jsonify({"open_ips": open_ips})

if __name__ == "__main__":
    with app.app_context():
        floating_ips = capture_floating_ips()
        open_ips = test_admin_open(floating_ips)
        
    thread = Thread(target=periodic_test_admin_open)
    thread.start()
    app.run()

