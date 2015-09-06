var express = require('express');
var router = express.Router();
var User   = require('../models/user');
var Category   = require('../models/category');
var Task   = require('../models/task');

router.get('/', function(req, res, next) {
  // create the first user
  var john = new User({
    username: 'John',
    password: 'password'
  });

  var tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 7);

  var category = new Category({
    name: 'Cart',
    class: 'fa fa-shopping-cart fa-fw text-primary',
    userId: john._id
  });

  var taskDo = new Task({
    categoryId: category._id,
    userId: john._id,
    name: 'Call john',
    description: 'To fix a meeting',
    deadLineTime: tomorrow,
    completed: false
  });

  var taskDo2 = new Task({
    categoryId: category._id,
    userId: john._id,
    name: 'Learn EmberJs',
    description: 'To add it in my skill',
    deadLineTime: tomorrow,
    completed: false
  });

  var category2 = new Category({
    name: 'Call',
    class: 'fa fa-mobile fa-fw text-success',
    userId: john._id
  });

  var taskBuy = new Task({
    categoryId: category2._id,
    userId: john._id,
    name: 'FullMetal Alchimist',
    description: 'To pass a good time',
    deadLineTime: tomorrow,
    completed: false
  });

  var taskBuy2 = new Task({
    categoryId: category2._id,
    userId: john._id,
    name: 'Vinland Saga',
    description: 'To begin this serie',
    deadLineTime: tomorrow,
    completed: false
  });

  // save the first user
  john.save(function(err) {
    if (err) console.log(err);
    console.log('User saved successfully');
  });

  // save the first task
  category.save(function(err) {
    if (err) console.log(err);
    console.log('Category saved successfully');
  });

  // save the first task
  category2.save(function(err) {
    if (err) console.log(err);
    console.log('Category saved successfully');
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
