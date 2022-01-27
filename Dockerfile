FROM node:latest

# The work directory should be the build folder
# so we have the post test/build/validated code to run
WORKDIR /

# We need to copy the package.json from the root dir
# so we need to come up one folder level
COPY ./package*.json ./

# Install all dependencies for a prod release
RUN npm ci --only=production

# Copy all the build files to the image
COPY ./build .

# Expose this on port 4003
EXPOSE 4003

# Run the api
CMD ["node", "index.js"]

