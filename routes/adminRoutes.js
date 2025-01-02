const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const methodOverride = require('method-override');
router.use(methodOverride('_method'));
const { isAdmin } = require('../middlewares/authMiddleware');


router.get('/', isAdmin, productController.renderAdminProducts);


module.exports = router;