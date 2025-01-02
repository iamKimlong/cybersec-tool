// Helper function to make API requests
const makeApiRequest = async (url, method, body) => {
    try {
        const response = await fetch(url, {
            method,
            headers: {
                'Content-Type': 'application/json',
            },
            body: body ? JSON.stringify(body) : null,
        });

        if (!response.ok) {
            let errorData;
            try {
                errorData = await response.json();
            } catch (jsonError) {
                const errorMessage = `HTTP error! status: ${response.status}`;
                throw new Error(errorMessage);
            }
            const errorMessage = errorData.message || `HTTP error! status: ${response.status}`;
            throw new Error(errorMessage);
        }

        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
            return await response.json();
        }
        return await response.text();

    } catch (error) {
        console.error("API request error:", error);
        displayError(error.message || "An unexpected error occurred.");
        throw error; 
    }
};
function displayError(message) {
    const errorDisplay = document.getElementById('error-message');
    if (errorDisplay) {
        errorDisplay.textContent = message;
        errorDisplay.style.display = 'block';
    } else {
        console.error("Error Display element not found");
    }
}


function clearError() {
    const errorDisplay = document.getElementById('error-message');
    if (errorDisplay) {
        errorDisplay.textContent = '';
        errorDisplay.style.display = 'none';
    }
}
 let cart = [];
    const addToCart = async (productId) => {
        try {
            const result = await makeApiRequest('/api/cart', 'POST', { id: productId });
            if (result && result.cart) {
                cart = result.cart;
                updateCartDisplay();
            } else {
                throw new Error('Failed to add item to cart, invalid response');
            }
        } catch (error) {
            console.error("Error in addToCart:", error);
            throw error; 
        }
    };

    
    function updateCartDisplay() {
        const cartCount = document.getElementById('cart-count');
        const cartItemsContainer = document.getElementById('cart-items-container');
         const cartTotalAmount = document.getElementById('cart-total-amount');
        if (!cartCount || !cartItemsContainer || !cartTotalAmount) {
            console.error("Error: cart elements not found!");
            return; 
        }
        cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartItemsContainer.innerHTML = '';
        let total = 0;
        cart.forEach(item => {
            const cartItemElement = document.createElement('div');
            cartItemElement.classList.add('cart-item');
             cartItemElement.innerHTML = `
            <img src="${item.image}" alt="${item.name}" class="cart-item-img">
              <div class="cart-item-details">
                <p class="cart-item-name">${item.name}</p>
                   <p class="cart-item-price">US $${item.price}</p>
                   <div class="quantity-controls">
                        <button class="quantity-btn"  data-id="${item.id}" data-action="decrease">-</button>
                        <span class="cart-item-quantity" >${item.quantity}</span>
                      <button class="quantity-btn"  data-id="${item.id}" data-action="increase">+</button>
                   </div>
                  <button class="remove-item-btn" data-id="${item.id}">Remove</button>
                </div>
            `;
            cartItemsContainer.appendChild(cartItemElement);
            total += item.price * item.quantity;
        });

        cartTotalAmount.textContent = `$${total.toFixed(2)}`;
         cartItemsContainer.addEventListener('click', async (event) => {
            try {
                clearError();
                if (event.target.classList.contains('quantity-btn')) {
                    const productId = parseInt(event.target.dataset.id, 10); 
                    const action = event.target.dataset.action;
                    const itemToUpdate = cart.find(item => item.id === productId);
                    if (itemToUpdate) {
                        const newQuantity = action === 'increase' ? itemToUpdate.quantity + 1 : itemToUpdate.quantity - 1;
                        if (newQuantity <= 0) {
                            await removeItemFromCart(productId);
                        } else {
                            await updateCartItemQuantity(productId, newQuantity);
                        }
                    }
                }
                else if (event.target.classList.contains('remove-item-btn')) {
                    const productId = parseInt(event.target.dataset.id, 10);
                    await removeItemFromCart(productId);
                }
            } catch (error) {
                console.error("Error in cart item operation", error)
            }
        });
    }
    const updateCartItemQuantity = async (productId, newQuantity) => {
        try {
            const result = await makeApiRequest(`/api/cart/${productId}`, 'PUT', { quantity: newQuantity });
            if (result && result.cart) {
                cart = result.cart;
                updateCartDisplay();
            } else {
                throw new Error('Failed to update item in cart, invalid response');
            }
        } catch (error) {
            console.error("Error in updateCartItemQuantity:", error);
            throw error; 
        }
    };

    const removeItemFromCart = async (productId) => {
        try {
            const result = await makeApiRequest(`/api/cart/${productId}`, 'DELETE');
            if (result && result.cart) {
                cart = result.cart;
                updateCartDisplay();
            } else {
                throw new Error('Failed to remove item from cart, invalid response')
            }
        } catch (error) {
            console.error("Error in removeItemFromCart:", error);
            throw error; 
        }
    };
     let purchasedItems = [];
const checkoutBtn = document.getElementById('checkout-btn');
const thankYouModal = document.getElementById('thank-you-modal');
    const closeThankYouModal = document.getElementById('close-thank-you-modal');

    if(checkoutBtn){
         checkoutBtn.addEventListener('click', () => {
            const checkoutModal = document.getElementById('checkout-modal')
           if (cart.length > 0) {
               if(checkoutModal){
                    checkoutModal.style.display = 'block';
                }
            } else {
                displayError("Your cart is empty!");
                setTimeout(() => {
                    clearError();
                }, 2000);
            }
         });
    }
document.addEventListener('DOMContentLoaded', () => {

    const addToCartBtnDetailsPage = document.querySelector('.add-to-cart-btn');
    if (addToCartBtnDetailsPage) {
        addToCartBtnDetailsPage.addEventListener('click', async (event) => {
            const productId = parseInt(event.target.dataset.productId, 10); 
            try {
                clearError();
                 await addToCart(productId);
            } catch (err) {
                console.error("Error adding to cart:", err);
            }
        });
    }

    const cartBtn = document.getElementById('cart-btn');
    const cartModal = document.getElementById('cart-modal');
    const closeModal = document.getElementById('close-modal');
    const cartCount = document.getElementById('cart-count');
    const cartItemsContainer = document.getElementById('cart-items-container');
    const cartTotalAmount = document.getElementById('cart-total-amount');
    
    const loginBtn = document.getElementById('login-btn');
    const signUpBtn = document.getElementById('sign-up-btn');
    const profileBtn = document.getElementById('profile-btn');
    const profileModal = document.getElementById('profile-modal');
    const profileCloseModal = document.getElementById('close-profile-modal');
    const profileName = document.getElementById('profile-name');
    const profileCartItems = document.getElementById('profile-cart-items');
    const profilePurchasedItems = document.getElementById('profile-purchased-items');
    const logoutProfileBtn = document.getElementById('logout-profile-btn')
    const checkoutModal = document.getElementById('checkout-modal')
    const confirmCheckout = document.getElementById('confirm-checkout');
    const closeCheckoutModal = document.getElementById('close-checkout-modal');
    const loggedInMessage = document.getElementById('logged-in-message');
    
    try {
        const storedPurchasedItems = localStorage.getItem('purchasedItems');
        purchasedItems = storedPurchasedItems ? JSON.parse(storedPurchasedItems) : [];
    } catch (error) {
        console.error("Error parsing purchased items from localStorage", error);
        purchasedItems = []; 
        localStorage.removeItem('purchasedItems'); 
        displayError("Failed to load purchased items, please try again later");
    }


    const fetchAndRenderProducts = async () => {
        try {
            clearError();
            const response = await fetch('/product'); 
            if (!response.ok) {
                let errorData;
                try {
                    errorData = await response.json();
                } catch (jsonError) {
                    const errorMessage = `HTTP error! status: ${response.status}`;
                    throw new Error(errorMessage);
                }
                const errorMessage = errorData.message || `HTTP error! status: ${response.status}`;
                throw new Error(errorMessage);
            }
            const contentType = response.headers.get('content-type');
            if(contentType && contentType.includes('application/json')){
                 const products = await response.json();
                  const productGrid = document.getElementById('product-grid');
                 if(productGrid){
                     productGrid.innerHTML = ''; 
                     products.forEach(product => {
                       const productCard = document.createElement('div');
                        productCard.classList.add('product-card');
                        productCard.innerHTML = `
                             <a href="/product/${product.id}">
                                 <div style="position:relative; display:inline-block">
                                      <img src="${product.image}" alt="${product.name}" class="product-img rounded" >
                                       <div class="product-details-hover" style="display:none">
                                         <h3 class="product-name">${product.name}</h3>
                                           <p class="product-price">US $${product.price}</p>
                                      </div>
                                </div>
                             </a>
                           <div class ="d-flex justify-content-center gap-2">
                                <button class="add-to-cart-btn w-100" data-product-id="${product.id}">Add to Cart</button>
                           </div>
                       `;
                        productGrid.appendChild(productCard);
                     });
                        productGrid.addEventListener('mouseover', (event) => {
                         if (event.target.classList.contains('product-img')) {
                           const productDetails = event.target.nextElementSibling
                           if(productDetails){
                              productDetails.style.display = 'block';
                            }
                       }
                  });

                      productGrid.addEventListener('mouseout', (event) => {
                          if (event.target.classList.contains('product-img')) {
                               const productDetails = event.target.nextElementSibling
                              if(productDetails){
                                   productDetails.style.display = 'none';
                               }
                         }
                       });
                 }
            }else{
                const productGrid = document.getElementById('product-grid');
                 if(productGrid){
                      const content = await response.text();
                     productGrid.innerHTML = content;
                   }
           }
         } catch (error) {
            console.error('Failed to fetch products:', error);
            displayError(error.message || 'Failed to load products. Please try again later.');
             const productGrid = document.getElementById('product-grid');
            if(productGrid){
                 productGrid.innerHTML = '<p style="color:red;">Failed to load products. Please try again later.</p>';
             }
        }
    };

    const productGrid = document.getElementById('product-grid');
     if(productGrid){
          fetchAndRenderProducts();
           productGrid.addEventListener('click', async (event) => {
            if (event.target.classList.contains('add-to-cart-btn')) {
                const productId = parseInt(event.target.dataset.productId, 10); 
                try {
                    clearError();
                     await addToCart(productId);
                  } catch (err) {
                      console.error("Error adding to cart:", err);
                  }
             }
         });
     }

    cartBtn.addEventListener('click', () => {
        if (cartModal) {
            cartModal.style.display = "block";
            updateCartDisplay();
        }
    });

    closeModal.addEventListener('click', () => {
        if (cartModal) {
            cartModal.style.display = "none";
        }
    });

    window.addEventListener('click', (event) => {
        if (cartModal && event.target === cartModal) {
            cartModal.style.display = "none";
        }
    });
   if(confirmCheckout){
       confirmCheckout.addEventListener('click', async () => {
        try {
            purchasedItems.push(...cart);
            localStorage.setItem('purchasedItems', JSON.stringify(purchasedItems));
            cart = [];
            updateCartDisplay();
             const checkoutModal = document.getElementById('checkout-modal')
            if(checkoutModal){
                checkoutModal.style.display = 'none';
            }
            if(thankYouModal){
                 thankYouModal.style.display = 'block';
            }
        } catch (error) {
            console.error("Error during checkout", error);
            displayError(error.message || "Failed to place order!");
            setTimeout(() => {
                clearError();
            }, 2000);
        }
    });
    }

   if(closeCheckoutModal){
          closeCheckoutModal.addEventListener('click', () => {
               const checkoutModal = document.getElementById('checkout-modal')
                if (checkoutModal) {
                    checkoutModal.style.display = "none";
                }
          });
    }

    window.addEventListener('click', (event) => {
        const checkoutModal = document.getElementById('checkout-modal')
        if (checkoutModal && event.target === checkoutModal) {
             checkoutModal.style.display = "none";
        }
    });

  if(closeThankYouModal){
         closeThankYouModal.addEventListener('click', () => {
        if (thankYouModal) {
            thankYouModal.style.display = "none";
        }
    });
   }


       window.addEventListener('click', (event) => {
        if (thankYouModal && event.target === thankYouModal) {
            thankYouModal.style.display = "none";
        }
    });
    const updateLoginButtons = () => {
        const isLoggedIn = localStorage.getItem('isLoggedIn');
            if (isLoggedIn === 'true') {
                if(loginBtn){
                   loginBtn.style.display = 'none';
                }
               if(signUpBtn){
                    signUpBtn.style.display = 'none';
                }
                if(loggedInMessage){
                    loggedInMessage.textContent = `Welcome ${localStorage.getItem('username') || "user"}`;
               }
         } else {
            if(loginBtn){
                 loginBtn.style.display = 'inline-block';
             }
            if(signUpBtn){
               signUpBtn.style.display = 'inline-block';
            }
           if(loggedInMessage){
                loggedInMessage.textContent = '';
            }
        }
    };
    updateLoginButtons();

     if(loginBtn){
         loginBtn.addEventListener('click', () => {
             window.location.href = '/login';
          });
       }
      if(signUpBtn){
        signUpBtn.addEventListener('click', () => {
             window.location.href = '/register';
           });
        }
   if(profileBtn){
    profileBtn.addEventListener('click', () => {
           localStorage.removeItem('isLoggedIn');
            localStorage.removeItem('purchasedItems');
          localStorage.removeItem('username');
            window.location.href = '/login';
       });
   }

    window.addEventListener('click', (event) => {
      if (profileModal && event.target === profileModal) {
           profileModal.style.display = "none";
      }
    });
});