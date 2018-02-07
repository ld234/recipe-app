const router = require('express').Router();
const path  = require('path');
const jwt = require ('./../utils/jwt');
const secret = require('./../controllers/user.controller').secret;
const User = require('../models/user.model');
const crypto = require('crypto');

module.exports = function(){
	router.post('/',login);
	return router;
}

function login (req,res){
	var username = req.body.username;
	var password = crypto.createHmac('sha256', secret)
                    .update(req.body.password)
                    .digest('hex');
	User.find({username: username, password: password})
	.then(function (foundUsers){
		if (foundUsers.length > 0){
			res.status(400);
			jwt.sign({
				username: username,
				password: password
			},function (err,token){
				if (err) {
					res.status(400);
					res.json({
						message: 'Error'
					});
				} else {
					res.json({
						token: token,
						message: "Successfully logged in"
					});
				}
			})
		}
		else{
			res.send ({
				message: 'Incorrect username or password'
			})
		}
	})
	.catch (function (err){
		res.send (err);
	});
}