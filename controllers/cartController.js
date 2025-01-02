const Product = require('../models/productModel');
const Cart = require('../models/cartModel');

exports.addToCart = async (req, res) => {
    try {
        const productId = req.body.id;
        const product = await Product.getById(productId);

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        const updatedCart = Cart.addToCart(product);
        return res.status(201).json({ message: 'Product added to cart', cart: updatedCart });

    } catch (error) {
        console.error('Error adding product to cart:', error);
        return res.status(500).json({ message: 'Failed to add product to cart' });
    }
};

exports.getCart = (req, res) => {
    try {
        const cart = Cart.getCart();
        return res.json({ cart });
    } catch (error) {
        console.error("Error in getCart", error);
        return res.status(500).json({ message: 'Failed to get cart' });
    }
};

exports.updateCartItemQuantity = async (req, res) => {
    try {
        const productId = parseInt(req.params.id, 10);
        const newQuantity = parseInt(req.body.quantity, 10);
        const updatedCart = Cart.updateCartItemQuantity(productId, newQuantity);

        if (!updatedCart) {
            return res.status(404).json({ message: 'Product not found in cart' });
        }

        return res.json({ message: 'Cart updated', cart: updatedCart });
    } catch (error) {
        console.error("Error updating cart:", error);
        return res.status(500).json({ message: 'Failed to update cart' });
    }
};

exports.removeItemFromCart = async (req, res) => {
    try {
        const productId = parseInt(req.params.id, 10);
        const updatedCart = Cart.removeItemFromCart(productId);

        if (!updatedCart) {
            return res.status(404).json({ message: 'Product not found in cart' });
        }

        return res.json({ message: 'Product removed from cart', cart: updatedCart });
    } catch (error) {
        console.error('Error removing item from cart', error);
        return res.status(500).json({ message: 'Failed to remove product from cart' });
    }
};