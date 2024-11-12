#!/bin/bash

# Define your Docker Hub credentials (you may want to export these as environment variables)
DOCKER_PASSWORD=dckr_pat_5ny9nSleiN2_hwKq5VA72qvvhsY
DOCKER_USERNAME=saimkrua

# Log in to Docker Hub
echo "$DOCKER_PASSWORD" | docker login -u "$DOCKER_USERNAME" --password-stdin

# Check if login was successful
if [ $? -ne 0 ]; then
  echo "Docker login failed. Exiting."
  exit 1
fi

# Build and Push cuce-web
docker build . --file ./docker/Dockerfile.web.template --tag "$DOCKER_USERNAME"/cuce-web:v2
docker push "$DOCKER_USERNAME"/cuce-web:v2

# # Build and Push cuce-experiment-svc with SERVICE_NAME argument
# docker build . --file ./docker/Dockerfile.service.experiment.template --build-arg SERVICE_NAME=pricing --tag "$DOCKER_USERNAME"/cuce-experiment-svc:latest --no-cache
# docker push "$DOCKER_USERNAME"/cuce-experiment-svc:latest

# # Build and Push cuce-experiment-svc with SERVICE_NAME argument
# docker build . --file ./docker/Dockerfile.service.reservation.template --build-arg SERVICE_NAME=reservation --tag "$DOCKER_USERNAME"/cuce-reservation-svc:latest --no-cache
# docker push "$DOCKER_USERNAME"/cuce-reservation-svc:latest

# Logout of Docker Hub
docker logout
