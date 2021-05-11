ARG APP_VERSION
FROM mongo-oplog-viewer:$APP_VERSION
CMD node ./build/server.js
ENTRYPOINT []