FROM node:14.0.0-alpine as node
WORKDIR /usr/src/app/front-end
COPY package*.json ./
COPY . .
RUN apk add --no-cache ca-certificates git
RUN npm install
EXPOSE 4200/tcp
ENTRYPOINT ["npm", "start"]