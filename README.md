# Gotify Browser Extension

A browser extension for Gotify

## Support:

- [Chrome](https://chrome.google.com/webstore/detail/gotify/defcailckfpgaigaiijligpnjipkhhmg)
- [Firefox](https://addons.mozilla.org/en-CA/firefox/addon/gotify/)

## Installation
You must configure your server CORS to allow the extension to make requests, like so:
In your config.yml
```
server:
  cors:
    alloworigins:
        - "chrome-extension://defcailckfpgaigaiijligpnjipkhhmg"
    allowmethods:
        - "GET"
        - "POST"
        - "OPTIONS"
        - "DELETE"
    allowheaders:
        - "Authorization"
        - "content-type"
  stream:
    allowedorigins: # allowed origins for websocket connections (same origin is always allowed, default only same origin)
      - "defcailckfpgaigaiijligpnjipkhhmg"
```
Or, in your docker-compose.yml
```
environment:
       GOTIFY_SERVER_CORS_ALLOWORIGINS: "- \"chrome-extension://defcailckfpgaigaiijligpnjipkhhmg\""
       GOTIFY_SERVER_CORS_ALLOWHEADERS: "- \"Authorization\"\n- \"content-type\""
       GOTIFY_SERVER_CORS_ALLOWMETHODS: "- \"GET\"\n- \"POST\"\n- \"OPTIONS\"\n- \"DELETE\""
       GOTIFY_SERVER_STREAM_ALLOWEDORIGINS: "- \"defcailckfpgaigaiijligpnjipkhhmg\""
```

Note: if you are using firefox, replace `chrome-extension` with `moz-extension`, and replace `defcailckfpgaigaiijligpnjipkhhmg` with `a419db6d-a40b-4b85-b77a-e4e46991f967`

Or you could just set the `Access-Control-Allow-Origin` to `"*"` and the `stream allowed origin` to `".*"` if you're real yolo about that kind of stuff.

More info can be found here: https://gotify.net/docs/config

## Development
Dependencies:

- Docker/docker-compose

First, fire up the docker stack.

```shell script
cd gotify_dev && docker-compose up
```

This might take a while because `npm install` is running

### Chrome
Next, navigate your browser to `chrome://extensions` and toggle `Developer mode` on.

Then, click `Load unpacked` and load up the `dist/gotify-ext` folder. (this will only work if you have run the initial build earlier)

### Firefox
Next, navigate your browser to `about:debugging`

Then, click `Load Temporary Add-on...` and load up the `dist/gotify-ext/manifest.json` folder. (this will only work if you have run the initial build earlier)

### First run
If you have both the production gotify extension and are developing, you can tell the difference as the development version has this little notification when you open the popup:

![Dev notification](images/dev_notif.png)

You can now add your local docker gotify server to your dev extension with a url of `http://localhost:8000`, and the username and password both being `admin`.

![Dev login](images/dev_login.png)

You should be all set. I recommend using the [Gotify cli](https://github.com/gotify/cli) to test pushing messages to your dev server.

### Building for prod
In the root of the project, run `npm run prod` and it will create the necessary zip file for distribution using the most recent git tag as the version.

The git tag should be updated using the [npm version](https://docs.npmjs.com/cli/version) command.

Logo is from https://github.com/gotify/logo
