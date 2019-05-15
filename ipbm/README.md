When dependencies change

    $ docker build . -f Dockerfile.base-ui -t ipbm-base-ui:latest
    $ docker build . -f Dockerfile.base -t ipbm-base:latest

When code changes

  $ docker build . -f Dockerfile.ui -t ipbm-ui:latest
  $ docker build . -f Dockerfile -t ipbm:latest

To run

  $ docker-compose up -d
