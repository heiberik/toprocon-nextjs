FROM node:14.15.0-alpine3.12 AS build
WORKDIR /usr/src

# Only build dependencies in the first step. This is very good for caching in Docker, as this layer will only
# be re-built whenever the dependency-list changes.
COPY package*.json ./
RUN npm ci

# Copy the actual source code and build it
COPY . .
ENV NODE_ENV=production
RUN npm run build

# Sadly, we need to include node_modules/ beacuse the server side needs it, but at least we can prune it to
# get rid of development dependencies.
RUN npm prune --production

# Start from scratch and include only relevant files
FROM node:14.15.0-alpine3.12 AS distribution
WORKDIR /opt/my-app
ENV NODE_ENV=production
COPY --from=build /usr/src/node_modules node_modules
COPY --from=build /usr/src/dist dist
COPY --from=build /usr/src/.next .next

# Expose port and run application
EXPOSE 3000
CMD node dist/index.js /etc/my-app/configuration.yaml