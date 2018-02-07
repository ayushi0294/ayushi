var user_controller = require('../controller/user');

var auth= require('../controller/auth');

var express = require('express');
var router = express.Router();
// api for register
router.post('/register', function(req, res) {

  var isAuthorization = auth.auth_user(req, res, function (err) {
  var err = false;
  if (err) {
    res.send("error");
  } else {

    user_controller.create(req, res);
    console.log("ggggg");
  }
});
});


router.post('/login', function(req, res) {

  var isAuthorization = auth.auth_user(req, res, function (err) {
  var err = false;
  if (err) {
    res.send("error");
  } else {

    user_controller.login(req, res);
    console.log("ggggg");
  }
});
  
});
  
module.exports = router;