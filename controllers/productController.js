const Product = require("../models/productModel");

exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.getAll();
        return res.json(products);
    } catch (error) {
        console.error("Error fetching products:", error);
        return res.status(500).send("Error fetching products");
    }
};
exports.renderAdminProducts = async (req, res) => {
    try {
        const products = await Product.getAll();
          const title = "List Product";
           return res.render('admin/product', { products,title, user: req.session.user });
    } catch (error) {
         console.error("Error fetching products:", error);
         return res.status(500).send("Error fetching products");
    }
};

exports.renderCreateForm = (req, res) => {
    const title = "New Product";
    return res.render('product/create', { title });
};

exports.createProduct = async (req, res) => {
    try {
        const { name, description, price } = req.body;
        let imagePath = "";

        if (req.file) {
            imagePath = `/uploads/${req.file.filename}`;
        }

        await Product.create({ name, description, price, image: imagePath });
        return res.redirect("/product/admin/product");
    } catch (error) {
        console.error("Error creating product:", error);
        req.flash('error', error.sqlMessage || 'Error creating product');
        return res.redirect('/product/create'); 
    }
};


exports.getProductById = async (req, res) => {
    try {
        const product = await Product.getById(req.params.id);
        const title = "Show product";
        if (product) {
            return res.render('product/show', { product, title });
        } else {
            return res.status(404).send('Product not found');
        }
    } catch (error) {
         console.error("Error fetching product:", error);
        return res.status(500).send('Error fetching product');
    }
};

exports.renderEditForm = async (req, res) => {
    try {
        const product = await Product.getById(req.params.id);
        const title = "Edit Product";
        if (product) {
           return res.render('product/edit', { product, title });
        } else {
           return res.status(404).send('Product not found');
        }
    } catch (error) {
        console.error("Error fetching product for edit:", error);
        return res.status(500).send('Error fetching product');
    }
};

exports.updateProduct = async (req, res) => {
    try {
        const { name, description, price } = req.body;
        let imagePath = "";
        if (req.file) {
            imagePath = `/uploads/${req.file.filename}`;
        }
        else{ 
           const product = await Product.getById(req.params.id);
           imagePath = product.image;
        }
       await Product.update(req.params.id, { name, description, price, image: imagePath });
       return res.redirect('/product/admin/product');
    } catch (error) {
        console.error("Error updating product:", error);
        return res.status(500).send('Error updating product');
    }
};

exports.deleteProduct = async (req, res) => {
    try {
        await Product.delete(req.params.id);
        return res.redirect('/product/admin/product');
    } catch (error) {
        console.error("Error deleting product:", error);
        return res.status(500).send('Error deleting product');
    }
};