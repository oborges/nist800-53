FROM python:3.9-slim-buster

# Install nginx and other dependencies
RUN apt-get update && apt-get install -y nginx && \
    rm -rf /var/lib/apt/lists/*

# Copy the Flask app into the container
COPY . /app
WORKDIR /app

# Install the required Python packages
RUN pip install flask flask_cors azure-identity azure-mgmt-authorization msgraph-core

# Replace the default nginx.conf with our custom nginx.conf
RUN rm /etc/nginx/sites-enabled/default
COPY nginx.conf /etc/nginx/sites-available/flask.conf
RUN ln -s /etc/nginx/sites-available/flask.conf /etc/nginx/sites-enabled/flask.conf

# Expose port 80
EXPOSE 80

# Start nginx and the Flask app
CMD service nginx start && python azure_administrators.py

