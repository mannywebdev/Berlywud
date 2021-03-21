const mongoose = require('mongoose')

const productSchema = new mongoose.Schema(
    {
        url : {type:String, required:true},
        brand:{type:String, required:true},
        title:{type:String, required:true, unique: true},
        description : {type:String, required:true},
        origprice : {type:Number,required:true},
        decantprice : {"2ml":{type:Number,required:true},"5ml":{type:Number,required:true},"10ml":{type:Number,required:true},"30ml":{type:Number,required:true},"Retail":{type:Number,required:true}},
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