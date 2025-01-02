const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const upload = require('../config/multer');
const methodOverride = require('method-override');
router.use(methodOverride('_method'));
const { isAdmin } = require('../middlewares/authMiddleware');

router.get('/',  productController.getAllProducts);
router.get('/create', isAdmin, productController.renderCreateForm);
router.post('/', isAdmin, upload.single('image'), productController.createProduct);
router.get('/:id', productController.getProductById);
router.get('/:id/edit', isAdmin, productController.renderEditForm);
router.put('/:id', isAdmin, upload.single('image'), productController.updateProduct);
router.delete('/:id', isAdmin, productController.deleteProduct);

router.get('/admin/product', isAdmin, productController.renderAdminProducts);


module.exports = router;