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
    name: 'To do',
    userId: john._id
  });

  var taskDo = new Task({
    listId: list._id,
    name: 'Call john',
    completed: false
  });

  var taskDo2 = new Task({
    listId: list._id,
    name: 'Learn EmberJs',
    completed: false
  });

  list.tasks.push(taskDo);
  list.tasks.push(taskDo2);

  var list2 = new List({
    name: 'To buy',
    userId: john._id
  });

  var taskBuy = new Task({
    listId: list2._id,
    name: 'FullMetal Alchimist',
    completed: false
  });

  var taskBuy2 = new Task({
    listId: list2._id,
    name: 'Vinland Saga',
    completed: false
  });

  list2.tasks.push(taskBuy);
  list2.tasks.push(taskBuy2);

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
  list2.save(function(err) {
    if (err) console.log(err);
    console.log('List saved successfully');
  });

  taskDo.save(function(err) {
    if (err) console.log(err);
    console.log('TaskDo saved successfully');
  });

  taskDo2.save(function(err) {
    if (err) console.log(err);
    console.log('TaskDo2 saved successfully');
  });

  taskBuy.save(function(err) {
    if (err) console.log(err);
    console.log('TaskBuy saved successfully');
  });

  // save the first task
  taskBuy2.save(function(err) {
    if (err) console.log(err);
    console.log('TaskBuy2 saved successfully');
    res.json({ success: true });
  });
});

module.exports = router;
