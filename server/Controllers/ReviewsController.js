const ErrorApi = require('../error/ErrorApi');
const { Reviews, Product, User } = require('../models/models');
const jwt = require('jsonwebtoken');

class ReviewsControllers {
  static Add = async (req, resp, next) => {
    try {
      let {
        title,
        description,
        valueForMoneyRating,
        overallQualityRating,
        productId,
        nameUser,
        surnameUser,
      } = req.body;
      console.log(req.headers);

      let token = req.headers.token;
      let res;
      if (token) {
        if (!token) {
          return next(ErrorApi.noAuth('Ви не авторизовані.'));
        }
        let userId;
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
          if (err) {
            return next(ErrorApi.badRequest('Невірний токен.'));
          }
          console.log(decoded);
          userId = decoded.id;
        });
        if (!userId) return next(ErrorApi.badRequest('Невірний токен.'));

        res = await Reviews.create({
          title,
          text: description,
          valueForMoneyRating,
          overallQualityRating,
          productId,
          userId,
          nameUser: '',
          surnameUser: '',
        });
      } else {
        res = await Reviews.create({
          title,
          text: description,
          valueForMoneyRating,
          overallQualityRating,
          productId,
          nameUser,
          surnameUser,
        });
      }
      return resp.json({ res });
    } catch (err) {
      return next(ErrorApi.badRequest(err));
    }
  };
  static Get = async (req, resp, next) => {
    try {
      let { page, limit } = req.query;
      page = parseInt(page);
      limit = parseInt(limit);
      const offset = (page - 1) * limit;
      const res = await Reviews.findAndCountAll({
        include: [
          {
            model: Product,
            attributes: ['id', 'img', 'name'],
          },
          {
            model: User,
            attributes: ['id', 'name', 'surname'],
          },
        ],
        offset,
        limit,
        order: [['id', 'DESC']],
      });
      const countPage = Math.ceil(res.count / limit);
      return resp.json({ res: res.rows, countPage, count: res.count });
    } catch (err) {
      return next(ErrorApi.badRequest(err));
    }
  };
}

module.exports = ReviewsControllers;
