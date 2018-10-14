var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  var translation = req.query.translation;
  res.render('translate', {translation: translation});
});

module.exports = router;
