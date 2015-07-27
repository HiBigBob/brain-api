var express = require('express');
var router = express.Router();
var UserModel = require('../models/user');
var jwt = require('jwt-simple');
var moment = require('moment');
var config = require('../config/config');

router.post('/', function(req, res){
  if (req.body.username && req.body.password) {
    // Fetch the appropriate user, if they exist
    UserModel.findOne({ username: req.body.username }, function(err, user) {
      if (err) {
        res.status(401).json({ error: 'Authentication error' })
      }

      if (user.password != req.body.password) {
        res.status(401).json({ error: 'Authentication failed. Wrong password.' });
      } else {
          // Great, user has successfully authenticated, so we can generate and send them a token.
          var expires = moment().add(1, 'days')
          var token = jwt.encode(
            {
              iss: user.id,
              exp: expires
            },
            config.secret
          );
          user.password = '';
          res.json({
            user : user,
            access_token : {
              token : token,
              expires : expires
            }
          });
      }
    });
  } else {
    // No username provided, or invalid POST request. For simplicity, just return a 401
    res.status(401).json({ error: 'Authentication errors' })
  }
});

module.exports = router;
