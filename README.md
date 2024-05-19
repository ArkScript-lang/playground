# ArkScript playground

This project is based on [ryugod](https://github.com/ryusatgat/ryugod).

Features:
- This site provides a development environment for simple testing.
- You can add source files by drag and drop.

## Building and running the project

Build and run the webapp:
```shell
cd webapp
npm i
npm run serve
```

Run the websocket (necessary to boot docker containers to run ArkScript code):
```shell
npm i
mkdir -p /tmp/playground
node app.js
```

