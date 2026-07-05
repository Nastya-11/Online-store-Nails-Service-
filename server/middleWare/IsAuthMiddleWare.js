const jwt = require('jsonwebtoken');
const ErrorApi = require('../error/ErrorApi');

module.exports = async (req, resp, next) => {
  try {
    const token = req.headers.token;

    if (!token) {
      return next(ErrorApi.noAuth('Ви не авторизовані.'));
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return next(ErrorApi.badRequest('Невірний токен.'));
      }

      // Якщо токен дійсний, зберігаємо дані користувача у req
      req.user = decoded;
      next();
    });
  } catch (err) {
    return next(ErrorApi.internal('Сталася помилка при перевірці токена.'));
  }
};
