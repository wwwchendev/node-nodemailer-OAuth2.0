var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/user', function(req, res, next) {
  res.render('emailUser', { title: 'Email-User Page' });
});

module.exports = router;
