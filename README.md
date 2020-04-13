# Gotify Browser Extension

A browser extension for Gotify

## Support:

- Chrome

## Installation
You must configure your server CORS to allow the extension to make requests, like so:
In your config.yml
```
server:
  responseheaders: # response headers are added to every response (default: none)
    Access-Control-Allow-Origin: "chrome-extension://defcailckfpgaigaiijligpnjipkhhmg"
    Access-Control-Allow-Methods: "GET,POST,OPTIONS"
    Access-Control-Allow-Headers: "Authorization, content-type"
  stream:
    allowedorigins: # allowed origins for websocket connections (same origin is always allowed, default only same origin)
      - "defcailckfpgaigaiijligpnjipkhhmg"
```
Or, in your docker-compose.yml
```
environment:
        GOTIFY_SERVER_RESPONSEHEADERS: "Access-Control-Allow-Methods: \"GET,POST,OPTIONS\"\nAccess-Control-Allow-Origin: \"chrome-extension://defcailckfpgaigaiijligpnjipkhhmg\"\nAccess-Control-Allow-Headers: \"Authorization, content-type\""
        GOTIFY_SERVER_STREAM_ALLOWEDORIGINS: "- \"defcailckfpgaigaiijligpnjipkhhmg\""
```

More info can be found here: https://gotify.net/docs/config

## Development Instructions coming soon

Logo is from https://github.com/gotify/logo
