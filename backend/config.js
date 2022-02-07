const dotenv = require('dotenv')

dotenv.config()

module.exports = {
    PORT : process.env.PORT || 5001,
    // MONGODB_URL : process.env.MONGODB_URL || 'mongodb://localhost/berlywud',
    accessKeyId: process.env.accessKeyId || 'accessKeyId',
    secretAccessKey: process.env.secretAccessKey || 'secretAccessKey',
    RZP_PUBLIC_KEY : process.env.RZP_PUBLIC_KEY ,
    RZP_SECRET_KEY : process.env.RZP_SECRET_KEY ,
    JWT_KEY : process.env.JWT_KEY ||  'sometingcrazy',
}