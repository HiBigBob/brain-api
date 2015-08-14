var index = require('../controllers');
var user = require('../controllers/user');
var setup = require('../controllers/setup');
var auth = require('../controllers/auth');
var task = require('../controllers/task');
var category = require('../controllers/category');

var jwtAuth = require('../lib/auth');
var requireAuth = require('../lib/require');

module.exports.set = function(app) {
	app.all('/api/*', [jwtAuth, requireAuth]);

	app.use('/authenticate', auth);
	app.use('/setup', setup);

	app.use('/api', index);
	app.use('/api/user', user);
	app.use('/api/tasks', task);
	app.use('/api/categories', category);
}
