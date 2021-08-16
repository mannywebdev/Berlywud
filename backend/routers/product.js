const express = require('express')
const expressAsyncHandler = require('express-async-handler')
const data = require('../data.js')
const Product =require('../models/product.js')
const restAuth = require('../utils').restAuth
const isAdmin = require('../utils').isAdmin

const productRouter = express.Router()

productRouter.get('/',expressAsyncHandler(async(req,res)=>{
  const name = req.query.name || '';
  const nameFilter = name ? { title: { $regex: name, $options: 'i' } } : {};
    const products = await Product.find({...nameFilter})
    res.send(products)
}))

productRouter.get(
  '/categories',
  expressAsyncHandler(async (req, res) => {
    const categories = await Product.find().distinct('gender');
    res.send(categories);
  })
);

productRouter.get('/seed',expressAsyncHandler(async(req,res)=>{
    // await Product.remove({})
    const createdProducts = await Product.insertMany(data.products)
    res.send({createdProducts})
}))

productRouter.get('/:id',expressAsyncHandler(async(req,res)=>{
    const product = await Product.findById(req.params.id)
    if(product){
        res.send(product)
    }else{
        res.status(404).send({message:"Product Not Found"})
    }
}))

productRouter.post('/',restAuth,isAdmin,expressAsyncHandler(async (req, res) => {
    const product = new Product({
      brand: 'Brand has to be changed ',
      title: 'Title has to be changed' + Date.now(),
      description: 'Description has to be changed',
      origprice: 1999 ,
      gender: 'unisex',
      launch: 2010,
      concentration: 'Eau De Parfum',
      stockcount: 100,
      url: 'https://raw.githubusercontent.com/mannywebdev/perfumesite/main/PerfumePics/giorgio%20armani%20code%20absolu.jpg',
      rating: 4.5,
      reviews: 6,
      decantprice: {
          "2ml": 150,
          "5ml": 250,
          "10ml": 550,
          "30ml": 1050,
          "Retail": 3500,
      },
      notes: {
          Topnotes:["Apple","Green Mandarin","Nutmeg"],
          Middlenotes:["Orange Blossom","Nutmeg","Carrot Seeds"],
          Basenotes:["Suede","Tonka Bean","Vanilla"]
      }
    });
    
    const createdProduct = await product.save();
    res.send({ message: 'Product Created', product: createdProduct });
  })
);

productRouter.put('/:id',restAuth,isAdmin,expressAsyncHandler(async (req, res) => {
      const productId = req.params.id;
      const product = await Product.findById(productId);
      console.log(`product`, product)
      if (product) {
        product.brand = req.body.brand;
        product.title = req.body.title;
        product.url = req.body.url;
        product.description = req.body.description;
        product.origprice = req.body.origprice;
        product.gender = req.body.gender;
        product.launch = req.body.launch;
        product.concentration = req.body.concentration,
        product.rating = req.body.rating,
        product.reviews = req.body.reviews
        product.stockcount = req.body.stockcount
        product.decantprice["2ml"] = req.body.twoml
        product.decantprice["5ml"] = req.body.fiveml
        product.decantprice["10ml"] = req.body.tenml
        product.decantprice["30ml"] = req.body.thirtyml
        product.decantprice["Retail"] = req.body.retail
        product.notes.Topnotes[0] = req.body.topnote1
        product.notes.Topnotes[1] = req.body.topnote2
        product.notes.Topnotes[2] = req.body.topnote3
        product.notes.Middlenotes[0] = req.body.middlenote1
        product.notes.Middlenotes[1] = req.body.middlenote2
        product.notes.Middlenotes[2] = req.body.middlenote3
        product.notes.Basenotes[0] = req.body.basenote1
        product.notes.Basenotes[1] = req.body.basenote2
        product.notes.Basenotes[2] = req.body.basenote3
        const updatedProduct = await product.save();
        console.log(`updatedProduct`, updatedProduct)
        res.send({ message: 'Product Updated', product: updatedProduct });
      } else {
        res.status(404).send({ message: 'Product Not Found' });
      }
    })
);

productRouter.delete('/:id',restAuth,isAdmin,expressAsyncHandler(async (req, res) => {
      const product = await Product.findById(req.params.id);
      if (product) {
        const deleteProduct = await product.remove();
        res.send({ message: 'Product Deleted', product: deleteProduct });
      } else {
        res.status(404).send({ message: 'Product Not Found' });
      }
    })
);

module.exports = productRouter