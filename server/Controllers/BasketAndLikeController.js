const ErrorApi = require('../error/ErrorApi');
const { Basket, Like, Product, Imgs } = require('../models/models');

class BasketAndLikeController {
  static AddToBasket = async (req, resp, next) => {
    try {
      const { productId, count } = req.body;
      const userId = req.user.id;
      const res = await Basket.create({ productId, count, userId });
      return resp.json({ res });
    } catch (err) {
      return next(ErrorApi.badRequest(err));
    }
  };
  static AddToLike = async (req, resp, next) => {
    try {
      const { productId } = req.body;
      const userId = req.user.id;
      const res = await Like.create({ productId, userId });
      return resp.json({ res });
    } catch (err) {
      return next(ErrorApi.badRequest(err));
    }
  };
  static SetBasketCount = async (req, resp, next) => {
    try {
      const { productId, count } = req.body;
      const userId = req.user.id;
      let res;
      if (count == 0) {
        res = await Basket.destroy({ where: { productId, userId } });
      } else {
        res = await Basket.update({ count }, { where: { userId, productId } });
      }
      return resp.json({ res });
    } catch (err) {
      return next(ErrorApi.badRequest(err));
    }
  };
  static RemoveFromLike = async (req, resp, next) => {
    try {
      const { productId } = req.body;
      const userId = req.user.id;
      const res = await Like.destroy({ where: { productId, userId } });

      return resp.json({ res });
    } catch (err) {
      return next(ErrorApi.badRequest(err));
    }
  };

  static RemoveFromBasket = async (req, resp, next) => {
    try {
      const { productId } = req.body;
      const userId = req.user.id;
      const res = await Basket.destroy({ where: { productId, userId } });

      return resp.json({ res });
    } catch (err) {
      return next(ErrorApi.badRequest(err));
    }
  };

  static GetBasket = async (req, resp, next) => {
    try {
      const userId = req.user.id;
      const baskets = await Basket.findAll({
        where: { userId },
        include: [
          {
            model: Product,
            include: [{ model: Imgs }],
            attributes: [
              'id',
              'nameuk',
              'nameru',
              'price',
              'discount',
              'priceWithDiscount',
              'timeDiscount',
              'isAvaibility',
              'isHit',
              'isNovetly',
              'cod',
            ],
          },
        ],
      });

      // Додаємо count з `Basket` до кожного продукту
      const products = baskets.map((basket) => ({
        ...basket.product.toJSON(),
        count: basket.count, // Додаємо count до продукту
      }));

      return resp.json({ res: products });
    } catch (err) {
      return next(ErrorApi.badRequest(err));
    }
  };

  static GetLike = async (req, resp, next) => {
    try {
      const userId = req.user.id;
      const liked = await Like.findAll({
        where: { userId },
        include: [
          {
            model: Product,
            include: [{ model: Imgs }],
            attributes: [
              'id',
              'nameuk',
              'nameru',
              'price',
              'discount',
              'priceWithDiscount',
              'timeDiscount',
              'isAvaibility',
              'isHit',
              'isNovetly',
              'cod',
            ],
          },
        ],
      });

      // Додаємо count з `Basket` до кожного продукту
      const products = liked.map((like) => ({
        ...like.product.toJSON(),
      }));

      return resp.json({ res: products });
    } catch (err) {
      return next(ErrorApi.badRequest(err));
    }
  };
  static ClearBasket = async (req, resp, next) => {
    try {
      const userId = req.user.id;
      const res = await Basket.destroy({ where: { userId } });
      return resp.json({ res });
    } catch (err) {
      return next(ErrorApi.badRequest(err));
    }
  };
  static ClearLike = async (req, resp, next) => {
    try {
      const userId = req.user.id;
      const res = await Like.destroy({ where: { userId } });
      return resp.json({ res });
    } catch (err) {
      return next(ErrorApi.badRequest(err));
    }
  };
}

module.exports = BasketAndLikeController;
