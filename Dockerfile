# === Stage 1: Build the Vite frontend ===
FROM node:20-slim AS build

# Set the working directory inside the container
WORKDIR /app

# Accept a build-time argument for the API base URL (must be passed during build)
ARG VITE_API_BASE_URL

# Export it as an environment variable so Vite can access it at build time
ENV VITE_API_BASE_URL=$VITE_API_BASE_URL

# Copy package definition files
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the source code into the container
COPY . .

# Build the Vite app with environment variables injected
RUN npm run build

# === Stage 2: Serve the built app using Nginx ===
FROM nginx:alpine

# Copy a custom Nginx config file into the container
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy the built frontend app from the build stage to the default Nginx directory
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 80 for HTTP traffic
EXPOSE 80

# Start Nginx in the foreground
CMD ["nginx", "-g", "daemon off;"]