const ReviewsControllers = require('../Controllers/ReviewsController');
const IsAdminMiddleWare = require('../middleWare/IsAdminMiddleWare');

const router = require('express')();

router.post('/add', ReviewsControllers.Add);

module.exports = router;
