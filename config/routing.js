var index = require('../controllers');
var user = require('../controllers/user');
var setup = require('../controllers/setup');
var token = require('../controllers/token');
var task = require('../controllers/task');

var jwtAuth = require('../lib/auth');
var requireAuth = require('../lib/require');

module.exports.set = function(app) {
	app.all('/api/*', [jwtAuth, requireAuth]);

	app.use('/authenticate', token);
	app.use('/setup', setup);

	app.use('/api', index);
	app.use('/api/user', user);
	app.use('/api/tasks', task);
}
