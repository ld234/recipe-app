var mongoose = require ('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
	username: {
		type: String,
		required: true
	},
	firstname: {
		type: String,
		required: true
	},
	lastname: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true
	},
	email:{
		type: String, 
		required : true
	},
	create_date: {
		type: Date,
		default: Date.now
	},
	foods:[
		{	
			name: String,
			quantity: Number,
			percentage: {
				type: Number,
				default: 100.0,
			},
			unit: String,
			exp_date: Date
		}
	]
})

userSchema.index({name:'text'});

var user = mongoose.model('user',userSchema);
module.exports = user;
