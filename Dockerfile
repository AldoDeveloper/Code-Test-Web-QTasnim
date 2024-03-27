FROM node:latest

WORKDIR /usr/src/dasboar-admin

COPY  . .

RUN npm install

EXPOSE 8000

# CMD [ "npm", "run", "dev" ]
