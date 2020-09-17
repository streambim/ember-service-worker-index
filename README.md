ember-service-worker-index-fallback
==============================================================================
[![Greenkeeper badge](https://badges.greenkeeper.io/st-h/ember-service-worker-index-fallback.svg)](https://greenkeeper.io/)
[![Latest NPM release][npm-badge]][npm-badge-url]
[![Code Climate][codeclimate-badge]][codeclimate-badge-url]
[![Ember Observer Score][ember-observer-badge]][ember-observer-badge-url]
[![Dependencies][dependencies-badge]][dependencies-badge-url]
[![Dev Dependencies][devDependencies-badge]][devDependencies-badge-url]

An Ember Service Worker plugin that serves an Ember app's index file and falls back to a cached version when loading fails

## F#$& my assets aren't updating in development mode

Turn on the "Update on reload" setting in the `Application > Service Workers` menu in the Chrome devtools.

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
      requestTimeoutCached: 500,

      // time in milliseconds that fetching index.html from network may take when no cached version is available
      requestTimeoutUncached: 60000

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

This addon has been forked from DockYards [ember service worker index](https://github.com/DockYard/ember-service-worker-index)
* [st-h](https://github.com/st-h)
* [Marten Schilstra](http://twitter.com/martndemus)

## Versioning

This library follows [Semantic Versioning](http://semver.org)

License
------------------------------------------------------------------------------

This project is licensed under the [MIT License](LICENSE.md).

[npm-badge]: https://img.shields.io/npm/v/ember-service-worker-index-fallback.svg
[npm-badge-url]: https://www.npmjs.com/package/ember-service-worker-index-fallback
[codeclimate-badge]: https://api.codeclimate.com/v1/badges/b62c466a81d28a69abd1/maintainability
[codeclimate-badge-url]: https://codeclimate.com/github/st-h/ember-service-worker-index-fallback/maintainability
[ember-observer-badge]: http://emberobserver.com/badges/ember-service-worker-index-fallback.svg
[ember-observer-badge-url]: http://emberobserver.com/addons/ember-service-worker-index-fallback
[dependencies-badge]: https://img.shields.io/david/st-h/ember-service-worker-index-fallback.svg
[dependencies-badge-url]: https://david-dm.org/st-h/ember-service-worker-index-fallback
[devDependencies-badge]: https://img.shields.io/david/dev/st-h/ember-service-worker-index-fallback.svg
[devDependencies-badge-url]: https://david-dm.org/st-h/ember-service-worker-index-fallback#info=devDependencies