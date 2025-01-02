const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');

router.post('/', cartController.addToCart);
router.get('/', cartController.getCart);
router.put('/:id', cartController.updateCartItemQuantity);
router.delete('/:id', cartController.removeItemFromCart);

module.exports = router;