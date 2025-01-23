# Use the official Node.js 20 image as the base image
FROM node:20

# Set the working directory for the backend
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY backend/package*.json ./

# Install backend dependencies
RUN npm install

# Copy the rest of the backend code to the working directory
COPY backend/ .

# Expose the port the app runs on (adjust if your app uses a different port)
EXPOSE 3000


# Define the command to run the application

CMD ["node", "backend/src/index.js"]