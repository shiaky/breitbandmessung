FROM buildkite/puppeteer

# Create app directory
WORKDIR /usr/src/app

COPY package.json yarn.lock index.js ./

RUN touch config.js && \
    mkdir /export

RUN apt-get update && apt-get -y install cron tini
RUN yarn install

COPY entrypoint.sh /usr/local/bin/docker-entrypoint.sh
RUN ln -s /usr/local/bin/docker-entrypoint.sh / 
ENTRYPOINT ["tini", "--", "docker-entrypoint.sh"]
