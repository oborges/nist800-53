FROM python:3.9-slim-buster

# Install nginx and other dependencies
RUN apt-get update && apt-get install -y nginx && \
    rm -rf /var/lib/apt/lists/*

# Copy the Flask app into the container
COPY . /app
WORKDIR /app

# Install the required Python packages
RUN pip install --no-cache-dir flask flask_cors ibm-cloud-sdk-core ibm-vpc python-socketio gunicorn

# Replace the default nginx.conf with our custom nginx.conf
RUN rm /etc/nginx/sites-enabled/default
COPY nginx.conf /etc/nginx/sites-available/flask.conf
RUN ln -s /etc/nginx/sites-available/flask.conf /etc/nginx/sites-enabled/flask.conf

# Expose port 80
EXPOSE 80

# Start nginx and the Flask app using Gunicorn
#CMD service nginx start && gunicorn ibm_ips:app -b 127.0.0.1:5000
CMD service nginx start && python ibm_ips.py
