# Use the official image as a parent image
FROM node:18.17.1-slim

# Install git to avoid npm install errors
RUN apt-get update && \
    apt-get upgrade -y && \
    apt-get install -y git

# Set the working directory
WORKDIR /usr/src/app

# Copy the file from your host to your current location
COPY package*.json ./

# Run the command inside your image filesystem
RUN npm install --only=production

# Install global packages
RUN npm install prisma@2.28.0 -g

# Copy the rest of your app's source code from your host to your image filesystem.
COPY . .

# Run the commands to update database and run the app within the container.
CMD ["sh", "-c", "prisma generate && prisma migrate deploy && prisma db seed && node src/index.js"]
