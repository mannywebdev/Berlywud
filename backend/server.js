const express = require('express')
const mongoose = require('mongoose')
const userRouter = require('./routers/user.js')
const productRouter = require('./routers/product.js')
const orderRouter = require('./routers/orderRouter.js')
const dotenv = require('dotenv')
const path = require('path')
const Razorpay= require('razorpay')
const multer = require('multer')
const restAuth = require('./utils').restAuth

dotenv.config()

const razorpayPublicKey = "rzp_test_tjgqJf8OgEA215"
const razorpaySecretKey = "0wIdYCiuPh7ydfOwhvTKyKEP"
console.log(`razorpayPublickey`, razorpayPublicKey)
console.log(`razorpayPublickey`, razorpaySecretKey)
var instance = new Razorpay({
    key_id: razorpayPublicKey,
    key_secret: razorpaySecretKey,
});


const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended : true}))

const port = process.env.PORT || 5000
mongoose.connect(process.env.MONGODB_URL || 'mongodb://localhost:27017/berlywud',{
    useNewUrlParser:true,
    useCreateIndex:true,
    useUnifiedTopology: true
})

//Serving Berlywud logo
app.get('/berlywud.png',(req,res) =>{
    res.sendFile(path.join(__dirname,"greylogo2025.png"))
})

const _dirname = path.resolve();
app.use('/uploads', express.static(path.join(_dirname, '/uploads')));

// app.use(express.static(path.join(_dirname, '/frontend/build')));
// app.get('*', (req, res) =>
//   res.sendFile(path.join(_dirname, '/frontend/build/index.html'))
// );


//Payment routes
app.post('/razorpay',async(req,res) =>{
    try{
        // console.log(req.body)
        const response = await instance.orders.create({
            amount: req.body.amount,
            reciept: req.body.reciept
        });
        res.json({
            id: response.id,
            amount : response.amount
        })
    }catch(error){
        console.log(error)
    }
})

app.post("/payment/success", async (req, res) => {
    try {
        const crypto = require('crypto')
        // getting the details back from our font-end
        const {
            orderCreationId,
            razorpayPaymentId,
            razorpayOrderId,
            razorpaySignature,
        } = req.body;

        // Creating our own digest
        // The format should be like this:
        // digest = hmac_sha256(orderCreationId + "|" + razorpayPaymentId, secret);
        const shasum = crypto.createHmac("sha256","0wIdYCiuPh7ydfOwhvTKyKEP");

        shasum.update(`${orderCreationId}|${razorpayPaymentId}`);

        const digest = shasum.digest("hex");

        // comaparing our digest with the actual signature
        if (digest !== razorpaySignature)
            return res.status(400).json({ msg: "Transaction not legit!" });

        // THE PAYMENT IS LEGIT & VERIFIED
        // YOU CAN SAVE THE DETAILS IN YOUR DATABASE IF YOU WANT

        res.json({
            msg: "success",
            orderId: razorpayOrderId,
            paymentId: razorpayPaymentId,
        });
    } catch (error) {
        console.log(`error`, error)
        res.status(500).send(error);
    }
});

/// Image upload///

const storage = multer.diskStorage({
    destination(req, file, cb) {
      cb(null, 'uploads/');
    },
    filename(req, file, cb) {
      cb(null, `${Date.now()}.jpg`);
    },
 });
const upload = multer({ storage });

app.post('/uploads', restAuth, upload.single('image'), (req, res) => {
    console.log(`req`, req)
    res.send(`/${req.file.path}`);
});
/// Image upload///


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