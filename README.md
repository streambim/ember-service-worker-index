# Ember Service Worker Index

_An Ember Service Worker plugin that caches an Ember app's index file_

## F#$& my assets aren't updating in development mode

Turn on the "Update on reload" setting in the `Application > Service Workers`
menu in the Chrome devtools.

## Installation

```
ember install ember-service-worker-index-fallback
```

## Configuration

The configuration is done in the `ember-cli-build.js` file:

```js
var EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function(defaults) {
  var app = new EmberApp(defaults, {
    'esw-index': {
      // Where the location of your index file is at, defaults to `index.html`
      location: 'app-shell.html',

      // time in milliseconds that fetching index.html from network may take before the cached version is served
      requestTimeout: 500,

      // Bypass esw-index and don't serve cached index file for matching URLs
      excludeScope: [/\/non-ember-app(\/.*)?$/, /\/another-app(\/.*)?$/],

      // Leave blank serve index file for all URLs, otherwise ONLY URLs which match
      // this pattern will be served the cached index file so you will need to list
      // every route in your app.
      includeScope: [/\/dashboard(\/.*)?$/, /\/admin(\/.*)?$/],

      // Changing this version number will bust the cache, but you probably do not
      // want to be doing this manually, but rather using `versionStrategy` as
      // explained here http://ember-service-worker.com/documentation/configuration/#versioning
      version: '1'
    }
  });

  return app.toTree();
};
```

## Authors

* [Marten Schilstra](http://twitter.com/martndemus)
* [st-h](https://github.com/st-h)

## Versioning

This library follows [Semantic Versioning](http://semver.org)

