FROM buildkite/puppeteer

# Create app directory
WORKDIR /usr/src/app

COPY package.json yarn.lock index.js timezone.sh  config.shlib config.cfg config.cfg.defaults cron.sh ./

RUN touch config.js && \
    mkdir /export

RUN apt-get update && apt-get -y install cron 
RUN yarn install

#ENTRYPOINT [ "node", "index.js" ]

ENTRYPOINT ["tail"]
CMD ["/bin/bash /usr/src/app/cron.sh]
CMD ["/bin/bash /usr/src/app/timezone.sh]
CMD ["-f","/dev/null"]
