# Multi-stage build for React app
FROM node:18-alpine AS build
WORKDIR /app

#env var cause .env file wouldnt work
ARG REACT_APP_API_URL=/api
ENV REACT_APP_API_URL=$REACT_APP_API_URL

# Copy package files and install dependencies
COPY package*.json ./
RUN npm i

# Copy source code and build
COPY public ./public
COPY src ./src
RUN npm run build

# Production stage - serve with nginx
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html

# Copy custom nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
