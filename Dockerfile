# Use Node.js image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy all files
COPY . .

# Expose port (change 3000 if your server uses another port)
EXPOSE 3000

# Run the app
CMD ["node", "server.js"]

