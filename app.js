const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const productRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/orders');
const userRoutes = require('./api/routes/user');

/* Connecting To MongoDB Database */
require('dotenv').config();
const conn_str = process.env.CONN_STR;
mongoose.connect(conn_str);

/* Essential Middleware */
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use('/uploads' ,express.static('uploads'));

/* Middleware to handle CORS errors */
app.use((req, res, next)=>{
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        'Access-Control-Allow-Headers', 
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );

    if(req.method === 'OPTIONS'){
        res.header(
            'Access-Control-Allow-Methods',
            'PUT, POST, DELETE, PATCH, GET'
        );
        return res.status(200).json({});
    }
    next();
});

/* Routes to handle requests */
app.use('/products', productRoutes);
app.use('/orders', orderRoutes);
app.use('/users', userRoutes);

/* Middleware to handle 404 error */
app.use((req, res, next)=>{
    const error = new Error('404 Not Found');
    error.status = 404;
    next(error);
});

/* Middleware to handle other eerors */
app.use((error, req, res, next)=>{
    res.status(error.status || 500);
    res.json({
        message: error.message
    });
});

module.exports = app;