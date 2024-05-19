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

## Adding more files to the menu

You will want to create a file under `webapp/public/contents/ide/ark/`, with the extension `.template`.

Then, reference it in `webapp/src/ark_ide.json`:

```json lines
{
  "path": "/contents/ide/ark/",
  "list": [
    // this is a single file:
    {"name": "hello_world.template", "type": "f", "list": []},
    // this describes a folder and its content:
    {
      "name": "examples",
      "type": "d",
      "list": [
        "100_bottles_of_beer.template",
        "fibonacci.template"
      ]
    }
  ]
}
```
