FROM node:14.0.0-alpine as node
WORKDIR /BDD-Project/BDD-FrontEnd
COPY package*.json ./
RUN npm install
COPY . .
CMD ["npm", "start"]