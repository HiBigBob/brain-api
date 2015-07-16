var express = require('express');
var router = express.Router();
var User   = require('../app/models/user');

// create the first user
var john = new User({
  name: 'John Doe',
  password: 'password'
});

// save the first user
john.save(function(err) {
  if (err) throw err;

  console.log('User saved successfully');
  res.json({ success: true });
});
