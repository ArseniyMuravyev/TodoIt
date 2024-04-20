FROM node:lts-alpine

WORKDIR /app

COPY dist/package.json dist/package-lock.json* ./
COPY apps/backend/swagger.yml /app/

RUN yarn 

COPY dist/apps/backend/src /app/

EXPOSE 5000

CMD [ "node", "main.js" ]
