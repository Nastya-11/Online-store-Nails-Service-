const BasketAndLikeController = require('../Controllers/BasketAndLikeController');
const IsAuthMiddleWare = require('../middleWare/IsAuthMiddleWare');

const router = require('express')();

router.post(
  '/addToBasket',
  IsAuthMiddleWare,
  BasketAndLikeController.AddToBasket
);
router.post('/addToLike', IsAuthMiddleWare, BasketAndLikeController.AddToLike);
router.get('/getBasket', IsAuthMiddleWare, BasketAndLikeController.GetBasket);
router.get('/getLike', IsAuthMiddleWare, BasketAndLikeController.GetLike);
router.post(
  '/setCount',
  IsAuthMiddleWare,
  BasketAndLikeController.SetBasketCount
);
router.post('/del', IsAuthMiddleWare, BasketAndLikeController.RemoveFromBasket);
router.post(
  '/delLike',
  IsAuthMiddleWare,
  BasketAndLikeController.RemoveFromLike
);
router.post(
  '/clearBasket',
  IsAuthMiddleWare,
  BasketAndLikeController.ClearBasket
);
router.post('/clearLike', IsAuthMiddleWare, BasketAndLikeController.ClearLike);

module.exports = router;

//clearLike
