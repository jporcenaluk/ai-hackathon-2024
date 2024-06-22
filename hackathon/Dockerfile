# Use an official Node runtime as a parent image
FROM node:14

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the app
RUN npm run build

# Use an official nginx image as the base image
FROM nginx:alpine

# Copy the built app to the nginx server
COPY --from=0 /app/build /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start nginx server
CMD ["nginx", "-g", "daemon off;"]
