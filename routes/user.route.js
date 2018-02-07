var router = require('express').Router();
var path  = require('path');
var fs = require ('fs');
var auth = require('./../middleware/auth');
var userController = require('../controllers/user.controller');

module.exports = function(){
    router.get('/info',auth(),getUserInfo);
	router.post('/',createUser);
	router.put('/:id',auth(),updateUser);
	router.delete('/:id',auth(),deleteUser);
	return router;
}

function getUserInfo(req,res,next){
	console.log (req.decodedData);
	userController.getUserInfo(req.decodedData.username)
	.then (function (data){
		res.send(data);
	})
	.catch (function(err){
		next(err);
	});
}

function createUser (req,res,next){
	userController.createUser(req.body)
	.then (function (data){
		console.log ('success');
		res.send(data);
	})
	.catch (function(err){
		console.log('failed');
		next(err);
	});
}

function updateUser(req,res,next){
	var user = req.body;
	user._id = req.params.id;
	userController.updateUser(user)
	.then (function (data){
		res.send(data);
	})
	.catch (function(err){
		next(err);
	});
}

function deleteUser(req,res,next){
	userController.deleteUser(req.params.id)
	.then (function (data){
		res.send(data);
	})
	.catch (function(err){
		next(err);
	});
}