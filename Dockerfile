
FROM node:20.12-alpine
WORKDIR /app

COPY package*.json ./

RUN npm install -g @nestjs/cli
RUN npm ci --only=production

COPY . .

RUN npm run build

EXPOSE 3333

CMD ["npm", "run", "start:prod"]
