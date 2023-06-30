const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    }
})

const user = mongoose.model('Blog', userSchema);
/*Remember that mongoose will search for plural form of the collection name
in lower case, which u give here in the database*/
module.exports = user;