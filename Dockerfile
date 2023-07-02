FROM node:18-alpine as base

WORKDIR /src
COPY package.json package-lock.json /src/

FROM base as production
ENV NODE_ENV=production
ENV EXPRESS_PORT=8080
RUN npm ci
COPY . /src
CMD ["npm", "run", "build"]
CMD ["npm", "run", "docker"]
EXPOSE 8080

FROM base as dev
ENV NODE_ENV=development
ENV EXPRESS_PORT=3000
CMD ["apk", "add", "nano"]
RUN npm install -g nodemon && npm install
COPY . /src
CMD ["npm", "run", "build"]
CMD ["npm", "run", "docker"]
EXPOSE 3000