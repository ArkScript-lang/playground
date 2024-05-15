# ArkScript playground

This project is based on [ryugod](https://github.com/ryusatgat/ryugod).

Features:
- This site provides a development environment for simple testing.
- You can upload and download files to/from the server.
- You can add source files by drag and drop.
- You can easily share the source code you wrote with your friends.
- Try copying the editor source and pasting it on the bulletin board. It is nicely pasted.

## Building and running the project

Build and run the webapp:
```shell
docker build -t webapp webapp
docker run -it --rm -p 8080:8080 webapp
```

Run the websocket (necessary to boot docker containers to run ArkScript code):
```
npm i
node app.js
```

