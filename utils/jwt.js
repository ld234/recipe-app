var jwt = require('jsonwebtoken');
var fs = require('fs');

var cert = fs.readFileSync(__dirname + '/key/key.pem');
var pub = fs.readFileSync(__dirname + '/key/key.pub');

// Create token
exports.sign = function (obj, callback) {
    jwt.sign (obj, cert,{
        algorithm: 'RS256'
    }, function (err, token) {
        callback(err, token);
    });
}

// Decode token
exports.verify = function (token, callback) {
    jwt.verify(token, pub, function (err, decoded) {
        callback(err, decoded);
    });
};
