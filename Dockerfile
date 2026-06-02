# Use Bun's official base image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy dependencies and install with Bun
COPY package.json ./
RUN npm install

# Copy the rest of the source files
COPY . .

# Build the Next.js app
RUN npm run build

# Expose Next.js default port
EXPOSE 3004

# Start the Next.js app
CMD ["npm", "start"]
