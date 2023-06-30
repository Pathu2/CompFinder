const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    category:{
        type: String,
        required: true
    },
    company:{
        type: String,
        required: true
    },
    price:{
        type: String,
        required: true
    },
    userID:{
        type: String,
        required: true
    },
    discription:{
        type: String,
        required: true
    },
    image:{
        type: String,
        required: true
    }
})

const product = mongoose.model('products', productSchema);
module.exports = product;