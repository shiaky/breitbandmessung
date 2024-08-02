FROM node:22.5.1-bookworm-slim
ENV TZ="Europe/Berlin"

RUN  apt-get update \
     && apt-get install -y procps libxss1 chromium \
     && rm -rf /var/lib/apt/lists/*

# Install Puppeteer under /node_modules so it's available system-wide
ADD ./puppeteer_build/package.json ./puppeteer_build/yarn.lock /
RUN yarn install

# Create app directory
WORKDIR /usr/src/app

COPY package.json yarn.lock ./

RUN yarn install &&\
    mkdir /export

COPY index.js ./

CMD [ "node", "index.js" ]
