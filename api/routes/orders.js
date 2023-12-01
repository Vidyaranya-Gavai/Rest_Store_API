const express = require('express');
const router = express.Router();

const checkAuth = require('../middleware/check-auth');

const OrdersController = require('../controller/orders');

router.get('/', checkAuth, OrdersController.orders_get_all);

router.post('/', checkAuth, OrdersController.orders_create);

router.get('/:id', checkAuth, OrdersController.orders_get_one);

router.delete('/:id', checkAuth, OrdersController.orders_delete);

module.exports = router;