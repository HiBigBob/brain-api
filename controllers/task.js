var express = require('express');
var router = express.Router();
var Task   = require('../models/task');
var Category   = require('../models/category');

router.get('/', function(req, res, next){
  Task.find({}, function(err, tasks) {
    res.json(tasks);
  })
});

router.post('/done', function(req, res, next) {
  if (!req.body.all_done || req.body.all_done !== 'true') return next();
  Task.update({
    completed: false
  }, {$set: {
    completeTime: new Date(),
    completed: true
  }}, {multi: true}, function(error, count){
    if (error) return next(error);
    console.info('Marked %s task(s) completed.', count);
    res.redirect('/tasks');
  })
});

router.post('/', function(req, res, next){
  if (!req.body || !req.body.name || !req.body.categoryId) return next(new Error('No data provided.'));

  var task = new Task({
    categoryId: req.body.categoryId,
    userId: req.user._id,
    name: req.body.name,
    description: req.body.description,
    completed: false
  });

  task.save(function(err) {
    if (err) console.log(err);
    console.log('Task saved successfully');

    Task.find({}, function(err, tasks) {
      res.json(tasks);
    })
  });
});

router.post('/done/:task_id', function(req, res, next) {
  if (!req.body.completed) return next(new Error('Param is missing.'));
  var completed = req.body.completed === 'true';
  Task.updateById(req.task._id, {$set: {completeTime: completed ? new Date() : null, completed: completed}}, function(error, count) {
    if (error) return next(error);
    if (count !==1) return next(new Error('Something went wrong.'));
    console.info('Marked task %s with id=%s completed.', req.task.name, req.task._id);
    res.redirect('/tasks');
  })
});

router.delete('/:task_id', function(req, res, next) {
  Task.removeById(req.task._id, function(error, count) {
    if (error) return next(error);
    if (count !==1) return next(new Error('Something went wrong.'));
    console.info('Deleted task %s with id=%s completed.', req.task.name, req.task._id);
    res.status(204).send();
  });
});

router.get('/done', function(req, res, next) {
  Task.find({completed: true}, function(err, tasks) {
    res.json(tasks);
  })
});

module.exports = router;
