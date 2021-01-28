const express = require('express')
const product = require('./product.json')
const mongoose = require('mongoose')
const userRouter = require('./routers/user')

const app = express()
const port = process.env.PORT || 5000
mongoose.connect(process.env.MONGODB_URL || 'mongodb://localhost:27017/berlywud',{
    useNewUrlParser:true,
    useCreateIndex:true,
    useUnifiedTopology: true
})

app.use('/api/users',userRouter)


app.get('/',(req,res) =>{
    res.send('Server is Ready')
})

app.get('/api/products',(req,res)=>{
    res.json(product)
})

app.get('/api/products/:id',(req,res)=>{
    const productdetail = product.find((item)=> item.id === req.params.id)
    if(productdetail){
        res.send(productdetail)
    }else{
        res.status(404).send({ message:"Product Not Found"})
    }
})

app.use((err,req,res,next)=>{
    res.status(500).send({message : err.message})
})

app.listen(port,()=>{
    console.log(`server is up at port ${port}`)
})