FROM node:16.1-alpine3.11 AS frontendbuild
LABEL stage=temp-build

WORKDIR /usr/src/app
COPY ./src/OV.React/package.json ./src/OV.React/package-lock.json ./
RUN npm ci 
COPY ./src/OV.React/ .
RUN npm run build 

FROM node:16.1-alpine3.11 AS backendbuild
LABEL stage=temp-build

WORKDIR /usr/src/app
COPY ./src/OV.Node/package.json ./src/OV.Node/package-lock.json ./
RUN npm ci
COPY ./src/OV.Node/ ./
COPY --from=frontendbuild /usr/src/app/dist/ ./src/assets/
RUN npm run build
RUN npm prune --production

FROM node:16-alpine3.11 AS publish
RUN adduser -D oploguser
WORKDIR /usr/src/app


COPY --from=backendbuild --chown=oploguser /usr/src/app/build/ ./build
COPY --from=backendbuild --chown=oploguser /usr/src/app/node_modules/ ./node_modules

RUN chown oploguser /usr/src/app
USER oploguser

ENV PORT=80
ENV NODE_ENV=production
EXPOSE 80
ENTRYPOINT node ./build/server.js