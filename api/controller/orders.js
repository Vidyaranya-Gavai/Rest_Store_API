const Order = require('../models/order');
const Product = require('../models/product');

exports.orders_get_all = (req, res, next) => {
    Order.find()
        .populate('product', 'name price productImage')
        .then(docs => {
            const responce = {
                count: docs.length,
                orders: docs.map(doc => {
                    return {
                        orderId: doc._id,
                        ordered_Product: doc.product,
                        quantity: doc.quantity,
                        request_To_Get_This_Order: {
                            typr: "GET",
                            url: "http://localhost:4000/orders/" + doc._id
                        }
                    }
                })
            }
            res.status(200).json(responce);
        })
        .catch(err=>{
            res.status(500).json({
                error: err
            });
        });
}

exports.orders_create = (req, res, next) => {
    Product.findOne({ _id: req.body.productId })
        .exec()
        .then(prod =>{
            if(prod){
                const order = new Order({
                    product: req.body.productId,
                    quantity: req.body.quantity
                });
                return order.save();
            }else{
                return res.status(404).json({
                    message: "Product Does Not Exists"  
                })
            }
        })
        .then(result => {
            res.status(201).json({
                message: "Order Created",
                orderId: result._id,
                ordered_Product_Id: result.product,
                quantity: result.quantity,
                request_TO_Get_Created_Order: {
                    type: "GET",
                    url: "http://localhost:4000/orders/" + result._id
                }
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
}

exports.orders_get_one = (req, res, next) => {
    Order.findOne({_id: req.params.id})
        .populate('product', 'name price productImage')
        .then(result=>{
            res.status(200).json({
                orderId: result._id,
                ordered_Product: result.product,
                quantity: result.quantity,
                request_To_Get_All_Orders: {
                    type: "GET",
                    url: "http://localhost:4000/orders/"
                }
            });
        })
        .catch(err=>{
            res.status(500).json({
                error: err
            });
        });
}

exports.orders_delete = (req, res, next) => {
    Order.deleteOne({_id:req.params.id})
        .exec()
        .then(result=>{
            res.status(200).json({
                message: "Order With ID "+req.params.id+" Cancelled",
                request_To_Get_Remaining_Products: {
                    type: "GET",
                    url: "http://localhost:4000/orders/"
                }
            });
        })
        .catch(err=>{
            res.status(500).json({
                error:err
            });
        });
}