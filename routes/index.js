var express = require('express');
var router = express.Router();
var stanzas = require('../models/stanzas');

/* GET home page. */
router.get('/', function(req, res, next) {
<<<<<<< HEAD
  res.render('index', { stanza0: stanzas[0], stanza1: stanzas[1], stanza2: stanzas[2] });
=======
  res.render('index', { title: 'Flow' });
>>>>>>> 5f50b7e7433cdfdea099ca9f4fbdf41337c47316
});

module.exports = router;
