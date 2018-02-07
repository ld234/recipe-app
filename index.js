var express = require('express');
const app = express();
const bodyParser = require('body-parser');
var authRouter = require('./routes/auth.route.js');
var userRouter = require('./routes/user.route.js');
var errorHandler = require('./middleware/error-handler');
var db = require ('./db');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
//app.use(express.static('public'));

app.use('/user',userRouter());
app.use('/auth',authRouter());

app.use(errorHandler.errorHandler());

app.listen(3000, function (){
	console.log("Ung dung Node.js dang lang nghe tai dia chi: http://localhost:3000")
})