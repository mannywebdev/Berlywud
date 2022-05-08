const express = require("express");
const expressAsyncHandler = require("express-async-handler");
const Order = require("../models/orderModel");
const restAuth = require("../utils").restAuth;
const isAdmin = require("../utils").isAdmin;
let api_key = process.env.MAILGUN_API_KEY;
let domain = process.env.MAILGUN_DOMAIN;
const formData = require("form-data");
const Mailgun = require("mailgun.js");
const payOrderEmailMessage = require("../utils").payOrderEmailMessage;
const orderRouter = express.Router();

const mailgun = new Mailgun(formData);
const client = mailgun.client({ username: "api", key: api_key });

orderRouter.get(
  "/",
  restAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const orders = await Order.find({}).populate("user", "name");
    res.send(orders);
  })
);

orderRouter.get(
  "/myorder",
  restAuth,
  expressAsyncHandler(async (req, res) => {
    const orders = await Order.find({ user: req.user });
    res.send(orders);
  })
);

orderRouter.post(
  "/",
  restAuth,
  expressAsyncHandler(async (req, res) => {
    if (req.body.orderItems.length === 0) {
      res.status(400).send({ message: "Cart is empty" });
    } else {
      const order = new Order({
        orderItems: req.body.orderItems,
        shippingAddress: req.body.shippingAddress,
        //paymentMethod: req.body.paymentMethod,
        itemPrice: req.body.itemPrice,
        shippingPrice: req.body.shippingPrice,
        totalPrice: req.body.totalPrice,
        user: req.user._id,
      });
      const createdOrder = await order.save();
      res
        .status(201)
        .send({ message: "New Order Created", order: createdOrder });
    }
  })
);

orderRouter.get(
  "/:id",
  restAuth,
  expressAsyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (order) {
      res.send(order);
    } else {
      res.status(404).send({ message: "Order Not Found" });
    }
  })
);

orderRouter.put(
  "/:id/pay",
  restAuth,
  expressAsyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id).populate(
      "user",
      "email name"
    );
    // console.log(`order`, order)
    // console.log(`req.body`, req.body)
    if (order) {
      order.isPaid = true;
      order.paidAt = Date.now();
      order.paymentResult = {
        order_id: req.body.data.orderId,
        status: req.body.data.msg,
        payment_id: req.body.data.paymentId,
      };
      const updatedOrder = await order.save();
      // mailgun().messages().send({
      //   from: 'Berlywud <berlywud.com>',
      //   to: `${order.user.name} <${order.user.email}>`,
      //   subject: `New order ${order._id}`,
      //   html : payOrderEmailMessage(order)
      // },(error,body)=>{
      //   if(error){
      //     console.log(`error`, error)
      //   }else{
      //     console.log(`body`, body)
      //   }
      // });
      client.messages
        .create(domain, {
          from: "Berlywud <info@berlywud.com>",
          to: `${order.user.name} <${order.user.email}>`,
          subject: `New order ${order._id}`,
          html: payOrderEmailMessage(order),
        })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.error(err);
        });
      res.send({ message: "Order Paid", order: updatedOrder });
    } else {
      res.status(404).send({ message: "Order Not Found" });
    }
  })
);

orderRouter.delete(
  "/:id",
  restAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (order) {
      const deleteOrder = await order.remove();
      res.send({ message: "Order Deleted", order: deleteOrder });
    } else {
      res.status(404).send({ message: "Order Not Found" });
    }
  })
);

orderRouter.put(
  "/:id/deliver",
  restAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (order) {
      order.isDelivered = true;
      order.deliveredAt = Date.now();

      const updatedOrder = await order.save();
      res.send({ message: "Order Delivered", order: updatedOrder });
    } else {
      res.status(404).send({ message: "Order Not Found" });
    }
  })
);

module.exports = orderRouter;
