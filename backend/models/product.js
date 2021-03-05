const mongoose = require('mongoose')

const productSchema = new mongoose.Schema(
    {
        url : {type:String, required:true},
        brand:{type:String, required:true},
        title:{type:String, required:true, unique: true},
        description : {type:String, required:true},
        origprice : {type:Number,required:true},
        decantprice : {twoml:{type:Number,required:true},fiveml:{type:Number,required:true},tenml:{type:Number,required:true},thirtyml:{type:Number,required:true},discprice:{type:Number,required:true}},
        gender: {type:String, required:true},
        notes:{Topnotes:[{type:String, required:true},{type:String, required:true},{type:String, required:true}],Middlenotes:[{type:String, required:true},{type:String, required:true},{type:String, required:true}],Basenotes:[{type:String, required:true},{type:String, required:true},{type:String, required:true}]},
        launch:{type:Number,required:true},
        concentration:{type:String, required:true},
        rating:{type:Number,required:true},
        reviews: {type:Number,required:true},
        stockcount:{type:Number,required:true}
    },
    {
        timestamps: true
    }
)
const Product = mongoose.model('Product',productSchema)
module.exports = Product