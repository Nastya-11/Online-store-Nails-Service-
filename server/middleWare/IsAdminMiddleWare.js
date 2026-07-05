const jwt = require('jsonwebtoken');
const ErrorApi = require('../error/ErrorApi');

module.exports = async (req, resp, next) => {
  try {
    next();
    
    const token = req.headers.token;

    if (!token) {
      return next(ErrorApi.noAuth('Ви не авторизовані.'));
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return next(ErrorApi.badRequest('Невірний токен.'));
      }

      // Якщо токен валідний, зберігаємо користувача в req
      req.user = decoded;

      // Перевірка isAdmin
      if (!decoded.isAdmin) {
        return next(
          ErrorApi.noAuth('Доступ заборонений: ви не є адміністратором.')
        );
      }

      // Продовжуємо виконання, якщо користувач є адміністратором
      next();
    });
  } catch (err) {
    return next(ErrorApi.internal('Сталася помилка при перевірці токена.'));
  }
};
