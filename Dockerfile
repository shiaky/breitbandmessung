FROM buildkite/puppeteer

# Create app directory
WORKDIR /usr/src/app

COPY package.json yarn.lock index.js ./

RUN touch config.js && \
    mkdir /export

RUN yarn install

CMD [ "node", "index.js" ]