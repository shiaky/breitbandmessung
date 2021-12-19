FROM buildkite/puppeteer

# Create app directory
WORKDIR /usr/src/app

COPY package.json yarn.lock index.js timezone.sh  config.shlib config.cfg config.cfg.defaults ./

RUN touch config.js && \
    mkdir /export

RUN yarn install

ENTRYPOINT [ "node", "index.js" ]
