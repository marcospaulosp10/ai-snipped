# Build back 
FROM node:20-alpine AS backend

WORKDIR /app

COPY ./backend/package*.json ./
RUN npm ci

COPY ./backend/ ./

EXPOSE 3000
CMD ["npm", "start"]

# build front
FROM node:20-alpine AS frontend

WORKDIR /app

COPY ./frontend/package*.json ./
RUN npm ci

COPY ./frontend/ ./
RUN npm run build

EXPOSE 3030
CMD ["npm", "run", "dev"]
