const express = require('express');
const multer = require('multer');
const checkAuth = require('../middleware/check-auth');

const ProductsController = require('../controller/products');

const router = express.Router();
const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, './uploads/');
    },
    filename: function(req, file, cb){
        cb(null, file.originalname);
    }
});
const upload = multer({storage: storage, fileFilter: (req, file, cb)=>{
    if(file.mimetype==='image/jpeg' || file.mimetype==='image/png' || file.mimetype==='image/jpg' || file.mimetype==='image/webp'){
        cb(null, true);
    }else{
        cb(null, false);
    }
}});

router.get('/', ProductsController.products_get_all);

router.post('/', checkAuth, upload.single('productImage'), ProductsController.products_create);

router.get('/:id', ProductsController.products_get_one);

router.patch('/:id', checkAuth, upload.single('productImage'), ProductsController.products_update_one);

router.delete('/:id', checkAuth, ProductsController.products_delete);

module.exports = router;