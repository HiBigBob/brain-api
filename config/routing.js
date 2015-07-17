var index = require('../controllers');
var user = require('../controllers/user');
var setup = require('../controllers/setup');
var token = require('../controllers/token');

module.exports.set = function(app) {
	app.use('/api', index);
	app.use('/api/user', user);
  app.use('/api/authenticate', token);
	app.use('/setup', setup);
}
