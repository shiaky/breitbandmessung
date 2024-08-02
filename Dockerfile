FROM node:22.5.1-bookworm-slim
ENV TZ="Europe/Berlin"

RUN  apt-get update \
     && apt-get install -y procps libxss1 chromium \
     && rm -rf /var/lib/apt/lists/*

# Create app directory
WORKDIR /usr/src/app

COPY package.json yarn.lock ./

RUN yarn install &&\
    mkdir /export

COPY index.js ./

CMD [ "node", "index.js" ]
