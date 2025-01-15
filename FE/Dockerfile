FROM node:23

# Set the working directory
WORKDIR /FE

# Copy only necessary files first (for efficient caching)
COPY package.json package-lock.json ./

# Install dependencies and serve
RUN npm install && npm i -g serve

# Copy the rest of the application
COPY . .

# Build the React app
RUN npm run build

# Expose the port for the container
EXPOSE 80

# Serve the build folder on port 80
ENTRYPOINT [ "serve", "-s", "build", "-l", "80" ]
