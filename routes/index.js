var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
    res.send('Hello! The API is at http://localhost:');
});

module.exports = router;
