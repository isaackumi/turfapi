FROM node:10.13

WORKDIR /app

COPY package.json /app/

RUN npm config set loglevel warn && npm install -g pm2 && npm install

EXPOSE 3000 80

COPY . /app

CMD [ "./scripts/server.sh" ]
