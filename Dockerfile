FROM node:12.16.1-alpine

WORKDIR /usr/backend

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3333

CMD ["npm", "run", "dev"]
