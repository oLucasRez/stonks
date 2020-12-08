FROM node:14.15.1-slim

COPY . /usr/src/app

WORKDIR /usr/src/app

RUN yarn && yarn tsc

RUN yarn tsc

ENTRYPOINT [ "node" ]

CMD ["dist/index.js"]