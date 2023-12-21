# Stage 1: Build the Angular application
FROM node:latest as build

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

COPY . .

RUN npm run build

# Stage 2: Serve the app with Nginx
FROM nginx:alpine

# Install envsubst
RUN apk add --no-cache gettext

# Copy the build output from Stage 1
COPY --from=build /app/dist/clinic-reservation usr/share/nginx/html

# Copy the config.json from the build output to the config directory
# Copy the config.json from the build output to the root of the web directory
COPY --from=build /app/dist/clinic-reservation/assets/config/config.json /usr/share/nginx/html/config/config.json
# Remove the ENTRYPOINT line if it exists since we'll use CMD

# Update CMD to perform envsubst and start nginx
# This command replaces the environment variable placeholders in config.json with the actual values and starts Nginx
CMD envsubst '\$BACKEND_URL' < /usr/share/nginx/html/assets/config/config.json > /usr/share/nginx/html/assets/config/config.temp.json \
    && mv /usr/share/nginx/html/assets/config/config.temp.json /usr/share/nginx/html/assets/config/config.json \
    && nginx -g 'daemon off;'

# Expose port 80 to the outside
EXPOSE 80