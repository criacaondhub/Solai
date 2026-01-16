# Build stage
FROM node:20-slim AS build

WORKDIR /app

# Copy package files
COPY package.json ./

# Install dependencies
# Using npm install since I don't see a lock file yet, but I'll assume standard npm
RUN npm install

# Copy source code
COPY . .

# Build the project
RUN npm run build

# Serve stage
FROM nginx:alpine

# Copy build files from build stage
COPY --from=build /app/dist /usr/share/nginx/html

# Copy nginx config if needed (optional, default is usually fine for SPAs if we add a simple fallback)
# EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
