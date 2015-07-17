var express = require('express');
var router = express.Router();
var User   = require('../models/user');
var Task   = require('../models/task');

router.get('/', function(req, res, next) {
  // create the first user
  var john = new User({
    username: 'John',
    password: 'password'
  });

  // save the first user
  john.save(function(err) {
    if (err) throw err;

    console.log('User saved successfully');
    // res.json({ success: true });
  });

  var task = new Task({
    name: 'Call john',
    completed: false
  });

  // save the first task
  task.save(function(err) {
    if (err) throw err;

    console.log('Task saved successfully');
    res.json({ success: true });
  });
});

module.exports = router;
