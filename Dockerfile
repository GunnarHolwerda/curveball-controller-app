FROM node:12
WORKDIR /usr/local/src/curveball-control

COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 4200
CMD ["npm", "start"]