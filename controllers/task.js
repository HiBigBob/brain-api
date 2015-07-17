var express = require('express');
var router = express.Router();
var Task   = require('../models/task');

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

router.post('/add', function(req, res, next){
  if (!req.body || !req.body.name) return next(new Error('No data provided.'));
  Task.save({
      name: req.body.name,
      createTime: new Date(),
      completed: false
    }, function(error, task){
      if (error) return next(error);
      if (!task) return next(new Error('Failed to save.'));
      console.info('Added %s with id=%s', task.name, task._id);
      res.redirect('/tasks');
  })
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
