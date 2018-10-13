var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('submit', { title: 'Flow - Submit' });
});

module.exports = router;
