FROM node:20

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN chmod +x ./start.sh

CMD ["sh", "./start.sh"]
