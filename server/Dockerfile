# Use a Node.js base image with the latest LTS version
FROM node:lts-alpine

# Set the working directory within the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install
RUN npm install -g ts-node typescript

# Copy the rest of the application code
COPY . .

# Build the TypeScript code
RUN npm run build

# Expose the port your app listens on
EXPOSE 5000

# Start the application
CMD ["ts-node", "--files", "dist/src/index.js"]