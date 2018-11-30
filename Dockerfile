# Use Node 10 for the app
FROM node:10

# Set the working directory to /app
RUN mkdir -p /app
WORKDIR /app

# Copy the current directory contents into the container at /app
COPY . /app

# Install any needed packages specified in package*.json
COPY package*.json ./
RUN npm install --quiet

# Make port 3000 available to the world outside this container
EXPOSE 3000

# Define environment variables

# Run npm start when the container launches
CMD ["npm", "start"]


#
# DB stuff for later
# Add the content of the sql-scripts/ directory to your image
# All scripts in docker-entrypoint-initdb.d/ are automatically
# executed during container startup

# Derived from official mysql image (our base image)
# FROM mysql:5.7
# ENV MYSQL_DATABASE mutiny
# COPY ./sql-scripts/ /docker-entrypoint-initdb.d/
# 
# Also probably include this
# COPY . .
#
