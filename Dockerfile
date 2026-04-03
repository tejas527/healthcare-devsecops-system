# SECURITY RULE: Use minimal base images (Alpine Linux has very few tools for hackers to exploit)
FROM node:18-alpine

# Set the working directory
WORKDIR /app

# Copy the package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the actual application code
COPY app.js .

# SECURITY RULE: Run as non-root user
# We create a restricted user named 'appuser' and switch to it. 
# If the container is compromised, the attacker has no administrative rights!
RUN adduser -D appuser
USER appuser

# Expose the port
EXPOSE 3000

# Start the app
CMD ["node", "app.js"]
