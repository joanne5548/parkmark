# Use a Node.js base image with the latest LTS version
FROM node:lts-alpine

# Set the working directory within the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the TypeScript code
RUN npm run build

# Expose the port your app listens on
EXPOSE 5000

# Start the application
CMD ["node", "--files", "dist/src/index.js"]