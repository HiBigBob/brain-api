var express = require('express');
var router = express.Router();
var User   = require('../models/user');
var jwtAuth = require('../lib/auth');
var requireAuth = require('../lib/require');

router.get('/all', function(req, res) {
  User.find({}, function(err, users) {
    res.json(users);
  });
});

router.get('/', jwtAuth, requireAuth, function(req, res){
  User.findOne({ username: req.user.username }, function(err, user) {
    if (err) {
      res.send('User not found error', 403)
    }
    res.json(user);
  });
});

router.get('/secret', jwtAuth, requireAuth, function(req, res){
	res.json({username : req.user.username})
});

module.exports = router;
