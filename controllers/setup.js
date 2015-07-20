var express = require('express');
var router = express.Router();
var User   = require('../models/user');
var List   = require('../models/list');
var Task   = require('../models/task');

router.get('/', function(req, res, next) {
  // create the first user
  var john = new User({
    username: 'John',
    password: 'password'
  });

  var list = new List({
    name: 'Todo',
    _creator: john._id
  });

  john.lists.push(list);

  var task = new Task({
    listId: list._id,
    name: 'Call john',
    completed: false
  });

  list.tasks.push(task);

  // save the first user
  john.save(function(err) {
    if (err) console.log(err);
    console.log('User saved successfully');
  });

  // save the first task
  list.save(function(err) {
    if (err) console.log(err);
    console.log('List saved successfully');
  });

  // save the first task
  task.save(function(err) {
    if (err) console.log(err);
    console.log('Task saved successfully');
    res.json({ success: true });
  });
});

module.exports = router;
