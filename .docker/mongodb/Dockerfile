FROM mongo:latest

# Copy the keyfile to the container
COPY .docker/mongodb/configs/keyfile /etc/mongo/keyfile

# Set the correct permissions and ownership
RUN chmod 400 /etc/mongo/keyfile && chown mongodb:mongodb /etc/mongo/keyfile

# Set up the MongoDB configuration file
COPY .docker/mongodb/configs/mongod.conf /etc/mongod.conf

# Start MongoDB with the replica set configuration
CMD ["mongod", "--config", "/etc/mongod.conf"]
