FROM node:8.7.0-alpine

RUN mkdir -p /app/ipact-server
WORKDIR /app/ipact-server

COPY package.json /app/ipact-server
#COPY yarn.lock /app/ipact-server

#RUN npm install yarn -g

RUN npm install

COPY . /app/ipact-server

CMD ["npm", "start"]