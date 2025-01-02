const express = require('express');
const router = express.Router();
const indexController = require('../controllers/indexController');
const methodOverride = require('method-override');
router.use(methodOverride('_method'));
const { isLoggedIn } = require('../middlewares/authMiddleware');

router.get('/',isLoggedIn, indexController.getListProduct);

module.exports = router;