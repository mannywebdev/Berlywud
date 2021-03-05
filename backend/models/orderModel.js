const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
    orderItems:[{
        brand: {type:String,required:true},
        title:{type:String,required:true},
        qty: {type:Number,required:true},
        image: {type:String,required:true},
        product: {type:mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
        }
    }],
    shippingAddress:{
        fullName:{type:String,required:true},
        pinCode:{type:Number,required:true},
        address1:{type:String,required:true},
        address2:{type:String},
        city:{type:String,required:true},
        state:{type:String,required:true},
    },
    paymentMethod: {type:String,required:true},
    itemPrice: {type:Number,required:true},
    shippingAddress: {type:Number,required:true},
    totalPrice: {type:Number,required:true},
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    isPaid: { type: Boolean, default: false },
    paidAt: { type: Date },
    isDelivered: { type: Boolean, default: false },
    deliveredAt: { type: Date },

},
{
    timestamps: true,
}
)

const Order = mongoose.model('Order', orderSchema)
module.exports =  Order