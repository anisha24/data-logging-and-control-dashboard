var express = require('express');
var router = express.Router();
var User = require('../models/user')

router.post('/register', function(req,res,next){
  var user = new User({
    first_name : req.body.fname,
    last_name : req.body.lname,
    username : req.body.uname,
    password : User.hashPassword(req.body.password)
  });
  
  let promise = user.save();

  promise.then(function(doc){
    return res.status(201).json(doc);
  });

  promise.catch(function(err){
    return res.status(501).json({message : 'Error registering user'})
  })
})

module.exports = router;
