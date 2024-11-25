FROM node:16-alpine

WORKDIR /app

COPY . .

RUN npm install -g typescript
RUN npm install
RUN npm run build

EXPOSE 8080

CMD ["node", "dist/index.js"]