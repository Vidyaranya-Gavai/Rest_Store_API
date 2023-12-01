const Product = require('../models/product');

exports.products_get_all = (req, res, next)=>{
    Product
        .find()
        .exec()
        .then(docs=>{
            const responce = {
                count: docs.length,
                products: docs.map(doc=>{
                    return {
                        id: doc._id,
                        name: doc.name,
                        price: doc.price,
                        product_Image_URL: {
                            type: "GET",
                            url: "http://localhost:4000/" + doc.productImage
                        },
                        request: {
                            type: "GET",
                            url: "http://localhost:4000/products/" + doc._id
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

exports.products_create = (req, res, next)=>{
    const product = new Product({
        name: req.body.name,
        price: req.body.price,
        productImage: req.file.path
    });

    product
        .save()
        .then(result=>{
            res.status(201).json({
                message: "Created Post Successfully",
                createdProduct: {
                    id: result._id,
                    name: result.name,
                    price: result.price,
                    image: result.productImage,
                    request: {
                        type: "GET",
                        url: "http://localhost:4000/products/" + result._id
                    }
                }
            });
        })
        .catch(err=>{
            res.status(500).json({error:err});
        });
}

exports.products_get_one = (req, res, next)=>{
    const id = req.params.id;
    Product.findById(id)
        .exec()
        .then(doc=>{
            if(doc){
                res.status(200).json({
                    id: doc._id,
                    name: doc.name,
                    price: doc.price,
                    iproduct_Image_URL: {
                        type: "GET",
                        url: "http://localhost:4000/" + doc.productImage
                    },
                    request_To_Get_All_Products: {
                        type: "GET",
                        url: "http://localhost:4000/products/"
                    }
                });
            }else{
                res.status(404).json({
                    message:"No Product With Such ID Found"
                });
            }
        })
        .catch(err=>{
            res.status(500).json({error:err});
        });
}

exports.products_update_one = (req, res, next)=>{
    Product
        .updateOne(
            {_id:req.params.id},
            {$set: {name: req.body.name, price: req.body.price, productImage: req.file.path}}
        )
        .exec()
        .then(result=>{
            res.status(200).json({
                message: "Product Details Updated",
                request_To_See_Updated_Product: {
                    type: "GET",
                    url: "http://localhost:4000/products/" + req.params.id
                }
            });
        })
        .catch(err=>{
            res.status(500).json({
                error:err
            });
        });
}

exports.products_delete = (req, res, next)=>{
    Product.deleteOne({_id:req.params.id})
        .exec()
        .then(result=>{
            res.status(200).json({
                message: "Product With ID "+req.params.id+" Deleted",
                request_To_Get_Remaining_Products: {
                    type: "GET",
                    url: "http://localhost:4000/products/"
                }
            });
        })
        .catch(err=>{
            res.status(500).json({
                error:err
            });
        });
}