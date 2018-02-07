var jwt = require('./../utils/jwt');
var fs = require('fs');
var path = require('path');
var User = require('../models/user.model');

module.exports = function () {
	return function (req,res, next){
		var token = req.headers['x-access-token'];
		if (token){
			jwt.verify(token, function (err, decodedData) {
                if (err) {
                    res.status(401);
                    res.json({
                        message: 'Invalid Token'
                    });
                } else {
                    var username = decodedData.username;
					var password = decodedData.password;
					
                    User.find({username: username, password: password})
						.then(function (foundUsers){
							if (foundUsers.length > 0){
                                req['decodedData'] = decodedData;
                                next();
							}
							else{
								res.status(401);
                                res.json({
                                    message: 'Invalid Token'
                                });
							}
						})
						.catch (function (err){
							res.send (err);
						});
                }
            })
        } else {
            res.status(401);
            res.json({
                message: "Not Authorized"
            });
		}
	};
}

