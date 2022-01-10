FROM node:14.16.0-buster-slim

RUN  apt-get update \
     && apt-get install -y procps libxss1 chromium \
     && rm -rf /var/lib/apt/lists/*

# Install Puppeteer under /node_modules so it's available system-wide
ADD ./puppeteer_build/package.json ./puppeteer_build/yarn.lock /
RUN yarn install

# Create app directory
WORKDIR /usr/src/app

COPY package.json yarn.lock index.js ./

RUN mkdir /export

RUN yarn install

COPY index.js ./

CMD [ "node", "index.js" ]