# Adidas Cambodia Branch 

This is a basic e-commerce platform for Adidas products, built using Node.js, Express.js, and EJS. It demonstrates essential concepts like product listing, shopping cart functionality, and simple user authentication.

## Key Features

*   **Product Listing:** Displays Adidas products.
*   **Product Details:** Shows more information about individual products.
*   **Add to Cart:** Allows users to add items to a shopping cart.
*   **Shopping Cart (Modal):** View and manage cart items.
*   **Checkout:** Simulates checkout process (no real transactions).
*   **Basic User Auth:** Simple login and signup functionality.
    * Admin users can also create, edit, and delete products.
*   **Local Storage**: basic cart and session handling is done via local storage.

## Technologies

*   **Node.js**
*   **Express.js**
*   **EJS**
*   **HTML, CSS, JavaScript**
*   **Bootstrap**
*   **Font Awesome**

## Setup

1.  **Clone:**
    ```bash
    git clone <repository_url>
    cd <project_directory>
    ```
2.  **Install:**
    ```bash
    npm install (packages are already provide)
    ```
3.  **Run:**
    ```bash
    node .\server.js
    ```
4.  **Open:** Go to `http://localhost:3000` in your browser.

## API Endpoints

*   **`GET /product`**: List products.
*   **`GET /product/:id`**: Product details.
*   **`GET /api/cart`**: Get cart.
*   **`POST /api/cart`**: Add to cart (`{ id: <product_id> }`).
*   **`PUT /api/cart/:id`**: Update cart quantity (`{ quantity: <new_quantity> }`).
*   **`DELETE /api/cart/:id`**: Remove from cart.
*  **`GET /product/admin/product`**: Admin Product page.
*   **`/login`, `/register`**: Authentication routes.
*   **`/logout`**: logout route.

## Notes

*   **Data:** Product and user data is stored in-memory (not persistent).
*   **Auth:** Very basic authentication.
*   **Modals**: Modals are used to display the cart and checkout functionality.
