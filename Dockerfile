FROM node:14.0.0-alpine as node
WORKDIR /pon la que gustes
COPY package*.json ./
RUN npm install
COPY . .
CMD ["npm", "start"]