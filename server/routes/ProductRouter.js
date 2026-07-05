const ProductController = require('../Controllers/ProductController');
const IsAdminMiddleWare = require('../middleWare/IsAdminMiddleWare');

const router = require('express')();

router.post('/addBrend', IsAdminMiddleWare, ProductController.AddBrend);
router.get('/getBrend', ProductController.GetBrend);
router.post(
  '/addCountryMade',
  IsAdminMiddleWare,
  ProductController.AddCountryMade
);
router.get('/getCountryMade', ProductController.GetCountryMade);
router.post(
  '/addTitleSubcategories',
  IsAdminMiddleWare,
  ProductController.AddTitleSubcategory
);
router.post('/addCategory', IsAdminMiddleWare, ProductController.AddCategory);
router.get('/getCategories', ProductController.GetCategories);
router.post(
  '/addCategoryFilter',
  IsAdminMiddleWare,
  ProductController.AddCategoryFilter
);
router.get('/getCategoryFilter', ProductController.GetFilter);
router.get('/getTitleSubcategories', ProductController.GetTitleSubcategory);

router.post(
  '/addSubcategory',
  IsAdminMiddleWare,
  ProductController.AddSubcategory
);
router.get('/getSubcategories', ProductController.getSubcategory);
router.post('/addProduct', IsAdminMiddleWare, ProductController.AddProduct);
router.put(
  '/updateProduct',
  IsAdminMiddleWare,
  ProductController.UpdateProduct
);
router.get('/getProduct', ProductController.GetProduct);
router.get('/products', ProductController.GetFilteredProducts);
router.get(
  '/categoriesWithSubcategories',
  ProductController.GetCategoriesWithSubcategories
);
router.get('/getProduct/:productId', ProductController.GetProductById);
router.post(
  '/updateCategory',
  IsAdminMiddleWare,
  ProductController.UpdateCategory
);

module.exports = router;
