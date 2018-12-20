FROM node:latest
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json /usr/src/app/
COPY .babelrc /usr/src/app/
ADD server /usr/src/app/server

RUN mkdir /usr/src/app/client
COPY client/package.json /usr/src/app/client/
ADD client/src /usr/src/app/client/src
ADD client/public /usr/src/app/client/public

# Utility to wait for MongoDB to start before running app
ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.2.1/wait /wait
RUN chmod +x /wait

# Run init script to install dependencies
RUN npm run init
# Run build script to compile server with babel and build static html/js from React app
RUN npm run build
EXPOSE 5000

# Wait for MongoDB to start then run (wait command configured in docker-compose.yml)
CMD /wait && npm run prod
