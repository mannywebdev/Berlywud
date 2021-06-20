"use strict";

var express = require('express');

var mongoose = require('mongoose');

var userRouter = require('./routers/user.js');

var productRouter = require('./routers/product.js');

var orderRouter = require('./routers/orderRouter.js');

var dotenv = require('dotenv');

var path = require('path');

var Razorpay = require('razorpay');

var nanoid = require('nanoid');

dotenv.config();
var razorpayPublicKey = "rzp_test_tjgqJf8OgEA215";
var razorpaySecretKey = "0wIdYCiuPh7ydfOwhvTKyKEP";
console.log("razorpayPublickey", razorpayPublicKey);
console.log("razorpayPublickey", razorpaySecretKey);
var instance = new Razorpay({
  key_id: razorpayPublicKey,
  key_secret: razorpaySecretKey
});
var app = express();
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));
var port = process.env.PORT || 5000;
mongoose.connect(process.env.MONGODB_URL || 'mongodb://localhost:27017/berlywud', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
}); //Serving Berlywud logo

app.get('/berlywud.png', function (req, res) {
  res.sendFile(path.join(__dirname, "greylogo2025.png"));
});
app.post('/razorpay', function _callee(req, res) {
  var response;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          try {
            alert("test");
            response = instance.orders.create({
              amount: amount,
              reciept: reciept
            });
            alert("test");
            console.log("response", response);
          } catch (error) {
            console.log(error);
          }

        case 1:
        case "end":
          return _context.stop();
      }
    }
  });
});
app.use('/api/users', userRouter);
app.use('/api/products', productRouter);
app.use('/api/orders', orderRouter);
app.get('/', function (req, res) {
  res.send('Server is Ready');
});
app.use(function (err, req, res, next) {
  res.status(500).send({
    message: err.message
  });
});
app.listen(port, function () {
  console.log("server is up at port ".concat(port));
});