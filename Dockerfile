FROM buildkite/puppeteer

# Create app directory
WORKDIR /usr/src/app

COPY package.json yarn.lock index.js ./

RUN mkdir /export

RUN yarn install

COPY index.js ./

CMD [ "node", "index.js" ]