class Cart {
    static cart = [];
  
    static addToCart(product) {
        const existingProduct = this.cart.find(item => item.id === product.id);
        if (existingProduct) {
            existingProduct.quantity += 1;
        } else {
            this.cart.push({ ...product, quantity: 1 });
        }
        return this.cart;
    }
  
    static getCart() {
        return this.cart;
    }
  
    static updateCartItemQuantity(productId, newQuantity) {
        const productInCart = this.cart.find(item => item.id === productId);
        if (!productInCart) {
            return null;
        }
        productInCart.quantity = newQuantity;
        return this.cart;
    }
  
    static removeItemFromCart(productId) {
        const initialLength = this.cart.length;
        this.cart = this.cart.filter(item => item.id !== productId);
        if (this.cart.length === initialLength) {
            return null;
        }
        return this.cart;
    }
  }
  
  module.exports = Cart;