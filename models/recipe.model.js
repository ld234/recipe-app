var mongoose = require ('mongoose');
var Schema = mongoose.Schema;

var recipeSchema = new Schema({
    name : {
        type:String,
        required: true
    },
    imageurl : String,
    ingredients: [String],
    instructions: [String],
    source:String,
    source_url: String,
    tags: [String]
})

recipeSchema.index({name:'text', tags:'text'});

var recipe = mongoose.model('recipe',recipeSchema);// (ten connection, schema name)
module.exports = recipe;