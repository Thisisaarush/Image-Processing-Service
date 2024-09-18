FROM node:20-alpine AS base

WORKDIR /app

COPY package*.json ./
RUN npm install --only=production

COPY . .

# Development stage 
FROM base AS development
RUN npm install
EXPOSE 5000
CMD ["npm", "run", "dev"]

# Production stage
FROM base AS production
EXPOSE 5000
CMD ["npm", "start"]
