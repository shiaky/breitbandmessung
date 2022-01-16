FROM node:16.13.2-alpine

RUN apk add --no-cache \
    procps \
    chromium \
    tini

# Install Puppeteer under /node_modules so it's available system-wide
ADD ./puppeteer_build/package.json ./puppeteer_build/yarn.lock /
RUN yarn install

# Create app directory
WORKDIR /usr/src/app

COPY package.json yarn.lock index.js  config.cfg.defaults config.shlib ./

RUN mkdir /export

RUN yarn install

COPY entrypoint.sh /usr/local/bin/docker-entrypoint.sh

#ENTRYPOINT ["tini", "--", "docker-entrypoint.sh"]
CMD [ "/bin/sh" ]
