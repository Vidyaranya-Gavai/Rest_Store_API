const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

require('dotenv').config();
const jwt_key = process.env.JWT_KEY;

const User = require('../models/user');

exports.users_sign_up = (req, res, next)=>{
    User.findOne({email:req.body.email})
        .then(doc=>{
            if(doc){
                return res.status(409).json({
                    message: "User Already Exists"
                });
            }else{
                bcrypt.hash(req.body.password, 10, (err, hash)=>{
                    if(err){
                        return res.status(500).json({
                            error: err
                        });
                    }else{
                        const user = new User({
                            email: req.body.email,
                            password: hash,
                        });
                        user.save()
                            .then(result=>{
                                console.log(result);
                                res.status(201).json({
                                    message: "User Created Successfully"
                                });
                            })
                            .catch(err=>{
                                res.status(500).json({
                                    error: err
                                });
                            });
                    }
                });
            }
        }); 
}

exports.users_login = (req, res, next)=>{
    User.findOne({email:req.body.email})
        .then(doc=>{
            if(!doc){
                return res.status(401).json({
                    message: "Authentication Failed"
                });
            }
            bcrypt.compare(req.body.password, doc.password, (err, responce)=>{
                if(err){
                    return res.status(401).json({
                        message: "Authentication Failed"
                    });
                }
                if(responce){
                    const token = jwt.sign({
                        email: doc.email,
                        userId: doc._id
                    }, jwt_key,
                    {
                        expiresIn: "1h"
                    });
                    return res.status(200).json({
                        message: "Authentication Successful",
                        token: token
                    });
                }
                return res.status(401).json({
                    message: "Authentication Failed"
                });
            });
        });
}

exports.users_delete = (req, res, next)=>{
    User.deleteOne({_id:req.params.userId})
        .exec()
        .then(result=>{
            res.status(200).json({
                message: "User With ID "+req.params.userId+" Deleted"
            });
        })
        .catch(err=>{
            res.status(500).json({
                error:err
            });
        });
}