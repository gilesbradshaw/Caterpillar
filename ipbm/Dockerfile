# all the node_modules to build the project
ARG base=ipbm-base:latest
FROM $base
WORKDIR /app/src
COPY . /app
RUN yarn build
ENTRYPOINT ["node", "build/index.js"]
