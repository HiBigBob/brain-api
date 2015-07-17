var express = require('express');
var router = express.Router();
var UserModel = require('../models/user');
var jwt = require('jwt-simple');
var moment = require('moment');

router.post('/', function(req, res){
  console.log(req.headers.username);
  if (req.headers.username && req.headers.password) {

    // Fetch the appropriate user, if they exist
    UserModel.findOne({ username: req.headers.username }, function(err, user) {
      if (err) {
        // user cannot be found; may wish to log that fact here. For simplicity, just return a 401
        res.send('Authentication error', 401)
      }

      if (user.password != req.body.password) {
        res.json({ success: false, message: 'Authentication failed. Wrong password.' });
      } else {
          // Great, user has successfully authenticated, so we can generate and send them a token.

          var expires = moment().add(7, 'days', 7)
          var token = jwt.encode(
            {
              iss: user.id,
              exp: expires
            },
            'YOUR_SECRET_STRING'
          );
          res.json({
            token : token,
            expires : expires,
            user : user.toJSON()
          });
      }

    });
  } else {
    // No username provided, or invalid POST request. For simplicity, just return a 401
    res.send('Authentication error', 401)
  }
});

module.exports = router;
