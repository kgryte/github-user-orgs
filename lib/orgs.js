'use strict';

// MODULES //

var factory = require( './factory.js' );


// USER ORGANIZATION MEMBERSHIPS //

/**
* FUNCTION: orgs( opts, clbk )
*	Gets a user's organization memberships.
*
* @param {Object} opts - function options
* @param {String} [opts.token] - Github access token
* @param {String} [opts.username] - Github username
* @param {String} [opts.useragent] - user agent string
* @param {String} [opts.state] - state of memberships to return
* @param {Function} clbk - callback to invoke upon query completion
* @returns {Void}
*/
function orgs( opts, clbk ) {
	factory( opts, clbk )();
} // end FUNCTION orgs()


// EXPORTS //

module.exports = orgs;
