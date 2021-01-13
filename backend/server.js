const express = require('express')
const product = require('./product.json')

const app = express()
const port = process.env.PORT || 5000

app.get('/',(req,res) =>{
    res.send('Server is Ready')
})
app.get('/api/products',(req,res)=>{
    res.json(product)
})

app.listen(port,()=>{
    console.log(`server is up at port ${port}`)
})