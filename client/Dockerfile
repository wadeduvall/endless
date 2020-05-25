FROM node:13-slim

WORKDIR /app

ADD package.json /app/package.json
ADD package-lock.json /app/package-lock.json

RUN npm install

EXPOSE 3000

ENV NODE_PATH=/app/node_modules
ENV PATH=$PATH:/app/node_modules/.bin

# Required to keep webpack-dev-server running without a TTY
ENV CI=true

ADD run.sh /app/run.sh

ENTRYPOINT ["/app/run.sh"]
CMD ["start"]
