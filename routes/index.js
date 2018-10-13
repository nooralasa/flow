var express = require('express');
var router = express.Router();
var stanzas = require('../models/stanzas');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { stanza0: stanza0, stanza1: stanzas[1], stanza2: stanzas[2] });
});

module.exports = router;
