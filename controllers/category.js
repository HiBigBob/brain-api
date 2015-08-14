var express = require('express');
var router = express.Router();
var Category   = require('../models/category');

router.get('/', function(req, res, next){
  Category.find({userId: req.user._id}, function (err, categories) {
    res.json(categories);
  })
});

router.post('/add', function(req, res, next){
  if (!req.body || !req.body.name) return next(new Error('No data provided.'));
  Category.save({
      name: req.body.name,
      createTime: new Date(),
      completed: false
    }, function(error, task){
      if (error) return next(error);
      if (!task) return next(new Error('Failed to save.'));
      console.info('Added %s with id=%s', task.name, task._id);
      res.redirect('/categories');
  })
});

router.post('/:category_id', function(req, res, next) {
  if (!req.body.name) return next(new Error('Param is missing.'));
  var name = req.body.name;
  Category.updateById(req.category._id, {$set: {name: name}}, function(error, count) {
    if (error) return next(error);
    if (count !==1) return next(new Error('Something went wrong.'));
    console.info('Marked task %s with id=%s completed.', req.category.name, req.category._id);
    res.redirect('/categories');
  })
});

router.delete('/:category_id', function(req, res, next) {
  Category.removeById(req.category._id, function(error, count) {
    if (error) return next(error);
    if (count !==1) return next(new Error('Something went wrong.'));
    console.info('Deleted task %s with id=%s completed.', req.category.name, req.category._id);
    res.status(204).send();
  });
});

module.exports = router;
