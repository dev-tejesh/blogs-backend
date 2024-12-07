FROM node:alpine
WORKDIR /app
COPY . .
RUN npm install
EXPOSE 4000
RUN npm install -g nodemon
CMD [ "nodemon", "app.js" ]