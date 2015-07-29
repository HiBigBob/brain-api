var url = require('url')
var user = require('../models/user')
var jwt = require('jwt-simple');
var config = require('../config/config');

module.exports = function(req, res, next){
	// Parse the URL, we might need this
	var parsed_url = url.parse(req.url, true)

	/**
	 * Take the token from:
	 *
	 *  - the POST value access_token
	 *  - the GET parameter access_token
	 *  - the x-access-token header
	 *    ...in that order.
	 */
	var token = (req.body && req.body.access_token) || parsed_url.query.access_token || req.headers["x-access-token"];

	if (token) {
		try {
			var decoded = jwt.decode(token, config.secret)

			if (decoded.exp <= Date.now()) {
				res.end('Access token has expired', 400)
			}

			user.findOne({ '_id': decoded.iss }, function(err, user){

				if (!err) {
					req.user = user
					return next()
				}
			})
		} catch (err) {
			return next()
		}
	} else {
		next()
	}
}
