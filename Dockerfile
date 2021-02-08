FROM node:14
WORKDIR /sdc-server
COPY package.json .
RUN npm i --production
COPY . .
EXPOSE 3000
CMD ["node", "./server/index.js"]