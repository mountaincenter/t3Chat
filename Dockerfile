ARG NODE_VER

FROM node:${NODE_VER}

RUN apt-get update  && apt-get install -y tree

WORKDIR /home/node/app
