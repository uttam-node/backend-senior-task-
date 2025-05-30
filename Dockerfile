FROM node:18

WORKDIR /app

COPY package*.json ./
RUN npm install -g @nestjs/cli && npm install

COPY . .

RUN npx prisma generate

EXPOSE 3001
