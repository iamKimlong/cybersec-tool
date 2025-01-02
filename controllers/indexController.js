const Product = require("../models/productModel");

exports.getListProduct = async (req, res) => {
    try {
        const products = await Product.getAll();
        const title = "Home";
        return res.render('index/index', { products, title, user: req.session.user });
    } catch (err) {
        console.error("Error fetching products:", err);
        return res.status(500).send("Error fetching products");
    }
};