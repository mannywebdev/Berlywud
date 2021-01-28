const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        unique:true,
        required:true,
        trim:true,
        lowercase:true,
        // validate(value){
        //     if(!validator.isEmail(value)){
        //         throw new Error('Email is invalid!')
        //     }
        // }
    },
    password:{
        type:String,
        required:true,
        trim:true,
        minlength:7,
        // validate(value){
        //     if(value.toLowerCase().includes("password")){
        //         throw new Error('Password cannot contain "password" !')
        //     }
        // }
    },
    isAdmin:{
        type:Boolean,
        required:true,
        default: false
    }
    // age:{
    //     type:Number,
    //     default:0,
    //     validate(value){
    //         if(value<0){
    //             throw new Error('Age must be a positive number!')
    //         }
    //     }
    // },
    // tokens:[{
    //     token:{
    //         type:String,
    //         required:true
    //     }
    // }],
    // avatar:{
    //     type: Buffer
    // }
},{
    timestamps:true
})

const User = mongoose.model('User',userSchema)
module.exports = User