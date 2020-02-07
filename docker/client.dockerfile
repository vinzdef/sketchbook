FROM node:10-alpine AS modules
WORKDIR /app

RUN apk add --no-cache git --update

# Install dependencies
COPY ./app/package.json ./
COPY ./app/package-lock.json ./
RUN npm install

FROM node:10-alpine
RUN apk add --no-cache bash --update

WORKDIR /app

COPY ./app/ /app/
COPY --from=modules /app/node_modules /app/node_modules
COPY ./docker/client.entrypoint.sh /usr/bin/entrypoint

# Keep here or won't install necessary node_modules!
ENV NODE_ENV=production
RUN npm run build

RUN ls -la /app/dist/public

ENTRYPOINT ["entrypoint"]
