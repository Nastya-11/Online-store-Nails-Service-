const router = require('express')();

const productRouter = require('./ProductRouter');
const userRouter = require('./UserRouter');
const reviewRouter = require('./ReviewRouter');
const basketAndLikeRouter = require('./BasketAndLikeRouter');
const { sendOrderToTelegram } = require('../Controllers/TelegramController');



router.use('/product', productRouter);
router.use('/user', userRouter);
router.use('/reviews', reviewRouter);
router.use('/basketAndLike', basketAndLikeRouter);
router.post('/sendTelegram', sendOrderToTelegram);


module.exports = router;
