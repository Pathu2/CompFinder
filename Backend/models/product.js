const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const {ObjectID} = mongoose.Schema.Types;
const productSchema = new Schema({
    event:{
        type: String,
        required: true
    },
    MaxMem:{
        type: String,
        required: true
    },
    address:{
        type: String,
        required: true
    },
    entryFee:{
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
    },
    nivedan:[
        {
          name: {
            type: String,
          },
          email: {
            type: String,
          },
        },
    ], 
    acc:[
        {
          name: {
            type: String,
          },
          email: {
            type: String,
          },
        },
    ], 
})

const product = mongoose.model('products', productSchema);
module.exports = product;