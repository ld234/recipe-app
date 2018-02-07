var fs = require('fs');
var path = require('path');
var User = require('../models/user.model');
var crypto = require('crypto');
var secret = 'linhdan1997@xyz';

module.exports = {
  getUserInfo: getUserInfo,
	createUser: createUser,
	updateUser : updateUser,
	deleteUser : deleteUser,
	secret : secret
}

function createUser(newUser){
	var user = new User(newUser);
	return User.find({$or :[{email: newUser.email},{username: newUser.username}]})
        .then(function (foundUsers) {
            if (foundUsers.length > 0) {
                return Promise.reject({
                    statusCode: 400,
                    message: 'Email or username exists.'
                });
            } else if (!newUser.username || !newUser.firstname ||!newUser.lastname || !newUser.password || !newUser.email){
				let fields = [];
				console.log ('missing fields');
				let msg = 'Missing ';
				if (!newUser.username){
					fields.push('username');
				}
				if (!newUser.firstname){
					fields.push('first name');
				}
				if (!newUser.lastname){
					fields.push('last name');
				}
				if (!newUser.password){
					fields.push('password');
				}
				if (!newUser.email){
					fields.push('email');
				}
				for (var i = 0; i < fields.length; i++) {
					msg += fields[i];
					if (i < fields.length - 1){
						msg += ', ';
					}
					else {
						msg += '.';
					}
				}
				return Promise.reject({
                    statusCode: 400,
                    message: msg
                });
			}
			else{
				console.log ('passed tests');
                var hash = crypto.createHmac('sha256', secret)
                    .update(newUser.password)
                    .digest('hex');

                newUser.password = hash;
                var user = new User(newUser);

                return user.save()
                    .then(function (user) {
                        return Promise.resolve(user);
                    })
                    .catch(function (err) {
                        return Promise.reject(err);
                    })
            }
        })
        .catch(function (err) {
            return Promise.reject(err);
        })
}

function getUserInfo(username){
	return User.findOne({username:username},{password:0,_id:0, __v:0})
	.then(function (user){
		if (user){
			let dateString= user.create_date.getDate() + '/' 
						+ (user.create_date.getMonth()+1) +'/'
						+ user.create_date.getFullYear() + ' ' 
						+ user.create_date.getHours() + ':'
						+ user.create_date.getMinutes();
			console.log (dateString);
			var formattedUser = {
				username: user.username,
				firstname : user.firstname,
				lastname : user.lastname,
				email: user.email,
				foods : user.foods,
				dateCreated : dateString
			}
			console.log (formattedUser);
			return Promise.resolve(formattedUser);
		}
		else	
			return Promise.reject({
				statusCode:404,
				message:'Not Found'
			});
	})
	.catch(function (err){
		return Promise.reject(err);
	});
}

//validate query

function updateUser(user){
	return User.findOne({email:user.email})
	.then(function(foundUser){
		if (foundUser){
			//console.log(foundUser);
			return Promise.reject({
				statusCode:400, 
				message : 'Duplicate email.'
			});
		}
		else{
			if (user.password){
				var hash = crypto.createHmac('sha256', secret)
                    .update(user.password)
                    .digest('hex');
				user.password = hash;
			}
			return User.findOneAndUpdate({_id:user._id}, user, {new:true})
			.then(function(data){
				return Promise.resolve(data);
			})
			.catch(function (err){
				return Promise.reject(err);
			});
		}
	})
	.catch (function (err){
		return Promise.reject(err);
	});
}

function deleteUser(id){
	return User.findOneAndRemove({_id:id})
	.then(function (raw){
		return Promise.resolve(raw);
	})
	.catch (function (err){
		return Promise.reject(err);
	})
}
