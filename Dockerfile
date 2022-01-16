FROM node:16.13.2-alpine

# Create app directory
WORKDIR /usr/src/app

RUN apk update && apk add --no-cache \
    procps \
    procps \
    chromium \      
    harfbuzz \
    ca-certificates \
    ttf-freefont \
    freetype \
    nss \
    bash \
    yarn \
    tini

RUN rm -rf /var/cache/apk/*
    
ENV DISTRO=alpine
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=1
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser

# Install Puppeteer under /node_modules so it's available system-wide
ADD ./puppeteer_build/package.json ./puppeteer_build/yarn.lock /
RUN yarn install

COPY package.json yarn.lock index.js  config.cfg.defaults config.shlib ./

RUN mkdir /export

RUN yarn install

COPY entrypoint.sh /usr/local/bin/docker-entrypoint.sh

ENTRYPOINT ["tini", "--", "docker-entrypoint.sh"]
#ENTRYPOINT ["tail"]
#CMD ["-f","/dev/null"]
