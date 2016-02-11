Organization Memberships
===
[![NPM version][npm-image]][npm-url] [![Build Status][build-image]][build-url] [![Coverage Status][coverage-image]][coverage-url] [![Dependencies][dependencies-image]][dependencies-url]

> Get a user's [organization memberships][github-user-orgs].


## Installation

``` bash
$ npm install github-user-orgs
```


## Usage

``` javascript
var orgs = require( 'github-user-orgs' );
```

<a name="orgs"></a>
#### orgs( opts, clbk )

Gets a user's [organization memberships][github-user-orgs].

``` javascript
var opts = {
	'username': 'kgryte'
};

orgs( opts, clbk );

function clbk( error, results, info ) {
	// Check for rate limit information...
	if ( info ) {
		console.error( 'Limit: %d', info.limit );
		console.error( 'Remaining: %d', info.remaining );
		console.error( 'Reset: %s', (new Date( info.reset*1000 )).toISOString() );
	}
	if ( error ) {
		throw new Error( error.message );
	}
	console.log( JSON.stringify( results ) );
	// returns <org_data>
}
```

The `function` accepts the following `options`:
*	__token__: Github [access token][github-token].
*	__username__: Github username.
*	__useragent__: [user agent][github-user-agent] `string`.
*	__state__: state of the memberships to return. Either `active` or `pending`. If not set, the `function` returns both. Default: `''`.

To [authenticate][github-oauth2] with Github, set the [`token`][github-token] option.

``` javascript
var opts = {
	'token': 'tkjorjk34ek3nj4!'
};

orgs( opts, clbk );
```

To get the [organization memberships][github-user-orgs] of a particular user, set the `username` option.

``` javascript
var opts = {
	'username': 'kgryte'
};

orgs( opts, clbk );
```

To specify a [user agent][github-user-agent], set the `useragent` option.

``` javascript
var opts = {
	'useragent': 'hello-github!'
};

orgs( opts, clbk );
```


#### orgs.factory( options, clbk )

Creates a reusable `function`.

``` javascript
var opts = {
	'username': 'kgryte',
	'token': 'tkjorjk34ek3nj4!'
};

var get = orgs.factory( opts, clbk );

get();
get();
get();
// ...
```

The factory method accepts the same `options` as [`orgs()`](#orgs).


## Notes

*	Either a `username` or a [`token`][github-token] or both __must__ be provided. If provided a [`token`][github-token], but not a `username`, the `function` [fetches][github-get] the authenticated user's Github [organization memberships][github-user-orgs].
*	Unauthenticated requests can __only__ access public memberships.
*	[Rate limit][github-rate-limit] information includes the following:
	-	__limit__: maximum number of requests a consumer is permitted to make per hour.
	-	__remaining__: number of remaining requests.
	-	__reset__: time at which the current [rate limit][github-rate-limit] window resets in [UTC seconds][unix-time].


---
## Examples

``` javascript
var orgs = require( 'github-user-orgs' );

var opts = {
	'username': 'kgryte',
	'useragent': 'beep-boop-bop'
};

orgs( opts, clbk );

function clbk( error, results, info ) {
	if ( info ) {
		console.error( info );
	}
	if ( error ) {
		throw new Error( error.message );
	}
	console.log( results );
}
```

To run the example code from the top-level application directory,

``` bash
$ DEBUG=* node ./examples/index.js
```


---
## CLI

### Installation

To use the module as a general utility, install the module globally

``` bash
$ npm install -g github-user-orgs
```


### Usage

``` bash
Usage: ghuserorgs [options] 

Options:

  -h,  --help               Print this message.
  -V,  --version            Print the package version.
       --token token        Github access token.
       --username username  Github username.
  -ua, --useragent ua       User agent.
       --state state        State of memberships to return.
```


### Notes

*	In addition to the [`token`][github-token] option, the [token][github-token] may also be specified by a [`GITHUB_TOKEN`][github-token] environment variable. The command-line option __always__ takes precedence.
*	Request resources are written to `stdout`.
*	[Rate limit][github-rate-limit] information is written to `stderr`.


### Examples

Setting the access [token][github-token] using the command-line option:

``` bash
$ DEBUG=* ghuserorgs --token <token> --username kgryte
# => '[{...},{...},...]'
```

Setting the access [token][github-token] using an environment variable:

``` bash
$ DEBUG=* GITHUB_TOKEN=<token> ghuserorgs --username kgryte
# => '[{...},{...},...]'
```

For local installations, modify the command to point to the local installation directory; e.g., 

``` bash
$ DEBUG=* ./node_modules/.bin/ghuserorgs --token <token> --username kgryte
# => '[{...},{...},...]'
```

Or, if you have cloned this repository and run `npm install`, modify the command to point to the executable; e.g., 

``` bash
$ DEBUG=* node ./bin/cli --token <token> --username kgryte
# => '[{...},{...},...]'
```


---
## Tests

### Unit

This repository uses [tape][tape] for unit tests. To run the tests, execute the following command in the top-level application directory:

``` bash
$ make test
```

All new feature development should have corresponding unit tests to validate correct functionality.


### Test Coverage

This repository uses [Istanbul][istanbul] as its code coverage tool. To generate a test coverage report, execute the following command in the top-level application directory:

``` bash
$ make test-cov
```

Istanbul creates a `./reports/coverage` directory. To access an HTML version of the report,

``` bash
$ make view-cov
```


### Browser Support

This repository uses [Testling][testling] for browser testing. To run the tests in a (headless) local web browser, execute the following command in the top-level application directory:

``` bash
$ make test-browsers
```

To view the tests in a local web browser,

``` bash
$ make view-browser-tests
```

<!-- [![browser support][browsers-image]][browsers-url] -->


---
## License

[MIT license](http://opensource.org/licenses/MIT).


## Copyright

Copyright &copy; 2016. Athan Reines.


[npm-image]: http://img.shields.io/npm/v/github-user-orgs.svg
[npm-url]: https://npmjs.org/package/github-user-orgs

[build-image]: http://img.shields.io/travis/kgryte/github-user-orgs/master.svg
[build-url]: https://travis-ci.org/kgryte/github-user-orgs

[coverage-image]: https://img.shields.io/codecov/c/github/kgryte/github-user-orgs/master.svg
[coverage-url]: https://codecov.io/github/kgryte/github-user-orgs?branch=master

[dependencies-image]: http://img.shields.io/david/kgryte/github-user-orgs.svg
[dependencies-url]: https://david-dm.org/kgryte/github-user-orgs

[dev-dependencies-image]: http://img.shields.io/david/dev/kgryte/github-user-orgs.svg
[dev-dependencies-url]: https://david-dm.org/dev/kgryte/github-user-orgs

[github-issues-image]: http://img.shields.io/github/issues/kgryte/github-user-orgs.svg
[github-issues-url]: https://github.com/kgryte/github-user-orgs/issues

[tape]: https://github.com/substack/tape
[istanbul]: https://github.com/gotwarlost/istanbul
[testling]: https://ci.testling.com

[unix-time]: http://en.wikipedia.org/wiki/Unix_time

[github-get]: https://github.com/kgryte/github-get
[github-user-orgs]: https://developer.github.com/v3/orgs/#organizations
[github-api]: https://developer.github.com/v3/
[github-token]: https://github.com/settings/tokens/new
[github-oauth2]: https://developer.github.com/v3/#oauth2-token-sent-in-a-header
[github-user-agent]: https://developer.github.com/v3/#user-agent-required
[github-rate-limit]: https://developer.github.com/v3/rate_limit/