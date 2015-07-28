var express = require('express');
var router = express.Router();
var List   = require('../models/list');

router.get('/', function(req, res, next){
  List.find({userId: req.user._id}, function(err, lists) {
    res.json(lists);
  })
});

router.post('/add', function(req, res, next){
  if (!req.body || !req.body.name) return next(new Error('No data provided.'));
  List.save({
      name: req.body.name,
      createTime: new Date(),
      completed: false
    }, function(error, task){
      if (error) return next(error);
      if (!task) return next(new Error('Failed to save.'));
      console.info('Added %s with id=%s', task.name, task._id);
      res.redirect('/lists');
  })
});

router.post('/:list_id', function(req, res, next) {
  if (!req.body.completed) return next(new Error('Param is missing.'));
  var completed = req.body.completed === 'true';
  List.updateById(req.task._id, {$set: {completeTime: completed ? new Date() : null, completed: completed}}, function(error, count) {
    if (error) return next(error);
    if (count !==1) return next(new Error('Something went wrong.'));
    console.info('Marked task %s with id=%s completed.', req.task.name, req.task._id);
    res.redirect('/lists');
  })
});

router.delete('/:list_id', function(req, res, next) {
  List.removeById(req.list._id, function(error, count) {
    if (error) return next(error);
    if (count !==1) return next(new Error('Something went wrong.'));
    console.info('Deleted task %s with id=%s completed.', req.task.name, req.task._id);
    res.status(204).send();
  });
});

module.exports = router;
