const express = require('express')
const mongoose = require('mongoose')
const userRouter = require('./routers/user.js')
const productRouter = require('./routers/product.js')
const orderRouter = require('./routers/orderRouter.js')
const dotenv = require('dotenv')
const path = require('path')
const Razorpay= require('razorpay')
const multer = require('multer')
const multerS3 = require('multer-s3')
const aws = require('aws-sdk')
const restAuth = require('./utils').restAuth
const config = require('./config')

dotenv.config()

var instance = new Razorpay({
    key_id: config.RZP_PUBLIC_KEY,
    key_secret: config.RZP_SECRET_KEY,
});

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended : true}))

const port = config.PORT
mongoose.connect(process.env.MONGODB_URL  || 'mongodb://localhost/berlywud',{
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

aws.config.update({
    accessKeyId : config.accessKeyId,
    secretAccessKey : config.secretAccessKey
})
const s3 = new aws.S3()
const storageS3 = multerS3({
    s3,
    bucket: 'berlywud-bucket',
    acl: 'public-read',
    contentType: multerS3.AUTO_CONTENT_TYPE,
    key(req,file,cb){
        cb(null,file.originalname)
    }
})
const storage = multer.diskStorage({
    destination(req, file, cb) {
      cb(null, 'uploads/');
    },
    filename(req, file, cb) {
      cb(null, `${Date.now()}.jpg`);
    },
 });
 const uploadS3 = multer({storage: storageS3})
 app.post('/api/uploads/s3',uploadS3.single('image'),(req,res)=>{
    res.send(req.file.location)
 })

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
    console.log(`Server is up at port ${port}`)
})