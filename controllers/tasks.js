var express = require('express');
var router = express.Router();
var tasks   = require('../models/tasks');

router.get('/', tasks.list);
router.post('/done', tasks.markAllCompleted)
router.post('/add', tasks.add);
router.post('/done/:task_id', tasks.markCompleted);
router.delete('/:task_id', tasks.del);
router.get('/done', tasks.completed);


router.get('/', function(req, res) {
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

exports.list = function(req, res, next){
  Tasks.find({completed: false}).toArray(function(error, tasks){
    if (error) return next(error);
    res.render('tasks', {
      title: 'Todo List',
      tasks: tasks || []
    });
  });
};

exports.add = function(req, res, next){
  if (!req.body || !req.body.name) return next(new Error('No data provided.'));
  Tasks.save({
    name: req.body.name,
    createTime: new Date(),
    completed: false
  }, function(error, task){
    if (error) return next(error);
    if (!task) return next(new Error('Failed to save.'));
    console.info('Added %s with id=%s', task.name, task._id);
    res.redirect('/tasks');
  })
};

exports.markAllCompleted = function(req, res, next) {
  if (!req.body.all_done || req.body.all_done !== 'true') return next();
  Tasks.update({
    completed: false
  }, {$set: {
    completeTime: new Date(),
    completed: true
  }}, {multi: true}, function(error, count){
    if (error) return next(error);
    console.info('Marked %s task(s) completed.', count);
    res.redirect('/tasks');
  })
};

exports.completed = function(req, res, next) {
  Tasks.find({completed: true}).toArray(function(error, tasks) {
    res.render('tasks_completed', {
      title: 'Completed',
      tasks: tasks || []
    });
  });
};

exports.markCompleted = function(req, res, next) {
  if (!req.body.completed) return next(new Error('Param is missing.'));
  var completed = req.body.completed === 'true';
  Tasks.updateById(req.task._id, {$set: {completeTime: completed ? new Date() : null, completed: completed}}, function(error, count) {
    if (error) return next(error);
    if (count !==1) return next(new Error('Something went wrong.'));
    console.info('Marked task %s with id=%s completed.', req.task.name, req.task._id);
    res.redirect('/tasks');
  })
};

exports.del = function(req, res, next) {
  Tasks.removeById(req.task._id, function(error, count) {
    if (error) return next(error);
    if (count !==1) return next(new Error('Something went wrong.'));
    console.info('Deleted task %s with id=%s completed.', req.task.name, req.task._id);
    res.status(204).send();
  });
};
