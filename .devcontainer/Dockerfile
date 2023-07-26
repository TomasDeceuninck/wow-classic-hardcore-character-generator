# Use the official Node.js image as a base
FROM node:lts

# Set the working directory
WORKDIR /wow-classic-hardcore-character-generator

# Install any additional tools needed for your project
RUN apt-get update && apt-get install -y \
    curl \
    git \
    && apt-get clean
