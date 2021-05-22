const express = require('express')
const mongoose = require('mongoose')
const userRouter = require('./routers/user.js')
const productRouter = require('./routers/product.js')
const orderRouter = require('./routers/orderRouter.js')
const dotenv = require('dotenv')

dotenv.config()

const stripePublicKey = process.env.STRIPE_PUBLIC_KEY
const stripeSecretKey = process.env.STRIPE_SECRET_KEY
const stripe = require('stripe')(stripeSecretKey)

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended : true}))

const port = process.env.PORT || 5000
mongoose.connect(process.env.MONGODB_URL || 'mongodb://localhost:27017/berlywud',{
    useNewUrlParser:true,
    useCreateIndex:true,
    useUnifiedTopology: true
})

app.use('/api/users',userRouter)
app.use('/api/products',productRouter)
app.use('/api/orders', orderRouter);



app.get('/',(req,res) =>{
    res.send('Server is Ready')
})

app.use((err,req,res,next)=>{
    res.status(500).send({message : err.message})
})

app.listen(port,()=>{
    console.log(`server is up at port ${port}`)
})